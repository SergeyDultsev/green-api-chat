import { UIButton } from "@/shared";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ModalContext } from "@providers/ModalProvider.tsx";

const CredentialsModalDisconnect: React.FC = () => {
    const navigate = useNavigate();
    const modal = useContext(ModalContext);

    const toDisconnect = () => {
        sessionStorage.clear();
        navigate('/connect');
    }

    return (
        <div className='bg-[#17181c] rounded-xl border border-[#ffffff0f] flex flex-col gap-5 p-6 w-full max-w-sm'>

            <div className='flex flex-col gap-2'>
                <h3 className='text-[#fffc] text-lg font-semibold tracking-tight'>
                    Отключение
                </h3>
                <p className='text-[#fffc]/60 text-sm leading-relaxed'>
                    Вы действительно хотите отключиться? Все данные сессии будут удалены.
                </p>
            </div>

            <div className='flex gap-3'>
                <UIButton
                    onClick={() => modal?.closeModal()}
                    text={'Отмена'}
                    className='flex-1'
                />
                <UIButton
                    onClick={toDisconnect}
                    variant={'danger'}
                    text={'Отключиться'}
                    className='flex-1'
                />
            </div>
        </div>
    );
}

export default CredentialsModalDisconnect;