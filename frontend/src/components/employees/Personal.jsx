import React, {useEffect, useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import PrimaryInput from "../inputs/PrimaryInput";
import {Link} from "react-router-dom";

const Personal = () => {
    const [query, setQuery] = useState("");
    const [employees, setEmployees] = useState();
    const getAllUsers = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch('/api/users/all/?query='+query, requestOptions);
        const answer = await response.json();
        if(response.ok){
            setEmployees(answer)
        }
    }
    useEffect(() => {
        getAllUsers();
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
                            <TableCell>Сотрудник</TableCell>
                            <TableCell align="center">Публикаций</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees?.map((row)=>(
                            <TableRow>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>
                                    <Link to={"/user/"+row.id}>{row.name}</Link>
                                </TableCell>
                                <TableCell align="center">{row.publication}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Personal;