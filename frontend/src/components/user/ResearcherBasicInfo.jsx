import React, {useEffect, useState} from 'react';
import {Paper, Typography} from "@mui/material";
import jwt_decode from "jwt-decode";

const ResearcherBasicInfo = (props) => {
    const {workplaces, id} = props;

    const [researchFields, setResearchFields] = useState([]);
    const [indicators, setIndicators] = useState();
    const getResearchField = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(`/api/users/${id}/research_fields`, requestOptions);
        const answer = await response.json();
        if (response.ok) {
            setResearchFields(answer);
        }
    }
    useEffect(() => {
        getResearchField();
    }, []);

    const getIndicators = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
        const response = await fetch(`/api/users/${id}/indicators`, requestOptions);
        const answer = await response.json();
        if (response.ok) {
            setIndicators(answer);
        }
    }
    useEffect(() => {
        getIndicators();
    }, []);

    return (
        <>
            <Paper elevation={4} sx={{mt: 1}}>
                <Paper elevation={0} sx={{p: 2}}>
                    <Typography variant="h6">
                        Научные области
                    </Typography>
                    <Paper elevation={0} sx={{
                        mt: 1,
                        display: 'flex',
                        flexWrap: 'wrap'
                    }}>
                        {researchFields.length !== 0  ? (
                                researchFields.map((item) => (
                                    <Paper elevation={6} sx={{pl: 1, pr: 1, pt: 1 / 2, pb: 1 / 2, ml: 1 / 2, mt: 1 / 2}}>
                                        <Typography variant="body1" component="span">
                                            {item.name}
                                        </Typography>
                                    </Paper>
                                ))
                            )
                            : (<Typography component="span" variant="body1">Нет данных</Typography>)
                        }
                    </Paper>
                </Paper>
                <Paper elevation={0} sx={{pl: 2, pr: 2}}>
                    <Typography variant="h6">
                        Индетификаторы
                    </Typography>
                    {indicators ? (
                        <Paper elevation={0} sx={{
                            mt: 1,
                            display: "flex",
                            justifyContent: 'space-between',
                        }}>
                            <Paper elevation={0} sx={{mr: 2, borderLeft: 1, borderBottom: 1}} square>
                                <Typography variant="body1" sx={{pl: 1}}>WoS ID</Typography>
                                <Typography variant="body2" sx={{pl: 1}}>
                                    {indicators.wos ? (indicators.wos) : ("Нет данных")}
                                </Typography>
                            </Paper>
                            <Paper elevation={0} sx={{mr: 2, borderLeft: 1, borderBottom: 1}} square>
                                <Typography variant="body1" sx={{pl: 1}}>Scopus ID</Typography>
                                <Typography variant="body2" sx={{pl: 1}}>
                                    {indicators.scopus ? (indicators.scopus) : ("Нет данных")}
                                </Typography>
                            </Paper>
                            <Paper elevation={0} sx={{mr: 2, borderLeft: 1, borderBottom: 1}} square>
                                <Typography variant="body1" sx={{pl: 1}}>ORCID</Typography>
                                <Typography variant="body2" sx={{pl: 1}}>
                                    {indicators.orcid ? (indicators.orcid) : ("Нет данных")}
                                </Typography>
                            </Paper>
                            <Paper elevation={0} sx={{mr: 2, borderLeft: 1, borderBottom: 1}} square>
                                <Typography variant="body1" sx={{pl: 1}}>Publons</Typography>
                                <Typography variant="body2" sx={{pl: 1}}>
                                    {indicators.publons ? (indicators.publons) : ("Нет данных")}
                                </Typography>
                            </Paper>
                            <Paper elevation={0} sx={{mr: 2, borderLeft: 1, borderBottom: 1}} square>
                                <Typography variant="body1" sx={{pl: 1}}>Elibrary</Typography>
                                <Typography variant="body2" sx={{pl: 1}}>
                                    {indicators.elibrary ? (indicators.elibrary) : ("Нет данных")}
                                </Typography>
                            </Paper>
                        </Paper>
                    ) : (<></>)}
                </Paper>
                <Paper elevetion={0} sx={{p: 2}}>
                    <Typography variant="h6">Места работы</Typography>
                    <Paper elevation={0} sx={{mt: 1}}>
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
                    </Paper>
                </Paper>
            </Paper>
        </>
    );
};

export default ResearcherBasicInfo;