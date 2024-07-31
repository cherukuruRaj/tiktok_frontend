import { Flex, Typography, Statistic } from "antd";
import React from "react";

const StatCard = (props) => {
  return (
    <Statistic
      title={props.title}
      value={props.count}
      className="bg-[#141414] rounded text-center w-full mr-6 last-of-type:mr-0 p-4"
    />
  );
};

export default StatCard;
