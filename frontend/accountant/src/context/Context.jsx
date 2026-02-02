import { createContext, useState, useEffect } from "react";


export const Context = createContext(null)




const ContextProvider = ({ children }) => {
    const [IsMobile, setIsMobile] = useState(false)


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
        window.addEventListener("scroll", mobile_nav_oof)

        return () => removeEventListener("scroll", mobile_nav_oof)
    }, [])

    const value = {
        IsMobile,
        setIsMobile
    }

    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
}

export default ContextProvider;