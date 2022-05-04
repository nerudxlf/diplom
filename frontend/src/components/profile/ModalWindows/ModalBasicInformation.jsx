import React from 'react';
import {Modal, Box, Paper, Typography, Button} from "@mui/material";
import Form from "../../Form";
import {useForm} from "react-hook-form";
import PrimaryInput from "../../inputs/PrimaryInput";

const ModalBasicInformation = ({token, name, surname, patronymic, email, phone, ...props}) => {
    const {handleSubmit, register} = useForm({
        mode: "onBlur",
    })

    const saveData = async (data) => {
        const requestOption = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                email: data.email,
                name: data.name,
                surname: data.surname,
                phone: data.phone,
                patronymic: data.patronymic,
            })
        };
        const response = await fetch('/api/user/me', requestOption);
        const dataResponse = await response.json()
        if (response.ok) {
            name = dataResponse.u_name;
            surname = dataResponse.u_surname;
            patronymic = dataResponse.u_patronymic;
            email = dataResponse.u_email;
            phone = dataResponse.u_phone;
        }
    }

    return (
        <Modal {...props}>
            <Form onSubmit={handleSubmit(saveData)}>
            <Box sx={{
                position: 'absolute',
                top: '35%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <Paper elevation={16} sx={{
                    width: 712,
                }}>
                    <Typography variant="h5" sx={{ml: 4, pt: 4}}>Персональная информация</Typography>
                    <Typography variant="body2" sx={{ml: 4, mt: 4}}>Имя фамилия и отчество</Typography>
                    <Paper elevation={0} sx={{
                        mt: 1 / 3,
                        display: "flex",
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'flex-start'
                    }}>
                        <PrimaryInput
                            {...register('name')}
                            variant="outlined"
                            id="name"
                            type="text"
                            label={name}
                            name="name"
                            size="small"
                            sx={{width: 196, ml: 4}}
                        />
                        <PrimaryInput
                            {...register('surname')}
                            id="surname"
                            type="text"
                            label={surname}
                            name="name"
                            variant="outlined"
                            size="small"
                            sx={{width: 196}}/>
                        <PrimaryInput
                            {...register('patronymic')}
                            id="patronymic"
                            type="text"
                            label={patronymic}
                            name="patronymic"
                            variant="outlined"
                            size="small"
                            sx={{width: 196, mr: 4}}/>
                    </Paper>
                    <Typography variant="body2" sx={{ml: 4, mt: 2}}>Email и Телефон</Typography>
                    <Paper elevation={0} sx={{
                        mt: 1 / 3,
                        display: "flex",
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'flex-start'
                    }}>
                        <PrimaryInput
                            {...register('email')}
                            variant="outlined"
                            id="name"
                            type="text"
                            label={email}
                            name="email"
                            size="small"
                            sx={{width: 284, ml: 4, mt: 2 / 3}}
                        />
                        <PrimaryInput
                            {...register('phone')}
                            variant="outlined"
                            id="name"
                            type="tel"
                            label={phone}
                            name="phone"
                            size="small"
                            sx={{width: 284, mr: 4, mt: 2 / 3}}
                        />
                    </Paper>
                    <Paper elevation={0} sx={{
                        mt: 4,
                        display: "flex",
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        alignItems: 'flex-start'
                    }}>
                        <Button variant="outlined" sx={{mr: 4, }} type="submit">Сохранить</Button>
                    </Paper>
                    <Typography variant="body2" sx={{mt: 1, pb: 4, textAlign: 'center'}}>Политика Конфиденциальности.</Typography>
                </Paper>
            </Box>
            </Form>
        </Modal>
    );
};

export default ModalBasicInformation;