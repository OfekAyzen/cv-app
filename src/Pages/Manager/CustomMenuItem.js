import React from "react";
import MenuItem from "@mui/material/MenuItem";

const CustomMenuItem = ({ label, value, handleChange }) => {
  return (
    <MenuItem
      value={sortByField}
      onChange={(e) => handleSortByChange(e.target.value)}
    >
      {label}
    </MenuItem>
  );
};

export default CustomMenuItem;
