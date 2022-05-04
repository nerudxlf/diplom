import React, {forwardRef} from 'react';
import {TextField} from "@mui/material";

const InputUpdateBasicInfo = forwardRef((props, ref) => {
    return (
        <TextField
            variant="standard"
            inputRef={ref}
            sx={{ width: '28ch'}}
            {...props}
        />
    )
})

export default InputUpdateBasicInfo;