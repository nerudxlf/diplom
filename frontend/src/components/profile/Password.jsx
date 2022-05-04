import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Button, Paper, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PasswordIcon from '@mui/icons-material/Password';

const Password = () => {
    return (
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
                        variant="outlined" sx={{mt: 1}}>Сменить пароль</Button>
                </Paper>
            </AccordionDetails>
        </Accordion>
    );
};

export default Password;