import React from 'react';
import {
    TextField
} from '@mui/material'

const Search = (props) => {
    const { onChange, value } = props;

    return <TextField 
        type='search' 
        label="Search.." 
        variant='standard'
        fullWidth
        sx={{mb: '2rem'}}
        value={value} 
        onChange={onChange} />;
};

export default Search;