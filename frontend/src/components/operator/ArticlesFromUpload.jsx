import React, {useState} from 'react';
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import PrimaryInput from "../inputs/PrimaryInput";
import {useForm} from "react-hook-form";
import Form from "../Form";

const ArticlesFromUpload = (props) => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur",
        // resolver: yupResolver(schema),
    })
    const [info, setInfo] = useState();
    const [typeError, setTypeError] = useState(false);
    const [columnError, setColumnError] = useState(false);

    const onSubmit = async (data) => {
        let formData = new FormData();
        formData.append("file", data.file[0], data.file[0].name)
        const requestOption = {
            method: "POST",
            headers: {
                Authorization: "Bearer " + props.token,
            },
            body: formData,
        };
        const response = await fetch("/api/operator/upload_file", requestOption);
        const answer = await response.json();
        if (response.ok) {
            setInfo(JSON.parse(answer));
        }
        else if (response.status === 409){
            setTypeError(true);
        }
        else if(response.status === 400){
            setColumnError(true);
        }
    }

    const acceptData = async () => {
        const requestOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + props?.token,
            },
            body: JSON.stringify(info["data"]),
        };
        const response = await fetch("/api/operator/upload_dataset", requestOption);
        const answer = await response.json();
        if (response.ok) {
            console.log(answer);
        }
    }

    return (
        <Paper elevation={4} sx={{mt: 1}}>
            {typeError ? (
                <Paper sx={{p: 2, borderBottom: 1}} square>
                    <Typography variant="h6" sx={{textAlign: "center", color: "error.main"}}>Файл данного типа не поддерживается</Typography>
                </Paper>
            ): (<></>)}
            {columnError ? (
                <Paper sx={{p: 2, borderBottom: 1}} square>
                    <Typography variant="h6" sx={{textAlign: "center", color: "error.main"}}>Основные колонки не найдеы</Typography>
                </Paper>
            ): (<></>)}
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Paper sx={{p: 2}} elevation={0}>
                    <PrimaryInput
                        type="file"
                        name="file"
                        id="file"
                        {...register("file")}
                    />
                    <Button type="submit" sx={{ml: 2}} variant="outlined" onClick={()=>{setTypeError(false); setColumnError(false)}}>Отправить</Button>
                </Paper>
            </Form>
            {info ? (<>
                    <Form onSubmit={handleSubmit(acceptData)}>
                        <Paper elevation={0} sx={{ml: 2, pb: 2}}>
                            <Typography>
                                Данные обработаны
                            </Typography>
                            <Typography>
                                Принять и добавить в базу
                            </Typography>
                            <Paper elevation={0} sx={{
                                display: "flex",
                                mt: 2
                            }}>
                                <Button type="submit" color="success" variant="outlined">Принять</Button>
                                <Button color="error" variant="outlined" sx={{ml: 3}}>Отклонить</Button>
                            </Paper>
                        </Paper>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"><Typography variant="body1">Title</Typography></TableCell>
                                        <TableCell align="center"><Typography variant="body1">DOI</Typography></TableCell>
                                        <TableCell align="center"><Typography variant="body1">Document Type</Typography></TableCell>
                                        <TableCell align="center"><Typography variant="body1">Authors</Typography></TableCell>
                                        <TableCell align="center"><Typography variant="body1">Date</Typography></TableCell>
                                        <TableCell align="center"><Typography variant="body1">Source</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {info["data"].slice(0,10).map((row)=>(
                                            <TableRow>
                                                <TableCell>
                                                    {row["title"]}
                                                </TableCell>
                                                <TableCell>
                                                    {row["doi"]}
                                                </TableCell>
                                                <TableCell>
                                                    {row["document_type"]}
                                                </TableCell>
                                                <TableCell>
                                                    {row["authors"]}
                                                </TableCell>
                                                <TableCell>
                                                    {row["publication_date"]}
                                                </TableCell>
                                                <TableCell>
                                                    {row["source"]}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Form>
                </>
            ) : (<></>)}
        </Paper>
    );
};

export default ArticlesFromUpload;