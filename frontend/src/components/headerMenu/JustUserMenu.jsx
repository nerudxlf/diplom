import React from 'react';
import {Button} from "@mui/material";
import {Link} from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';

const JustUserMenu = () => {
    return (
        <>
            <Link to="/" style={{ textDecoration: 'none'}}>
                <Button variant="standard" startIcon={<HomeIcon/>} sx={{color: "white"}}>
                    Главная
                </Button>
            </Link>
            <Link to="/employees" style={{ textDecoration: 'none'}}>
                <Button variant="standard" startIcon={<PeopleIcon/>} sx={{color: "white"}}>
                    Сотрудники
                </Button>
            </Link>
        </>
    );
};

export default JustUserMenu;