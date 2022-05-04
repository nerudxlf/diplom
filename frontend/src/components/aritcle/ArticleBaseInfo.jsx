import React from 'react';
import {Link, Paper, Typography} from "@mui/material";

const ArticleBaseInfo = (props) => {
    const {title, source, authors, link, publicationDate, documentType} = props
    return (
        <Paper elevation={8} sx={{
            p: 2
        }}>
            <Paper elevation={0} sx={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <Paper elevation={0}>
                    <Typography variant="body2" component="span"
                                sx={{textTransform: "lowercase"}}>Источник: {source}</Typography>
                    <Typography variant="body2" component="span"> год публикации: {publicationDate}</Typography>
                </Paper>
                <Paper elevation={0} sx={{textTransform: "capitalize"}}><Typography variant="body2">{documentType}</Typography></Paper>
            </Paper>

            <Typography variant="h6" sx={{textTransform: "capitalize"}}>{title}</Typography>
            <Typography variant="body1">{authors}</Typography>
            <Link href={link} sx={{textDecoration: "None"}}><Typography variant="body1">Открыть</Typography></Link>

        </Paper>
    );
};

export default ArticleBaseInfo;