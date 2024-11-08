import {useState} from 'react';
import api from '../services/api';
import {useParams} from "react-router-dom";
import StatusModal from "./StatusModal.jsx";

function NewsletterForm() {
    const {userId, newsletterId} = useParams();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await api.post(`/v1/users/${userId}/newsletters/${newsletterId}/subscribe`, {email});
            setIsSuccess(true);
            setModalMessage('Inscrição realizada com sucesso!');
        } catch (error) {
            setIsSuccess(false);
            setModalMessage('Erro ao realizar inscrição.');
        } finally {
            setIsLoading(false);
            setModalIsOpen(true);
        }
    };

    return (
        <main>
            <form className="container" onSubmit={handleSubmit}>
                <h1>Inscreva-se na nossa Newsletter</h1>
                <p>Ao se inscrever na nossa newsletter, você receberá atualizações semanais com as últimas
                    novidades, promoções exclusivas e conteúdos feitos especialmente para nossos assinantes. </p>
                <input
                    type="email"
                    id="email"
                    value={email}
                    placeholder="Digite seu e-mail"
                    required
                    onChange={(event) => setEmail(event.target.value)}
                />
                <button type="submit" disabled={isLoading}>Inscrever-se</button>
            </form>
            <StatusModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                message={modalMessage}
                isSuccess={isSuccess}
            />
        </main>
    );
}

export default NewsletterForm;