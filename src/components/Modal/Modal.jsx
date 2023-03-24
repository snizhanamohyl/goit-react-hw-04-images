import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types'; 
import { Overlay, ModalWindow } from "./Modal.styled";

const modalRoot = document.getElementById('modal-root');

export default function Modal({ imgURL, tags, closeModal }) {
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        
        return () => window.removeEventListener('keydown', handleKeyDown)
    },[])

    const handleKeyDown = (e) => {  
        if (e.code === 'Escape') {
            closeModal();
        }
    }

    const handleBackdropClick = ({ currentTarget, target}) => {
        if (currentTarget === target) {
            closeModal();
        }
    }

    return createPortal(<Overlay onClick={handleBackdropClick}> 
            <ModalWindow>
                <img src={imgURL} alt={tags} width="900px"/>
            </ModalWindow>
        </Overlay>, modalRoot)
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    imgURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
}
