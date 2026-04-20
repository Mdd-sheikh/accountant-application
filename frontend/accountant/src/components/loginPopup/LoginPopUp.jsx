import React, { useState, useContext } from 'react';
import './LoginPopUp.css';
import axios from 'axios';
import { Context } from '../../context/Context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginPopUp = ({ setShowLoginPopUp }) => {
    const navigate = useNavigate();
    const { Userdata, setUserdata, API_URL,loadAllData } = useContext(Context);

    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        companyName: '',
        gstNumber: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const endpoint = isLogin ? `${API_URL}/user/login` : `${API_URL}/user/register`;
            const { data } = await axios.post(endpoint, formData);

            toast.success(data?.message || 'Success');
            if (data?.token) localStorage.setItem('token', data.token);

            setTimeout(() => {
                setShowLoginPopUp(false);
                navigate('/503/account');
            }, 1000);
            loadAllData();

        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-popup">
            <div className="popup-container">
                <div className="welcome-panel">
                    <div className="close-popup">
                        {loading ? "" : <button onClick={() => setShowLoginPopUp(false)}>×</button>}
                    </div>
                    <div className="welcome-messege">
                        <h2>Welcome</h2>
                        <p>{isLogin ? 'Login to continue with Bookwise' : 'Create your account, it takes less than a minute'}</p>
                        {!isLogin && <button onClick={() => setIsLogin(true)} className="register-btn">Login Now</button>}
                    </div>
                </div>
                <div className="form-panel">
                    <h2>{isLogin ? ' Login to Bookwise' : 'Create Account'}</h2>
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <>
                                <div className="input-icon">
                                    <i className="fa-solid fa-circle-user"></i>
                                    <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                                </div>
                                <div className="input-icon">
                                    <i className="fa-regular fa-building"></i>
                                    <input type="text" name="companyName" placeholder="Company Name" onChange={handleChange} />
                                </div>
                                <div className="input-icon">
                                    <i className="fa-solid fa-feather"></i>
                                    <input type="text" name="gstNumber" placeholder="GST Number" onChange={handleChange} />
                                </div>
                            </>
                        )}
                        <div className="input-icon">
                            <i className="fa-solid fa-envelope"></i>
                            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
                        </div>
                        <div className="input-icon">
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                        </div>

                        <button type="submit" disabled={loading} className="submit-btn">
                            {loading ? <span className="loader"></span> : isLogin ? 'Login' : 'Signup'}
                        </button>
                    </form>
                    <p className="toggle">
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                        <span onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Sign Up' : 'Login'}</span>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default LoginPopUp;