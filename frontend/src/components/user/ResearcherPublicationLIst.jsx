import React from 'react';
import {Button, Paper, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const ResearcherPublicationLIst = (props) => {
    const {data} = props;
    return (
        <Paper elevation={4} sx={{mt: 1}}>
            {data.length !== 0 ? (
                <Paper elevation={0} sx={{p:2}}>
                    {data.map((article)=>(
                        <Paper elevation={6} sx={{mt: 1, p: 2}}>
                            <Paper elevation={0} sx={{borderBottom: 1}} square>
                                <Typography sx={{textTransform: "capitalize"}}
                                            variant="body1" component="p">{article.title}</Typography>
                            </Paper>
                            <Paper elevation={0} sx={{
                                display: "flex",
                                flexDirection: 'row',
                                justifyContent: "space-between",
                                alignItems: 'flex-end',
                                mt: 1
                            }}>
                                <Paper elevation={0}>
                                    <Typography variant="body2">{article.authors}</Typography>
                                    <Typography variant="body2">Источник: {article.source}</Typography>
                                    <Typography variant="body2">Год: {article.publication_date}</Typography>
                                </Paper>
                                <Paper elevation={0}>
                                    <Link to={"/article/" + article.article_id}>
                                        <Button variant="outlined" size="small">Открыть</Button>
                                    </Link>
                                </Paper>
                            </Paper>
                        </Paper>
                    ))}
                </Paper>
            ):(
                <Paper elevation={0} sx={{p: 2}}>
                    <Typography variant="h6">Публикации не найдены</Typography>
                </Paper>
            )}
        </Paper>
    );
};

export default ResearcherPublicationLIst;