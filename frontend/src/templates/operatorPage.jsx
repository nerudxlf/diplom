import React, {useContext} from 'react';
import {Container, Grid} from "@mui/material";
import TabsMenu from "../components/TabsMenu";
import ArticleConfirmation from "../components/operator/ArticleConfirmation";
import {UserContext} from "../context/UserContext";
import AddingArticle from "../components/operator/AddingArticle";
import ArticlesFromUpload from "../components/operator/ArticlesFromUpload";
import {Navigate} from "react-router-dom";
import jwt_decode from "jwt-decode";

const OperatorPage = () => {
    const [token] = useContext(UserContext);
    if (token==="null"){
        return(
            <Navigate to="/"/>
        )
    }else{
        const role_id = jwt_decode(token)?.role_id;
        if(!role_id || role_id !== 3){
            return(
                <Navigate to="/"/>
            )
        }
    }

    const listName = [
        {
            index: 0,
            name: "Подтверждение статей",
        },
        {
            index: 1,
            name: "Добавление статей",
        },
        {
            index: 2,
            name: "Добавление из выгрузки",
        },
    ];

    const listItem = [
        {
            index: 0,
            element: <ArticleConfirmation token={token}/>,
        },
        {
            index: 1,
            element: <AddingArticle token={token}/>,
        },
        {
            index: 2,
            element: <ArticlesFromUpload token={token}/>
        },
    ]

    return (
        <Container maxWidth="md" className="content">
            <Grid container spacing={1} sx={{mt: '5rem'}}>
                <Grid item md={12} xs={12} sm={12}>
                    <TabsMenu listName={listName} listItem={listItem}/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default OperatorPage;