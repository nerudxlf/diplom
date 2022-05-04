import React from 'react';
import {useState} from 'react';
import {Box, Tab, Tabs} from "@mui/material";
import TabPanel from "./TabPanel";


const allProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    }
}

const TabsMenu = (props) => {
    const {listItem, listName} = props;

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    return (
        <>
            <Box sx={{borderBottom: 1}}>
                <Tabs value={value} onChange={handleChange}>
                    {listName?.map((item)=> (
                        <Tab label={item?.name} {...allProps(item?.index)}/>
                    ))}
                </Tabs>
            </Box>
            {listItem?.map((item)=>(
                <TabPanel value={value} index={item?.index}>
                    {item?.element}
                </TabPanel>
            ))}
        </>
    );
};

export default TabsMenu;