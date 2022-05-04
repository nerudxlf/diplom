import React, {useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";
import {Button, Paper, Typography} from "@mui/material";
import {Link} from "react-router-dom";


const ProfileConfirmArticle = (props) => {
    const [articles, setArticles] = useState({data: [], value: 0});
    const {token} = props;

    const getArticles = async () => {
        const id = jwt_decode(token).user_id;
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        };
        const response = await fetch(`/api/users/${id}/articles`, requestOptions);
        const answer = await response.json();
        if (response.ok) {
            setArticles(answer)
        }
    }

    const deleteArticle = async (articleId) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };
        const response = await fetch(`/api/users/articles/`+articleId, requestOptions);
        const answer = await response.json();
        if (response.ok) {
            setArticles(answer)
        }
    }


    useEffect(() => {
        getArticles();
    }, [])
    return (
        <Paper elevation={0} sx={{mt: 0}}>
            <Paper elevation={0} sx={{pl: 2, pb: 2, pr: 2}}>
                {articles.data.length !== 0 ? (
                    articles.data?.map((article) => (
                        <Paper elevation={6} sx={{mt: 1, p: 2}}>
                            <Paper elevation={0} sx={{borderBottom: 1}} square>
                                <Typography sx={{textTransform: "capitalize"}}
                                            variant="body1" component="p">{article.title}</Typography>
                            </Paper>
                            <Paper elevation={0} sx={{
                                display: "flex",
                                flexDirection: 'row',
                                justifyContent: "space-between",
                                alignItems: 'flex-end',
                                mt: 1
                            }}>
                                <Paper elevation={0}>
                                    <Typography variant="body2">{article.authors}</Typography>
                                    <Typography variant="body2">Источник: {article.source}</Typography>
                                    <Typography variant="body2">Год: {article.publication_date}</Typography>
                                </Paper>
                                <Paper elevation={0} sx={{
                                    display: "flex",
                                    flexDirection: 'column'
                                }}>
                                    <Button variant="outlined" color="error" size="small" sx={{mb: 1}} onClick={()=>deleteArticle(article.article_id)}>Удалить</Button>
                                    <Link to={"/article/" + article.article_id}>
                                        <Button variant="outlined" size="small">Открыть</Button>
                                    </Link>
                                </Paper>
                            </Paper>
                        </Paper>
                    ))
                ) : (
                    <Paper elevation={0} sx={{mt: 1}}>
                    <Typography>Нет данных</Typography>
                    </Paper>
                )}
            </Paper>
        </Paper>
    );
};

export default ProfileConfirmArticle;