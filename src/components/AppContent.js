import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Flex,
  Image,
  Layout,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import {
  narrativefacefilter,
  narrativeflagfilter,
  topicfacefilter,
  topicflagfilter,
  topics,
  topNarratives,
} from "../assets/staticData/dropdownData";
import StatCard from "./shared/StatCard.js";
import { Option } from "antd/es/mentions/index";
import { Videocardtwo } from "./videocardtwo.js";
import Masonry from "react-masonry-css";
const { Content } = Layout;

const AppContent = () => {
  const [reply, setReply] = useState(0);
  const [retweet, setRetweet] = useState(0);
  const [like, setLike] = useState(0);
  const [objects, setObjects] = useState([]);
  const [filter, setFilter] = useState("Topic");
  const [narrativeFilter, setNarrativefilter] = useState("Narrative");
  const [name, setName] = useState("Faces");
  const [flag, setFlag] = useState("flags");
  const [isCheckedVideo, setIsCheckedVideo] = useState(true);
  const [isCheckedImage, setIsCheckedImage] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [stance, setStance] = useState({});
  let pos;
  let neg;
  if (stance) {
    pos = stance.imagepos;
    neg = stance.imageneg;
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const backendUrl = process.env.REACT_APP_REACT_BACKEND_API;

  async function fetchData() {
    try {
      console.log("this is the filter we are sending", filter);
      let response;
      if (filter !== "Topic" && narrativeFilter === "Narrative") {
        response = await fetch(
          `${backendUrl}/api/v1/topic?filter=${filter}&narrativeFilter=${narrativeFilter}&name=${name}&flag=${flag}&isCheckedVideo=${isCheckedVideo}&isCheckedImage=${isCheckedImage}`
        );
      } else {
        response = await fetch(
          `${backendUrl}/api/v1/topic?filter=${filter}&narrativeFilter=${narrativeFilter}&name=${name}&flag=${flag}&isCheckedVideo=${isCheckedVideo}&isCheckedImage=${isCheckedImage}`
        );
      }
      console.log("this is how the response looks like");
      const { tweets, reply, retweets, likes, stance } = await response.json();
      setObjects(tweets);
      setStance(stance[0]);
      setReply(reply);
      setLike(likes);
      setRetweet(retweets);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  const handleFilterChange = async (val) => {
    const selectedFilter = val;
    setFilter(selectedFilter);
    setNarrativefilter("Narrative");
    setName("Faces");
    setFlag("flags");
  };

  const handleNarrativeChange = async (val) => {
    const selectedFilter = val;
    setNarrativefilter(selectedFilter);
    setFilter("Topic");
    setName("Faces");
    setFlag("flags");
  };

  const handleNameChange = async (val) => {
    const selectedFilter = val;
    setName(selectedFilter);
    setFlag("flags");
  };

  const handleFlagChange = (val) => {
    const selectedFilter = val;
    setFlag(selectedFilter);
    setName("Faces");
  };

  useEffect(() => {
    fetchData();
  }, [filter, narrativeFilter, isCheckedImage, isCheckedVideo, name, flag]);

  return (
    <Content className="flex flex-col items-center px-24 pt-10">
      {/* <Flex justify="space-between" align="center" className="w-full mb-6"> */}
      <Row className="w-full mb-6" align={"middle"} gutter={24}>
        <Col span={16}>
          <Row justify={"space-between"} align={"middle"} className="mr-7">
            <Col span={5}>
              <Select
                showSearch
                placeholder="Select an option"
                style={{ width: "200px", backgroundColor: "black" }}
                value={filter}
                onChange={handleFilterChange}
                popupMatchSelectWidth={false}
              >
                {topics.map((topic, index) => (
                  <Option key={index} value={topic}>
                    {topic === "Topic" ? "TOPICS" : topic}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={5}>
              <Select
                showSearch
                placeholder="Select an option"
                style={{ width: "200px", backgroundColor: "black" }}
                value={narrativeFilter}
                onChange={handleNarrativeChange}
                popupMatchSelectWidth={false}
              >
                {topNarratives.map((option, index) => (
                  <Option key={option} value={option}>
                    {option === "Narrative" ? "Top Narratives" : option}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={5}>
              <Select
                showSearch
                placeholder="Select an option"
                style={{ width: "200px", backgroundColor: "black" }}
                value={name}
                onChange={handleNameChange}
              >
                {filter !== "Topic" && narrativeFilter === "Narrative" ? (
                  topicfacefilter[filter] ? (
                    topicfacefilter[filter].map((name, index) => (
                      <Option key={index} value={name.value}>
                        {name.name === "Faces" ? "FACES" : name.name}
                        {name.number && (
                          <span className="text-blue-500">{`  {${name.number}}`}</span>
                        )}
                      </Option>
                    ))
                  ) : (
                    <Option value="Faces">FACES</Option>
                  )
                ) : narrativefacefilter[narrativeFilter] ? (
                  narrativefacefilter[narrativeFilter].map((name, index) => (
                    <Option key={index} value={name.value}>
                      {name.name === "Faces" ? "FACES" : name.name}
                      {name.number && (
                        <span className="text-blue-500">{`  {${name.number}}`}</span>
                      )}
                    </Option>
                  ))
                ) : (
                  <Option value="Faces">FACES</Option>
                )}
              </Select>
            </Col>
            <Col span={5}>
              <Select
                showSearch
                placeholder="Select an Option"
                style={{ width: "200px", backgroundColor: "black" }}
                value={flag}
                onChange={handleFlagChange}
                popupMatchSelectWidth={false}
              >
                {filter !== "Topic" && narrativeFilter === "Narrative" ? (
                  topicflagfilter[filter] ? (
                    topicflagfilter[filter].map((name, index) => (
                      <Option key={index} value={name.value}>
                        {name.name === "Flags" ? "FLAGS" : name.name}
                        {name.number && (
                          <span className="text-blue-500">{`  {${name.number}}`}</span>
                        )}
                      </Option>
                    ))
                  ) : (
                    <Option value="flags">FLAGS</Option>
                  )
                ) : narrativeflagfilter[narrativeFilter] ? (
                  narrativeflagfilter[narrativeFilter].map((name, index) => (
                    <Option key={index} value={name.value}>
                      {name.name === "Flags" ? "FLAGS" : name.name}
                      {name.number && (
                        <span className="text-blue-500">{`  {${name.number}}`}</span>
                      )}
                    </Option>
                  ))
                ) : (
                  <Option value="flags">FLAGS</Option>
                )}
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row justify={"space-between"} align={"middle"}>
            <Col span={4}>
              <Checkbox
                checked={isCheckedVideo}
                onChange={(e) => {
                  setIsCheckedVideo(e.target.checked);
                }}
              >
                Videos
              </Checkbox>
            </Col>
            <Col span={4}>
              <Checkbox
                checked={isCheckedImage}
                onChange={(e) => {
                  setIsCheckedImage(e.target.checked);
                }}
              >
                Images
              </Checkbox>
            </Col>
            <Col span={12}>
              <Button type="primary" className="w-full" onClick={showModal}>
                Stances
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row
        className="w-full mb-10"
        align={"middle"}
        justify={"space-between"}
        gutter={24}
      >
        <Col span={8}>
          <StatCard title="Replies" count={reply} />
        </Col>
        <Col span={8}>
          <StatCard title="Likes" count={like} />
        </Col>
        <Col span={8}>
          <StatCard title="Retweets" count={retweet} />
        </Col>
      </Row>

      {/* Below one is not styled yet */}
      {/* <Row justify="center" className="overflow-auto w-full" gutter={24}> */}
      <Masonry
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {objects.map((obj, index) => (
          <Videocardtwo
            key={index}
            obj={obj}
            name={name}
            isCheckedImage={isCheckedImage}
            isCheckedVideo={isCheckedVideo}
          />
        ))}
      </Masonry>
      {/* </Row> */}

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={"40%"}
        height={"80%"}
      >
        <Flex vertical className="mb-6">
          <Typography.Title level={5}>Positive Stance</Typography.Title>
          {pos ? (
            <Image
              preview={false}
              src={`https://1225507153-tiktok.s3.amazonaws.com/media-russia%26china/${pos}`}
              alt="Positive Stance"
              fallback="No Image Found"
            />
          ) : (
            <Typography.Text className="flex justify-center items-center text-center text-red-400 min-h-24">
              No stance found. Please select filter.
            </Typography.Text>
          )}
        </Flex>
        <Flex vertical>
          <Typography.Title level={5}>Negative Stance</Typography.Title>
          {neg ? (
            <Image
              preview={false}
              src={`https://1225507153-tiktok.s3.amazonaws.com/media-russia%26china/${neg}`}
              alt="Negative Stance"
              fallback="No Image Found"
            />
          ) : (
            <Typography.Text className="flex justify-center items-center text-center text-red-400 min-h-24">
              No stance found. Please select filter.
            </Typography.Text>
          )}
        </Flex>
      </Modal>
    </Content>
  );
};

export default AppContent;
