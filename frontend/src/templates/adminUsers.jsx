import React, {useContext} from 'react';
import {Container, Grid} from "@mui/material";
import TabsMenu from "../components/TabsMenu";
import {UserContext} from "../context/UserContext";
import ChangeRole from "../components/admin/ChangeRole";
import CreateUser from "../components/admin/CreateUser";
import jwt_decode from "jwt-decode";
import {Navigate} from "react-router-dom";


const AdminUsers = () => {
    const [token] = useContext(UserContext);
    if (token==="null"){
        return(
            <Navigate to="/"/>
        )
    }else{
        const role_id = jwt_decode(token)?.role_id;
        if(!role_id || role_id !== 4){
            return(
                <Navigate to="/"/>
            )
        }
    }

    const listName = [
        {
            index: 0,
            name: "Добавление пользователя",
        },
        {
            index: 1,
            name: "Обновление роли",
        },
    ];

    const listItem = [
        {
            index: 0,
            element: <CreateUser token={token}/>,
        },
        {
            index: 1,
            element: <ChangeRole token={token}/>
        },
    ]

    return (
        <Container maxWidth="xl" className="content">
            <Grid container spacing={1} sx={{mt: '5rem'}}>
                <Grid item md={12} xs={12} sm={12} lg={12} xl={12} >
                    <TabsMenu listName={listName} listItem={listItem}/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminUsers;