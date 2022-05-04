import React, {useContext, useState} from 'react';
import Form from "../components/Form";
import {Box, Button, Grid, Paper, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {UserContext} from "../context/UserContext";
import InputAuth from "../components/inputs/InputAuth";
import * as yup from "yup";
import {parsePhoneNumberFromString} from 'libphonenumber-js'
import {Navigate} from "react-router-dom";

const rePhoneNumber = /^(\+?\d{0,4})?\s? ?\s?(\(?\d{3}\)?)\s? ?\s?(\(?\d{3}\)?)\s? ?\s?(\(?\d{2}\)?)\s? ?\s?(\(?\d{2}\)?)?$/;

const schema = yup.object().shape({
    name: yup.string().matches(/^([^0-9]*)$/, "Имя должно содержать только буквы").required("Обязательное поле"),
    surname: yup.string().matches(/^([^0-9]*)$/, "Фамилия должно содержать только буквы").required("Обязательное поле"),
    patronymic: yup.string().matches(/^([^0-9]*)$/, "Отчество должно содержать только буквы"),
    email: yup.string().email("Email введен не корректно").required("Обязательное поле"),
    phone: yup.string().matches(rePhoneNumber, "Телефон введен не корректно").required("Обязательное поле"),
    password: yup.string().required('Обязательное поле').min(6, "Минимум 6 символов"),
    passwordRepeat: yup.string()
        .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
});

const normalizePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (!phoneNumber) {
        return value
    }

    return (
        phoneNumber.formatInternational()
    );
};


const RegistrationUser = () => {
    const [error, setError] = useState();
    const [token, setToken] = useContext(UserContext);
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data) => {
        if (data.password === data.passwordRepeat && data.password > 4) {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    hashed_password: data.password,
                    name: data.name,
                    surname: data.surname,
                    patronymic: data.patronymic,
                    phone: data.phone,
                }),
            };
            const response = await fetch('/api/auth/registration', requestOptions);
            const answer = await response.json();
            if (response.ok) {
                setToken(answer.access_token)
            }
            if (response.status === 403) {
                setError("Пользователь с таким email или с таким номером телефона зарегистрирован")
            }
        }
    }

    if (token) {
        return (
            <Navigate to="/profile"/>
        )
    }

    return (
        <Box sx={{mt: 8}} className="content">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                    container direction="column" justifyContent="center" alignItems="center"
                >
                    <Paper
                        sx={{
                            mt: 6,
                            mb: 6,
                            width: 400,
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        elevation={8}
                    >
                        <Typography component="h2" variant="h5" align="center"
                                    sx={{mt: 3}}>Регистрация</Typography>
                        {error ? (<Typography variant="body2" align="center" color="error">
                            {error}
                        </Typography>) : (<></>)}
                        <InputAuth
                            {...register('name')}
                            id="name"
                            type="text"
                            label="Имя"
                            onChange={()=>setError(false)}
                            name="name"
                            error={!!errors?.name}
                            helperText={errors?.name?.message}
                        />
                        <InputAuth
                            {...register('surname')}
                            id="surname"
                            type="text"
                            label="Фамилия"
                            onChange={()=>setError(false)}
                            name="surname"
                            error={!!errors?.surname}
                            helperText={errors?.surname?.message}
                        />
                        <InputAuth
                            {...register('patronymic')}
                            id="patronymic"
                            type="text"
                            label="Отчество"
                            onChange={()=>setError(false)}
                            name="patronymic"
                            error={!!errors?.patronymic}
                            helperText={errors?.patronymic?.message}
                        />
                        <InputAuth
                            {...register('phone')}
                            id="phone"
                            type="tel"
                            label="Телефон"
                            onChange={()=>setError(false)}
                            name="phone"
                            onChange={(event) => {
                                event.target.value = normalizePhoneNumber(event.target.value);
                            }}
                            error={!!errors?.phone}
                            helperText={errors?.phone?.message}
                        />
                        <InputAuth
                            {...register('email')}
                            id="email"
                            type="text"
                            label="Email"
                            onChange={()=>setError(false)}
                            name="email"
                            error={!!errors?.email}
                            helperText={errors?.email?.message}
                        />
                        <InputAuth
                            {...register('password')}
                            id="password"
                            type="password"
                            label="Пароль"
                            onChange={()=>setError(false)}
                            name="password"
                            error={!!errors?.password}
                            helperText={errors?.password?.message}
                        />
                        <InputAuth
                            {...register('passwordRepeat')}
                            id="passwordRepeat"
                            type="password"
                            label="Повторите пароль"
                            onChange={()=>setError(false)}
                            name="passwordRepeat"
                            error={!!errors?.passwordRepeat}
                            helperText={errors?.passwordRepeat?.message}
                        />
                        <Button type="submit" size="medium" variant="outlined" sx={{mt: 2, mb: 4}}>
                            Зарегистрироваться
                        </Button>
                    </Paper>
                </Grid>
            </Form>
        </Box>
    );
};

export default RegistrationUser;