// CardComponent.js
import React, { useContext, useState } from "react";
import "./CardComponent.css";
import "./priotry.css";
import { FirstName } from "./App";

const PriorityComponent = (props) => {
  const apiData = useContext(FirstName);
  const priorityArray = [];
  const obj = {
    0: "No priority",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Urgent",
  };

  // Calculate priority array
  const calculatePriorityArray = () => {
    const priorityArrayMap = {};

    apiData.tickets.forEach((ticket) => {
      const priority = ticket.priority;
      if (!priorityArrayMap[priority]) {
        priorityArrayMap[priority] = {
          count: 0,
          tickets: [],
        };
      }

      priorityArrayMap[priority].count += 1;
      priorityArrayMap[priority].tickets.push({
        id: ticket.id,
        title: ticket.title,
        tag: ticket.tag,
        priority: ticket.priority,
      });
    });

    for (const [priority, data] of Object.entries(priorityArrayMap)) {
      priorityArray.push({ priority: parseInt(priority), ...data });
    }
  };

  // Fetch and display priority array
  calculatePriorityArray();
  if (props.orderValue === "priority-desc") {
    priorityArray.forEach((val) => {
      val.tickets.sort((a, b) => b.priority - a.priority);
    });
  } else if (props.orderValue === "title-asc") {
    priorityArray.forEach((val) => {
      val.tickets.sort((a, b) => a.title.localeCompare(b.title));
    });
  }
  return (
    <div className="card-container">
      {priorityArray.map((userDetail) => (
        <div className="user-section">
          <div className="topdata">
            <img
              className="imagetohai"
              src="https://pic.onlinewebfonts.com/thumbnails/icons_225549.svg"
            ></img>
            <h2 className="user-details">{obj[userDetail.priority]}</h2>
            <p className="user-details">{userDetail.count}</p>
          </div>
          {/* Display ticket data in cards for the user */}
          {userDetail.tickets.map((ticket) => (
            <div className="card" key={ticket.id}>
              <div className="top">
                <div className="userID">{ticket.id}</div>
                <img
                  src="https://media.licdn.com/dms/image/D4E0BAQG-i2j7Q2WFIA/company-logo_200_200/0/1694593112031/img_logo?e=2147483647&v=beta&t=o1304VK0Zbh3CBA-8_LNYNZZCNrQjMIBS-nwKrAMzbY"
                  width="30px"
                  alt="Logo"
                  class="cardimage"
                />
              </div>
              <div className="bottom">
                <div className="title">{ticket.title}</div>
                <div className="status">
                  <div className="statusimage">
                    {/* Add logic for displaying the correct status image */}
                    {/* Assuming "finalSvg" is the path to the status image */}
                    <img className="image" src="Final.svg" alt="Status" />
                  </div>
                  <div className="statusfind">
                    <div className="cir"></div>
                    <div className="statusfinal">{ticket.tag}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PriorityComponent;
