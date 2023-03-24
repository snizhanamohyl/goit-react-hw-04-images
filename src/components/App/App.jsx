import { useEffect, useState } from "react";

import Searchbar from 'components/Searchbar/Searchbar';
import Loader from 'components/Loader/Loader'
import ImageGallery from 'components/ImageGallery/ImageGallery'
import Error from 'components/Error/Error';
import Button from "components/Button/Button";
import SearchImages from 'services/api'
import { AppContainer } from './App.styled'

const STATUS = {
    IDLE: 'idle',
    PENDING: 'pending',
    REJECTED: 'rejected',
    RESOLVED: 'resolved',    
}

const noResultsMsg = 'We haven’t found images for your request';

const searchImages = new SearchImages();

export default function App() {
    const [imgs, setImgs] = useState([]);
    const [error, setError] = useState('');
    const [status, setStatus] = useState(STATUS.IDLE);
    const [showBtn, setShowBtn] = useState(false);

    useEffect(() => {
        if (status !== STATUS.PENDING) return;

        setShowBtn(false);
        setTimeout(() => {
            searchImages.fetchImages()
                .then(({ hits, total }) => {
                    if (hits.length === 0) throw new Error(noResultsMsg);
                    
                    const newImgLength = imgs.length + hits.length;
                    const endOfGallery = (newImgLength === total || hits.length < 12);
                    setShowBtn(endOfGallery ? false : true);   
                    
                    setImgs(prev => [...prev, ...hits]);

                    setStatus(STATUS.RESOLVED);
                }).catch((error) => {
                    setError(error.message);
                    setStatus(STATUS.REJECTED);
                })
        }, 1000)
    }, [status])

    const onSubmit = (value) => {
        setImgs([]);
        setStatus(STATUS.PENDING);

        searchImages.query = value;
        searchImages.page = 1;
    }

    const onClick = () => {
        searchImages.page += 1;

        setStatus(STATUS.PENDING);
    }

    return <AppContainer>
        <Searchbar onSubmit={onSubmit} />
        {(status === STATUS.RESOLVED || status === STATUS.PENDING) && <ImageGallery galleryItems={imgs}/>}
        {(status === STATUS.PENDING) && <Loader></Loader>}
        {(status === STATUS.REJECTED) && <Error msg={error ? 'Oops, something went wrong' : noResultsMsg}></Error>}
        {showBtn && <Button onClick={onClick}></Button>}
    </AppContainer>
}