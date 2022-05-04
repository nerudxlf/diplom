import React, {useEffect, useState} from 'react';
import {Autocomplete, Button, Grid, Paper, TextField} from "@mui/material";
import InputAuth from "../inputs/InputAuth";
import Form from "../Form";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {parsePhoneNumberFromString} from "libphonenumber-js";

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

const CreateUser = (props) => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    })

    const [roles, setRoles] = useState();

    const getRoles = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        };
        const response = await fetch('/api/admin/roles/', requestOptions);
        const anwser = await response.json();
        if (response.ok) {
            setRoles(anwser)
        }
    }

    const onSubmit = async (data) => {
        console.log(data)
        if (data.password === data.passwordRepeat && data.password > 4) {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + props.token,
                },
                body: JSON.stringify({
                    email: data.email,
                    hashed_password: data.password,
                    name: data.name,
                    surname: data.surname,
                    patronymic: data.patronymic,
                    phone: data.phone,
                    role: data.role,
                }),
            };
            const response = await fetch('/api/auth/registration', requestOptions);
            const answer = await response.json();
            if (response.ok) {
            }
        }
    }

    useEffect(() => {
        getRoles();
    }, []);

    return (
        <Paper elevation={0} sx={{mt: 1, mb: 4, backgroundColor: 'inherit'}}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                    container direction="column" justifyContent="center" alignItems="center"
                >
                    <Paper
                        elevation={4}
                        sx={{
                            mb: 6,
                            width: 400,
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <InputAuth
                            {...register('name')}
                            id="name"
                            type="text"
                            label="Имя"
                            name="name"
                            error={!!errors?.name}
                            helperText={errors?.name?.message}
                        />
                        <InputAuth
                            {...register('surname')}
                            id="surname"
                            type="text"
                            label="Фамилия"
                            name="surname"
                            error={!!errors?.surname}
                            helperText={errors?.surname?.message}
                        />
                        <InputAuth
                            {...register('patronymic')}
                            id="patronymic"
                            type="text"
                            label="Отчество"
                            name="patronymic"
                            error={!!errors?.patronymic}
                            helperText={errors?.patronymic?.message}
                        />
                        <InputAuth
                            {...register('phone')}
                            id="phone"
                            type="tel"
                            label="Телефон"
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
                            name="email"
                            error={!!errors?.email}
                            helperText={errors?.email?.message}
                        />

                        <Autocomplete variant="outlined"
                                      id="role"
                                      size="small"
                                      options={roles}
                                      isOptionEqualToValue={(option, value) => option.label === value.label}
                                      renderInput={(params) => <TextField
                                          {...register('role')}
                                          name="role"
                                          {...params}
                                          label="Роли"/>
                                      }
                                      sx={{mt: 1, width: '34ch'}}/>


                        <InputAuth
                            {...register('password')}
                            id="password"
                            type="password"
                            label="Пароль"
                            name="password"
                            error={!!errors?.password}
                            helperText={errors?.password?.message}
                        />
                        <InputAuth
                            {...register('passwordRepeat')}
                            id="passwordRepeat"
                            type="password"
                            label="Повторите пароль"
                            name="passwordRepeat"
                            error={!!errors?.passwordRepeat}
                            helperText={errors?.passwordRepeat?.message}
                        />
                        <Button type="submit" size="medium" variant="outlined" sx={{mt: 2, mb: 4}}>
                            Добавить пользователия
                        </Button>
                    </Paper>
                </Grid>
            </Form>
        </Paper>
    );
};

export default CreateUser;