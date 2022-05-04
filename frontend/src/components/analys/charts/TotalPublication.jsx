import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

const TotalPublication = (props) => {
    const {token} = props;
    const [valuesByLast5thYears, setValuesByLast5thYears] = useState()
    const getValuesByLast5thYears = async () => {
        const requestOption = {
            method: "GET",
            headers: {
                "Content-Type": "applications/json",
                Authorization: "Bearer " + token,
            },
        };
        const response = await fetch('/api/analyst/count/publications_by_year/?years_range=5', requestOption);
        const data = await response.json();
        if (response.ok) {
            setValuesByLast5thYears(data);
        }
    }

    useEffect(() => {
        getValuesByLast5thYears();
    }, []);

    return (
        <>
            <Typography variant="h6" sx={{textAlign: "center"}}>Общее число публикаций по годам</Typography>
            <LineChart width={512} height={300} data={valuesByLast5thYears} margin={{top: 20}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="value" stroke="#82ca9d"/>
            </LineChart>
        </>
    )
        ;
};

export default TotalPublication;