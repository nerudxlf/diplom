import React, {useEffect, useState} from 'react';
import {Autocomplete, Box, Button, Modal, Paper, TextField, Typography} from "@mui/material";
import Form from "../../Form";


const ModalArticleConfirmation = (props) => {
    const [queryArticle, setQueryArticle] = useState("");
    const [articleId, setArticleId] = useState();
    const [articles, setArticles] = useState();
    const getArticleList = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(`/api/articles/names/?search=${queryArticle}`, requestOptions);
        const answer = await response.json();
        if (response.ok) {
            setArticles(answer);
        }
    }

    const addNewConfirmArticle = async () => {
        if (articleId) {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + props.token,
                },
            };
            const response = await fetch(`/api/operator/confirm_article/?author_id=${props.authorid}&article_id=${articleId}&unverified_article_id=${props.unverifieArticle}`, requestOptions);
            const answer = await response.json();
            if (response.ok) {
                console.log(answer)
            }
        }
    }

    useEffect(() => {
        getArticleList();
    }, [queryArticle]);

    return (
        <Modal {...props}>
            <Form>
                <Box sx={{
                    position: 'absolute',
                    top: '35%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}>
                    <Paper elevation={16} sx={{width: 712, pb: 4}}>
                        <Typography variant="h5" sx={{ml: 4, pt: 4}}>Подтверждение статьи</Typography>
                        <Paper elevation={0} sx={{
                            display: "flex",
                            flexDirection: "column",
                            ml: 4, mt: 1, mr: 4,
                        }}>
                            <Typography variant="body2">
                                Название статьи
                            </Typography>
                            <Autocomplete
                                id="title"
                                name="title"
                                size="small"
                                onInputChange={(e) => {
                                    setQueryArticle(e.target.value)
                                }}
                                onChange={(event, value) => setArticleId(value.id)}
                                options={articles}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        label="Статьи"
                                    />}
                                sx={{width: 1, mt: 1 / 2}}/>
                            <Typography variant="body1" sx={{mt: 2}}>
                                Автор {props.name}
                            </Typography>
                            <Button
                                variant="outlined"
                                color="success"
                                size="small"
                                onClick={() => addNewConfirmArticle()}
                                sx={{
                                    width: 1 / 4,
                                    mt: 1
                                }}
                            >Принять</Button>
                        </Paper>
                    </Paper>
                </Box>
            </Form>
        </Modal>
    );
};

export default ModalArticleConfirmation;