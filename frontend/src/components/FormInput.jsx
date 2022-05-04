import React, {forwardRef} from 'react';
import {TextField} from "@mui/material";

const FormInput = forwardRef((props, ref) => {
    return (
        <TextField
            variant={"standard"}
            margin="normal"
            inputRef={ref}
            sx={{m: 1, width: '40ch'}}
            {...props}
        />
    );
})

export default FormInput;