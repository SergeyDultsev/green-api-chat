import UIButton from "@shared/ui/UIButton.tsx";
import SentIcon from "@shared/icons/SentIcon.tsx";
import UIInput from "@shared/ui/UIInput.tsx";
import { useCredentials } from "@/shared";
import { useParams } from "react-router-dom";
import { useMessages } from "@modules/chat/model/chat.queries.ts";

const Chat: React.FC = () => {
    const { id } = useParams();
    const credentials = useCredentials();
    const { data, isLoading, isError } = useMessages(credentials, id);

    const messages = data
        ?.filter(item => !item.isDeleted && !item.mimeType)
        .slice()
        .reverse();

    return (
        <div className='flex flex-1 justify-center min-w-0 h-full'>
            <div className='flex flex-col w-full h-full max-w-[800px] border-x-2 border-[#ffffff0f]'>

                <div className='shrink-0  flex flex-col p-3 border-b-2 bg-[#17181c] border-[#ffffff0f] text-[#fffc] z-10'>
                    шапка
                </div>

                <section className='
                    flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto p-3
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:bg-[#ffffff1a]
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    hover:[&::-webkit-scrollbar-thumb]:bg-[#ffffff33]
                '>
                    {isLoading && (
                        <p className='text-[#fffc]'>Загрузка…</p>
                    )}
                    {isError && (
                        <p className='text-[#fffc]'>Не удалось загрузить сообщения…</p>
                    )}
                    {!isLoading && !isError && messages.map((message) => (
                        <article
                            key={message.idMessage}
                            className={`flex p-2 bg-[#007aff] text-[#fffc] rounded ${
                                message.type === 'incoming' ? 'self-start' : 'self-end'
                            }`}
                        >
                            {message.textMessage}
                        </article>
                    ))}
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