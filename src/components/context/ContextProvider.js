import React, { createContext, useState } from 'react';

export const  adddata = createContext("");
export const  updateData = createContext("");
export const  delData = createContext("");

const ContextProvider = ({children}) => {

    const [udata , setudata] = useState("");
    const [updata , setupdata] = useState("");
    const [dltdata , setdltdata] = useState("");
      
  return (
    <adddata.Provider value={{udata , setudata}} >
    <updateData.Provider  value={{updata , setupdata}}>
    <delData.Provider  value={{dltdata , setdltdata}}>
      {children}         
    </delData.Provider>
      </updateData.Provider>
    </adddata.Provider>
  )
}

export default ContextProvider
