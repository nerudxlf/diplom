import React from 'react';
import {Box, Grid, Paper, Typography} from "@mui/material";

const NotFound = () => {
    return (
        <Box sx={{mt: 8}} className="content">
            <Grid
                container direction="column" justifyContent="center" alignItems="center"
            >
                <Paper elevation={8} sx={{
                    width: "256px",
                    height: "128px",
                    mt: 8,
                    display: "flex",
                    justifyContent: "Center",
                    justifyItems: "Center"
                }}>
                    <Typography variant="h6" sx={{mt: 2, p: 2, textAlign: "center"}}>
                        СТРАНИЦА НЕ НАЙДЕНА
                    </Typography>
                </Paper>
            </Grid>
        </Box>
    );
};

export default NotFound;