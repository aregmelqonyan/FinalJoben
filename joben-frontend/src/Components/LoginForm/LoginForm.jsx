import React, { useState, useEffect } from 'react';
import Styles from './LoginForm.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import NavBar from '../../Layout/NavBar';
import Footer from '../../Layout/Footer';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            setIsLoading(true); // Set loading state to true
            const response = await axios.post('https://api.joben.am/login', formData);
            setSuccessMessage("Successfully logged in!");
            setErrorMessage('');
            const { access_token, refresh_token } = response.data;
            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('refreshToken', refresh_token)
            navigate('/');
        } catch (error) {
            setErrorMessage("Incorrect email or password!");
            setSuccessMessage('');
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };


    return (
        <div>
            <NavBar />
            <div className={Styles.body1}>
                <div className={Styles.wrapper}>
                    <form action="">
                        <h1>Sign in</h1>
                        <div className={Styles.input_box}>
                            <input
                                type="text"
                                placeholder="Enter email or user name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className={Styles.input_box}>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className={Styles.remember_forgot}>
                            <NavLink to='/forgot'>
                            <button className={Styles.ForgetPassword}>Forget password?</button>
                            </NavLink>
                           
                        </div>
                        <button className={Styles.LoginButton} type="button" onClick={handleLogin}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                        {<p>{successMessage}</p>}
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        {userData && <p>User is logged in!</p>}
                        <div className={Styles.additional_text}>
                            <h1>Sign in to</h1>
                            <h4>Lorem ipsum is simply</h4>
                            <p>If you don't have an account register</p>
                        </div>
                        <div className={Styles.register_link}>
                            <p>
                                You can <NavLink to="/register">Register here!</NavLink>
                            </p>
                        </div>
                        <div className={Styles.adding}>
                            <p>or continue with</p>
                            <div className={Styles.social_icons}>
                                <a href="URL_FOR_FACEBOOK">
                                    <i className="fab fa-facebook-f" style={{ color: '#3b5998' }}></i>
                                </a>
                                <a href="URL_FOR_APPLE">
                                    <i className="fab fa-apple" style={{ color: '#000' }}></i>
                                </a>
                                <a href="URL_FOR_GOOGLE">
                                    <i className="fab fa-google" style={{ color: '#EA4335' }}></i>
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoginForm;
