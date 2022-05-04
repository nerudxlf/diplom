import React, {useEffect, useState} from 'react';
import {
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    Autocomplete, Button
} from "@mui/material";


const ChangeRole = (props) => {

    const [userRole, setUserRole] = useState();
    const [users, setUsers] = useState();

    const getUsers = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + props.token,
            },
        };
        const response = await fetch('/api/admin/users', requestOptions);
        const answer = await response.json();
        if (response.ok) {
            setUsers(answer);
        }
    }

    const changeRole = async (data) => {
        const requestOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + props.token,
            },
            body: JSON.stringify({
                role: userRole,
                id: data
            }),
        };
        const response = await fetch('/api/admin/roles/', requestOptions);
        const answer = await response.json();
        if(response.ok){
            setUsers(answer)
        }
    }

    useEffect(() => {
        getUsers();
    }, []);
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Имя</TableCell>
                        <TableCell align="right">Фамилия</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Телефон</TableCell>
                        <TableCell align="right" widt>Роль</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users ?
                        users.map((row) => (
                            <TableRow>
                                <TableCell>{row.id}</TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.surname}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.phone}</TableCell>
                                <TableCell align="right">
                                    <Autocomplete variant="outlined"
                                                  id="q"
                                                  size="small"
                                                  options={[{label: "Пользователь", value: 1}, {label: "Оператор", value: 2}, {
                                                      label: "Аналитик",
                                                      value: 3
                                                  }]}
                                                  onInputChange={(e)=>setUserRole(e.target.value)}
                                                  onChange={(event, value) => setUserRole(value?.label)}
                                                  isOptionEqualToValue={(option, value) => option.value === value.value}
                                                  renderInput={(params) => <TextField
                                                      name="role"
                                                      {...params}
                                                      label={row.role}
                                                  />}
                                                  sx={{ width: "128px", float: "right"}}/>
                                </TableCell>
                                <TableCell align="right"><Button size="small" variant="outlined" onClick={()=>changeRole(row.id)}>Ок</Button></TableCell>
                            </TableRow>
                        ))
                        :
                        (<></>)}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ChangeRole;