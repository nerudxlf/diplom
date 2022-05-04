import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Grid, Typography} from "@mui/material";
import {UserContext} from "../context/UserContext";
import jwt_decode from "jwt-decode";
import Basic from "../components/profile/Basic";
import Indicators from "../components/profile/Indicators";
import Workplaces from "../components/profile/Workplaces";
import ProfileArticles from "../components/profile/ProfileArticles";
import Settings from "../components/profile/Settings";
import Password from "../components/profile/Password";
import ResearchFields from "../components/profile/ResearchFields";

const Profile = () => {
    const [token] = useContext(UserContext);

    const [workplaces, setWorkplaces] = useState();
    const [indicators, setIndicators] = useState();

    const onSubmitNewWorkPlace = async (data) => {
        const userId = jwt_decode(token).user_id;
        const requestOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                level1: data.level1,
                level2: data.level2,
                level3: data.level3,
                level4: data.level4,
                position: data.level4,
            }),
        };
        const response = await fetch("/api/users/"+userId+"/workplaces", requestOption);
        const dataResponse = await response.json();
        if (response.ok){
            setWorkplaces(dataResponse);
        }
    };

    const onSubmitIndicators = async (data) => {
        const userId = jwt_decode(token).user_id;
        const requestOption = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                scopus_id: data.scopusId,
                wos_id: data.wosId,
                elibrary: data.elibrary,
                publons: data.publons,
                oricd: data.oricd
            }),
        };
        const response = await fetch("/api/users/"+userId+"/indicators", requestOption);
        const dataResponse = await response.json();
        if (response.ok){
            setIndicators(dataResponse);
        }
    };


    const getUserWorkplaces = async () => {
        const userId = jwt_decode(token).user_id;
        const requestOption = {
            method: "GET",
            headers: {
                "Content-Type": "applications/json",
            },
        };
        const response = await fetch('/api/users/' + userId + "/workplaces", requestOption);
        const data = await response.json();
        if (response.ok) {
            setWorkplaces(data);
        }
    };

    const getUserIndicators = async () => {
        const userId = jwt_decode(token).user_id;
        const requestOption = {
            method: "GET",
            headers: {
                "Content-Type": "applications/json",
            },
        };
        const response = await fetch('/api/users/' + userId + "/indicators", requestOption);
        const data = await response.json();
        if (response.ok) {
            setIndicators(data);
        }
    };


    useEffect(() => {
        getUserWorkplaces();
    }, []);

    useEffect(() => {
        getUserIndicators();
    }, []);

    return (
        <Container maxWidth="md" className="content">
            <Grid container spacing={1} sx={{mt: '5rem'}}>
                <Grid item md={12} xs={12} sm={12}>
                    <Basic token={token}/>
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                    <Indicators token={token}/>
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                    <Workplaces token={token}/>
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                    <ResearchFields token={token}/>
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                    <ProfileArticles token={token}/>
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                    <Password token={token}/>
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                    <Settings token={token}/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Profile;