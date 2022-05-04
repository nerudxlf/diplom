import React, {useEffect, useState} from 'react';
import {Button, Paper, Typography} from "@mui/material";

const ProfileUnverifiedArticles = (props) => {
    const [unverifiedArticles, setUnverifiedArticles] = useState();

    const getUnverifiedArticles = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + props.token,
            },
        };
        const response = await fetch('/api/users/unverified_articles/', requestOptions);
        const answer = await response.json();
        if (response.ok) {
            setUnverifiedArticles(answer);
        }
    }

    const deleteUnverifiedArticles = async (id) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + props.token,
            },
        };
        const response = await fetch('/api/users/unverified_articles/?id=' + id, requestOptions);
        const answer = await response.json();
        if (response.ok) {
            setUnverifiedArticles(answer);
        }
    }

    useEffect(() => {
        getUnverifiedArticles();
    }, [])
    console.log(unverifiedArticles)
    return (
        <Paper elevation={0} sx={{mt: 1}}>
            {unverifiedArticles?.map((item) => (
                item?.status === 2 ? (<></>) : (
                    <Paper elevation={0} square sx={{
                        m: 1,
                        borderBottom: 1,
                        display: "flex",
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Paper elevation={0}>

                            <>
                                <Typography
                                    variant="h5">{item?.status === 1 ? ("Не проверенно") : (item?.status === 3 ? ("Не принято") : (<></>))}</Typography>
                                <Typography variant="body2">{item?.link}</Typography>
                            </>


                        </Paper>
                        <Paper elevation={0}>
                            <Button color="error" size="small" variant="outlined"
                                    onClick={() => deleteUnverifiedArticles(item.unverified_article_id)}>Удалить</Button>
                        </Paper>
                    </Paper>
                )
            ))}
        </Paper>
    );
};

export default ProfileUnverifiedArticles;