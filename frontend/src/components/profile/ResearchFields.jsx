import React, {useEffect, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Button, IconButton, Paper, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PrimaryInput from "../inputs/PrimaryInput";
import {useForm} from "react-hook-form";
import Form from "../Form";
import ClearIcon from '@mui/icons-material/Clear';
import jwt_decode from "jwt-decode";

const ResearchFields = (props) => {
    const {handleSubmit, register} = useForm({
        mode: "onBlur",
    })
    const {token} = props;
    const [researchFields, setResearchFields] = useState([]);
    const addResearchField = async (data) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };
        const response = await fetch('/api/users/research_fields/'+data.field, requestOptions);
        const answer = await response.json();
        if (response.ok) {
            setResearchFields(answer);
        }
    }

    const getResearchField = async () => {
        const userId = jwt_decode(token).user_id;
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(`/api/users/${userId}/research_fields`, requestOptions);
        const answer = await response.json();
        if (response.ok) {
            setResearchFields(answer);
        }
    }

    const deleteResearchField = async (id) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };
        const response = await fetch('/api/users/research_fields/'+id, requestOptions);
        const answer = await response.json();
        if (response.ok) {
            setResearchFields(answer);
        }
    }

    useEffect(() => {
        getResearchField();
    }, []);

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography variant="h4">Области исследований</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {researchFields.length !== 0 ? (
                    <Paper elevation={0} sx={{
                        display: "flex",
                        flexWrap: 'wrap'
                    }}>
                        {researchFields?.map((elem)=>(
                            <Paper elevation={4} sx={{pl:1, pr: 1/2, pt: 1/2, pb: 1/2, ml: 1/2, mt: 1/2}}>
                                <Typography variant="body1" component="span">
                                    {elem.name}
                                    <IconButton
                                        onClick={()=>{deleteResearchField(elem.research_areas_id)}}
                                        aria-label="delete"
                                        size="small">
                                        <ClearIcon />
                                    </IconButton>
                                </Typography>
                            </Paper>
                        ))}

                    </Paper>
                ):(
                    <Paper elevation={0}>
                        <Typography variant="body1">Нет данных</Typography>
                    </Paper>
                )}

                <Paper elevation={0} sx={{mt: 2}}>
                    <Form onSubmit={handleSubmit(addResearchField)}>
                        <PrimaryInput
                            {...register('field')}
                            id="research-field"
                            name="field"
                            label="Область исследований"
                            size="small"
                            sx={{width: "256px"}}
                        />
                        <Button
                            sx={{ml: 2}}
                            color="success"
                            variant="outlined"
                            type="submit"
                        >Добавить</Button>
                    </Form>
                </Paper>
            </AccordionDetails>
        </Accordion>
    );
};

export default ResearchFields;