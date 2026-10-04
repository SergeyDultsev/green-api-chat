import UIButton from "../../../shared/ui/UIButton.tsx";
import AddIcon from "../../../shared/icons/AddIcon.tsx";
import { Link } from "react-router-dom";

const ChatBar: React.FC = () => {

    const chats: { chatId: string, name: string }[] = [
        {
            chatId: '1',
            name: '39890128943',
        },
        {
            chatId: '2',
            name: '24214212424',
        },
    ];

    return (
        <aside className='flex flex-col gap-2 w-80 shrink-0 bg-[#17181c] border-r-2 border-[#ffffff0f]'>
            <UIButton icon={<AddIcon />} text={'Создать чат'} className={'m-2'} />

            <section className="flex flex-col">
                {chats.map(chat => (
                    <Link to={`/chat/${chat.chatId}`}>
                        <article className='cursor-pointer text-[#fffc] w-full p-2 hover:bg-[#ffffff0f] hover:text-[#ffffff]'>
                            {chat.name}
                        </article>
                    </Link>
                ))}
            </section>
        </aside>
    )
}

export default ChatBar;