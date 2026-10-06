import UIButton from "@shared/ui/UIButton.tsx";
import SentIcon from "@shared/icons/SentIcon.tsx";
import UIInput from "@shared/ui/UIInput.tsx";
import { useChat } from "@modules/chat/hooks/useChat.ts";

const Chat: React.FC = () => {
    const {
        currentContact,
        bottonChatRef,
        messages,
        isLoadingMessage,
        isErrorMessage
    } = useChat();

    return (
        <div className='flex flex-1 justify-center min-w-0 h-full'>
            <div className='flex flex-col w-full h-full max-w-[800px] border-x-2 border-[#ffffff0f]'>

                <div className='shrink-0  flex flex-col p-3 border-b-2 bg-[#17181c] border-[#ffffff0f] text-[#fffc] z-10'>
                    { currentContact?.name ?? 'Имя собеседника' }
                </div>

                <section className='
                    flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto p-3
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:bg-[#ffffff1a]
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    hover:[&::-webkit-scrollbar-thumb]:bg-[#ffffff33]
                '>
                    {isLoadingMessage && (
                        <p className='text-[#fffc]'>Загрузка…</p>
                    )}
                    {isErrorMessage && (
                        <p className='text-[#fffc]'>Не удалось загрузить сообщения…</p>
                    )}
                    {!isLoadingMessage && !isErrorMessage && messages.map((message) => (
                        <article
                            key={message.idMessage}
                            className={`flex p-2 text-[#fffc] rounded ${
                                message.type === 'incoming' ? 'self-start bg-[#007aff]' : 'self-end rounded-md border border-blue-500/40 bg-blue-500/10'
                            }`}
                        >
                            {message.textMessage}
                        </article>
                    ))}

                    {messages.length === 0 && !isLoadingMessage && (
                        <p className="text-center w-full rounded-md border border-blue-500/40 bg-blue-500/10 text-[#fffc] p-3">
                            Отправьте сообщение и начните общение!
                        </p>
                    )}

                    <div ref={bottonChatRef} />
                </section>

                <div className='shrink-0 flex gap-2 p-3 bg-[#17181c] border-t-2 border-[#ffffff0f] w-full'>
                    <UIInput
                        placeholder={'Сообщение...'}
                        type={'text'}
                        onChange={() => console.log('Набор сообщения')}
                        required={true}
                    />
                    <UIButton
                        icon={<SentIcon />}
                    />
                </div>
            </div>
        </div>
    )
}

export default Chat;