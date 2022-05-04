import React, {useContext, useEffect, useState} from 'react';
import {Link, Navigate, useParams} from "react-router-dom";
import {Button, Container, Grid, Paper} from "@mui/material";
import ArticleBaseInfo from "../components/aritcle/ArticleBaseInfo";
import ArticleOtherInfo from "../components/aritcle/ArticleOtherInfo";
import {UserContext} from "../context/UserContext";
import jwt_decode from "jwt-decode";

const Article = () => {
    const {id} = useParams();
    const [article, setArticle] = useState();
    const getArticle = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "applications/json",
            },
        }
        const response = await fetch('/api/articles/' + id, requestOptions);
        const answer = await response.json();
        if (response.ok) {
            setArticle(answer);
        }
    }

    const deleteArticle = async () => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "applications/json",
                Authorization: "Bearer " + token,
            },
        };
        const response = await fetch('/api/articles/' + id, requestOptions)
        if (response.ok){
            return <Navigate to="/"/>
        }

    }

    const [token,] = useContext(UserContext);
    let userRole = 0;
    let tokenData = null;
    try {
        tokenData = jwt_decode(token);
    } catch (err) {
        tokenData = false;
    }
    if (tokenData) {
        userRole = tokenData?.role_id;
    }

    useEffect(() => {
        getArticle();
    }, []);
    return (

        <Container maxWidth="md" className="content">
            <Grid container spacing={1} sx={{mt: '5rem'}}>
                {article ? (
                        <>
                            {userRole === 3 ? (<Grid item md={12} xs={12} sm={12}>
                                <Paper elevation={6} sx={{
                                    p: 1,
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}>
                                    <Button size="small" variant="outlined">
                                        <Link to={`/article/${id}/change`}>Редактировать данные</Link>
                                    </Button>
                                    <Button size="small" variant="outlined" color="error" onClick={(e)=>deleteArticle()}>Удалить</Button>
                                </Paper>
                            </Grid>) : (<></>)}

                            <Grid item md={12} xs={12} sm={12}>
                                <ArticleBaseInfo
                                    title={article?.base.title}
                                    source={article?.base.source}
                                    publicationDate={article?.base.publication_date}
                                    link={article?.base.link}
                                    authors={article?.base.authors}
                                    documentType={article?.type}
                                />
                            </Grid>
                            <Grid item md={12} xs={12} sm={12}>
                                <ArticleOtherInfo
                                    doi={article?.information.doi}
                                    keyWords={article?.information.key_words}
                                    annotation={article?.information.annotation}
                                    isVak={article?.information.isVak}
                                    affiliation={article?.information.affiliation}
                                />
                            </Grid>
                        </>
                    )
                    : (<></>)}
            </Grid>
        </Container>
    );
};

export default Article;