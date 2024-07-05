import React, { useState } from 'react';
import Styles from './RegisterForm.module.css';
import NavBar from '../../Layout/NavBar';
import Footer from '../../Layout/Footer';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    localStorage.setItem("storedEmail", email);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prevState => !prevState);
    };

    const validate = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (email.length > 40) {
            newErrors.email = 'Email can be maximum 40 characters'
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid';
        }

        if (!username || username.length > 25) {
            newErrors.username = 'Username is required and maximum can be 25 characters';
        }

        if (!contactInfo) {
            newErrors.contactInfo = 'Contact number is required';
        } else if (!/^(?:\+374\d{8}|0\d{8,9})$/.test(contactInfo)) {
            newErrors.contactInfo = 'Contact number is invalid';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 8 || password.length > 16) {
            newErrors.password = 'Password must be at least 8 characters and maximum 16 characters';
        } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%._^&*])/.test(password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one number, and one special character` !@#$%._^&*';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        try {
            const verification_code = '';
            await axios.post('http://localhost:8000/register', { username, email, contact_info: contactInfo, password, verification_code });
            setSuccessMessage("Registered Successfully!");
            navigate('/verify');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors({ form: "Email already used!" });
                setSuccessMessage("");
            } else {
                setErrors({ form: error.response.data.detail });
                setSuccessMessage("Registration Failed!");
            }
        }
    };

    return (
        <div>
            <NavBar />
            <div className={Styles.body2}>
                <div className={Styles.wrapper}>
                    <form action="" method='post' onSubmit={handleRegister}>
                        <h1>Sign Up</h1>
                        <div className={Styles.input_box}>
                            <input type="text" placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)} required />
                            {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>}
                        </div>
                        <div className={Styles.input_box}>
                            <input type="text" placeholder='Create Username' value={username} onChange={e => setUsername(e.target.value)} required />
                            {errors.username && <p style={{ color: 'red', fontSize: '12px' }}>{errors.username}</p>}
                        </div>
                        <div className={Styles.input_box}>
                            <input type="tel" placeholder='Contact number' pattern='^(?:\+374\d{8}|0\d{8,9})$' value={contactInfo} onChange={e => setContactInfo(e.target.value)} required />
                            {errors.contactInfo && <p style={{ color: 'red', fontSize: '12px' }}>{errors.contactInfo}</p>}
                        </div>
                        <div className={Styles.input_box}>
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                placeholder="Password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)} 
                                required 
                            />
                            <i
                                className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                                onClick={togglePasswordVisibility}
                                style={{ color: '#3b5998', cursor: 'pointer', marginLeft: '-25px' }}
                            ></i>
                            {errors.password && <p style={{ color: 'red', fontSize: '10px' }}>{errors.password}</p>}
                        </div>
                        <div className={Styles.input_box}>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                            />
                            <i
                                className={`fas ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                                onClick={toggleConfirmPasswordVisibility}
                                style={{ color: '#3b5998', cursor: 'pointer', marginLeft: '-25px' }}
                            ></i>
                            {errors.confirmPassword && <p style={{ color: 'red', fontSize: '12px' }}>{errors.confirmPassword}</p>}
                        </div>
                        <button type="submit" method="post">Register</button>
                        {successMessage && <p>{successMessage}</p>}
                        {errors.form && <p style={{ color: 'red' }}>{errors.form}</p>}
                        <div className={Styles.additional_text}>
                            <h1>Sign Up to</h1>
                            <h4>Easy Registration</h4>
                        </div>
                        <div className={Styles.register_link}>
                            <p>If you already have an account</p>
                            <p>You can <NavLink to='/login'>login here!</NavLink></p>
                        </div>
                        <div className={Styles.adding}>
                            <p>or continue with</p>
                            <div className={Styles.social_icons}>
                                <a href="URL_FOR_FACEBOOK"><i className="fab fa-facebook-f" style={{ color: '#3b5998' }}></i></a>
                                <a href="URL_FOR_APPLE"><i className="fab fa-apple" style={{ color: '#000' }}></i></a>
                                <a href="URL_FOR_GOOGLE"><i className="fab fa-google" style={{ color: '#EA4335' }}></i></a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RegisterForm;
