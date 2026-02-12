import React from 'react'
import './Personal_account.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Personal_account = () => {

  const Navigate = useNavigate()
  const Logout_handler = () => {
    toast.success("logout")
    setTimeout(() => {
      localStorage.removeItem("token")
      Navigate("/")

    }, 2000)
  }
  return (
    <div className='personal_account'>
      <div className="personal_account-container">
        <div className="upper-account-detail">
          <p>User Settings</p>
        </div>
        <div className="middle-account-detail">
          <button>Profile</button>
        </div>
        <div className="last-account-detail">
          <div className="name">
            <label htmlFor="">Name</label>
            <p>Md aadil</p>
          </div>
          <div className="mobile">
            <label htmlFor="">Mobile</label>
            <p>7488191669</p>
          </div>
          <div className="email"></div>
          <label htmlFor="">email</label>
          <p>mda231034@gmail.com</p>
        </div>
      </div>
      <button onClick={Logout_handler}>Logout</button>
    </div>
  )
}

export default Personal_account;