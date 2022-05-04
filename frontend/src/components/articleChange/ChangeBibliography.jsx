import React from 'react';
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

const ChangeBibliography = (props) => {
    const {handleSubmit, register} = useForm({
        mode: "onBlur",
    })
    const {id, token} = props
    const saveData = async (data) => {
        const requestOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                wos: data.wos,
                scopus: data.scopus,
                rinz: data.rinz,
                document_type: null,
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
                edn: null,
                isVak: null,
            })
        };
        const response = await fetch('/api/articles/' + id, requestOptions);
        const dataResponse = await response.json()
        if (response.ok) {

        }
    }

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                              aria-controls="panel1a-content"
                              id="panel1a-header">
                <Typography variant="h6">Изменить библиографическую информацию</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Paper elevation={0} sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                    <Form onSubmit={handleSubmit(saveData)}>
                        <Paper elevation={0} sx={{
                            display: "flex",
                            flexDirection: "row",
                            mt: 1 / 2
                        }}>
                            <Autocomplete variant="outlined"
                                          size="small"
                                          options={[{label: "Да", id: 1}, {label: "Нет", id: 2}]}
                                          isOptionEqualToValue={(option, value) => option.id === value.id}
                                          renderInput={(params) => <TextField
                                              id="wos"
                                              name="wos"
                                              {...register('wos')}
                                              {...params} label="WoS"/>}
                                          sx={{mr: 1, width: "140px"}}/>
                            <Autocomplete variant="outlined"
                                          size="small"
                                          options={[{label: "Да", value: 1}, {label: "Нет", value: 2}]}
                                          isOptionEqualToValue={(option, value) => option.value === value.value}
                                          renderInput={(params) => <TextField
                                              id="scopus"
                                              name="scopus"
                                              {...register('scopus')}
                                              {...params} label="Scopus"/>}
                                          sx={{mr: 1, width: "140px"}}/>
                            <Autocomplete variant="outlined"
                                          size="small"
                                          options={[{label: "Да", value: 1}, {label: "Нет", value: 2}]}
                                          isOptionEqualToValue={(option, value) => option.value === value.value}
                                          renderInput={(params) => <TextField
                                              id="rinz"
                                              name="rinz"
                                              {...register('rinz')}
                                              {...params} label="РИНЦ"/>}
                                          sx={{mr: 1, width: "140px"}}/>
                        </Paper>
                        <Paper elevation={0}>
                            <Button variant="outlined" color="success" type="submit">Обновить</Button>
                        </Paper>
                    </Form>
                </Paper>
            </AccordionDetails>
        </Accordion>
    );
};

export default ChangeBibliography;