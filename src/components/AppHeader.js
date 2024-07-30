import React from "react";
import { Flex, Image, Layout, Typography } from "antd";
import MagiEye from "../assets/icons/magi-eye.svg";
import MagiText from "../assets/icons/magi.svg";
import Profile from "../assets/icons/profile.svg";
const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header className="flex items-center justify-between p-0">
      <Flex align="center" className="h-full">
        <Flex align="center" className="h-full bg-[#404157] px-4 mr-4">
          <Image src={MagiEye} preview={false}></Image>
          <Image src={MagiText} preview={false}></Image>
        </Flex>
        <Typography>
          <Typography.Title
            level={4}
            className="!mb-0 !text-white/[0.45] !text-lg"
          >
            SOCIAL PANEL
          </Typography.Title>
        </Typography>
      </Flex>
      <Flex>
        <Image src={Profile} preview={false} className="px-4"></Image>
      </Flex>
    </Header>
  );
};

export default AppHeader;
