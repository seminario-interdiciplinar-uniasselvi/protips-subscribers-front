import {useState} from 'react';
import api from '../services/api';
import StatusModal from './StatusModal';
import {useParams} from "react-router-dom";

function NewsletterForm() {
    const {userId, newsletterId} = useParams();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
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
        <div className="App">
            <h1>Inscreva-se na nossa Newsletter</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Enviando...' : 'Inscrever-se'}
                </button>
            </form>
            <StatusModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                message={modalMessage}
                isSuccess={isSuccess}
            />
        </div>
    );
}

export default NewsletterForm;