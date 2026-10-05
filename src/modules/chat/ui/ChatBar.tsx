import { UserAddIcon, UIButton, ExitIcon, useCredentials } from "@/shared";
import { Link, useNavigate } from "react-router-dom";
import { useChats } from "@modules/chat/model/chat.queries.ts";
import type { tChat } from "@shared/types/tChat.ts";

const ChatBar: React.FC = () => {
    const navigate = useNavigate();
    const credentials = useCredentials();

    const toDisconnect = () => {
        sessionStorage.clear();
        navigate('/connect');
    }

    const { data, isLoading, isError } = useChats(credentials);

    const chats = (data ?? []).filter((chat: tChat) => chat.type === "user");

    return (
        <aside className='flex flex-col w-80 shrink-0 bg-[#17181c] border-r-2 border-[#ffffff0f] overflow-y-auto overflow-x-hidden'>
            <div className='sticky top-0 z-10 flex flex-col gap-2 p-2 bg-[#17181c]'>
                <UIButton
                    icon={<UserAddIcon />}
                    text={'Добавить контакт'}
                />
                <UIButton
                    onClick={toDisconnect}
                    icon={<ExitIcon />}
                    variant={'danger'}
                    text={'Отключиться'}
                />
            </div>

            {chats.length !== 0 && !isLoading && (
                <section className='
                        flex flex-col flex-1 overflow-y-auto
                        [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:bg-transparent
                        [&::-webkit-scrollbar-thumb]:bg-[#ffffff1a]
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        hover:[&::-webkit-scrollbar-thumb]:bg-[#ffffff33]
                    '>
                    {chats.map((chat: tChat) => (
                        <Link to={`/chat/${chat.chatId}`}>
                            <article className='cursor-pointer text-[#fffc] w-full p-2 hover:bg-[#ffffff0f] hover:text-[#ffffff]'>
                                {chat.name}
                            </article>
                        </Link>
                    ))}
                </section>
            )}

            {isLoading && (
                <section className="flex flex-col">
                    <article className='text-[#fffc] w-full p-2'>
                        Загрузка…
                    </article>
                </section>
            )}

            {isError && (
                <section className="flex flex-col">
                    <article className='text-[#fffc] w-full p-2'>
                        Не удалось загрузить чаты…
                    </article>
                </section>
            )}
        </aside>
    )
}

export default ChatBar;