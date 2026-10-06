import { UserAddIcon, UIButton, ExitIcon, useCredentials } from "@/shared";
import { Link } from "react-router-dom";
import { useChats } from "@modules/chat/model/chat.queries.ts";
import type { tChat } from "@shared/types/tChat.ts";
import { useContext } from "react";
import { ModalContext } from "@providers/ModalProvider.tsx";
import CredentialsModalDisconnect from "@modules/credentials/ui/CredentialsModalDisconnect.tsx";

const ChatBar: React.FC = () => {
    const credentials = useCredentials();
    const modal = useContext(ModalContext);

    const { data, isLoading, isError } = useChats(credentials);

    const chats = (data ?? []).filter((chat: tChat) => chat.type === "user");

    return (
        <aside className='
            flex flex-col w-80 shrink-0
            bg-[#17181c] border-r border-[#ffffff0f]
            overflow-hidden
        '>

            {/* Верхняя панель с действиями */}
            <div className='sticky top-0 z-10 flex flex-col gap-2 p-3 bg-[#17181c] border-b border-[#ffffff0f]'>
                <UIButton
                    icon={<UserAddIcon />}
                    text={'Добавить контакт'}
                    className='w-full'
                />
                <UIButton
                    onClick={() => modal?.openModal(<CredentialsModalDisconnect />)}
                    icon={<ExitIcon />}
                    variant={'danger'}
                    text={'Отключиться'}
                    className='w-full'
                />
            </div>

            {/* Список чатов */}
            {chats.length !== 0 && !isLoading && (
                <section className='
                    flex flex-col flex-1 overflow-y-auto py-1
                    [&::-webkit-scrollbar]:w-1.5
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:bg-[#ffffff1a]
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    hover:[&::-webkit-scrollbar-thumb]:bg-[#ffffff33]
                '>
                    {chats.map((chat: tChat) => (
                        <Link
                            key={chat.chatId}
                            to={`/chat/${chat.chatId}`}
                            className='block px-2'
                        >
                            <article className='
                                cursor-pointer text-[#fffc] text-sm
                                w-full px-3 py-2.5 rounded-lg
                                transition-colors duration-150
                                hover:bg-[#ffffff0f] hover:text-[#ffffff]
                                active:bg-[#ffffff14]
                            '>
                                {chat.name}
                            </article>
                        </Link>
                    ))}
                </section>
            )}

            {/* Состояние загрузки */}
            {isLoading && (
                <section className='flex flex-col gap-2 p-3'>
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className='h-9 w-full rounded-lg bg-[#ffffff0a] animate-pulse'
                        />
                    ))}
                </section>
            )}

            {/* Состояние ошибки */}
            {isError && (
                <section className='flex flex-col p-3'>
                    <article className='
                        text-[#fffc]/70 text-sm
                        w-full px-3 py-2.5 rounded-lg
                        bg-[#ffffff08] border border-[#ffffff0f]
                        text-center
                    '>
                        Не удалось загрузить чаты…
                    </article>
                </section>
            )}
        </aside>
    )
}

export default ChatBar;