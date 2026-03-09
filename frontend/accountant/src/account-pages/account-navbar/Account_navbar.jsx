import React from 'react'
import './Account_navbar.css'
import { useContext } from 'react'
import { Context } from '../../context/Context'

const Account_navbar = () => {

    const { collapse, setCollapse} = useContext(Context)
  return (
    <div className='account_navbar'>
        <div className="account_navbar_container">
            <button onClick={() => setCollapse(!collapse)}><i className="fa-solid fa-bars"></i></button>
        </div>
    </div>
  )
}

export default Account_navbar;