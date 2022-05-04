import React, {Fragment, useState} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
    Autocomplete,
    Box, Button,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import PrimaryInput from "../inputs/PrimaryInput";
import ClearIcon from '@mui/icons-material/Clear';

const PrimaryRow = (props) => {
    const {token, universities, departments, faculties, institutes, row} = props;
    const [open, setOpen] = useState(false);

    const addWorkplaces = async (data) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                university: data.university,
                institute: data.institute,
                faculty: data.subdivision,
                department: data.department,
                position: data.position
            }),
        };
        const response = await fetch('/api/users/workplaces/', requestOptions);
        const answer = await response.json();
        if (response.ok) {
            console.log(answer)
        }
    }

    return (
        <Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                Места работы
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ВУЗ</TableCell>
                                        <TableCell>Институт</TableCell>
                                        <TableCell>Факультутет</TableCell>
                                        <TableCell>Кафедра</TableCell>
                                        <TableCell>Должность</TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.workplaces?.map((workplace) => (
                                        <TableRow>
                                            <TableCell>
                                                {workplace.university ? (workplace.university) : (<></>)}
                                            </TableCell>
                                            <TableCell>
                                                {workplace.institute ? (workplace.institute) : (<></>)}
                                            </TableCell>
                                            <TableCell>
                                                {workplace.faculty ? (workplace.faculty) : (<></>)}
                                            </TableCell>
                                            <TableCell>
                                                {workplace.department ? (workplace.department) : (<></>)}
                                            </TableCell>
                                            <TableCell>
                                                {workplace.position ? (workplace.position) : (<></>)}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton aria-label="expand row"
                                                            size="small" color="error" variatn="outlined">
                                                    <ClearIcon/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell>
                                            <Autocomplete variant="outlined"
                                                          size="small"
                                                          sx={{width:'108px'}}
                                                          options={universities}
                                                          isOptionEqualToValue={(option, value) => option.id === value.id}
                                                          renderInput={(params) => <TextField

                                                              name="university"
                                                              id="university"
                                                              type="text"
                                                              {...params} label="ВУЗ"/>}/>
                                        </TableCell>
                                        <TableCell>
                                            <Autocomplete variant="outlined"
                                                          size="small"
                                                          sx={{width: '226px'}}
                                                          options={institutes}
                                                          isOptionEqualToValue={(option, value) => option.id === value.id}
                                                          renderInput={(params) => <TextField
                                                              name="institute"
                                                              id="institute"
                                                              type="text"
                                                              {...params} label="Институт"/>}/>
                                        </TableCell>
                                        <TableCell>
                                            <Autocomplete variant="outlined"
                                                          size="small"
                                                          sx={{width: '226px'}}
                                                          options={faculties}
                                                          isOptionEqualToValue={(option, value) => option.id === value.id}
                                                          renderInput={(params) => <TextField
                                                              name="subdivision"
                                                              id="subdivision"
                                                              type="text"
                                                              {...params} label="Подразделение или факультет"/>}/>
                                        </TableCell>
                                        <TableCell>
                                            <Autocomplete variant="outlined"
                                                          size="small"
                                                          sx={{width: '226px'}}
                                                          options={departments}
                                                          isOptionEqualToValue={(option, value) => option.id === value.id}
                                                          renderInput={(params) => <TextField
                                                              name="department"
                                                              id="department"
                                                              type="text"
                                                              {...params} label="Отдел или кафедра"/>}/>
                                        </TableCell>
                                        <TableCell>
                                            <PrimaryInput variant="outlined"
                                                          id="position"
                                                          type="text"
                                                          label="Должность"
                                                          name="position"
                                                          size="small"
                                                          sx={{width: '236px'}}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <Button variant="outlined" size="small" sx={{mt: 1}}>Добавить</Button>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
};

export default PrimaryRow;