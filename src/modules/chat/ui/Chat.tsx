import UIButton from "../../../shared/ui/UIButton.tsx";
import SentIcon from "../../../shared/icons/SentIcon.tsx";
import UIInput from "../../../shared/ui/UIInput.tsx";

const Chat: React.FC = () => {
    return (
        <div className='flex flex-1 justify-center min-w-0 h-full'>
            <div className='flex flex-col w-full h-full max-w-[800px] border-x-2 border-[#ffffff0f]'>

                <div className='shrink-0  flex flex-col p-3 border-b-2 bg-[#17181c] border-[#ffffff0f] text-[#fffc] z-10'>
                    шапка
                </div>

                <section className='flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto p-3'>
                    <article className='flex self-start p-2 bg-[#007aff] text-[#fffc] rounded'>
                        собеседник
                    </article>
                    <article className='flex self-end p-2 bg-[#007aff] text-[#fffc] rounded'>
                        автор
                    </article>
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