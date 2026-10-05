import { UIButton, UIInput } from "@/shared";
import { useState} from "react";
import { useCredentials } from "@modules/credentials/model/credentials.queries.ts";
import type { Credentials } from "@modules/credentials/model/types.ts";
import { useNavigate } from "react-router-dom";

const CredentialsFrom: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const credentialsMutation = useCredentials();

    const [credentials, setCredentials] = useState({
        idInstance: '',
        apiTokenInstance: '',
    });

    const setFromCredentials = (fieldName: keyof Credentials, value: string | number) => {
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
            console.log(data);

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
        <form className='flex items-center justify-center flex-col gap-4 w-[500px] p-4' onSubmit={handleCredentials}>
            <UIInput
                placeholder={'Введите idInstance'}
                type={'text'}
                name={'idInstance'}
                onChange={setFromCredentials}
                isError={!!error}
                required={true}
            />
            <UIInput
                placeholder={'Введите apiTokenInstance'}
                type={'text'}
                name={'apiTokenInstance'}
                onChange={setFromCredentials}
                isError={!!error}
                required={true}
            />
            <UIButton
                type="submit"
                text={credentialsMutation.isPending ? 'Проверка...' : 'Сохранить'}
                disabled={credentialsMutation.isPending}
                className='w-full'
            />

            {error && (
                <p className="text-center w-full rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-400">
                    { error }
                </p>
            )}
        </form>
    );
}

export default CredentialsFrom;