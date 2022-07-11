import React, {useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Button, Paper, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PasswordIcon from '@mui/icons-material/Password';
import ModalPasswordChange from "./ModalWindows/ModalPasswordChange";



const Password = (props) => {
    const {token} = props;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <ModalPasswordChange token={token}  open={open} onClose={handleClose}/>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h4">Пароли</Typography>

                </AccordionSummary>
                <AccordionDetails>
                    <Paper sx={{display: "flex", flexDirection: 'row-reverse'}} elevation={0}>
                        <Button component="span" size="small" startIcon={<PasswordIcon/>}
                                variant="outlined" sx={{mt: 1}} onClick={handleOpen}>Сменить пароль</Button>
                    </Paper>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default Password;