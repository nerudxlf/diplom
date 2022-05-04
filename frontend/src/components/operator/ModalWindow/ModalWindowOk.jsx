import React from 'react';
import {Box, Modal, Paper, Typography} from "@mui/material";

const ModalWindowOk = (props) => {
    return (
        <Modal {...props}>
            <Box sx={{
                    position: 'absolute',
                    top: '35%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'}}>
                <Paper elevation={16} sx={{
                    width: "328px",
                    height: "128px",
                    display: "flex",
                    justifyItems: "center",
                    justifyContent: "center"
                }}>
                    <Typography variant="h6" sx={{mt: 6, color: "success.main"}}>ПУБЛИКАЦИЯ ДОБАВЛЕНА</Typography>
                </Paper>
            </Box>
        </Modal>
    );
};

export default ModalWindowOk;