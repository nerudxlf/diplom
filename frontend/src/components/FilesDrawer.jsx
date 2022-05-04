import React from 'react';
import {Box, Button, Divider, Drawer, ListItem, ListItemButton, ListItemText, Toolbar, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const FilesDrawer = (props) => {
    const {drawerWidth, listFiles} = props;
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
            }}
        >
            <Toolbar/>
            <Box sx={{overflow: 'auto'}}>
                <ListItem>
                    <Typography>
                        Рабочая область
                    </Typography>
                </ListItem>
                <Divider />
                {listFiles.map((text) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text}/>
                        <ListItemButton sx={{ml: 20}}>
                            <CloseIcon/>
                        </ListItemButton>
                    </ListItem>
                ))}
                <Divider />
                <ListItem>
                    <Button
                        startIcon={<UploadFileIcon/>}
                        sx={{}}
                        variant="outlined"
                        component="label"
                    >
                        Загрузить файл
                        <input
                            type="file"
                            hidden
                        />
                    </Button>
                </ListItem>
            </Box>
        </Drawer>
    );
};

export default FilesDrawer;