import React from "react";

export const CustomSearch = ({ placeholder, onChange, value }) => {
  return (
    <div>
      <input
        type="search"
        value={value}
        placeholder={placeholder}
        style={{
          height: "40px",
          width: "100%",
          borderRadius: "8px",
          border: "1px solid #E6E7EA",
          padding: "12px",
          fontFamily: "jetbrains",
          outline: "none",
        }}
        onChange={onChange}
      />
    </div>
  );
};
