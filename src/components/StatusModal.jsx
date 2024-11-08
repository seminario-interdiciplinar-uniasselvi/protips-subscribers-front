import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function StatusModal({ isOpen, onRequestClose, message, isSuccess }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Status Modal"
            className="status-modal"
            overlayClassName="status-modal-overlay"
        >
            <div className={`status-modal-content ${isSuccess ? 'success' : 'error'}`}>
                <h2>{isSuccess ? 'Sucesso' : 'Erro'}</h2>
                <p>{message}</p>
                <button onClick={onRequestClose}>Fechar</button>
            </div>
        </Modal>
    );
}

export default StatusModal;