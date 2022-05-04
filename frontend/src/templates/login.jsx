import React, {useContext, useState} from 'react';
import {UserContext} from "../context/UserContext";
import {useForm} from "react-hook-form";
import Form from "../components/Form";
import {Box, Button, Grid, Paper, Typography} from "@mui/material";
import InputAuth from "../components/inputs/InputAuth";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import { Navigate } from "react-router-dom";


const schema = yup.object().shape({
    username: yup.string().required("Обязательное поле"),
    password: yup.string().required("Обязательное поле")
});


const Login = () => {
    const [token, setToken] = useContext(UserContext);
    const [error, setError] = useState();

    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify('grant_type=&username=' + data.username + '&password=' + data.password + '&scope=&client_id=&client_secret='),
            mode: 'no-cors',
        };
        const response = await fetch("/api/auth/token", requestOptions);
        const answer = await response.json();
        if (response.ok) {
            setToken(answer.access_token);
        }
        if(response.status===404){
            setError("Пользователь с таким Email не найден")
        }
        if(response.status===403){
            setError("Email или пароль указаны неверно")
        }
    }

    if (token){
        return(
            <Navigate to="/"/>
        )
    }

    return (
        <Box sx={{mt: 8}} className="content">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                    container direction="column" justifyContent="center" alignItems="center"
                >
                    <Paper
                        sx={{mt: 6, width: 400, display: 'flex', justifyContent: 'center', flexDirection: 'column',  alignItems: 'center'}}
                        elevation={8}
                    >
                        <Typography component="h2" variant="h5" align="center" sx={{mt: 3}}>Авторизация</Typography>
                        {error ? (<Typography color="error">{error}</Typography>):(<></>)}
                        <InputAuth
                            {...register('username')}
                            id="username"
                            type="text"
                            label="Email"
                            name="username"
                            onChange={()=>setError(false)}
                            error={!!errors?.username}
                            helperText={errors?.username?.message}
                        />
                        <InputAuth
                            {...register('password')}
                            onChange={()=>setError(false)}
                            id="password"
                            type="password"
                            label="Пароль"
                            name="password"
                            error={!!errors?.password}
                            helperText={errors?.password?.message}
                        />
                        <Button type="submit" size="large" variant="contained" sx={{mt: 1, width: 2/3}}>Войти</Button>
                        <Button type="submit" size="large" variant="outlined" sx={{mt: 1, mb: 2, width: 5/9}}>Забыли
                            пароль</Button>
                    </Paper>
                </Grid>
            </Form>
        </Box>
    )
}

export default Login