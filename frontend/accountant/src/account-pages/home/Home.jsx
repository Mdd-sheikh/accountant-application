import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div className='home'>
      <div className="home-container">
        <div className="upper-container">

          <input title='search your item' type="search" placeholder='search' /><button><i class="fa-solid fa-magnifying-glass"></i></button>
         
        </div>
        <div className="display-box">
          <div className="header">
            <p>Summary from 06 Jan 2026 to 08 Feb 2026</p>
             <div className="calender-btn">
              <input type="date" name="" id="" />
          </div>
          </div>
          <div className="boxes">
            <div className="box-one">
              <p>sale</p>
              <p>0</p>
            </div>
            <div className="box-two">
              <p>Purchase</p>
              <p>0</p>
            </div>
            <div className="box-three">
              <p>Expenses</p>
              <p>0</p>
            </div>
            <div className="box-four">
              <p>Receipt</p>
              <p>0</p>
            </div>
            <div className="box-five">
              <p>Payments</p>
              <p>0</p>
            </div>
          </div>
        </div>

        <div className="middle-container">
          <div className="middle-container-box">
            <div className="mid-one"></div>
            <div className="mid-one"></div>
            <div className="mid-one"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;