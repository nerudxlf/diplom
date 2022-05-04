import React from 'react';
import {Container, Grid} from "@mui/material";
import TabsMenu from "../components/TabsMenu";
import Divisions from "../components/employees/Divisions";
import Departments from "../components/employees/Departments";
import Personal from "../components/employees/Personal";


const Employees = () => {
    const listName = [
        {
            index: 0,
            name: "Подразделения",
        },
        {
            index: 1,
            name: "Кафедры",
        },
        {
            index: 2,
            name: "Персональный",
        },
    ];

    const listItem = [
        {
            index: 0,
            element: <Divisions/>,
        },
        {
            index: 1,
            element: <Departments/>
        },
        {
            index: 2,
            element: <Personal/>
        },
    ]


    return (
        <>
            <Container maxWidth="xl" className="content">
                <Grid container spacing={0} sx={{mt: '5rem'}} >
                    <Grid item md={12} xs={12} sm={12} lg={12} xl={12} >
                        <TabsMenu listName={listName} listItem={listItem}/>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Employees;