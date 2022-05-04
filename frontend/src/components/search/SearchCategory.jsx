import React, {useEffect, useState} from 'react';
import PrimaryInputSelect from "../inputs/PrimaryInputSelect";
import {Autocomplete, Input, Paper, Slider, TextField} from "@mui/material";

function valuetext(value) {
    return `${value}`;
}


const SearchCategory = (props) => {
    const [valuesDocumentTypes, setValuesDocumentTypes] = useState();

    const getValuesDocumentTypes = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch('/api/articles/document_type/values', requestOptions)
        const answer = await response.json()
        if (response.ok) {
            setValuesDocumentTypes(answer);
        }
    };

    useEffect(() => {
        getValuesDocumentTypes();
    }, []);

    let {start, end, publicationType, keyWords, authors} = props;

    const currentYear = (new Date()).getFullYear();
    const handleInputChangeLeft = (event) => {
        setValue([event.target.value === '' ? '' : Number(event.target.value), value[1]]);
        start(value[0]);
        end(value[1]);
    };
    const handleInputChangeRight = (event) => {
        setValue([value[0], event.target.value === '' ? '' : Number(event.target.value)]);
        start(value[0]);
        end(value[1]);
    };
    const handleBlurLeft = () => {
        if (value[0] < 1960) {
            setValue([1960, value[0]]);
            start(value[0]);
            end(value[1]);
        } else if (value[0] > currentYear) {
            setValue([currentYear, value[0]]);
            start(value[0]);
            end(value[1]);
        }

    };
    const handleBlurRight = () => {
        if (value[1] < 1960) {
            setValue([value[0], 1960]);
        } else if (value[1] > currentYear) {
            setValue([value[0], currentYear]);
            start(value[0]);
            end(value[1]);
        }
    }
    const [value, setValue] = useState([1960, currentYear])
    const handleChange = (event, newValue) => {
        setValue(newValue);
        start(value[0]);
        end(value[1]);
    };
    return (
        <Paper elevation={6} sx={{
            display: "flex",
            justifyContent: "space-between",
            pb: 1
        }}>
            <Paper elevation={0} sx={{
                display: "flex",
                flexDirection: 'column',
            }}>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    size="small"
                    max={(new Date()).getFullYear()}
                    min={1960}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    sx={{width: "128px", ml: 3}}
                />
                <Paper elevation={0} sx={{ml: 2}}>
                    <Input
                        value={value[0]}
                        size="small"
                        onChange={handleInputChangeLeft}
                        onBlur={handleBlurLeft}
                        sx={{
                            width: "58px",
                        }}
                        inputProps={{

                            step: 1,
                            min: 1960,
                            max: {currentYear},
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                    <Input
                        value={value[1]}
                        size="small"
                        onChange={handleInputChangeRight}
                        onBlur={handleBlurRight}
                        sx={{
                            width: "58px",
                            ml: 3
                        }}
                        inputProps={{
                            step: 1,
                            min: 1960,
                            max: {currentYear},
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Paper>
            </Paper>
            <Autocomplete variant="outlined"
                          size="small"
                          options={valuesDocumentTypes}
                          onChange={(event, newValue) => {
                              publicationType(newValue.label)
                          }}
                          onInputChange={(e, newInputValue) => {
                              publicationType(newInputValue)
                          }}
                          sx={{mt: 2, mr: 2, width: "248px"}}
                          renderInput={(params) => <TextField
                              type="text"
                              label="Тип документа"
                              {...params} />}/>
        </Paper>
    );
};

// Год Тип документа Тип Публикации Ключевые слова
export default SearchCategory;