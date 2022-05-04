import React from 'react';
import {Paper, Typography} from "@mui/material";

const ArticleOtherInfo = (props) => {
    const {doi, annotation, edn, isVak, affiliation, keyWords} = props;

    return (
        <Paper elevation={6} sx={{mt: 1, pl: 2, pt: 1, pb: 1, pr: 2, mb: 3}}>
            <Paper elevation={0} square sx={{
                display: "flex",
                justifyContent: 'space-evenly',
                pb: 1,
                borderBottom: 1
            }}>
                <Paper elevation={0}>
                    <Typography variant="body1" sx={{textAlign: "center"}}>DOI</Typography>
                    <Typography variant="body2" sx={{textAlign: "center"}}>
                        {doi ? (doi) : ("Нет данных")}
                    </Typography>
                </Paper>
                <Paper elevation={0}>
                    <Typography variant="body1" sx={{textAlign: "center"}}>EDN</Typography>
                    <Typography variant="body2" sx={{textAlign: "center"}}>
                        {edn ? (edn) : ("Нет данных")}
                    </Typography>
                </Paper>
                <Paper elevation={0}>
                    <Typography variant="body1" sx={{textAlign: "center"}}>Входит в ВАК</Typography>
                    <Typography variant="body2" sx={{textAlign: "center"}}>
                        {isVak ? ("Да") : ("Нет")}
                    </Typography>
                </Paper>
            </Paper>
            <Paper elevation={0} sx={{mt:1}}>
                <Typography variant="body2" sx={{textAlign: "center"}}>Ключевые слова</Typography>
                {keyWords ? (
                    <Typography variant="body2" sx={{textAlign: "center"}}>{keyWords}</Typography>
                ) : (
                    <Typography variant="body2" sx={{textAlign: "center"}}>Нет данных</Typography>
                )}
            </Paper>
            <Paper elevation={0} sx={{mt:1}}>
                <Typography variant="body2" sx={{textAlign: "center"}}>АННОТАЦИЯ</Typography>
                {annotation ? (
                    <Typography variant="body2">{annotation}</Typography>
                ) : (
                    <Typography variant="body2" sx={{textAlign: "center"}}>Нет данных</Typography>
                )}

            </Paper>
        </Paper>
    );
};

export default ArticleOtherInfo;