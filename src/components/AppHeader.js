import React from "react";
import { Flex, Image, Layout, Typography } from "antd";
import MagiEye from "../assets/icons/magi-eye.svg";
import MagiText from "../assets/icons/magi.svg";
import StyxLogo from "../assets/icons/styx-logo.svg";
const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header className="flex items-center justify-between p-0 bg-[#1E1E28]">
      <Flex align="center" className="h-full">
        <Flex align="center" className="h-full bg-[#404157] px-6 mr-4">
          <Image src={StyxLogo} preview={false} width={120}></Image>
        </Flex>
        <Typography>
          <Typography.Title
            level={4}
            className="!mb-0 !text-white/[0.45] !text-lg"
          >
            Russia / China CAMP - Media Index
          </Typography.Title>
        </Typography>
      </Flex>
      <Flex align="center" className="px-6" gap={4}>
        <Image src={MagiEye} preview={false}></Image>
        <Image src={MagiText} preview={false}></Image>
      </Flex>
    </Header>
  );
};

export default AppHeader;
