import React, {useEffect, useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import PrimaryRow from "./PrimaryRow";

const WorkPlaces = (props) => {
    const [employees, setEmployees] = useState();
    const [listUniversities, setListUniversities] = useState();
    const [listInstitutes, setListInstitutes] = useState();
    const [listFaculties, setListFaculties] = useState();
    const [listDepartments, setListDepartments] = useState();
    const getEmployees = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + props.token,
            },
        };
        const response = await fetch('/api/hr/user/workplaces/', requestOptions);
        const answer = await response.json();
        if (response.ok) {
            setEmployees(answer);
        }
    };

    const getUniverisityUnits = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch('/api/users/university_units/', requestOptions);
        const answer = await response.json()
        if (response.ok){
            setListUniversities(answer.universities);
            setListFaculties(answer.faculties);
            setListInstitutes(answer.institutes);
            setListDepartments(answer.departments)
        }
    }

    useEffect(() => {
        getUniverisityUnits();
    }, []);

    useEffect(() => {
        getEmployees();
    }, []);
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>ФИО</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Телефон</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees?.map((row) => (
                        <PrimaryRow
                            universities={listUniversities}
                            institutes={listInstitutes}
                            faculties={listFaculties}
                            departments={listDepartments}
                            row={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default WorkPlaces;