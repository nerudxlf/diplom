import React, {useContext, useEffect, useState} from 'react';
import {Box, Grid, Paper, Typography} from "@mui/material";
import {Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {UserContext} from "../../context/UserContext";
import TotalPublication from "./charts/TotalPublication";


const data = [
    {
        "name": "Факультет 1",
        "uv": 200
    },
    {
        "name": "Факультет 2",
        "uv": 300
    },
    {
        "name": "Факультет 3",
        "uv": 400
    },
    {
        "name": "Факультет 4",
        "uv": 500
    }
]


const AnalysisBase = () => {
    const [publication, setPublications] = useState(0);
    const [token] = useContext(UserContext);

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
                                    1020
                                </Typography>
                            </Paper>
                            <Paper elevation={0}>
                                <Typography variant="body1" component="div">
                                    Публикаций на атвора
                                </Typography>
                                <Typography variant="h6" component="div" sx={{textAlign: "center"}}>
                                    1.4
                                </Typography>
                            </Paper>
                        </Paper>
                    </Paper>
                </Grid>
                <Grid item sm={12} md={6} xl={6}>
                    <Typography variant="h6" sx={{textAlign: "center"}}>По кафедрам</Typography>
                    <BarChart width={512} height={300} data={data} margin={{top: 20}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="uv" fill="#82ca9d"/>
                    </BarChart>
                </Grid>
                <Grid item sm={12} md={6} xl={6}>
                    <TotalPublication token={token}/>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AnalysisBase;