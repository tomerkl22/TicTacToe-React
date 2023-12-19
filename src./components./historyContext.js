import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
const HistoryContext = createContext(); 


export function HistoryProvider ({children})
{
    const[historyList, setHistoryList] = useState([]);

    const addToHistory = (item) =>{
        setHistoryList ((prevState) => [...prevState, item])
    };  
   
    useEffect(()=>{
        try {
            const lastElement = historyList[historyList.length - 1];
            const response = axios.put(`http://localhost:3000/update-data/`, lastElement);
          } catch (error) {
            console.error('Error updating data:', error.response ? error.response.data : error.message);
          }
    }, [historyList])

    // everything inside this provider will have access to the context
    return(
        <HistoryContext.Provider value = {{historyList, addToHistory}}> 
            {children}
        </HistoryContext.Provider>
    )
}

export default HistoryContext;
