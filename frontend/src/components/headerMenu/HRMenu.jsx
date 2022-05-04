import React, {useContext, useState} from 'react';
import {UserContext} from "../../context/UserContext";
import {IconButton} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {Link} from "react-router-dom";

const HrMenu = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [, setToken] = useContext(UserContext);
    const handleExit = () => {
        setToken(null);
    };
    return (
        <>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{color: "white"}}
            >
                <MenuIcon/>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                }
                <MenuItem>
                    <Link to={"/hr"} style={{ textDecoration: 'none'}} >
                        HR
                    </Link>
                </MenuItem>

                <MenuItem>
                    <Link to={"/user/" + props.id} style={{ textDecoration: 'none'}}>
                        Профиль
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to={"/profile"} style={{ textDecoration: 'none'}}>
                        Данные
                    </Link>
                </MenuItem >
                <MenuItem onClick={handleExit}>
                    Выйти
                </MenuItem>
            </Menu>
        </>
    );
};

export default HrMenu;