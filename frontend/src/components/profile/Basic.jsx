import React from 'react';
import {Paper} from "@mui/material";
import ProfileAvatar from "./ProfileAvatar";
import BasicInformation from "./BasicInformation";

const Basic = (props) => {
    return (
        <Paper elevation={4} sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
        }}>
            <ProfileAvatar />
            <BasicInformation token={props.token}/>
        </Paper>
    );
};

export default Basic;