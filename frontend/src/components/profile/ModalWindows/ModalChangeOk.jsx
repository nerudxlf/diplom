import React from 'react';
import {Box, Paper, Typography} from "@mui/material";

const ModalChangeOk = () => {
    return (
        <Box sx={{
            position: "absolute",
            top: '35%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }}>
            <Paper elevation={16} sx={{
                width: 712,
                pb: 2
            }}>
                <Typography variant="h5" sx={{ml: 4, pt: 4}}>Пароль успешно изменен</Typography>
            </Paper>
        </Box>
    );
};

export default ModalChangeOk;