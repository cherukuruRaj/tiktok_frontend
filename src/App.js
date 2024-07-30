import React from "react";
import { Route, Routes } from "react-router-dom";
import { Videopage } from "./pages/videopage.js";
import { Accounts } from "./pages/accounts.js";
import image from "./images/logo.png";
import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import CountryFlag from "react-country-flag";
import { ConfigProvider, Flex, Image, Layout, Typography, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";

function App() {
  const [color, setColor] = useState("videos");

  const [totallikes, setTotalLikes] = useState(0);
  const [totalShares, setTotalShares] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalVideos, setTotalVideos] = useState(0);

  const [reply, setReply] = useState(0);
  const [retweet, setRetweet] = useState(0);
  const [like, setLike] = useState(0);

  const [stance, setStance] = useState({});
  let pos;
  let neg;
  if (stance) {
    pos = stance.imagepos;
    neg = stance.imageneg;
  }

  const russiachinaflag =
    "data:image/jpeg;base64,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";

  return (
    <>
      <ConfigProvider
        theme={{
          // 1. Use dark algorithm
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Layout className="bg-black h-screen">
          <AppHeader />
          <AppContent />
        </Layout>
        {/* <div className=" h-[100vh] bg-white text-black  ">
          <div className="header border-b p-4 flex gap-5 items-center mb-3 ">
            <img className="rounded-full" src={image} width={150} height={80} />
            <img width={40} src={russiachinaflag}></img>

            <div className="text-2xl font-bold">
              Russia / China CAMP - Media Index
            </div>
            <div></div>
          </div>

          <div className="h-[90%] flex gap-2 sticky top-0 z-20">
            <div className="  w-2/12 flex flex-col gap-5  ">
              <div className="text-2xl font-bold p-4 flex flex-col gap-8 sticky top-2 z-10   ">
                <div className="flex flex-col gap-3">
                  <div>
                    <Popup
                      trigger={
                        <button className="border-4 border-black border-2 p-6 rounded-md font-bold text-2xl bg-green-600 w-48 ">
                          Stances
                        </button>
                      }
                      modal
                      nested
                    >
                      {(close) => (
                        <div className="modal">
                          <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-4">
                              <div>Postive Stance</div>
                              <img
                                width={600}
                                height={600}
                                src={`https://1225507153-tiktok.s3.amazonaws.com/media-russia%26china/${pos}`}
                                alt="Positive Narrative"
                              />
                            </div>

                            <div className="flex flex-col gap-4">
                              <div>Negative Stance</div>
                              <img
                                width={600}
                                height={600}
                                src={`https://1225507153-tiktok.s3.amazonaws.com/media-russia%26china/${neg}`}
                                alt="Negative Narrative"
                              />
                            </div>
                          </div>
                          <div>
                            <button onClick={() => close()}></button>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </div>
                </div>

                <div className="flex flex-col gap-1 justify-center items-center border border-black border-2 p-2">
                  <div>REPLIES</div>
                  <div>{reply.toLocaleString("en-US")}</div>
                </div>

                <div className="flex flex-col gap-1 justify-center items-center border border-black border-2 p-2">
                  <div>LIKES</div>
                  <div>{like.toLocaleString("en-US")}</div>
                </div>

                <div className="flex flex-col gap-1 justify-center items-center border border-black border-2 p-2">
                  <div>RETWEETS</div>
                  <div>{retweet.toLocaleString("en-US")}</div>
                </div>
              </div>
            </div>

            <div className=" w-11/12">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Videopage
                      setReply={setReply}
                      setLike={setLike}
                      setRetweet={setRetweet}
                      setStance={setStance}
                    />
                  }
                />
                <Route path="/accounts" element={<Accounts />}></Route>
              </Routes>
            </div>
          </div>
        </div> */}
      </ConfigProvider>
    </>
  );
}

export default App;
