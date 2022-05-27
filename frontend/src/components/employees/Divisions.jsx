import React, {useEffect, useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import PrimaryInput from "../inputs/PrimaryInput";

const Divisions = () => {
    const [query, setQuery] = useState("");
    const [faculties, setFaculties] = useState();
    const getAllFaculties = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch('/api/users/all/faculties/?query='+query, requestOptions);
        const answer = await response.json();
        if(response.ok){
            setFaculties(answer)
        }
    }
    useEffect(() => {
        getAllFaculties();
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
                            <TableCell>Факультет или подразделение</TableCell>
                            <TableCell align="center">Публикаций</TableCell>
                            <TableCell align="center">Сотрудников</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {faculties?.map((row)=>(
                            <TableRow>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>
                                    {row.faculty}
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

export default Divisions;