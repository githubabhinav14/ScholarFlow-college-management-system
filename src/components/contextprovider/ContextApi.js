import React, { createContext, useContext, useState, useCallback } from "react";
import api from '../services/api';

const ContextApi = createContext(); 

//Creating a Context Provider
export const MySectionsContextProvider = ({ children }) => {

  const [mySections, setMySections] = useState(null);//creating a state for mySection

  //a callback function for fetching the sections of the currently logged in teacher and setting the mySections property
  const fetchAndSetMySectionsProperty = useCallback(async () => {
    try {
      const response = await api.get("/get_sections");//fetching the sections of the teacher
      setMySections(response.data);//setting the mySections
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },[]); // [] dependency array: will run this function only once when the component is mounted

  return (
    <ContextApi.Provider value={{mySections, fetchAndSetMySectionsProperty}} >{children}</ContextApi.Provider>
  );

};

//creating the function to use the context
export const useMyContext = () => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("useMyContext must be used within a ContextProvider");
  }
  return context;

};
