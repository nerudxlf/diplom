import React, {useContext, useEffect, useState} from 'react';
import {Box, Grid, Paper, Typography} from "@mui/material";
import {Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {UserContext} from "../../context/UserContext";
import TotalPublication from "./charts/TotalPublication";
import PublicationByDocumentType from "./charts/PublicationByDocumentType";


const AnalysisBase = () => {
    const [publication, setPublications] = useState(0);
    const [token] = useContext(UserContext);
    const [authors, setAuthors] = useState(0);

    const getAuthors = async () => {
        const requestOption = {
            method: "GET",
            headers: {
                "Content-Type": "applications/json",
                Authorization: "Bearer " + token,
            },
        };
        const response = await fetch('/api/analyst/authors/number/', requestOption);
        const data = await response.json();
        if (response.ok) {
            setAuthors(data);
        }
    }

    const getPublications = async () => {
        const requestOption = {
            method: "GET",
            headers: {
                "Content-Type": "applications/json",
                Authorization: "Bearer " + token,
            },
        };
        const response = await fetch('/api/analyst/count/publications', requestOption);
        const data = await response.json();
        if (response.ok) {
            setPublications(data);
        }
    }

    useEffect(() => {
        getPublications();
    }, []);

    useEffect(() => {
        getAuthors();
    }, []);


    return (
        <Box>
            <Grid container spacing={1} sx={{
                mt: 1,
            }}>
                <Grid item sm={12} md={6} xl={6}>
                    <Paper elevation={6} sx={{
                        width: 5 / 6,
                        p: 2,

                    }}>
                        <Typography variant="h5">Основная информация по публикациям</Typography>
                        <Paper elevation={0}
                               sx={{
                                   display: "flex",
                                   flexDirection: 'row',
                                   justifyContent: 'space-between',
                                   mt: 2
                               }}
                        >
                            <Paper elevation={0}>
                                <Typography variant="body1" component="div">
                                    Всего публикаций
                                </Typography>
                                <Typography variant="h6" component="div" sx={{textAlign: "center"}}>
                                    {publication.all_publication ? (publication.all_publication) : ("Нет данных")}
                                </Typography>
                            </Paper>
                            <Paper elevation={0}>
                                <Typography variant="body1" component="div">
                                    Article
                                </Typography>
                                <Typography variant="h6" component="div" sx={{textAlign: "center"}}>
                                    {publication.article ? (publication.article) : ("Нет данных")}
                                </Typography>
                            </Paper>
                            <Paper elevation={0}>
                                <Typography variant="body1" component="div">
                                    Review
                                </Typography>
                                <Typography variant="h6" component="div" sx={{textAlign: "center"}}>
                                    {publication.review ? (publication.review) : ("Нет данных")}
                                </Typography>
                            </Paper>
                        </Paper>
                    </Paper>
                </Grid>
                <Grid item sm={12} md={6} xl={6}>
                    <Paper elevation={6} sx={{
                        width: 5 / 6,
                        p: 2,
                    }}>
                        <Typography variant="h5">Основная информация по авторам</Typography>
                        <Paper elevation={0} sx={{
                            display: "flex",
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            mt: 2
                        }}>
                            <Paper elevation={0}>
                                <Typography variant="body1" component="div">
                                    Авторов
                                </Typography>
                                <Typography variant="h6" component="div" sx={{textAlign: "center"}}>
                                    {authors}
                                </Typography>
                            </Paper>
                            <Paper elevation={0}>
                                <Typography variant="body1" component="div">
                                    Публикаций на атвора
                                </Typography>
                                <Typography variant="h6" component="div" sx={{textAlign: "center"}}>
                                    {(publication.all_publication ? (publication.all_publication) : (0)) / authors}
                                </Typography>
                            </Paper>
                        </Paper>
                    </Paper>
                </Grid>
                <Grid item sm={12} md={6} xl={6}>
                    <PublicationByDocumentType token={token}/>
                </Grid>
                <Grid item sm={12} md={6} xl={6}>
                    <TotalPublication token={token}/>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AnalysisBase;