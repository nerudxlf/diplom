import React, {useEffect, useState} from 'react';
import {Paper, Typography} from "@mui/material";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

const ResearcherMetricsInfo = (props) => {
    const {id} = props;
    const [basicMetrics, setBasicMetrics] = useState();
    const [summaryMetrics, setSummaryMetrics] = useState();

    const getBasicMetrics = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(`/api/users/${id}/statistic/basic/`, requestOptions);
        const answer = await response.json();
        if (response.ok){
            setBasicMetrics(answer);
        }
    }

    useEffect(() => {
        getBasicMetrics();
    }, []);

    const getSummaryMetrics = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(`/api/users/${id}/statistic/summary/`, requestOptions);
        const answer = await response.json();
        if (response.ok){
            setSummaryMetrics(answer);
        }
    }

    useEffect(() => {
        getSummaryMetrics();
    }, []);

    return (
        <>
            <Paper elevation={4} sx={{mt: 1}}>
                <Paper elevation={0} sx={{p:2}}>
                    <Typography variant="h6" sx={{textAlign: "center"}}>Основная статистика</Typography>
                </Paper>
                <Paper elevation={0} sx={{
                    display: 'flex',
                    p: 1,
                    justifyContent: 'space-evenly'
                }}>
                    <Paper elevation={0}>
                        <Typography variant="body1">Публикаций</Typography>
                        <Typography variant="h6" sx={{textAlign: 'center'}}>{basicMetrics?.publication}</Typography>
                    </Paper>
                    <Paper elevation={0}>
                        <Typography variant="body1">Article</Typography>
                        <Typography variant="h6" sx={{textAlign: 'center'}}>{basicMetrics?.article}</Typography>
                    </Paper>
                    <Paper elevation={0}>
                        <Typography variant="body1">Review</Typography>
                        <Typography variant="h6" sx={{textAlign: 'center'}}>{basicMetrics?.review}</Typography>
                    </Paper>
                </Paper>
                <Paper elevation={0} sx={{display: "flex", justifyContent: "center", p: 1}}>
                    <Paper elevation={0}>
                    <Typography variant="h6" sx={{textAlign: "center"}}>Общее число публикаций по годам</Typography>
                    <LineChart width={512} height={300} data={summaryMetrics} margin={{top: 20}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Line type="monotone" dataKey="Публикаций" stroke="#82ca9d"/>
                    </LineChart>
                    </Paper>
                </Paper>
            </Paper>
        </>
    );
};

export default ResearcherMetricsInfo;