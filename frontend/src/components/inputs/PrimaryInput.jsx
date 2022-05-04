import React, {forwardRef} from 'react';
import {TextField} from "@mui/material";

const PrimaryInput = forwardRef((props, ref) => {
    return (
        <TextField
            inputRef={ref}
            {...props}
        />
    )
})

export default PrimaryInput;