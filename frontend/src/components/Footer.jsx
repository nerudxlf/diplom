import React from 'react';
import {AppBar, Paper, Typography} from "@mui/material";

const Footer = () => {
    return (
        <AppBar position="relative" color="primary" sx={{mt: 2,top: "auto", bottom: 0, height: "100px"}}>
            <Paper elevation={0} sx={{
                display: "flex",
                backgroundColor: "inherit",
                justifyContent: "center",
                mt: 1,
            }}>
                <Paper elevation={0} sx={{
                    display: "flex",
                    backgroundColor: "inherit",
                    flexDirection: 'column',
                }}>
                    <Typography variant="h6" sx={{color: "#fff", textAlign: "center"}}>
                        Контакты
                    </Typography>
                    <Typography variant="body2" sx={{color: "#fff"}}>
                        ОмГТУ Научно-аналитический отдел
                    </Typography>
                    <Typography variant="body2" sx={{color: "#fff"}}>
                        &copy;2022 Omsk Russia, All rights reserved
                    </Typography>
                </Paper>
            </Paper>
        </AppBar>
    );
};

export default Footer;