import './optionsStyling.css';
import { useState } from 'react';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

export default function Options({ loggedIn }) {
    const [isLoginView, setIsLoginView] = useState(true);
    const toggleView = () => {
        setIsLoginView(!isLoginView);
    }
    return (

        <>
            {isLoginView ? <LoginPage onSwitch={toggleView} loggedIn={loggedIn}/> :
                <SignupPage onSwitch={toggleView} />}
        </>
    );

}