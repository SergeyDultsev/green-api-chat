import { UIButton, UIInput } from "@/shared";
import { useState} from "react";
import { useCredentials } from "@modules/credentials/model/credentials.queries.ts";
import type { Credentials } from "@modules/credentials/model/types.ts";
import { useNavigate } from "react-router-dom";

const CredentialsFrom: React.FC = () => {
    const navigate = useNavigate();
    const credentialsMutation = useCredentials();

    const [credentials, setCredentials] = useState({
        idInstance: '',
        apiTokenInstance: '',
    });

    const setFromCredentials = (fieldName: keyof Credentials, value: string | number) => {
        setCredentials(old  => ({
            ...old ,
            [fieldName]: value,
        }))
    }

    const handleCredentials = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = await credentialsMutation.mutateAsync(credentials);

        if (data.stateInstance) {
            sessionStorage.setItem(
                'credentials',
                JSON.stringify(credentials)
            );

            navigate('/');
        }
    };

    return (
        <form className='flex items-center justify-center flex-col gap-4 w-[500px] p-4' onSubmit={handleCredentials}>
            <UIInput
                placeholder={'Введите idInstance'}
                type={'text'}
                name={'idInstance'}
                onChange={setFromCredentials}
                required={true}
            />
            <UIInput
                placeholder={'Введите apiTokenInstance'}
                type={'text'}
                name={'apiTokenInstance'}
                onChange={setFromCredentials}
                required={true}
            />
            <UIButton
                type="submit"
                text='Сохранить'
                className='w-full'
            />
        </form>
    );
}

export default CredentialsFrom;