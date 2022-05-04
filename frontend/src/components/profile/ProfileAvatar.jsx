import React from 'react';
import {Avatar, Button, Paper} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const ProfileAvatar = () => {
    return (
        <Paper elevation={0} sx={{
            mt: 2, ml: 2, mr: 2,
            width: 2/8,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Avatar
                sx={{width: 192, height: 192, mt: 1,}}
            >
            </Avatar>
            <Button
                sx={{width: 128, m: 1}}
                variant="standard"
                component="label"
                startIcon={<AddAPhotoIcon/>}
            >
                Фото
                <input
                    type="file"
                    hidden
                />
            </Button>
        </Paper>
    );
};

export default ProfileAvatar;