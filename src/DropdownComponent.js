import React, { useState } from "react";
import "./DropDown.css";
const DropdownComponent = (props) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const selectGroup = (event) => {
    props.sendDataGroup(event.target.value);
  };

  const selectOrder = (event) => {
    props.sendDataOrder(event.target.value);
  };

  return (
    <div className="dropdown-container">
      <button
        id="display-button"
        className="dropdown-toggle"
        onClick={toggleDropdown}
      >
        Display
      </button>
      <ul
        className={`ulcard dropdown-menu ${isDropdownVisible ? "visible" : ""}`}
      >
        {isDropdownVisible && (
          <>
            <li className="dropdown-item">
              <label>Grouping </label>
              <select id="grouping-dropdown" onClick={selectGroup}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </li>
            <li className="dropdown-item">
              <label>Ordering</label>
              <select id="ordering-dropdown" onClick={selectOrder}>
                <option value="priority-desc">Priority </option>
                <option value="title-asc">Title </option>
              </select>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default DropdownComponent;
