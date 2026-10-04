import { CredentialsFrom } from "@modules/credentials";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ConnectPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const session = sessionStorage.getItem('credentials');
        if (session) navigate('/');
    }, [navigate]);

    return (
        <section className="flex justify-center pt-8">
            <CredentialsFrom />
        </section>
    );
}

export default ConnectPage;