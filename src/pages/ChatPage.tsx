import ChatBar from "../modules/chat/ui/ChatBar.tsx";
import Chat from "../modules/chat/ui/Chat.tsx";

const ChatPage: React.FC = () => {
    return (
        <section className='flex h-screen w-full overflow-hidden'>
            <ChatBar />
            <Chat />
        </section>
    )
}

export default ChatPage;