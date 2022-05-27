import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";

const PublicationByDocumentType = (props) => {
    const [data, setData] = useState();
    const getData = async () => {
        const requestOption = {
            method: "GET",
            headers: {
                "Content-Type": "applications/json",
                Authorization: "Bearer " + token,
            },
        };
        const response = await fetch('/api/analyst/count/publications_by_type/', requestOption);
        const data = await response.json();
        if (response.ok) {
            setData(data);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const {token} = props;
    return (
        <>
            <Typography variant="h6" sx={{textAlign: "center"}}>По типам документов</Typography>
            <BarChart width={512} height={300} data={data} margin={{top: 20}}>
                <CartesianGrid strokeDasharray="5 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="value" fill="#82ca9d"/>
            </BarChart>
        </>
    );
};

export default PublicationByDocumentType;