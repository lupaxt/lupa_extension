import React, { useState, useEffect } from "react";

import LoginPage from './LoginPage'
import RegistrationPage from "./RegistrationPage";
import ForgotPassword from "./ForgotPassword";
import AccountDetails from "./AccountDetails";

export default function AccountPage({ lupa_user }) {
    const [stage, setStage] = useState(lupa_user ? "account" : "register")



    useEffect(() => {
        if (lupa_user) {setStage('account')}
    }, [lupa_user])
    const options = {
        account: null,
        register: "login",
        login: "register",
    }

    let choice = options[stage]

        // <AccountDetails user={lupa_user}/>}
    return (<React.Fragment>
        {stage === 'account' && <span>You're signed in!</span>}
        {stage === 'register' && <RegistrationPage/>}
        {stage === 'login' && <React.Fragment><LoginPage/><button onClick={() => setStage('forgot')}> Forgot Password</button></React.Fragment>}
        {stage === 'forgot' && <ForgotPassword/>}
        {choice && <button onClick={() => setStage(choice)}> {choice} </button>}
    </React.Fragment>)
}
