import React from 'react';
import {Box, Button, Modal, Paper, Typography} from "@mui/material";
import Form from "../../Form";
import PrimaryInput from "../../inputs/PrimaryInput";
import {useForm} from "react-hook-form";

const ModalArticle = ({token, ...props}) => {
    const {handleSubmit, register} = useForm({
        mode: "onBlur",
    })
    const addUnverifiedArticle = async (data) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };
        const response = await fetch('/api/users/unverified_articles?link='+data.link, requestOptions);
        const answer = await response.json();
        if(response.ok){
            props.onClose();
        }
    }

    return (
        <Modal {...props}>
            <Form onSubmit={handleSubmit(addUnverifiedArticle)}>
                <Box sx={{
                    position: 'absolute',
                    top: '35%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}>
                    <Paper elevation={16} sx={{width: 712, pb: 4}}>
                        <Typography variant="h5" sx={{ml: 4, pt: 4}}>Добавление статьи</Typography>
                        <Paper elevation={0} sx={{
                            display: "flex",
                            flexDirection: "column",
                            ml: 4, mt: 1, mr: 4,

                        }}
                        >
                            <Paper elevation={0}>
                                <Typography variant="body2">Ссыла на статью</Typography>
                                <PrimaryInput variant="outlined"
                                              {...register("link")}
                                              id="link"
                                              type="text"
                                              label="Ссылка"
                                              name="link"
                                              size="small"
                                              sx={{width: 1, mt: 1/2}}
                                />
                            </Paper>
                            <Paper elevation={0} sx={{mt: 1}}>
                                <Button variant="outlined" type="submit">Отправить</Button>
                            </Paper>
                        </Paper>
                    </Paper>
                </Box>
            </Form>
        </Modal>
    );
};

export default ModalArticle;