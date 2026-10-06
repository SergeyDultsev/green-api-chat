import { UIButton, UIInput, useCredentials } from "@/shared";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ModalContext } from "@providers/ModalProvider.tsx";
import { useCheckAccount } from "@modules/chat/model/chat.queries.ts";

const ChatModalAdd: React.FC = () => {
    const navigate = useNavigate();
    const modal = useContext(ModalContext);
    const credentials = useCredentials();
    const checkAccountMutation = useCheckAccount(credentials);

    const [phone, setPhone] = useState('');
    const [error, setError] = useState<string | null>(null);

    const setPhoneNumber = (_name: string, value: string | number) => {
        setError(null);
        setPhone(String(value));
    };

    const checkAccount = async () => {
        const normalized = phone.replace(/\D/g, '');

        if (!normalized) {
            setError('Введите номер телефона.');
            return;
        }

        try {
            const user = await checkAccountMutation.mutateAsync({
                phoneNumber: Number(normalized),
            });

            modal?.closeModal();
            navigate(`/chat/${user?.chatId}`);
        } catch {
            setError('Не удалось найти получателя. Проверьте номер и попробуйте снова.');
        }
    };

    return (
        <div
            className='bg-[#17181c] rounded-xl border border-[#ffffff0f] flex flex-col gap-5 p-6 w-full max-w-sm'
        >

            <div className='flex flex-col gap-2'>
                <h3 className='text-[#fffc] text-lg font-semibold tracking-tight'>
                    Добавить контакт
                </h3>
                <p className='text-[#fffc]/60 text-sm leading-relaxed'>
                    Введите номер собеседника и начните общение.
                </p>
            </div>

            <div className='flex flex-col gap-3'>
                <UIInput
                    placeholder={'Номер телефона'}
                    type={'text'}
                    onChange={setPhoneNumber}
                    value={phone}
                    isError={!!error}
                    required={true}
                />

                {error && (
                    <p className='
                        w-full rounded-lg
                        border border-red-500/40 bg-red-500/10
                        p-3 text-sm text-red-400 text-center
                    '>
                        {error}
                    </p>
                )}
            </div>

            <div className='flex gap-3'>
                <UIButton
                    onClick={() => modal?.closeModal()}
                    text={'Отмена'}
                    className='flex-1'
                />
                <UIButton
                    onClick={checkAccount}
                    text={checkAccountMutation.isPending ? 'Добавление...' : 'Добавить'}
                    disabled={checkAccountMutation.isPending}
                    className='flex-1'
                />
            </div>
        </div>
    );
}

export default ChatModalAdd;
