import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Button, Paper, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PrimaryInputSelect from "../inputs/PrimaryInputSelect";
import Form from "../Form";
import {useForm} from "react-hook-form";

const quartiles = [
    {
        value: "Нет данных",
    },
    {
        value: 1,
    },
    {
        value: 2,
    },
    {
        value: 3,
    },
    {
        value: 4,
    },
    {
        value: 5,
    },
];

const ChangeQuartiles = (props) => {
    const {id, token} = props;
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
                snip: data.snip,
                jif: data.jif,
                cite_score_percentile: data.csp,
                sjr: data.sjr,
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
                document_type: null,
            })
        };
        const response = await fetch('/api/articles/'+id, requestOptions);
        const dataResponse = await response.json()
        if(response.ok){

        }
    }

    return (
        <Accordion sx={{mt: 1}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                              aria-controls="panel1a-content"
                              id="panel1a-header">
                <Typography variant="h6">Изменить квартили</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Form onSubmit={handleSubmit(saveData)}>
                <Paper elevation={0} sx={{
                    display: "flex",
                    flexWrap: 'wrap',
                    justifyContent: "space-between"
                }}>
                    <Paper elevation={0}>
                        <Typography>SNIP</Typography>
                        <PrimaryInputSelect
                            {...register("snip")}
                            size="small"
                            name="snip"
                            sx={{width: "138px"}}
                            dataset={quartiles}
                        />
                    </Paper>
                    <Paper elevation={0}>
                        <Typography>SJR</Typography>
                        <PrimaryInputSelect
                            {...register("sjr")}
                            name="sjr"
                            size="small"
                            sx={{width: "138px"}}
                            dataset={quartiles}
                        />
                    </Paper>
                    <Paper elevation={0}>
                        <Typography>JIF</Typography>
                        <PrimaryInputSelect
                            {...register("jif")}
                            name="jif"
                            size="small"
                            sx={{width: "138px"}}
                            dataset={quartiles}
                        />
                    </Paper>
                    <Paper elevation={0}>
                        <Typography>CSP</Typography>
                        <PrimaryInputSelect
                            {...register("csp")}
                            name="csp"
                            size="small"
                            sx={{width: "138px"}}
                            dataset={quartiles}
                        />
                    </Paper>
                </Paper>
                <Paper elevation={0} sx={{
                    display: "flex",
                    flexDirection: 'row-reverse',
                    mt: 2
                }}>
                    <Button color="success" variant="outlined" type="submit">Обновить</Button>
                </Paper>
                </Form>
            </AccordionDetails>
        </Accordion>
    );
};

export default ChangeQuartiles;