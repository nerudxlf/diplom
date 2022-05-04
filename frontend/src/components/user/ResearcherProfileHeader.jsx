import React from 'react';
import {Avatar, Paper, Typography} from "@mui/material";


const stylePaperIndicators = {
    borderLeft: 1,
    pl: 1,
    mb: 1 / 2,
}



const ResearcherProfileHeader = (props) => {
    const {workpalces, user, numberPublication} = props;

    return (
        <Paper elevation={4} sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            alignItems: 'flex-start'
        }}>
            <Paper elevation={0} sx={{m: 2,}}>
                <Avatar
                    sx={{width: 192, height: 192, mt: 1,}}
                >
                </Avatar>
            </Paper>
            <Paper elevation={0} sx={{mt: 3, flexGrow: 1}}>
                <Typography variant="h6">{user.surname} {user.name} {user.patronymic}</Typography>
                <Typography component="span">Должность: </Typography>
                {workpalces ? (
                    workpalces.map((item)=>(
                        <Typography component="span">{item?.position}</Typography>
                    ))
                ):(<Typography component="span">Нет данных</Typography>)}
                <Paper elevation={0} sx={{mt: 3, borderLeft: 2}} square>
                    <Typography variant="body2" sx={{p: 1}}>ПУБЛИКАЦИЙ</Typography>
                    <Typography variant="h5" sx={{p: 1}}>{numberPublication}</Typography>
                </Paper>
            </Paper>
        </Paper>
    );
};

export default ResearcherProfileHeader;