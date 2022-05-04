import React, {useContext} from 'react';
import {Box} from "@mui/material";
import TabsMenu from "../components/TabsMenu";
import AnalysisBase from "../components/analys/AnalysisBase";
import AnalysisAuthors from "../components/analys/AnalysisAuthors";


import {UserContext} from "../context/UserContext";
import AnalysisArticles from "../components/analys/AnalysisArticles";
import jwt_decode from "jwt-decode";
import {Navigate} from "react-router-dom";


const AnalystPage = () => {
    const [token] = useContext(UserContext);
    if (token==="null"){
        return(
            <Navigate to="/"/>
        )
    }else{
        const role_id = jwt_decode(token)?.role_id;
        if(!role_id || role_id !== 2){
            return(
                <Navigate to="/"/>
            )
        }
    }
    const listName = [
        {
            index: 0,
            name: "Основная информация",
        },
        {
            index: 1,
            name: "Авторы",
        },
        {
            index: 2,
            name: "Статьи",
        },
    ];

    const listItem = [
        {
            index: 0,
            element: <AnalysisBase token={token}/>,
        },
        {
            index: 1,
            element: <AnalysisAuthors token={token}/>
        },
        {
            index: 2,
            element: <AnalysisArticles token={token}/>
        },
    ]

    return (
        <Box component="main" sx={{flexGrow: 1, mt: 3, p: 5}} className="content">
            <TabsMenu listName={listName} listItem={listItem}/>
        </Box>
    );
};

export default AnalystPage;