import React, {forwardRef, useState} from 'react';
import {TextField} from "@mui/material";

const PrimaryInputSelect = forwardRef((props, ref) => {
    const [data, setData] = useState();
    const handleChange = (event) => {
        setData(event.target.value);
    }
    return (
        <TextField
            select
            value={data}
            inputRef={ref}
            SelectProps={{
                native: true,
            }}
            onChange={handleChange}
            {...props}
        >
            {props?.dataset.map((option) => (
                <option value={option.value} key={option.value}>
                    {option.value}
                </option>
            ))}
        </TextField>
    )
})


export default PrimaryInputSelect;