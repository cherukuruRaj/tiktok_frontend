import { Flex, Typography, Statistic } from "antd";
import React from "react";

const StatCard = (props) => {
  return (
    <Statistic
      title={props.title}
      value={props.count}
      className="bg-[#141414] text-center w-1/3 mr-6 last-of-type:mr-0 p-4"
    />
  );
};

export default StatCard;
