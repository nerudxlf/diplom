import React, {useEffect, useState} from 'react';
import {Paper, Typography} from "@mui/material";
import ArticleElement from "./ArticleElement";

const ArticleConfirmation = (props) => {
    const [unverifiedArticles, setUnverifiedArticles] = useState();
    const getUnverifiedArticles = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + props.token,
            },
        };
        const response = await fetch('/api/operator/articles', requestOptions);
        const answer = await response.json();
        if (response.ok) {
            setUnverifiedArticles(answer);
        }
    }

    useEffect(() => {
        getUnverifiedArticles();
    }, [])

    return (
        <Paper elevation={4} sx={{mt: 1}}>
            {unverifiedArticles ? (
                unverifiedArticles.map((item) => (
                    <ArticleElement item={item} token={props.token}/>
                ))
            ):(
                <Paper elevation={0} sx={{p: 2}}>
                    <Typography variant="h5">Все публикации подтверждены</Typography>
                </Paper>
            )}
        </Paper>
    );
};

export default ArticleConfirmation;