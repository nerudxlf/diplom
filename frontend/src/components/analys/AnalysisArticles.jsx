import React, {useContext, useEffect, useState} from 'react';
import {Box, Grid, LinearProgress} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {UserContext} from "../../context/UserContext";

const AnalysisArticles = () => {
    const [token] = useContext(UserContext);
    const [articles, setArticles] = useState();

    const getArticles = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "applications/json",
                Authorization: "Bearer " + token,
            },
        };
        const response = await fetch('/api/analyst/articles/', requestOptions);
        const answer = await response.json()
        if (response.ok) {
            setArticles(answer);
        }
    }
    useEffect(() => {
        getArticles();
    }, []);

    const columns = [
        {field: "id", headerName: "ID",},
        {field: "title", headerName: "Название"},
        {field: "doi", headerName: "doi"},
        {field: "link", headerName: "Link"},
        {field: "sjr", headerName: "SJR"},
        {field: "jif", headerName: "JIF"},
        {field: "snip", headerName: "SNIP"},
        {field: "csp", headerName: "CSP"},
        {field: "isVak", headerName: "ВАК"},
        {field: "date", headerName: "Дата"},
    ];


    return (
        <Box>
            <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
                <div style={{height: 800, width: '100%'}}>
                    <DataGrid components={{
                        Toolbar: GridToolbar,
                        LoadingOverlay: LinearProgress,
                    }}
                              rows={articles}
                              columns={columns}
                              rowsPerPageOptions={[10]}
                              checkboxSelection/>

                </div>
            </Grid>
        </Box>
    );
};

export default AnalysisArticles;