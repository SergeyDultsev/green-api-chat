import { UIButton, UIInput } from "@/shared";
import { useState} from "react";
import { useCredentials } from "@modules/credentials/model/credentials.queries.ts";
import type { tCredentials } from "@shared/types/tCredentials.ts";
import { useNavigate } from "react-router-dom";

const CredentialsFrom: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const credentialsMutation = useCredentials();

    const [credentials, setCredentials] = useState({
        idInstance: '',
        apiTokenInstance: '',
    });

    const setFromCredentials = (fieldName: keyof tCredentials, value: string | number) => {
        setError(null);

        setCredentials(old  => ({
            ...old ,
            [fieldName]: value,
        }))
    }

    const handleCredentials = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = await credentialsMutation.mutateAsync(credentials);

            if (data.stateInstance) {
                sessionStorage.setItem(
                    'credentials',
                    JSON.stringify(credentials)
                );

                navigate('/');
            }
        } catch (error) {
            setError('Не удалось подключиться к инстансу. Проверьте введённые данные.');
        }
    };

    return (
        <form
            className='
                flex flex-col gap-5 w-full max-w-[420px]
                p-6 rounded-2xl
                bg-[#17181c] border border-[#ffffff0f]
                shadow-2xl shadow-black/40
            '
            onSubmit={handleCredentials}
        >
            {/* Заголовок */}
            <header className='flex flex-col gap-1.5 text-center'>
                <h1 className='text-[#fffc] text-xl font-semibold tracking-tight'>
                    Подключение
                </h1>
                <p className='text-[#fffc]/60 text-sm leading-relaxed'>
                    Введите данные вашего инстанса Green-API, чтобы начать работу.
                </p>
            </header>

            {/* Поля */}
            <div className='flex flex-col gap-3'>
                <UIInput
                    placeholder={'idInstance'}
                    type={'text'}
                    name={'idInstance'}
                    onChange={setFromCredentials}
                    isError={!!error}
                    required={true}
                />
                <UIInput
                    placeholder={'apiTokenInstance'}
                    type={'text'}
                    name={'apiTokenInstance'}
                    onChange={setFromCredentials}
                    isError={!!error}
                    required={true}
                />
            </div>

            {/* Ошибка */}
            {error && (
                <p className='
                    w-full rounded-lg
                    border border-red-500/40 bg-red-500/10
                    p-3 text-sm text-red-400 text-center
                '>
                    {error}
                </p>
            )}

            {/* Кнопка */}
            <UIButton
                type="submit"
                text={credentialsMutation.isPending ? 'Проверка...' : 'Сохранить'}
                disabled={credentialsMutation.isPending}
                className='w-full'
            />
        </form>
    );
}

export default CredentialsFrom;