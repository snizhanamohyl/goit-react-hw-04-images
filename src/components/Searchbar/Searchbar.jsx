import { useState } from "react";
import PropTypes from 'prop-types'; 
import { Notify } from "notiflix";
import { Search } from "react-bootstrap-icons";
import { SearchField, SearchForm, SearchFormBtn, SearchFormInput } from "./Searchbar.styled";

export default function Searchbar({ onSubmit }) {
    const [inputValue, setInputValue] = useState('');

    const onChange = ({ target }) => {
        setInputValue(target.value);
    }

    const onSubmitBtnClick = (e) => {
        e.preventDefault();

        if (!inputValue) { 
            Notify.info('Please, enter a search query') }
        else {
            setInputValue('');
            onSubmit(inputValue)}
    }

    return <SearchField className="searchbar">
            <SearchForm onSubmit={onSubmitBtnClick}>
                <SearchFormBtn type="submit">
                    <Search  size={16}/>
                </SearchFormBtn>

                <SearchFormInput
                className="input"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={inputValue}
                onChange={onChange}
                />
            </SearchForm>
        </SearchField>
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}