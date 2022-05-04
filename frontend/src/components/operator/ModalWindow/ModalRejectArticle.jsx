import React, {useState} from 'react';
import {Box, Button, Modal, Paper, Typography} from "@mui/material";
import Form from "../../Form";
import PrimaryInput from "../../inputs/PrimaryInput";

const ModalRejectArticle = (props) => {
    const [detail, setDetail] = useState();
    const rejectArticle = async () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + props.token,
            },
        };
        console.log(detail)
        const response = await fetch(`/api/operator//rejection_article/?article_id=${props.unverifieArticle}&detail=${detail}`, requestOptions);
        const answer = await response.json();
        if (response.ok) {
            console.log(answer)
        }
    }
    return (
        <Modal {...props}>
            <Form>
                <Box sx={{
                    position: 'absolute',
                    top: '35%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}>
                    <Paper elevation={16} sx={{width: 712, pb: 4}}>
                        <Typography variant="h5" sx={{ml: 4, pt: 4}}>Отклонение статьи</Typography>
                        <Paper elevation={0} sx={{
                            display: "flex",
                            flexDirection: "column",
                            ml: 4, mt: 1, mr: 4,
                        }}>
                            <Typography variant="body2">
                                Замечание
                            </Typography>
                            <PrimaryInput variant="outlined"
                                          id="title"
                                          type="text"
                                          name="title"
                                          size="small"
                                          onChange={(e) => setDetail(e.target.value)}
                                          multiline
                                          rows={5}
                            />
                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={rejectArticle}
                                sx={{
                                    width: 1 / 4,
                                    mt: 1
                                }}
                            >Отклонить</Button>
                        </Paper>
                    </Paper>
                </Box>
            </Form>
        </Modal>
    );
};

export default ModalRejectArticle;