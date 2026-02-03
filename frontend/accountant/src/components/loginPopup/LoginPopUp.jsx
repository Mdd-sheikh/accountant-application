import React, { useState ,useEffect} from 'react'
import './LoginPopUp.css'

const LoginPopUp = ({ setShowLoginPopUp }) => {

    const [currentdata, setCurrentData] = useState(false)



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
            <form action="">
                <div className="loginpopup-container">
                    <div className="heading">
                        <h1>Welcome to Bookwise  - Lets's Create Account</h1>
                        <span onClick={() => setShowLoginPopUp(false)}>X</span>

                    </div>
                    <div className="inputs">
                        <label htmlFor="">Email</label>
                        <p><i class="fa-solid fa-envelope"></i><input type="email" required placeholder='Enter Email' /></p>
                        <label htmlFor="">Password</label>
                        <p><i class="fa-solid fa-lock"></i><input type="password" required placeholder='Enter  Password' /></p>
                        <label htmlFor="">Confirm Password</label>
                        {!currentdata ? <p><i class="fa-solid fa-lock"></i><input type="password" required placeholder='Enter confirm Password' /></p> : <></>}
                    </div>
                    <div className="button">
                        <button type='submit'>{currentdata ? "login" : "signup"}</button>
                    </div>
                    <div className="bottom">
                        <span>create account {currentdata ? <i onClick={() => setCurrentData(false)}>sign Up</i> : <i onClick={() => setCurrentData(true)}>Login</i>}</span>
                        <button>Forgott your password</button>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default LoginPopUp;