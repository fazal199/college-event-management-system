import React, { createContext, useContext, useEffect, useState } from 'react'

const InternetContext = createContext({
    isInterConnected: true
});

const InterStatusWrapper = ({ children }: any) => {

    const [isInterConnected, setIsInterConnected] = useState(true);

    useEffect(() => {
        window.addEventListener("online", () => {
            setIsInterConnected(true)
        })
        window.addEventListener("offline", () => {
            setIsInterConnected(false);
        })

        return () => {
            window.removeEventListener("online", () => {
                setIsInterConnected(true)
            })

            window.removeEventListener("offline", () => {
                setIsInterConnected(false);
            })
        }
    }, []);

    return (
        <InternetContext.Provider value={{ isInterConnected }}>
            {children}
        </InternetContext.Provider>
    )
}

const useInternet = () => {
    return useContext(InternetContext);
}

export { InterStatusWrapper, useInternet }
