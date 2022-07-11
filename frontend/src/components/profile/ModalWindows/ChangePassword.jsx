import React, {useState} from 'react';
import {Box, Button, Paper, Typography} from "@mui/material";
import PrimaryInput from "../../inputs/PrimaryInput";
import Form from "../../Form";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    password: yup.string().required('Обязательное поле').min(6, "Минимум 6 символов"),
    passwordRepeat: yup.string()
        .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
});

const ChangePassword = (props) => {
    const {token, setVerified} = props;
    const [error, setError] = useState();
    const {handleSubmit, register, formState: {errors}} = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    })

    const changeOldPassword = async (data) => {
        const requestOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                password: data.password,
            }),
        };
        const response = await fetch("/api/users/change_password/", requestOptions);
        const answer = await response.json()
        if (response.ok) {
            setVerified(3);
        }
    }

    return (
        <Form onSubmit={handleSubmit(changeOldPassword)}>
            <Box sx={{
                position: "absolute",
                top: '35%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <Paper elevation={16} sx={{
                    width: 712,
                    pb: 2
                }}>
                    <Typography variant="h5" sx={{ml: 4, pt: 4}}>Изменение пароля</Typography>
                    <Paper elevation={0} sx={{
                        mt: 1 / 3,
                        display: "flex",
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        flexWrap: "wrap",
                        alignItems: 'flex-start'
                    }}>
                        <Paper elevation={0} sx={{ml: 4, mt: 1, mr: 4, mb: 1}}>
                            <Typography variant="body2" sx={{}}>Введите новый пароль</Typography>
                            <PrimaryInput variant="outlined"
                                          {...register('password')}
                                          id="password"
                                          type="password"
                                          onChange={() => setError(false)}
                                          name="password"
                                          error={!!errors?.password}
                                          helperText={errors?.password?.message}
                                          size="small"
                                          sx={{width: 280, mt: 1}}
                            />
                        </Paper>
                        <Paper elevation={0} sx={{ml: 4, mt: 1, mr: 4, mb: 1}}>
                            <Typography variant="body2" sx={{}}>Повторите новый пароль</Typography>
                            <PrimaryInput variant="outlined"
                                          {...register('passwordRepeat')}
                                          id="password_repeat"
                                          type="password"
                                          onChange={() => setError(false)}
                                          name="passwordRepeat"
                                          error={!!errors?.passwordRepeat}
                                          helperText={errors?.passwordRepeat?.message}
                                          size="small"
                                          sx={{width: 280, mt: 1}}
                            />
                        </Paper>
                    </Paper>
                    <Paper elevation={0} sx={{
                        ml: 4, mt: 2, mr: 4, mb: 2,
                        display: "flex",
                        flexDirection: 'row-reverse'
                    }}>
                        <Button variant="outlined" type="submit">Изменить</Button>
                    </Paper>
                </Paper>
            </Box>
        </Form>
    );
};

export default ChangePassword;