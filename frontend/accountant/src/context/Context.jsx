import axios from "axios";
import { createContext, useState, useEffect } from "react";


export const Context = createContext(null)




const ContextProvider = ({ children }) => {
    // for sidebar open and close
    const [IssidebarOpen, setIsSidebarOpen] = useState(true);
//------------------------------------------------------

    // for mobile -----------------------------------
    const [IsMobile, setIsMobile] = useState(false)
    //------------------------------------------

    // for api Url------------------------------------
    const API_URL = "https://accountant-application-4-ucz4.onrender.com/api"
    //---------------------------------------

    // for login popup sate -------------------------------------------
    const [showLoginPopUp, setShowLoginPopUp] = useState(false)
    //-----------------------------------------------------------------



    const [Userdata,setUserdata] = useState([])



    // for get Userdata and match password and email for login and signup

    const getData_Handler = async()=>{
       try {
        const response = await axios.get(`${API_URL}/user/userdata`)
       setUserdata(response.data.data)
       } catch (error) {
         console.log("error to fetch",error);
         
       }

    }


    // for navbaar sticky----------------------------------------------------
    const mobile_nav_oof = () => {
        const navbar = document.getElementById("navbar")
        if (window.scrollY > 330) {
            navbar.classList.add("nav-active")
        }
        else {
            navbar.classList.remove("nav-active")
        }
    }
    useEffect(() => {

         //calling getuserdata_handler function
          getData_Handler()
        window.addEventListener("scroll", mobile_nav_oof)

        return () => removeEventListener("scroll", mobile_nav_oof)

         

    }, [])


    //--------------------------------------------------------------------------------

    const value = {
        IsMobile,
        setIsMobile,
        API_URL,
        showLoginPopUp, 
        setShowLoginPopUp,
        IssidebarOpen, 
        setIsSidebarOpen,
        Userdata,
        setUserdata
    }

    

    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
}

export default ContextProvider;