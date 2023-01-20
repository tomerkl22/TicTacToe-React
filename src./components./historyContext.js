import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
const HistoryContext = createContext(); 

export function HistoryProvider ({children})
{
    const[historyList, setHistoryList] = useState([]);
    const addToHistory = (item) =>{
        setHistoryList ((prevState) => [...prevState, item])
        //console.log(historyList);
    };

    useEffect(()=>{
        axios.get('http://localhost:8080/').then(response => {
            let data =[];
            console.log(response.data);
            response.data.map(element => {
            data.push(element);
            });
            setHistoryList([...historyList,data]);
        })
        // I was to do keep in the localStorage...
        // let data = JSON.parse(localStorage.getItem("HISTORY"));
        // if(data)
        // {
        //     setHistoryList(data)
        // }
    }, [])
    
    useEffect(()=>{
        if(historyList.length > 0){
            //  localStorage.setItem("HISTORY", JSON.stringify(historyList));
            //  const lastGame = historyList[historyList.length - 1];
             axios.post('http://localhost:8080/', historyList);
            // const json = JSON.stringify({ answer: 42 });
            // const res = axios.post('http://localhost:3001/', json);

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
