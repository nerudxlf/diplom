import React, {useContext, useEffect, useState} from 'react';
import {Container, Grid, Paper, Typography} from "@mui/material";
import {UserContext} from "../context/UserContext";
import {Navigate} from "react-router-dom";
import jwt_decode from "jwt-decode";


const Statistics = () => {
    const [token] = useContext(UserContext);
    const [baseStatistic, setBaseStatistic] = useState()

    const getBaseStatistic = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };
        const response = await fetch('/api/admin/statistic/base', requestOptions);
        const answer = await response.json();
        if (response.ok) {
            setBaseStatistic(answer)
        }
    }
    useEffect(() => {
        getBaseStatistic();
    }, []);

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

    return (
        <Container maxWidth="xl" className="content">
            <Grid container spacing={1} sx={{mt: '5rem'}}>
                <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
                    <Paper elevation={4} sx={{mt: 1, mb: 1}}>
                        <Paper elevation={0} sx={{p: 2}} >
                            <Typography variant="h5" sx={{textAlign: 'center'}}>Статистика</Typography>
                            <Typography variant="body1" sx={{mt: 1, textAlign: 'center'}}>Основная информация</Typography>
                            <Paper elevation={0} sx={{
                                mt: 1,
                                display: "flex",
                                justifyContent: 'space-evenly',
                            }}>
                                <Paper elevation={0}>
                                    <Typography variant="body2" sx={{textAlign: "center"}}>Пользователь</Typography>
                                    <Typography variant="h6" sx={{textAlign: "center"}}>{baseStatistic ? (baseStatistic.users) : ('Нет данных')}</Typography>
                                </Paper>
                                <Paper elevation={0}>
                                    <Typography variant="body2" sx={{textAlign: "center"}}>HR</Typography>
                                    <Typography variant="h6" sx={{textAlign: "center"}}>{baseStatistic ? (baseStatistic.hr) : ('Нет данных')}</Typography>
                                </Paper>
                                <Paper elevation={0}>
                                    <Typography variant="body2" sx={{textAlign: "center"}}>Операторов</Typography>
                                    <Typography variant="h6" sx={{textAlign: "center"}}>{baseStatistic ? (baseStatistic.operators) : ('Нет данных')}</Typography>
                                </Paper>
                                <Paper elevation={0}>
                                    <Typography variant="body2" sx={{textAlign: "center"}}>Аналитиков</Typography>
                                    <Typography variant="h6" sx={{textAlign: "center"}}>{baseStatistic ? (baseStatistic.analysts) : ('Нет данных')}</Typography>
                                </Paper>
                                <Paper elevation={0}>
                                    <Typography variant="body2" sx={{textAlign: "center"}}>Администраторов</Typography>
                                    <Typography variant="h6" sx={{textAlign: "center"}}>{baseStatistic ? (baseStatistic.admins) : ('Нет данных')}</Typography>
                                </Paper>
                            </Paper>
                        </Paper>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Statistics;