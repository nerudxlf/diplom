import React, {useEffect, useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import PrimaryInput from "../inputs/PrimaryInput";

const Departments = () => {
    const [query, setQuery] = useState("");
    const [departments, setDepartments] = useState();
    const getAllDepartments = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch('/api/users/all/departments/?query='+query, requestOptions);
        const answer = await response.json();
        if(response.ok){
            setDepartments(answer)
        }
    }
    useEffect(() => {
        getAllDepartments();
    }, [query])
    return (
        <>
            <Paper elevation={0} sx={{pl:2, pr: 2}}>
                <PrimaryInput
                    id="user-search"
                    label="Поиск"
                    onChange={(e) => setQuery(e.target.value)}
                    size="small"
                    variant="standard"
                    sx={{
                        mb: 1,
                        width: 1,
                    }}

                />
            </Paper>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Кафедра или отдел</TableCell>
                            <TableCell align="center">Публикаций</TableCell>
                            <TableCell align="center">Сотрудников</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {departments?.map((row)=>(
                            <TableRow>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>
                                    {row.department}
                                </TableCell>
                                <TableCell align="center">{row.publication}</TableCell>
                                <TableCell align="center">{row.employee}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Departments;