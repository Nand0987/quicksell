// CardComponent.js
import React, { useContext, useState } from "react";
import "./CardComponent.css";
import { FirstName } from "./App";

const CardComponent = (props) => {
  const apiData = useContext(FirstName);
  const [tickets, setTickets] = useState(null);
  const arr = [];
  const userTicketDetails = [];

  // Iterate through each user
  apiData.users.forEach((user) => {
    // Filter tickets for the current user
    const userTickets = apiData.tickets.filter(
      (ticket) => ticket.userId === user.id
    );

    // Create an array to store ticket details for the current user
    const ticketsDetails = userTickets.map((ticket) => ({
      id: ticket.id,
      status: ticket.status,
      title: ticket.title,
      priority: ticket.priority,
    }));

    // Store user information and ticket details in the array
    userTicketDetails.push({
      userId: user.id,
      userName: user.name,
      ticketCount: userTickets.length,
      tickets: ticketsDetails,
    });
  });
  
  // Display the user information and ticket details array
  //   console.log(userTicketDetails[0].tickets);

  if (props.orderValue === "priority-desc") {
    userTicketDetails.forEach((val) => {
      val.tickets.sort((a, b) => b.priority - a.priority);
    });
  } else if (props.orderValue === "title-asc") {
    userTicketDetails.forEach((val) => {
      val.tickets.sort((a, b) => a.title.localeCompare(b.title));
    });
  }

  return (
    <div className="card-container">
      {/* Display user information and number of tickets */}
      {userTicketDetails.map((userDetail) => (
        <div className="user-section" key={userDetail.userId}>
          <div className="topdata">
          <img
            className="imagetohai"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVWPWfT0sAszoD_-yX42szfsOUkJJ_QU7wU6XzkgUENA&s"
          ></img>
          <h2 className="user-details"> {userDetail.userName}</h2>
          <p className="user-details">{userDetail.ticketCount}</p>
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
                    <div className="statusfinal">{ticket.status}</div>
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

export default CardComponent;
