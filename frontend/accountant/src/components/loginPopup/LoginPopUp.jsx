import React, { useState, useEffect, useContext } from 'react'
import './LoginPopUp.css'
import axios from 'axios'
import { Context } from '../../context/Context'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const LoginPopUp = ({ setShowLoginPopUp }) => {
    const navigate = useNavigate()

    const [currentdata, setCurrentData] = useState(false)
    const { API_URL } = useContext(Context)

    const [UserData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    })
    console.log(UserData);


    const UserData_Handler = (event) => {
        setUserData({ ...UserData, [event.target.name]: event.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            let res;

            if (currentdata === false) {
                // REGISTER
                res = await axios.post(`${API_URL}/user/register`, UserData);

                // ✅ Register success toast
                toast.success("Registered successfully 🎉");
            } else {
                // LOGIN
                res = await axios.post(`${API_URL}/user/login`, UserData);

                // ✅ Login success toast
                toast.success("Login successful ✅");
            }

            // ✅ Store token
            localStorage.setItem("token", res.data.token);

            setTimeout(() => {
                setShowLoginPopUp(false);
                navigate("/503/dashboard");
            }, 1000);

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong ❌"
            );
            console.log(error);
        }
    };



    const popUpScroll_Handler = () => {
        if (window.scrollY > 100) {
            setShowLoginPopUp(false)

        }
    }

    useEffect(() => {
        window.addEventListener("scroll", popUpScroll_Handler)

        return () => removeEventListener("scroll", popUpScroll_Handler)
    }, [])
    return (

        <div className='loginpopUp'>
            <form action="" onSubmit={submitHandler}>
                <div className="loginpopup-container">
                    <div className="heading">
                        <h1>Welcome to Bookwise  - Lets's Create Account</h1>
                        <span onClick={() => setShowLoginPopUp(false)}>X</span>

                    </div>
                    <div className="inputs">
                        {!currentdata ? <label htmlFor="">Name</label> : ""}
                        {!currentdata ? <p><i class="fa-solid fa-circle-user"></i><input type="text" onChange={UserData_Handler} name='name' required placeholder='Enter Name' /></p> : <></>}
                        <label htmlFor="">Email</label>
                        <p><i class="fa-solid fa-envelope"></i><input type="email" name='email' onChange={UserData_Handler} required placeholder='Enter Email' /></p>
                        <label htmlFor="">Password</label>
                        <p><i class="fa-solid fa-lock"></i><input type="password" name='password' onChange={UserData_Handler} required placeholder='Enter  Password' /></p>

                    </div>
                    <div className="button">
                        <button type='submit'>{currentdata ? "login" : "signup"}</button>
                    </div>
                    <div className="bottom">
                        <span>create account {currentdata ? <i onClick={() => setCurrentData(false)}>sign Up</i> : <i onClick={() => setCurrentData(true)}>Login</i>}</span>

                    </div>
                </div>
            </form>
        </div>

    )
}

export default LoginPopUp;