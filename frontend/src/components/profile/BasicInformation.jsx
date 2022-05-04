import React, {useEffect, useState} from 'react';
import {Button, Typography, Paper} from "@mui/material";
import jwt_decode from "jwt-decode";
import ModalBasicInformation from "./ModalWindows/ModalBasicInformation";

const BasicInformation = (props) => {
    const {token} = props;
    const [fullUser, setFullUser] = useState();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getUserFullInfo = async () => {
        const userId = jwt_decode(token).user_id;
        const requestOption = {
            method: "GET",
            headers: {
                "Content-Type": "applications/json",
            },
        };
        const response = await fetch('/api/users/' + userId, requestOption);
        const data = await response.json();
        if (response.ok) {
            setFullUser(data);
        }
    };

    useEffect(() => {
        getUserFullInfo();
    }, []);

    return (
        <>
            {
                fullUser ? (
                    <>
                        <ModalBasicInformation open={open}
                                               name={fullUser?.name}
                                               surname={fullUser?.surname}
                                               patronymic={fullUser?.patronymic}
                                               email={fullUser?.email}
                                               phone={fullUser?.phone}
                                               onClose={handleClose}/>
                        <Paper elevation={0} sx={{
                            width: 5 / 8,
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            alignContent: 'flex-start',
                            ml: 4,
                            mt: 2
                        }}
                        >
                            {fullUser ? (
                                <>
                                    <Paper elevation={0}>
                                        <Typography variant="h4">{fullUser?.name} {fullUser?.surname}</Typography>
                                        <Typography variant="body1">{fullUser?.email}</Typography>
                                        <Typography variant="body1">{fullUser?.phone}</Typography>
                                    </Paper>
                                    <Button variant="outlined" size="small" sx={{mb: 1+1/2}} onClick={handleOpen}>Изменить
                                        персональную информацию</Button>
                                </>) : (<></>)}
                        </Paper>
                    </>) : (<></>)
            }
        </>
    );
};

export default BasicInformation;