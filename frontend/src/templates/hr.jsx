import React, {useContext} from 'react';
import {Container, Grid} from "@mui/material";
import TabsMenu from "../components/TabsMenu";
import WorkPlaces from "../components/hr/WorkPlaces";
import AddingEmployee from "../components/hr/AddingEmployee";
import {UserContext} from "../context/UserContext";
import {Navigate} from "react-router-dom";
import jwt_decode from "jwt-decode";

const HR = () => {
    const [token] = useContext(UserContext);
    if (token==="null"){
        return(
            <Navigate to="/"/>
        )
    }else{
        const role_id = jwt_decode(token)?.role_id;
        if(!role_id || role_id !== 5){
            return(
                <Navigate to="/"/>
            )
        }
    }
    const listName = [
        {
            index: 0,
            name: "Рабочие места",
        },
        {
            index: 1,
            name: "Добавление сотрудника",
        },
    ];

    const listItem = [
        {
            index: 0,
            element: <WorkPlaces token={token}/>,
        },
        {
            index: 1,
            element: <AddingEmployee token={token}/>
        },
    ]

    return (
        <Container maxWidth="xl" className="content">
            <Grid container spacing={0} sx={{mt: '5rem'}}>
                <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
                    <TabsMenu listName={listName} listItem={listItem}/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HR;