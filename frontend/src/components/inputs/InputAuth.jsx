import React, {forwardRef} from 'react';
import {TextField} from "@mui/material";

const InputAuth = forwardRef((props, ref) => {
    return (
        <TextField
            variant="standard"
            margin="normal"
            inputRef={ref}
            sx={{m: 1, width: '34ch'}}
            {...props}
        />
    )
})

export default InputAuth;