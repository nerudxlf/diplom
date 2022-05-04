import React, {useEffect, useState} from 'react';
import {Container, Grid} from "@mui/material";
import {useParams} from "react-router-dom";
import ResearcherProfileHeader from "../components/user/ResearcherProfileHeader";
import ResearcherTabsMenu from "../components/user/ResearcherTabsMenu";
import ResearcherBasicInfo from "../components/user/ResearcherBasicInfo";
import ResearcherMetricsInfo from "../components/user/ResearcherMetricsInfo";
import ResearcherPublicationLIst from "../components/user/ResearcherPublicationLIst";


const User = () => {
    const [user, setUser] = useState();
    const [articles, setArticles] = useState();
    const [workplaces, setWorkplaces] = useState();

    const getUser = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch("/api/users/" + id, requestOptions);
        const answer = await response.json();
        if (response.ok) {
            setUser(answer);
        }
    }

    const getUserWorkplaces = async () => {
        const requestOption = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(`/api/users/${id}/workplaces`, requestOption);
        const answer = await response.json();
        if(response.ok){
            setWorkplaces(answer)
        }
    }

    const getArticles = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        };
        const response = await fetch(`/api/users/${id}/articles`, requestOptions);
        const answer = await response.json();
        if(response.ok){
            setArticles(answer)
        }
    }

    useEffect(() => {
        getUserWorkplaces();
    }, [])

    useEffect(() => {
        getArticles();
    }, [])

    useEffect(() => {
        getUser();
    }, [])
    const {id} = useParams();
    const listName = [
        {
            index: 0,
            name: "Основная информация",
        },
        {
            index: 1,
            name: "Статистика",
        },
        {
            index: 2,
            name: "Публикации",
        },
    ];
    const listItem = [
        {
            index: 0,
            element: <ResearcherBasicInfo workplaces={workplaces} id={id}/>,
        },
        {
            index: 1,
            element: <ResearcherMetricsInfo id={id}/>,
        },
        {
            index: 2,
            element: <ResearcherPublicationLIst id={id} data={articles?.data}/>,
        },
    ]



    return (
        (user ?
                <Container maxWidth="md" className="content">
                    <Grid container spacing={1} sx={{mt: '5rem'}}>
                        <Grid item md={12} xs={12} sm={12}>
                            <ResearcherProfileHeader workpalces={workplaces} user={user} numberPublication={articles?.value}/>
                        </Grid>
                        <Grid item md={12} xs={12} sm={12}>
                            <ResearcherTabsMenu listName={listName} listItem={listItem}/>
                        </Grid>
                    </Grid>
                </Container>
                : <></>
        )

    );
};

export default User;