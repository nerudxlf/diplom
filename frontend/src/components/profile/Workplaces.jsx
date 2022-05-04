import React, {useEffect, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Paper, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import jwt_decode from "jwt-decode";


const Workplaces = (props) => {
    const {token} = props
    const [workplaces, setWorkplaces] = useState()

    const getWorkplaces = async () => {
        const userId = jwt_decode(token).user_id;
        const requestOption = {
            method: "GET",
            headers: {
                "Content-Type": "applications/json",
            },
        };
        const response = await fetch('/api/users/' + userId + '/workplaces', requestOption);
        const data = await response.json();
        if (response.ok) {
            setWorkplaces(data);
        }
    }

    useEffect(() => {
        getWorkplaces();
    }, []);
    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h4">Места работы</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {workplaces ? (
                        workplaces?.map((item)=>(
                            <Paper elevation={0} sx={{borderBottom: 1}} square>
                                <Typography component="span">
                                    {item?.university ? (item?.university.name+'/'):("")}
                                </Typography>
                                <Typography component="span">
                                    {item?.institute ? (item?.institute.name+'/'):("")}
                                </Typography>
                                <Typography component="span">
                                    {item?.faculty ? (item?.faculty.name+'/'):("")}
                                </Typography>
                                <Typography component="span">
                                    {item?.department ? (item?.department.name+'/'):("")}
                                </Typography>
                                <Typography component="span">
                                    {item?.position ? (item?.position):("")}
                                </Typography>
                            </Paper>
                        ))
                    ): (<Typography variant="body1">Нет данных</Typography>)}
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default Workplaces;