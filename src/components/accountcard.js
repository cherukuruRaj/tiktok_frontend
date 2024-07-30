import React from "react";
import { Custombutton } from "./custombutton";

export const Accountcard = (props) => {
  const { obj } = props;

  const {
    name,
    description,
    follower_count,
    following_count,
    likes,
    avatar,
    uniqueId,
  } = obj;

  return (
    <div className="flex flex-col">
      <div className="flex gap-8 p-3">
        <div>
          <img
            src={`https://1225507153-tiktok.s3.amazonaws.com/dps/${uniqueId}.jpeg`}
            style={{ width: "150px", height: "150px" }}
            className="rounded-full"
          ></img>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-4xl">{name}</h1>
          <p className="font-bold">{name}</p>
          <Custombutton text="FOLLOW" />
        </div>
      </div>

      <div className="flex gap-6 m-2">
        <div className="flex gap-1">
          <p className="font-bold">{following_count.toLocaleString("en-US")}</p>
          <p>Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-bold">{follower_count.toLocaleString("en-US")}</p>
          <p>Followers</p>
        </div>
        <div className="flex gap-1">
          <p className="font-bold">{likes.toLocaleString("en-US")}</p>
          <p>Likes</p>
        </div>
      </div>

      <div className="">{description}</div>
    </div>
  );
};
