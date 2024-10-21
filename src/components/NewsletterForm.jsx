import {useState} from 'react';
import api from '../services/api';
import StatusModal from './StatusModal';

function NewsletterForm() {
    const userId = '6714131d00eb823fef45b03e'
    const newsletterId = '671551e1ee38d6778014038a'
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await api.post(`/v1/users/${userId}/newsletters/${newsletterId}/subscribe`, { email });
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
        <div>
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