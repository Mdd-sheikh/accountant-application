import React from 'react'
import './Accounting.css'
import Landing_navbar from '../../landing-page/navbar/Landing_navbar'
import { Context } from '../../context/Context'
import { useContext } from 'react'

const Accounting = () => {

  const {showLoginPopUp, setShowLoginPopUp} = useContext(Context)
  return (
    <>
      <Landing_navbar setShowLoginPopUp={setShowLoginPopUp} />
      <div>Accounting</div>
    </>
  )
}

export default Accounting;