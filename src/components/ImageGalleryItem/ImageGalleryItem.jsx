import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ item }) {
    const { id, webformatURL, largeImageURL, tags } = item;

    const [showModal, setShowModal] = useState(false)

    const toggleModal = () => {
        setShowModal(prev => !prev);
    }

    return <>
        {showModal && <Modal closeModal={toggleModal} imgURL={largeImageURL} tags={tags } />}
        <GalleryItem key={id} >
            <GalleryItemImg src={webformatURL} alt={tags} onClick={toggleModal}/>
        </GalleryItem>
    </>
}

ImageGalleryItem.propTypes = {
    item: PropTypes.object.isRequired,
}

