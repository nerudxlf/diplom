import React, {useEffect, useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete,
    Button,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Form from "../Form";
import {useForm} from "react-hook-form";

const ChangeCategory = (props) => {
    const {id, token} = props;
    const [valuesDocumentTypes, setValuesDocumentTypes] = useState();
    const {handleSubmit, register} = useForm({
        mode: "onBlur",
    });

    const getValuesDocumentTypes = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch('/api/articles/document_type/values', requestOptions)
        const answer = await response.json()
        if (response.ok) {
            setValuesDocumentTypes(answer);
        }
    };

    const saveData = async (data) => {
        const requestOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                document_type: data.documentType,
                snip: null,
                jif: null,
                cite_score_percentile: null,
                sjr: null,
                title: null,
                source: null,
                authors: null,
                publication_date: null,
                key_words: null,
                affiliation: null,
                doi: null,
                annotation: null,
                link: null,
                wos: null,
                scopus: null,
                rinz: null,
                edn: null,
                isVak: null,
            })
        };
        const response = await fetch('/api/articles/' + id, requestOptions);
        const dataResponse = await response.json()
        if (response.ok) {

        }
    }

    useEffect(() => {
        getValuesDocumentTypes();
    }, []);

    return (
        <Accordion sx={{mt: 1}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                              aria-controls="panel1a-content"
                              id="panel1a-header">
                <Typography variant="h6">Изменить категории</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Form onSubmit={handleSubmit(saveData)}>
                    <Paper elevation={0} sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <Paper elevation={0}>
                            <Typography variant="body2">Тип документа</Typography>
                            <Autocomplete variant="outlined"
                                          size="small"
                                          options={valuesDocumentTypes}
                                          sx={{width: "268px"}}
                                          isOptionEqualToValue={(option, value) => option.id === value.id}
                                          renderInput={(params) => <TextField
                                              id="documentType"
                                              type="text"
                                              {...register("documentType")}
                                              {...params} label={props?.type ? (props.type) : ("Нет данных")}/>}/>
                        </Paper>
                        <Paper elevation={0} sx={{mt: 2 + 1 / 2}}>
                            <Button color="success" variant="outlined" type="submit">Обновить</Button>
                        </Paper>
                    </Paper>
                </Form>
            </AccordionDetails>
        </Accordion>
    );
};

export default ChangeCategory;