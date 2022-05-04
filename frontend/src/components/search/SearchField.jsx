import React from 'react';
import {TextField} from "@mui/material";

const SearchField = (props) => {
    return (
        <TextField
            fullWidth
            label="Поиск"
            variant="standard"
            value={props.value}
            onChange={(event)=> props.data(event.target.value)}
        />
    );
};

export default SearchField;