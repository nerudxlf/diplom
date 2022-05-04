import React, {useState} from 'react';
import {Button, Paper, Typography} from "@mui/material";
import ModalArticleConfirmation from "./ModalWindow/ModalArticleConfirmation";
import ModalRejectArticle from "./ModalWindow/ModalRejectArticle";

const ArticleElement = (props) => {
    const {item, token} = props;
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [openNotConfirmation, setOpenNotConfirmation] = useState(false);
    const handleOpenConfirmation = () => {
        setOpenConfirmation(true);
    }
    const handleCloseConfirmation = () => setOpenConfirmation(false);
    const handleOpenNotConfirmation = () => setOpenNotConfirmation(true);
    const handleCloseNotConfirmation = () => setOpenNotConfirmation(false);
    return (
        <>
            <ModalArticleConfirmation token={token} unverifieArticle={item.article_id} authorid={item.author_id}
                                      name={item.name} open={openConfirmation} onClose={handleCloseConfirmation}/>
            <ModalRejectArticle token={token} unverifieArticle={item.article_id} open={openNotConfirmation}
                                onClose={handleCloseNotConfirmation}/>
            <Paper elevation={0} square sx={{
                p: 2,
                display: "flex",
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottom: 1,
            }}>
                <Paper elevation={0}>
                    <Typography variant="h6">{item?.name}</Typography>
                    <Typography variant="body2">{item?.link}</Typography>
                    <Typography variant="body2" component="span">{item?.email} </Typography>
                    <Typography variant="body2" component="span"> {item?.phone}</Typography>
                </Paper>
                <Paper elevation={0} sx={{display: "flex", flexDirection: "column"}}>
                    <Button color="success" variant="contained" size="small"
                            onClick={handleOpenConfirmation}>Принять</Button>
                    <Button color="error" variant="outlined" size="small" sx={{mt: 1}}
                            onClick={handleOpenNotConfirmation}>Отклонить</Button>
                </Paper>
            </Paper>
        </>
    );
};

export default ArticleElement;