import React, {useEffect, useState} from 'react';

const Departments = () => {
    const [query, setQuery] = useState("");
    const [departments, setDepartments] = useState();
    const getAllDepartments = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch('/api/users/all/departments/?query='+query, requestOptions);
        const answer = await response.json();
        if(response.ok){
            setDepartments(answer)
        }
    }
    useEffect(() => {
        getAllDepartments();
    }, [query])
    return (
        <div>

        </div>
    );
};

export default Departments;