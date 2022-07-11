import React, {useState} from 'react';
import {Modal} from "@mui/material";
import ChangePassword from "./ChangePassword";
import VerifiedPassword from "./VerifiedPassword";
import ModalChangeOk from "./ModalChangeOk";


const ModalPasswordChange = ({token, ...props}) => {
    const [verified, setVerified] = useState(1);


    if (verified===1) {
        return (
            <Modal {...props}>
                <VerifiedPassword token={token} setVerified={setVerified}/>
            </Modal>
        );
    }
    else if (verified===2) {
        return (
            <Modal {...props}>
                <ChangePassword token={token} setVerified={setVerified}/>
            </Modal>
        )
    }
    else if (verified===3){
        return (
            <Modal {...props}>
                <ModalChangeOk/>
            </Modal>
        )
    }
};

export default ModalPasswordChange;