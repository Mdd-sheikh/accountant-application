import axios from "axios";
import { createContext, useState, useEffect } from "react";


export const Context = createContext(null);




const ContextProvider = ({ children }) => {

    // signature data send to backend for create a invoice 
    const [signatureMainData, setsignatureMainData] = useState(null)

    // company data send to backend for make invoice
    const [companyMainData, setcompnayMainData] = useState(null)

    // for create a invoice
    const [customerData, setCustomerData] = useState(null)
    const [itemData, setItemData] = useState(null)

    // for sidebar open and close
    const [IssidebarOpen, setIsSidebarOpen] = useState(true);
    //------------------------------------------------------

    // for mobile -----------------------------------
    const [IsMobile, setIsMobile] = useState(false);
    //------------------------------------------

    // for api Url------------------------------------
    const API_URL = "https://accountant-application-4-ucz4.onrender.com/api";
    //---------------------------------------

    // for login popup sate -------------------------------------------
    const [showLoginPopUp, setShowLoginPopUp] = useState(false);
    //-----------------------------------------------------------------


    const [collapse, setCollapse] = useState(false);
    const [salesOpen, setSalesOpen] = useState(false);
    const [UserCustomerData, setUserCustomerData] = useState([]);


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
        window.addEventListener("scroll", mobile_nav_oof)

        return () => removeEventListener("scroll", mobile_nav_oof)



    }, [])




    const value = {
        IsMobile,
        setIsMobile,
        API_URL,
        showLoginPopUp,
        setShowLoginPopUp,
        IssidebarOpen,
        setIsSidebarOpen,
        collapse,
        setCollapse,
        salesOpen,
        setSalesOpen,
        UserCustomerData,
        setUserCustomerData,
        customerData,
        setCustomerData,
        itemData,
        setItemData,
        companyMainData,
        setcompnayMainData,
        signatureMainData,
        setsignatureMainData
    }



    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
}

export default ContextProvider;