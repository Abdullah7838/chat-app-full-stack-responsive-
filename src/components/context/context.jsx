// MainContext.js or MainProvider.js (depending on your file structure)
import React, { createContext, useState, useEffect } from "react";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
    const [id, setID] = useState(localStorage.getItem('id') || '');
    const [islogin, setLogin] = useState(() => {
        return localStorage.getItem('islogin') === 'true';
    });
    const [name, setName] = useState(localStorage.getItem('name') || '');

    useEffect(() => {
        localStorage.setItem('id', id);
        localStorage.setItem('islogin', islogin);
        localStorage.setItem('name', name);
    }, [id, islogin, name]);

    const value = { id, setID, islogin, setLogin, name, setName };

    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    );
};
