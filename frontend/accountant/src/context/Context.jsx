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

    const [invoiceDate, setInvoiceDate] = useState({
        date: new Date().toISOString().split("T")[0]
    })

    const [placeOfSupply, setplaceOfSupply] = useState("24 - Gujarat");

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


    // all get function

   

    const [invoices, setInvoices] = useState([]);
    const [UserCustomerData, setUserCustomerData] = useState([]);
    const [GetSignature, setGetSignature] = useState([]);
    const [companyList, setCompanyList] = useState([]);
    const [items, setItems] = useState([]);
    const [userinformation, setUserinformation] = useState({});
    const [animation, setanimation] = useState(false);
    

    // ✅ LOAD ALL DATA
    const loadAllData = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.log("No token found");
                return;
            }

            setanimation(true); // ✅ start loading

            const authConfig = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const [
                customerRes,
                itemRes,
                invoiceRes,
                companyRes,
                signatureRes,
                userres
            ] = await Promise.all([
                axios.get(`${API_URL}/customer/get`, authConfig),
                axios.get(`${API_URL}/items/get/item`, authConfig),
                axios.get(`${API_URL}/invoice/getinvoice`, authConfig),
                axios.get(`${API_URL}/company/get`, authConfig),
                axios.get(`${API_URL}/customer/signature/get`, authConfig),
                axios.get(`${API_URL}/user/profile`, authConfig)
            ]);

            // ✅ SAFE DATA SETTING
            setInvoices(invoiceRes.data?.Invoices || []);
            setUserCustomerData(customerRes.data?.customers || []);
            setItems(itemRes.data?.items || []);
            setCompanyList(companyRes.data?.companydata || []);
            setGetSignature(signatureRes.data?.data || []);
            setUserinformation(userres.data?.data || {});

        } catch (error) {
            console.log("LOAD ALL DATA ERROR 👉", error.response?.data || error.message);
        } finally {
            setanimation(false); // ✅ stop loading
        }
    };

    // ✅ AUTO LOAD WHEN TOKEN EXISTS
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            loadAllData();
        }
    }, []);







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
        setsignatureMainData,
        invoiceDate, setInvoiceDate,
        placeOfSupply, setplaceOfSupply,
        invoices, setInvoices,
        UserCustomerData, setUserCustomerData,
        GetSignature, setGetSignature,
        companyList, setCompanyList,
        items, setItems,
        animation, setanimation,
        userinformation, setUserinformation,
        loadAllData

    }



    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
}

export default ContextProvider;