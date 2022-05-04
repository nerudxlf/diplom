import React, {useContext, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Button, Paper, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from '@mui/icons-material/Add';
import ModalArticle from "./ModalWindows/ModalArticle";
import {UserContext} from "../../context/UserContext";
import TabsMenu from "../TabsMenu";
import ProfileUnverifiedArticles from "./ProfileUnverifiedArticles";
import ProfileConfirmArticle from "./ProfiveConfirmArticle";

const ProfileArticles = () => {
    const [token,] = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const listName = [
        {
            index: 0,
            name: "Принятые статьи",
        },
        {
            index: 1,
            name: "Не принятые статьи",
        },
    ];

    const listItem = [
        {
            index: 0,
            element: <ProfileConfirmArticle token={token}/>,
        },
        {
            index: 1,
            element: <ProfileUnverifiedArticles token={token}/>,
        },
    ]

    return (
        <>
            <ModalArticle token={token} open={open} onClose={handleClose}/>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h4">Статьи</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TabsMenu listName={listName} listItem={listItem}/>
                    <Paper sx={{display: "flex", flexDirection: 'row-reverse'}} elevation={0}>
                    <Button component="span" size="small" startIcon={<AddIcon/>}
                            variant="outlined" sx={{mt: 2}} onClick={handleOpen}>Добавить статью</Button>
                    </Paper>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default ProfileArticles;