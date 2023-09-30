
'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

type GlobalDataType = {
    staffid?: number;
    username?:string;
}

interface ContextProps {
    userId: number,
    setUserId: Dispatch<SetStateAction<number>>,
    data?: GlobalDataType[],
    setData: Dispatch<SetStateAction<GlobalDataType[]>>
}

const GlobalContext = createContext<ContextProps>({
    userId: 0,
    setUserId: (): number  => 0,
    data: [],
    setData: (): GlobalDataType[] => [] 
})

export const GlobalContextProvider = ({ children }) => {
    const [userId, setUserId] = useState(0);
    const [data, setData] = useState<[] | GlobalDataType[]>([]);
    
    return (
        <GlobalContext.Provider value={{ userId, setUserId, data, setData }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);