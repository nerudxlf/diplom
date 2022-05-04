import React from 'react';
import {Button, Paper, Typography} from "@mui/material";
import PrimaryInput from "../inputs/PrimaryInput";
import {useForm} from "react-hook-form";
import Form from "../Form";

const ChangeBaseInfo = (props) => {
    const {handleSubmit, register} = useForm({
        mode: "onBlur",
    });
    const {id, token, title, source, publicationDate, link, authors} = props

    const saveData = async (data) => {
        const requestOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                title: data.title,
                authors: data.authors,
                link: data.link,
                publication_date: data.publicationDate,
                source: data.source,
                document_type: data.documentType,
                snip: null,
                jif: null,
                cite_score_percentile: null,
                sjr: null,
                key_words: null,
                affiliation: null,
                doi: null,
                annotation: null,
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

    return (
        <Paper elevation={6} sx={{p: 2}}>
            <Typography variant="h6">Изменение базовой информации</Typography>
            <Form onSubmit={handleSubmit(saveData)}>
                <Paper elevation={0}>
                    <Typography variant="body2">Название</Typography>
                    <PrimaryInput
                        {...register("title")}
                        id="title"
                        name="title"
                        size="small"
                        label={title}
                        sx={{width: 1, mt: 1 / 5}}
                    />
                </Paper>
                <Paper elevation={0} sx={{mt: 1}}>
                    <Typography variant="body2">Авторы</Typography>
                    <PrimaryInput
                        {...register("authors")}
                        id="authors"
                        name="authors"
                        size="small"
                        label={authors}
                        sx={{width: 1, mt: 1 / 5}}
                    />
                </Paper>
                <Paper elevation={0} sx={{mt: 1}}>
                    <Typography variant="body2">Ссылка</Typography>
                    <PrimaryInput
                        {...register("link")}
                        id="link"
                        name="link"
                        size="small"
                        label={link}
                        sx={{width: 1, mt: 1 / 5}}
                    />
                </Paper>
                <Paper elevation={0} sx={{mt: 1}}>
                    <Typography variant="body2">Источник</Typography>
                    <PrimaryInput
                        {...register("source")}
                        id="source"
                        name="source"
                        size="small"
                        label={source}
                        sx={{width: 1, mt: 1 / 5}}
                    />
                </Paper>
                <Paper elevation={0} sx={{display: "flex", justifyContent: "space-between", mt: 1}}>
                    <Paper elevation={0}>
                        <Typography variant="body2">Год публикации</Typography>
                        <PrimaryInput
                            {...register("publicationDate")}
                            id="publication-date"
                            name="publicationDate"
                            size="small"
                            label={publicationDate}
                            sx={{width: "128px", mt: 1 / 5}}
                        />
                    </Paper>
                    <Paper elevation={0} sx={{mt: 3}}>
                        <Button variant="outlined" color="success" type="submit">Обновить</Button>
                    </Paper>
                </Paper>
            </Form>
        </Paper>
    );
};

export default ChangeBaseInfo;