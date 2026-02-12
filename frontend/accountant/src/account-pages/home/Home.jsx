import React from 'react'
import './Home.css'
import { useContext } from 'react'
import { Context } from '../../context/Context'

const Home = () => {

  const { IssidebarOpen, setIsSidebarOpen } = useContext(Context)
  return (
    <div className='home'>
      <div className="home-container">
        <div className="upper-container">
          <button className='menubar-dashboard' onClick={() => setIsSidebarOpen(prev => !prev)}><i class="fa-solid fa-bars"></i></button>
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
              <p>Sale</p>
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
            <div className="mid-one">
              <p>Recent transaction</p>
              <div className="recent-transaction">
                <span>Recent Transaction</span>
              </div>
            </div>
            <div className="mid-two">
              <div className="amount-received">
                <p>Amounts Receivable</p>
                <p>0.00 CR</p>
              </div>
              <div className="amount-receavable">
                <span>Recent Transaction</span>
              </div>
            </div>
            <div className="mid-three">
              <div className="amount-payable">
                <p>Amount Payable</p>
                <p>0.00 CR</p>
              </div>
              <div className="amount-payable">
                <span>Recent Transaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;