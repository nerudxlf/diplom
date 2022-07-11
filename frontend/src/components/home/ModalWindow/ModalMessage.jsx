import React from 'react';
import {Box, IconButton, Modal, Paper, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const ModalMessage = (props) => {
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
                }}>
                    <Paper elevation={0} sx={{
                        display: "flex",
                        flexDirection: 'row-reverse'
                    }}>
                        <IconButton onClick={()=>props.onClose()}><CloseIcon/></IconButton>
                    </Paper>
                    <Paper elevation={0}
                        sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <Typography variant="h6" sx={{ color: "success.main", textAlign: "center"}}>{props.message}</Typography>
                    </Paper>
                </Paper>
            </Box>
        </Modal>
    );
};

export default ModalMessage;