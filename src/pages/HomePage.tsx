import { ChatBar } from "@modules/chat";

const HomePage: React.FC = () => {
    return (
        <section className='flex h-screen w-full overflow-hidden'>
            <ChatBar />
        </section>
    )
}

export default HomePage;