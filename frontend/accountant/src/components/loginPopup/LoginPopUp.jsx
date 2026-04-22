import React, { useState, useContext } from 'react';
import './LoginPopUp.css';
import axios from 'axios';
import { Context } from '../../context/Context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginPopUp = ({ setShowLoginPopUp }) => {
    const navigate = useNavigate();
    const { Userdata, setUserdata, API_URL, loadAllData } = useContext(Context);

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
                navigate('/503/home');
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
        <div className="bw-overlay">
            <div className="bw-container">

                {/* ── Left Panel ── */}
                <div className="bw-left">
                    <div className="bw-left-inner">
                        <div className="bw-brand">
                            <span className="bw-brand-icon">B</span>
                            <span className="bw-brand-name">Bookwise</span>
                        </div>
                        <div className="bw-left-copy">
                            <h2 className="bw-left-heading">
                                {isLogin ? 'Good to see\nyou again.' : 'Join us\ntoday.'}
                            </h2>
                            <p className="bw-left-sub">
                                {isLogin
                                    ? 'Login to manage your accounts, invoices and reports in one place.'
                                    : 'Create your account — it takes less than a minute.'}
                            </p>
                        </div>
                        {!isLogin && (
                            <button className="bw-left-switch" onClick={() => setIsLogin(true)}>
                                Already have an account? <span>Login →</span>
                            </button>
                        )}
                    </div>
                    <div className="bw-left-deco" aria-hidden="true">
                        <span className="bw-deco-ring bw-deco-ring--1" />
                        <span className="bw-deco-ring bw-deco-ring--2" />
                        <span className="bw-deco-ring bw-deco-ring--3" />
                    </div>
                </div>

                {/* ── Right Panel ── */}
                <div className="bw-right">
                    {/* Close */}
                    {!loading && (
                        <button className="bw-close" onClick={() => setShowLoginPopUp(false)} aria-label="Close">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                            </svg>
                        </button>
                    )}

                    <div className="bw-form-header">
                        <h3 className="bw-form-title">{isLogin ? 'Sign in' : 'Create account'}</h3>
                        <p className="bw-form-sub">
                            {isLogin ? 'Enter your credentials to continue' : 'Fill in your details to get started'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="bw-form">

                        {!isLogin && (
                            <div className="bw-fields-extra">
                                <div className="bw-field">
                                    <label className="bw-label">Full Name</label>
                                    <div className="bw-input-wrap">
                                        <i className="fa-solid fa-circle-user bw-icon" />
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="John Doe"
                                            onChange={handleChange}
                                            className="bw-input"
                                            required
                                        />
                                    </div>
                                </div>
                               
                            </div>
                        )}

                        <div className="bw-field">
                            <label className="bw-label">Email Address</label>
                            <div className="bw-input-wrap">
                                <i className="fa-solid fa-envelope bw-icon" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@company.com"
                                    onChange={handleChange}
                                    className="bw-input"
                                    required
                                />
                            </div>
                        </div>

                        <div className="bw-field">
                            <label className="bw-label">Password</label>
                            <div className="bw-input-wrap">
                                <i className="fa-solid fa-lock bw-icon" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                    className="bw-input"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className={`bw-submit${loading ? ' bw-submit--loading' : ''}`}>
                            {loading
                                ? <span className="bw-spinner" />
                                : isLogin ? 'Sign in to Bookwise' : 'Create my account'}
                        </button>
                    </form>

                    <p className="bw-toggle">
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                        <span className="bw-toggle-link" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Sign up free' : 'Log in'}
                        </span>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default LoginPopUp;