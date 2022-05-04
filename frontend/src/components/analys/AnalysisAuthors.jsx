import React, {useContext, useEffect, useState} from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import {Box, Grid, LinearProgress} from "@mui/material";
import {UserContext} from "../../context/UserContext";


const AnalysisAuthors = () => {
    const [token] = useContext(UserContext);
    const [authors, setAuthors] = useState();

    const getAuthors = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "applications/json",
                Authorization: "Bearer " + token,
            },
        };
        const response = await fetch('/api/analyst/authors/', requestOptions);
        const answer = await response.json()
        if (response.ok) {
            setAuthors(answer);
        }
    }

    useEffect(() => {
        getAuthors();
    }, []);

    const columns = [
        {field: "id", headerName: "ID",},
        {field: "name", headerName: "ФИО"},
        {field: "email", headerName: "Email"},
        {field: "department", headerName: "Кафедра"},
        {field: "publication", headerName: "Публикаций"},
        {field: "article", headerName: "Article"},
        {field: "review", headerName: "Review"},
    ];

    return (
        <Box>
            <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
                <div style={{height: 400, width: '100%'}}>
                    <DataGrid components={{
                        Toolbar: GridToolbar,
                        LoadingOverlay: LinearProgress,
                    }} rows={authors} columns={columns} pageSize={8}
                              checkboxSelection/>
                </div>
            </Grid>
        </Box>

    );
};

export default AnalysisAuthors;