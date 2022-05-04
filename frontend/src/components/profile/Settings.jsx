import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Button, Paper, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

const Settings = () => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="h4">Настройки</Typography>

            </AccordionSummary>
            <AccordionDetails>
                <Paper sx={{display: "flex", flexDirection: 'row-reverse'}} elevation={0}>
                <Button component="span" size="small" startIcon={<AddIcon/>}
                        variant="outlined" sx={{mt: 3}}>Настройки</Button>
                </Paper>
            </AccordionDetails>
        </Accordion>
    );
};

export default Settings;