import jwt_decode from 'jwt-decode'
import React, {useContext, useState} from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";
import JustUserMenu from "./headerMenu/JustUserMenu";
import AuthMenu from "./headerMenu/AuthMenu";
import UserMenu from "./headerMenu/UserMenu";
import {UserContext} from "../context/UserContext";
import AnalystMenu from "./headerMenu/AnalystMenu";
import OperatorMenu from "./headerMenu/OperatorMenu";
import AdminMenu from "./headerMenu/AdminMenu";
import HRMenu from "./headerMenu/HRMenu";

const Header = () => {
    const [token, ] = useContext(UserContext);
    let userRole = 0;
    let userId = 0;
    let tokenData = null;
    try{
        tokenData = jwt_decode(token);
    }catch (err){
        tokenData = false;
    }

    if (tokenData){
        userRole = tokenData?.role_id;
        userId = tokenData?.user_id;
    }

    return (
        <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    component="span"
                    sx={{flexGrow: 1}}
                >
                    ОмГТУ
                </Typography>
                <JustUserMenu/>
                {!token ? (<AuthMenu/>) : (<></>)}
                {userRole===1 ? (<UserMenu id={userId}/>):(<></>)}
                {userRole===2 ? (<AnalystMenu id={userId}/>):(<></>)}
                {userRole===3 ? (<OperatorMenu id={userId}/>):(<></>)}
                {userRole===4 ? (<AdminMenu id={userId}/>):(<></>)}
                {userRole===5 ? (<HRMenu id={userId}/>):(<></>)}
            </Toolbar>
        </AppBar>
    );
};

export default Header;