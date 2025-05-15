import { useState } from "react";
import { useNavigate } from 'react-router';
import '../../styles/AdminStartPage.css';

const AdminStartPage = () => {
    const [userNameInput, setUserNameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const navigate = useNavigate();

    const username = "admin";
    const password = "password";

    // const handleLogin = () => {

    //     userNameInput === username && passwordInput === password ? setIsLoggedIn(true) : setIsLoggedIn(false);
    //     console.log(isLoggedIn)
    //     if (isLoggedIn){
    //         navigate("/")
    //     } else {
    //         console.log("fel lösenord eller användarnamn")
    //     }  
    // }

    const handleLogin = () => {

        if (userNameInput === username && passwordInput === password) {
            setLoginFailed(false);
            setIsLoggedIn(true);
            navigate("/components/adminConsole/");
        } else {
            setLoginFailed(true);
            setIsLoggedIn(false);
            console.log("fel lösenord eller användarnamn")
        }
    }

    return (
        <div className="admin-start">
            <h1>Admin Login</h1>
            <label htmlFor="username">Användarnamn:</label>
            <input 
                type="text" 
                id="username" 
                name="username" 
                value={userNameInput} 
                onChange={(e) => setUserNameInput(e.target.value)}
                required 
            />
            <label htmlFor="password">Lösenord:</label>
            <input 
                type="password" 
                id="password" 
                name="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required 
            />
            <button className="blue-btn" onClick={handleLogin}>Logga in</button>
            {loginFailed && (
                <p style={{color: "red"}}>Fel användarnamn eller lösenord</p>
            )} 
        </div>
    )
}

export default AdminStartPage;