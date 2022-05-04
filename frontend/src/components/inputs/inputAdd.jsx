import React, {forwardRef} from 'react';
import {TextField} from "@mui/material";

const InputAdd = forwardRef((props, ref) => {
    return (
        <TextField
            size="small"
            variant="outlined"
            inputRef={ref}
            sx={{m: 1, width: '32ch'}}
            {...props}
        />
    )
})

export default InputAdd;