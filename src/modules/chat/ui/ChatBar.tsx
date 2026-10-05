import {UserAddIcon, UIButton, ExitIcon} from "@/shared";
import {Link, useNavigate} from "react-router-dom";

const ChatBar: React.FC = () => {
    const navigate = useNavigate();

    const chats: { chatId: string, name: string }[] = [];

    const toDisconnect = () => {
        sessionStorage.clear();
        navigate('/connect');
    }

    return (
        <aside className='flex flex-col gap-2 w-80 shrink-0 bg-[#17181c] border-r-2 border-[#ffffff0f]'>
            <div className='flex flex-col gap-2 m-2'>
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

            {chats.length !== 0 && (
                <section className="flex flex-col">
                    {chats.map(chat => (
                        <Link to={`/chat/${chat.chatId}`}>
                            <article className='cursor-pointer text-[#fffc] w-full p-2 hover:bg-[#ffffff0f] hover:text-[#ffffff]'>
                                {chat.name}
                            </article>
                        </Link>
                    ))}
                </section>
            )}
        </aside>
    )
}

export default ChatBar;