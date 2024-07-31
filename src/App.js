import React from "react";
import "reactjs-popup/dist/index.css";
import { ConfigProvider, Layout, theme } from "antd";
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";
import "./App.css";

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Layout className="bg-black h-screen">
        <AppHeader />
        <AppContent />
      </Layout>
    </ConfigProvider>
  );
}

export default App;
