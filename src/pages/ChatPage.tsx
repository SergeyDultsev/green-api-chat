import { Chat, ChatBar } from "@modules/chat";

const ChatPage: React.FC = () => {
    return (
        <section className='flex h-screen w-full overflow-hidden'>
            <ChatBar />
            <Chat />
        </section>
    )
}

export default ChatPage;