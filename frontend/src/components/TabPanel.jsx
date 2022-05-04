import React from 'react';

const TabPanel = (props) => {
    const {value, index, children, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={'simple-tablpanel-'+index}
            {...other}
        >
            {
                value === index && (
                    children
                )
            }
        </div>
    );
};

export default TabPanel;