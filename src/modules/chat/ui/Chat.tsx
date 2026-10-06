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
        isErrorMessage,
        message,
        sendError,
        isSending,
        setFromMessage,
        sendMessage
    } = useChat();

    return (
        <div className='flex flex-1 justify-center min-w-0 h-full bg-[#17181c]'>
            <div className='flex flex-col w-full h-full max-w-[800px] border-x border-[#ffffff0f]'>

                {/* Шапка чата */}
                <div className='
                shrink-0 flex items-center gap-3 px-4 py-3
                border-b border-[#ffffff0f] bg-[#17181c]
                text-[#fffc] font-medium tracking-tight
                z-10
            '>
                    {/* Аватар-заглушка */}
                    <div className='w-8 h-8 rounded-full bg-[#ffffff0f] flex items-center justify-center text-xs uppercase shrink-0'>
                        {(currentContact?.name ?? 'И').slice(0, 1)}
                    </div>
                    <span className='truncate'>
                    {currentContact?.name ?? 'Имя собеседника'}
                </span>
                </div>

                {/* Лента сообщений */}
                <section className='
                flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto px-4 py-4
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-[#ffffff1a]
                [&::-webkit-scrollbar-thumb]:rounded-full
                hover:[&::-webkit-scrollbar-thumb]:bg-[#ffffff33]
            '>
                    {isLoadingMessage && (
                        <div className='flex flex-col gap-2'>
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-9 rounded-2xl bg-[#ffffff0a] animate-pulse ${
                                        i % 2 === 0 ? 'w-2/5 self-start' : 'w-1/3 self-end'
                                    }`}
                                />
                            ))}
                        </div>
                    )}

                    {isErrorMessage && (
                        <p className='text-[#fffc]/70 text-sm text-center py-2'>
                            Не удалось загрузить сообщения…
                        </p>
                    )}

                    {!isLoadingMessage && !isErrorMessage && messages.map((message) => (
                        <article
                            key={message.idMessage}
                            className={`
                            max-w-[75%] px-3.5 py-2 text-[#fffc] text-sm leading-relaxed
                            break-words whitespace-pre-wrap
                            shadow-sm shadow-black/20
                            transition-colors duration-150
                            ${message.type === 'incoming'
                                ? 'self-start bg-[#007aff] rounded-2xl rounded-bl-md'
                                : 'self-end border border-blue-500/40 bg-blue-500/10 rounded-2xl rounded-br-md'
                            }
                        `}
                        >
                            {message.textMessage}
                        </article>
                    ))}

                    {messages.length === 0 && !isLoadingMessage && !isErrorMessage && (
                        <div className='
                        flex flex-col items-center justify-center gap-2
                        flex-1 text-center
                    '>
                            <div className='
                            rounded-full bg-[#ffffff0a] flex items-center justify-center
                            text-[#fffc]/40 text-xl p-2
                        '>
                                GREEN-API
                            </div>
                            <p className='text-[#fffc]/60 text-sm max-w-[240px]'>
                                Отправьте сообщение и начните общение!
                            </p>
                        </div>
                    )}

                    <div ref={bottonChatRef} />
                </section>

                {/* Панель ввода */}
                <div className='
                shrink-0 flex flex-col gap-2 px-3 py-3
                bg-[#17181c] border-t border-[#ffffff0f] w-full
            '>
                    {sendError && (
                        <p className='
                            w-full rounded-lg
                            border border-red-500/40 bg-red-500/10
                            p-2 text-sm text-red-400 text-center
                        '>
                            {sendError}
                        </p>
                    )}

                    <form
                        className='flex items-center gap-2 w-full'
                        onSubmit={(e) => {
                            e.preventDefault();
                            sendMessage();
                        }}
                    >
                        <div className='flex-1 min-w-0'>
                            <UIInput
                                placeholder={'Сообщение...'}
                                type={'text'}
                                onChange={setFromMessage}
                                value={message}
                                required={false}
                            />
                        </div>
                        <UIButton
                            icon={<SentIcon />}
                            type={'submit'}
                            disabled={isSending || !message.trim()}
                            className='shrink-0'
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chat;