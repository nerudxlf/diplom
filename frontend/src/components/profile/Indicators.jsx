import React, {useEffect, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Typography, Paper, Button} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import ModalIndicators from "./ModalWindows/ModalIndicators";
import jwt_decode from "jwt-decode";


const Indicators = (props) => {
    const {token} = props;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [indicators, setIndicators] = useState()

    const getIndicators = async () => {
        const userId = jwt_decode(token).user_id;
        const requestOption = {
            method: "GET",
            headers: {
                "Content-Type": "applications/json",
            },
        };
        const response = await fetch('/api/users/' + userId + '/indicators', requestOption);
        const data = await response.json();
        if (response.ok) {
            setIndicators(data);
        }
    }

    useEffect(() => {
        getIndicators();
    }, []);

    return (
        <>
            <ModalIndicators token={token} indicators={indicators ? (indicators):null} open={open} onClose={handleClose}/>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h4">Индетификаторы</Typography>

                </AccordionSummary>
                <AccordionDetails>
                    <Paper elevation={0} sx={{
                        m: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        <Paper elevation={0} sx={{width: 1 / 5}}
                        >
                            <Typography variant="h6" sx={{textAlign: "center"}}>WoS</Typography>
                            {indicators ?
                                (
                                    <Typography variant="body2" sx={{textAlign: "center"}}>
                                        {indicators.wos ? (indicators.wos) : ("Нет данных")}
                                    </Typography>)
                                : (<></>)
                            }
                        </Paper>
                        <Paper elevation={0} sx={{width: 1 / 5}}
                        >
                            <Typography variant="h6" sx={{textAlign: "center"}}>Scopus</Typography>
                            {indicators ?
                                (
                                    <Typography variant="body2" sx={{textAlign: "center"}}>
                                        {indicators.scopus ? (indicators.scopus) : ("Нет данных")}
                                    </Typography>)
                                : (<></>)
                            }
                        </Paper>
                        <Paper elevation={0} sx={{width: 1 / 5}}
                        >
                            <Typography variant="h6" sx={{textAlign: "center"}}>ORCID</Typography>
                            {indicators ?
                                (
                                    <Typography variant="body2" sx={{textAlign: "center"}}>
                                        {indicators.orcid ? (indicators.orcid) : ("Нет данных")}
                                    </Typography>)
                                : (<></>)
                            }
                        </Paper>
                        <Paper elevation={0} sx={{width: 1 / 5}}
                        >
                            <Typography variant="h6" sx={{textAlign: "center"}}>Publons</Typography>
                            {indicators ?
                                (
                                    <Typography variant="body2" sx={{textAlign: "center"}}>
                                        {indicators.publons ? (indicators.publons) : ("Нет данных")}
                                    </Typography>)
                                : (<></>)
                            }
                        </Paper>
                        <Paper elevation={0} sx={{width: 1 / 5}}
                        >
                            <Typography variant="h6" sx={{textAlign: "center"}}>Elibrary</Typography>
                            {indicators ?
                                (
                                    <Typography variant="body2" sx={{textAlign: "center"}}>
                                        {indicators.elibrary ? (indicators.elibrary) : ("Нет данных")}
                                    </Typography>)
                                : (<></>)
                            }
                        </Paper>
                    </Paper>
                    <Paper sx={{display: "flex", flexDirection: 'row-reverse'}} elevation={0}>
                    <Button component="span" size="small" startIcon={<SettingsIcon/>}
                            variant="outlined" sx={{mt: 3}} onClick={handleOpen}>Редактировать</Button>
                    </Paper>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default Indicators;