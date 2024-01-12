import React, { useState, useEffect, createContext } from "react";
import DropdownComponent from "./DropdownComponent";
import CardComponent from "./CardComponent";
import StatusComponent from "./StatusComponent";
import PriorityComponent from "./PriorityComponent";
const FirstName = createContext(); //create context
const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  //Group data
  const [groupData, setDataFromGroup] = useState(null);
  //order data
  const [orderData, setDataFromOrder] = useState(null);
  useEffect(() => {
   
  }, []); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const receiveDataFromGroup = (data) => {
    localStorage.setItem('grouping',JSON.stringify(data))
    setDataFromGroup(data);
  };

  const receiveDataFromOrder = (data) => {
    localStorage.setItem('ordering',JSON.stringify(data))
    setDataFromOrder(data);
  };

  return (
    <div>
      <DropdownComponent
        sendDataGroup={receiveDataFromGroup}
        sendDataOrder={receiveDataFromOrder}
      />

      {console.log(groupData)}
      <FirstName.Provider value={data}>
        {groupData === "user" ? (
          <CardComponent orderValue={orderData} />
        ) : groupData === "status" ? (
          <StatusComponent orderValue={orderData} />
        ) : groupData === "priority" ? (
          <PriorityComponent orderValue={orderData}/>
        ) : (
          console.log("null")
        )}
      </FirstName.Provider>
    </div>
  );
};

export { FirstName, App };
