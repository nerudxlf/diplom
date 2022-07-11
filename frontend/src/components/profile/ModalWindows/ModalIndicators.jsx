import React, {useState} from 'react';
import {Box, Button, Modal, Paper, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import Form from "../../Form";
import PrimaryInput from "../../inputs/PrimaryInput";

const ModalIndicators = ({indicators, token, ...props}) => {
    const {handleSubmit, register} = useForm({
        mode: "onBlur",
    })

    const [message, setMessage] = useState("");

    const onSubmitIndicators = async (data) => {
        const requestOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                scopus: data.scopus,
                wos: data.wos,
                elibrary: data.elibrary,
                publons: data.publons,
                orcid: data.orcid
            }),
        };
        const response = await fetch("/api/users/indicators", requestOptions);
        const answer = await response.json()
        if (response.ok) {
            indicators.wos = answer.wos;
            indicators.scopus = answer.scopus;
            indicators.publons = answer.publons;
            indicators.elibrary = answer.elibrary;
            indicators.orcid = answer.orcid;
            props.onClose();
        }
    };

    return (
        <Modal {...props}>
            <Form onSubmit={handleSubmit(onSubmitIndicators)}>
                <Box sx={{
                    position: 'absolute',
                    top: '35%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}>
                    <Paper elevation={16} sx={{
                        width: 712,
                    }}>
                        <Typography variant="h5" sx={{ml: 4, pt: 4}}>Индетификаторы</Typography>
                        <Paper elevation={0} sx={{
                            mt: 1 / 3,
                            display: "flex",
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            flexWrap: "wrap",
                            alignItems: 'flex-start'
                        }}>
                            <Paper elevation={0} sx={{ml: 4, mt: 1, mr: 4, mb: 1}}>
                                <Typography variant="body2" sx={{}}>WoS ID</Typography>
                                <PrimaryInput variant="outlined"
                                              {...register('wos')}
                                              id="wos"
                                              type="text"
                                              label={indicators ? (indicators.wos ? (indicators.wos) : ("Нет данных")) : ("Нет данных")}
                                              name="wos"
                                              size="small"
                                              sx={{width: 280, mt: 1}}
                                />
                            </Paper>
                            <Paper elevation={0} sx={{ml: 4, mt: 1, mr: 4, mb: 1}}>
                                <Typography variant="body2" sx={{}}>Scopus ID</Typography>
                                <PrimaryInput variant="outlined"
                                              {...register('scopus')}
                                              id="scopus"
                                              type="text"
                                              label={indicators ? (indicators.scopus ? (indicators.scopus) : ("Нет данных")) : ("Нет данных")}
                                              name="scopus"
                                              size="small"
                                              sx={{width: 280, mt: 1}}
                                />
                            </Paper>
                            <Paper elevation={0} sx={{ml: 4, mt: 1, mr: 4, mb: 1}}>
                                <Typography variant="body2" sx={{}}>ORCID</Typography>
                                <PrimaryInput variant="outlined"
                                              {...register('orcid')}
                                              id="orcid"
                                              type="text"
                                              label={indicators ? (indicators.orcid ? (indicators.orcid) : ("Нет данных")) : ("Нет данных")}
                                              name="orcid"
                                              size="small"
                                              sx={{width: 280, mt: 1}}
                                />
                            </Paper>
                            <Paper elevation={0} sx={{ml: 4, mt: 1, mr: 4, mb: 1}}>
                                <Typography variant="body2" sx={{}}>Publons</Typography>
                                <PrimaryInput variant="outlined"
                                              {...register('publons')}
                                              id="publons"
                                              type="text"
                                              label={indicators ? (indicators.publons ? (indicators.publons) : ("Нет данных")) : ("Нет данных")}
                                              name="publons"
                                              size="small"
                                              sx={{width: 280, mt: 1}}
                                />
                            </Paper>
                            <Paper elevation={0} sx={{ml: 4, mt: 1, mr: 4, mb: 1}}>
                                <Typography variant="body2" sx={{}}>Elibrary</Typography>
                                <PrimaryInput variant="outlined"
                                              {...register('elibrary')}
                                              id="elibrary"
                                              type="text"
                                              label={indicators ? (indicators.elibrary ? (indicators.elibrary) : ("Нет данных")) : ("Нет данных")}
                                              name="elibrary"
                                              size="small"
                                              sx={{width: 280, mt: 1}}
                                />
                            </Paper>
                            <Paper elevation={0} sx={{ml: 4, mt: 5, mr: 4, mb: 2}}>
                                <Button variant="outlined" type="submit">Сохранить</Button>
                            </Paper>
                            <Typography variant="body2" sx={{mt: 1, pb: 4, textAlign: 'center', width: 1}}>Политика
                                Конфиденциальности.</Typography>
                        </Paper>
                    </Paper>
                </Box>
            </Form>
        </Modal>
    );
};

export default ModalIndicators;