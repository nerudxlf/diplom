import React from 'react';
import {Button} from "@mui/material";
import {Link} from 'react-router-dom'
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const AuthMenu = () => {
    return (
        <>
            <Link to="/login">
                <Button variant="standard" startIcon={<LoginIcon/>} sx={{color: "white"}}>
                    Войти
                </Button>
            </Link>
            <Link to="/registration">
                <Button variant="standard" startIcon={<AppRegistrationIcon/>} sx={{color: "white"}}>
                    Зарегистрироваться
                </Button>
            </Link>
        </>
    );
};

export default AuthMenu;