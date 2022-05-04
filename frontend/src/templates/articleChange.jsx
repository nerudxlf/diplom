import React, {useContext, useEffect, useState} from 'react';
import {Container, Grid} from "@mui/material";
import {Navigate, useParams} from "react-router-dom";
import ChangeBaseInfo from "../components/articleChange/ChangeBaseInfo";
import ChangeAdditionalInformation from "../components/articleChange/ChangeAdditionalInformation";
import ChangeCategory from "../components/articleChange/ChangeCategory";
import ChangeQuartiles from "../components/articleChange/ChangeQuartiles";
import ChangeBibliography from "../components/articleChange/ChangeBibliography";
import {UserContext} from "../context/UserContext";
import jwt_decode from "jwt-decode";

const ArticleChange = () => {
    const [token, ] = useContext(UserContext);
    const {id} = useParams();
    const [article, setArticle] = useState();
    const getArticle = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "applications/json",
            },
        }
        const response = await fetch('/api/articles/' + id, requestOptions);
        const answer = await response.json();
        if (response.ok) {
            setArticle(answer);
        }
    }

    useEffect(() => {
        getArticle();
    }, []);

    if (token==="null"){
        return(
            <Navigate to="/"/>
        )
    }else{
        const role_id = jwt_decode(token)?.role_id;
        if(!role_id || role_id !== 3){
            return(
                <Navigate to="/"/>
            )
        }
    }

    return (
        <Container maxWidth="md" sx={{mb: 4}} className="content">
            <Grid container spacing={1} sx={{mt: '5rem'}}>
                <Grid item md={12} xs={12} sm={12}>
                    <ChangeBaseInfo token={token}
                                    id={id}
                                    title={article?.base.title}
                                    source={article?.base.source}
                                    publicationDate={article?.base.publication_date}
                                    link={article?.base.link}
                                    authors={article?.base.authors}/>
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                    <ChangeAdditionalInformation token={token}
                                                 id={id}
                                                 doi={article?.information.doi}
                                                 keyWords={article?.information.key_words}
                                                 annotation={article?.information.annotation}
                                                 isVak={article?.information.isVak}
                                                 affiliation={article?.information.affiliation}
                                                 edn={article?.information.edn}
                    />
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                    <ChangeCategory
                        token={token}
                        id={id}
                        type={article?.type}
                    />
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                    <ChangeQuartiles
                        token={token}
                        id={id}
                    />
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                    <ChangeBibliography
                        token={token}
                        id={id}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ArticleChange;