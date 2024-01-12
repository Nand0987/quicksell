// CardComponent.js
import React, { useContext, useState } from "react";
import "./CardComponent.css";
import "./status.css";
import { FirstName } from "./App";

const StatusComponent = (props) => {
  const apiData = useContext(FirstName);
  const statusArray = [];

  // Calculate status array
  const calculateStatusArray = () => {
    const statusArrayMap = {};

    apiData.tickets.forEach((ticket) => {
      const status = ticket.status;
      if (!statusArrayMap[status]) {
        statusArrayMap[status] = {
          count: 0,
          tickets: [],
        };
      }

      statusArrayMap[status].count += 1;
      statusArrayMap[status].tickets.push({
        id: ticket.id,
        title: ticket.title,
        tag: ticket.tag,
        priority: ticket.priority,
      });
    });

    for (const [status, data] of Object.entries(statusArrayMap)) {
      statusArray.push({ status, ...data });
    }
  };

  // Fetch and display status array
  calculateStatusArray();

  if (props.orderValue === "priority-desc") {
    statusArray.forEach((val) => {
      val.tickets.sort((a, b) => b.priority - a.priority);
    });
  } else if (props.orderValue === "title-asc") {
    statusArray.forEach((val) => {
      val.tickets.sort((a, b) => a.title.localeCompare(b.title));
    });
  }

  return (
    <div className="card-container">
      {statusArray.map((userDetail) => (
        <div className="user-section">
          <div className="topData">
            <h2 className="user-details">{userDetail.status}</h2>
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

export default StatusComponent;
