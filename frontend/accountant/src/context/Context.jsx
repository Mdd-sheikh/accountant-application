import { createContext } from "react";


const Context = createContext(null)

const ContextProvider = ({ children }) => {
    const cheking = () => {
        console.log("hello context");

    }

    const value = {
        cheking
    }

    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
}

export default ContextProvider;