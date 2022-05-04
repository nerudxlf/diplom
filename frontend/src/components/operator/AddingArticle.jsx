import React, {useEffect, useState} from 'react';
import {Autocomplete, Button, Paper, TextField, Typography} from "@mui/material";
import Form from "../Form";
import PrimaryInput from "../inputs/PrimaryInput";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import PrimaryInputSelect from "../inputs/PrimaryInputSelect";
import ModalWindowOk from "./ModalWindow/ModalWindowOk";

const field = 'Обязательное поле';

const schema = yup.object().shape({
    title: yup.string().required(field),
    source: yup.string().required(field),
    authors: yup.string().required(field),
    date: yup.string().required(field),
    link: yup.string().matches(/(https?:\/\/[^\s]+)/g, "Ссылка введена не корректно").required(field)
});

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
        value: 0,
    },
];

const AddingArticle = (props) => {
    const [valuesDocumentTypes, setValuesDocumentTypes] = useState();
    const [answer, setAnswer] = useState();
    const getValuesDocumentTypes = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch('/api/articles/document_type/values', requestOptions)
        const answer = await response.json()
        if(response.ok){
            setValuesDocumentTypes(answer);
        }
    };

    useEffect(() => {
        getValuesDocumentTypes();
    }, []);

    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data) => {
        console.log(data);
        let is_vak = false
        if(data.is_vak==='Да'){
            is_vak = true;
        }
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + props?.token,
            },
            body: JSON.stringify({
                title: data.title,
                source: data.source,
                authors: data.authors,
                publication_date: data.date,
                key_words: data.keyWords,
                affiliations: data.affiliations,
                document_type: data.documentType,
                doi: data.doi,
                annotation: data.annotation,
                link: data.link,
                wos: data.wos,
                edn: data.edn,
                scopus: data.scopus,
                rinz: data.rinz,
                snip: data.snip,
                jif: data.jif,
                cite_score_percentile: data.citeScorePercentile,
                sjr: data.sjr,
                is_vak: is_vak
            }),
        };
        const response = await fetch('/api/operator/articles', requestOptions);
        if (response.ok) {
            setAnswer("ПУБЛИКАЦИЯ ДОБАВЛЕНА");
        }
        if(response.status===400){
            setAnswer("ПУБЛИКАЦИЯ УЖЕ ДОБАВЛЕНА");
        }
    }
    return (
        <Paper elevation={4} sx={{mt: 1, mb: 4}}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Paper elevation={0} sx={{
                    p: 2
                }}>
                    {answer ? (
                        <Paper elevation={16} sx={{p: 2, mb: 1}}>
                            <Typography sx={{textAlign: "center"}} variant="h6">{answer}</Typography>
                        </Paper>
                    ) : (<></>)}
                    <Paper elevation={0}>
                        <PrimaryInput variant="outlined"
                                      {...register('title')}
                                      id="title"
                                      type="text"
                                      label="Название статьи"
                                      name="title"
                                      size="small"
                                      onChange={()=>setAnswer(false)}
                                      error={!!errors?.title}
                                      helperText={errors?.title?.message}
                                      sx={{width: 1, mt: 1 / 2}}/>
                    </Paper>
                    <Paper elevation={0} sx={{mt: 1 / 2}}>
                        <PrimaryInput variant="outlined"
                                      {...register('authors')}
                                      id="authors"
                                      type="text"
                                      onChange={()=>setAnswer(false)}
                                      label="Авторы"
                                      name="authors"
                                      size="small"
                                      error={!!errors?.authors}
                                      helperText={errors?.authors?.message}
                                      sx={{width: 1, mt: 1 / 2}}/>
                    </Paper>
                    <Paper elevation={0} sx={{mt: 1 / 2}}>
                        <PrimaryInput variant="outlined"
                                      {...register('keyWords')}
                                      id="keyWords"
                                      type="text"
                                      label="Ключевые слова"
                                      onChange={()=>setAnswer(false)}
                                      name="keyWords"
                                      size="small"
                                      sx={{width: 1, mt: 1 / 2}}/>
                    </Paper>
                    <Paper elevation={0} sx={{mt: 1 / 2}}>
                        <PrimaryInput variant="outlined"
                                      {...register('affiliations')}
                                      id="affiliations"
                                      type="text"
                                      label="Аффилиации"
                                      onChange={()=>setAnswer(false)}
                                      name="affiliations"
                                      error={!!errors?.affiliation}
                                      helperText={errors?.affiliation?.message}
                                      size="small"
                                      sx={{width: 1, mt: 1 / 2}}/>
                    </Paper>
                    <Paper elevation={0} sx={{mt: 1 / 2}}>
                        <PrimaryInput variant="outlined"
                                      {...register('annotation')}
                                      id="annotation"
                                      type="text"
                                      label="Текст аннотации"
                                      onChange={()=>setAnswer(false)}
                                      name="annotation"
                                      multiline
                                      rows={5}
                                      size="small"
                                      sx={{width: 1, mt: 1 / 2}}/>
                    </Paper>
                    <Paper elevation={0} sx={{mt: 1 / 2}}>
                        <PrimaryInput variant="outlined"
                                      {...register('link')}
                                      id="link"
                                      type="text"
                                      label="Ссылка"
                                      onChange={()=>setAnswer(false)}
                                      error={!!errors?.link}
                                      helperText={errors?.link?.message}
                                      name="link"
                                      size="small"
                                      sx={{mt: 1 / 2, width: 1}}/>
                    </Paper>
                    <Paper elevation={0} sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        mt: 1
                    }}>
                        <PrimaryInput variant="outlined"
                                      {...register('source')}
                                      id="source"
                                      type="text"
                                      onChange={()=>setAnswer(false)}
                                      label="Журнал"
                                      error={!!errors?.source}
                                      helperText={errors?.source?.message}
                                      name="source"
                                      size="small"
                                      sx={{mt: 1 / 2, width: 5 / 11}}/>
                        <PrimaryInput variant="outlined"
                                      {...register('doi')}
                                      id="doi"
                                      type="text"
                                      onChange={()=>setAnswer(false)}
                                      error={!!errors?.doi}
                                      helperText={errors?.doi?.message}
                                      label="DOI"
                                      name="doi"
                                      size="small"
                                      sx={{mt: 1 / 2, width: 5 / 11}}/>
                    </Paper>
                    <Paper elevation={0} sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        mt: 1
                    }}>
                        <Autocomplete variant="outlined"
                                      size="small"
                                      options={valuesDocumentTypes}
                                      sx={{width: 5 / 11}}
                                      isOptionEqualToValue={(option, value) => option.id === value.id}
                                      renderInput={(params) => <TextField
                                                                          {...register('documentType')}
                                                                          id="documentType"
                                                                          type="text"
                                                                          {...params} label="Тип документа"/>}/>
                        <PrimaryInput variant="outlined"
                                      {...register('edn')}
                                      id="edn"
                                      type="text"
                                      label="EDN"
                                      onChange={()=>setAnswer(false)}
                                      name="edn"
                                      size="small"
                                      sx={{width: 5 / 11}}
                        />
                    </Paper>
                    <Paper elevation={0} sx={{display: "flex", justifyContent: "space-between", mt: 1 / 2}}>
                        <Paper elevation={0} sx={{mt: 1}}>
                            <Typography variant="body2">
                                Год публикации
                            </Typography>
                            <PrimaryInput variant="outlined"
                                          {...register('date')}
                                          id="date"
                                          type="text"
                                          defaultValue="2022"
                                          name="date"
                                          size="small"
                                          sx={{mt: 1 / 2}}
                                          error={!!errors?.date}
                                          helperText={errors?.date?.message}
                            />
                        </Paper>

                        <Paper elevation={0} sx={{mt: 1}}>
                            <Typography variant="body2">
                                Библиографическая база данных
                            </Typography>
                            <Paper elevation={0} sx={{
                                display: "flex",
                                flexDirection: "row",
                                mt: 1 / 2
                            }}>
                                <Autocomplete variant="outlined"
                                              size="small"
                                              options={[{label: "Да", id: 1}, {label: "Нет", id: 2}]}
                                              isOptionEqualToValue={(option, value) => option.id === value.id}
                                              renderInput={(params) => <TextField {...register('wos')}
                                                                                  id="wos"
                                                                                  name="wos"
                                                                                  {...params} label="WoS"/>}
                                              sx={{mr: 1, width: "140px"}}/>
                                <Autocomplete variant="outlined"
                                              size="small"
                                              options={[{label: "Да", value: 1}, {label: "Нет", value: 2}]}
                                              isOptionEqualToValue={(option, value) => option.value === value.value}
                                              renderInput={(params) => <TextField {...register('scopus')}
                                                                                  id="scopus"
                                                                                  name="scopus"
                                                                                  {...params} label="Scopus"/>}
                                              sx={{mr: 1, width: "140px"}}/>
                                <Autocomplete variant="outlined"
                                              size="small"
                                              options={[{label: "Да", value: 1}, {label: "Нет", value: 2}]}
                                              isOptionEqualToValue={(option, value) => option.value === value.value}
                                              renderInput={(params) => <TextField {...register('rinz')}
                                                                                  id="rinz"
                                                                                  name="rinz"
                                                                                  {...params} label="РИНЦ"/>}
                                              sx={{mr: 1, width: "140px"}}/>
                            </Paper>
                        </Paper>
                    </Paper>
                    <Paper elevation={0} sx={{mt: 1}}>
                        <Typography variant="body2">
                            Квартили
                        </Typography>
                        <Paper elevation={0} sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mt: 1 / 2
                        }}>
                            <Paper elevation={0}>
                                <Typography>SNIP</Typography>
                                <PrimaryInputSelect
                                    size="small"
                                    sx={{width: "148px"}}
                                    id="snip"
                                    name="snip"
                                    {...register('snip')}
                                    dataset={quartiles}
                                />
                            </Paper>
                            <Paper elevation={0}>
                                <Typography>SJR</Typography>
                                <PrimaryInputSelect
                                    size="small"
                                    sx={{width: "148px"}}
                                    id="sjr"
                                    name="sjr"
                                    {...register('sjr')}
                                    dataset={quartiles}
                                />
                            </Paper>
                            <Paper elevation={0}>
                                <Typography>CSP</Typography>
                                <PrimaryInputSelect
                                    {...register('citeScorePercentile')}
                                    size="small"
                                    sx={{width: "148px"}}
                                    id="CiteScorePercentile"
                                    type="text"
                                    name="citeScorePercentile"
                                    dataset={quartiles}
                                />
                            </Paper>
                            <Paper elevation={0}>
                                <Typography>JIF</Typography>
                                <PrimaryInputSelect
                                    {...register('jif')}
                                    size="small"
                                    sx={{width: "148px"}}
                                    id="jif"
                                    name="jif"
                                    dataset={quartiles}
                                />
                            </Paper>
                        </Paper>
                    </Paper>
                    <Paper elevation={0}>

                    </Paper>
                    <Paper elevation={0} sx={{
                        display: "flex",
                        flexDirection: 'row-reverse',
                        justifyContent: "space-between",
                        mt: 1,
                    }}>
                        <Button color="success" variant="outlined" type="submit">Добавить</Button>
                        <Autocomplete variant="outlined"
                                      size="small"
                                      options={[{label: "Да", value: 1}, {label: "Нет", value: 2}]}
                                      isOptionEqualToValue={(option, value) => option.value === value.value}
                                      renderInput={(params) => <TextField {...register('is_vak')}
                                                                          id="is_vak"
                                                                          name="is_vak"
                                                                          {...params} label="ВАК"/>}
                                      sx={{mr: 1, width: "148px"}}/>
                    </Paper>
                </Paper>
            </Form>
        </Paper>
    );
};

export default AddingArticle;