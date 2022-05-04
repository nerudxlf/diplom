import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Button, Paper, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PrimaryInput from "../inputs/PrimaryInput";
import Form from "../Form";
import {useForm} from "react-hook-form";

const ChangeAdditionalInformation = (props) => {
    const {id, token, doi, keyWords, affiliation, isVak, annotation, edn} = props;
    const notData = "Нет данных";
    const {handleSubmit, register} = useForm({
        mode: "onBlur",
    });

    const saveData = async (data) => {
        const requestOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                doi: data.doi,
                edn: data.edn,
                affiliations: data.affiliation,
                annotation: data.annotation,
                key_words: data.keyWords,
                isVak: data.isVak,
                title: null,
                authors: null,
                link: null,
                publication_date: null,
                source: null,
                document_type: null,
                snip: null,
                jif: null,
                cite_score_percentile: null,
                sjr: null,
                affiliation: null,
                wos: null,
                scopus: null,
                rinz: null,
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
                <Typography variant="h6">Изменить дополнительную информацию</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Form onSubmit={handleSubmit(saveData)}>
                    <Paper elevation={0}>
                        <Paper elevation={0} sx={{mb: 1}}>
                            <Typography variant="body2">Аффилиации</Typography>
                            <PrimaryInput
                                {...register('affiliation')}
                                id="affiliation"
                                name="affiliation"
                                label={affiliation ? (affiliation) : (notData)}
                                size="small"
                                sx={{
                                    mt: 1 / 2,
                                    width: 1
                                }}
                            />
                        </Paper>
                        <Paper elevation={0} sx={{mb: 1}}>
                            <Typography variant="body2">Ключевые слова</Typography>
                            <PrimaryInput
                                {...register('keyWords')}
                                id="keyWords"
                                name="keyWords"
                                label={keyWords ? (keyWords) : (notData)}
                                size="small"
                                sx={{
                                    mt: 1 / 2,
                                    width: 1
                                }}
                            />
                        </Paper>
                        <Paper elevation={0} sx={{mb: 1}}>
                            <Typography variant="body2">Аннотация</Typography>
                            <PrimaryInput
                                {...register('annotation')}
                                id="annotation"
                                type="text"
                                label={annotation ? (annotation) : (notData)}
                                name="annotation"
                                multiline
                                rows={5}
                                size="small"
                                sx={{width: 1, mt: 1 / 2}}/>
                        </Paper>
                        <Paper elevation={0} sx={{
                            mb: 1,
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                            <Paper elevation={0} sx={{width: "268px"}}>
                                <Typography variant="body2">DOI</Typography>
                                <PrimaryInput
                                    {...register('doi')}
                                    id="doi"
                                    name="doi"
                                    label={doi ? (doi) : (notData)}
                                    size="small"
                                    sx={{
                                        mt: 1 / 2,
                                        width: 1
                                    }}
                                />
                            </Paper>
                            <Paper elevation={0}>
                                <Typography variant="body2">EDN</Typography>
                                <PrimaryInput
                                    {...register('edn')}
                                    id="edn"
                                    name="edn"
                                    label={edn ? (edn) : (notData)}
                                    size="small"
                                    sx={{
                                        mt: 1 / 2,
                                        width: 1
                                    }}
                                />
                            </Paper>
                        </Paper>
                        <Paper elevation={0} sx={{
                            mb: 1,
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                            <Paper elevation={0}>
                                <Typography>Входит в вак</Typography>
                                <PrimaryInput
                                    {...register('isVak')}
                                    id="isVak"
                                    name="isVak"
                                    label={isVak ? (isVak) : (notData)}
                                    size="small"
                                    sx={{
                                        mt: 1 / 2,
                                        width: 1
                                    }}
                                />
                            </Paper>
                            <Paper elevation={0} sx={{mt: 4 - 1 / 2}}>
                                <Button variant="outlined" color="success" type="submit">Обновить</Button>
                            </Paper>
                        </Paper>
                    </Paper>
                </Form>
            </AccordionDetails>
        </Accordion>
    );
};

export default ChangeAdditionalInformation;