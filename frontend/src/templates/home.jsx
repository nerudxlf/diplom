import React, {useContext, useEffect, useState} from 'react';
import {Button, CircularProgress, Container, Grid, Pagination, PaginationItem, Paper, Typography} from "@mui/material";
import SearchCategory from "../components/search/SearchCategory";
import SearchField from "../components/search/SearchField";
import {Link, NavLink, useLocation} from "react-router-dom";
import {UserContext} from "../context/UserContext";
import ModalMessage from "../components/home/ModalWindow/ModalMessage";

const Home = () => {
    const [token] = useContext(UserContext);
    const [open, setOpen] = useState(false);
    let location = useLocation();
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [publicationType, setPublicationType] = useState("");
    const [keyWords, setKeyWords] = useState("");
    const [authors, setAuthors] = useState("");
    const [page, setPage] = useState(parseInt(location.search.split('=')[1]||1));
    const [query, setQuery] = useState("");
    const [articles, setArticles] = useState();
    const [value, setValue] = useState(0);
    const [messageError, setMessageError] = useState(null);
    const handleClose = () => {
        setMessageError(null);
        setOpen(false);
    };
    const handleOpen = () => setOpen(true);
    const getArticles = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(`/api/articles?page=${page - 1}&limit=20&publication_type=${publicationType}&key_words=${keyWords}&start=${start}&end=${end}&author=${authors}&search=${query}`, requestOptions);
        const answer = await response.json();
        if (response.ok) {
            setArticles(answer.articles);
            setValue(answer.value);
        }
    };

    const addArticle = async (id) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            }
        }
        const response = await fetch('/api/users/unverified_articles/'+id, requestOptions);
        if (response.status===400){
            setMessageError("Публикаций на проверке больше 5");
        }
        else if (response.status===404){
            setMessageError("Публикация не найдена");
        }
        else if (response.status===409){
            setMessageError("Публикация уже на проверке или добавлена");
        }
        else if (response.ok){
            setMessageError("Публикация добавлена");
        }
    }

    useEffect(() => {
        getArticles();
    }, [query, page, start, end, keyWords, authors, publicationType]);

    return (
        <>
            {messageError ? (<ModalMessage open={handleOpen}
                                           onClose={handleClose} message={messageError}/>) : (<></>)}
            <Container maxWidth="xl" className="content">
                <Grid container spacing={0} sx={{mt: '5rem'}}>
                    <Grid md={12} xs={12} sm={12} lg={12} xl={12}>
                        <SearchField value={query} data={setQuery}/>
                    </Grid>
                    <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
                        <SearchCategory start={setStart} end={setEnd} publicationType={setPublicationType}
                                        keyWords={setKeyWords} authors={setAuthors}/>
                    </Grid>
                    <Grid item md={12} xs={12} sm={12} lg={12} xl={12} sx={{mt: 1}}>
                        {articles ? (
                            articles.map((article) => (
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
                                    </Paper>
                                    <Paper elevation={0} sx={{
                                        mt: 1,
                                        display: "flex",
                                        justifyContent: "space-between"

                                    }}>
                                        <Link to={"/article/" + article.article_id} style={{ textDecoration: 'none'}}>
                                            <Button variant="outlined" size="small">Открыть</Button>
                                        </Link>
                                        {token ? (
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="success"
                                                onClick={()=>{addArticle(article.article_id)}}
                                            >Добавить себе</Button>
                                        ): (<></>)}
                                    </Paper>
                                </Paper>
                            ))
                        ) : (
                            <Paper elevation={0} sx={{
                                display: "flex",
                                width: 1,
                                mt: 4,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'inherit'
                            }}>
                                <CircularProgress />
                            </Paper>)}
                    </Grid>
                    {value && articles ? (
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{mt: '2rem', mb: '2rem'}}
                        >

                            <Pagination
                                count={value}
                                page={page}
                                onChange={(_, num) => setPage(num)}
                                showFirstButton
                                showLastButton
                                renderItem={(item) => (
                                    <PaginationItem
                                        component={NavLink}
                                        to={`?page=${item.page}`}
                                        {...item}
                                    />
                                )}
                            />
                        </Grid>
                    ) : (<></>)}
                </Grid>
            </Container>

        </>
    );
};

export default Home;