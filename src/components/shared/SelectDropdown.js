import React from "react";
import { Select } from "antd";
import { Option } from "antd/es/mentions";

const SelectDropdown = (props) => {
  //   const handleChange = (value) => {
  //     props.onChange(value);
  //   };

  return (
    <Select
      showSearch
      placeholder="Select an option"
      style={{ width: "180px", backgroundColor: "black" }}
      defaultValue={props.options[0]}
      onChange={(val) => props.onChange(val)}
    >
      {props.options.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

export default SelectDropdown;
