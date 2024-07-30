import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { IoShareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import "./videocardtwo.css";

import ReactPlayer from "react-player";

export const Videocardtwo = (props) => {
  const { obj, name, isCheckedImage, isCheckedVideo } = props;

  // Access properties of the obj object
  const {
    content,
    url,
    attached_media,
    reply_count,
    retweet_count,
    like_count,
  } = obj;

  const [, setNameVisibility] = useState(true);
  const [ext, setExt] = useState("");
  const [, setContentDisplay] = useState(true);

  useEffect(() => {
    if (name !== "NONE") {
      let isNameVisible = false;

      if (attached_media && attached_media.attr_val.detected_faces.length > 0) {
        attached_media.attr_val.detected_faces.forEach((single) => {
          if (single.attr_val === name) {
            isNameVisible = true;
          }
        });
      }

      setNameVisibility(isNameVisible);
    } else {
      setNameVisibility(true);
    }
  }, [name, attached_media]);
  useEffect(() => {
    if (attached_media && attached_media.location) {
      const extension = attached_media.location.split(".").pop().toLowerCase();
      setExt(extension);
    }
  }, [attached_media]);

  useEffect(() => {
    const display = () => {
      if (isCheckedVideo && isCheckedImage) {
        if (ext === "mp4" || ext === "jpg") {
          setContentDisplay(true);
        } else {
          setContentDisplay(false);
        }
      } else if (isCheckedVideo && !isCheckedImage) {
        if (ext === "mp4") {
          setContentDisplay(true);
        } else {
          setContentDisplay(false);
        }
      } else if (isCheckedImage && !isCheckedVideo) {
        if (ext === "jpg") {
          setContentDisplay(true);
        } else {
          setContentDisplay(false);
        }
      } else {
        setContentDisplay(true);
      }
    };

    display();
  }, [ext, isCheckedImage, isCheckedVideo]);

  const renderMedia = () => {
    if (attached_media) {
      if (ext === "mp4") {
        return (
          <ReactPlayer
            url={`https://1225507153-tiktok.s3.amazonaws.com/media-russia%26china/${attached_media.location}`}
            controls={true}
            width="100%"
            height="100%"
          />
        );
      } else if (ext === "png" || ext === "jpg") {
        return (
          <img
            src={`https://1225507153-tiktok.s3.amazonaws.com/media-russia%26china/${attached_media.location}`}
            alt="media"
            style={{ width: "100%", height: "100%" }}
          />
        );
      }
    }
    return null;
  };

  return (
    <>
      {true ? (
        <div className="flex flex-col gap-2 min-h-96 w-72 border-[#303030] border-[1px] rounded-lg p-2 overflow-y-auto">
          <div className="rounded-lg">{renderMedia()}</div>

          <div className="flex flex-col gap-4">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer hover:underline text-blue-800"
            >
              Tweet Link
            </a>
            <p className="overflow-y-auto max-h-24">
              <span className="uppercase font-bold">tweet - </span>
              {content}
            </p>
          </div>

          <Popup
            trigger={
              <button>
                <IoShareOutline />
              </button>
            }
            modal
            nested
            className="!border-none"
          >
            {(close) => (
              <div className="modal p-3 bg-[#1f1f1f] text-white rounded-lg">
                <div className="flex flex-row justify-around mb-6">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer hover:underline text-blue-400"
                  >
                    Tweet Link
                  </a>
                  <div className="flex flex-row gap-1 items-center font-bold">
                    <FaRegComment />
                    <div>{reply_count}</div>
                  </div>

                  <div className="flex flex-row gap-1 items-center font-bold">
                    <FaRegHeart />
                    <div>{like_count}</div>
                  </div>

                  <div className="flex flex-row gap-1 items-center font-bold">
                    <BiRepost size={20} />
                    <div>{retweet_count}</div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-6">
                  <span className="font-bold uppercase text-lg">Summary:</span>
                  {attached_media &&
                  attached_media.attr_val.generated_description.length > 0 ? (
                    attached_media.attr_val.generated_description.map(
                      (single, index) => (
                        <div key={index}>{single.attr_val}</div>
                      )
                    )
                  ) : (
                    <></>
                  )}
                </div>

                <div className="flex flex-col gap-2 mb-6 ">
                  {attached_media &&
                  attached_media.attr_val.captured_transcription.length > 0 ? (
                    <>
                      <span className="font-bold uppercase text-lg">
                        Transcription:
                      </span>
                      {attached_media.attr_val.captured_transcription.map(
                        (single, index) => (
                          <div className="max-h-36 overflow-hidden" key={index}>
                            {single.attr_val}
                          </div>
                        )
                      )}
                    </>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2">
                  {attached_media &&
                  attached_media.attr_val.captured_ocr.length > 0 ? (
                    <>
                      <span className="font-bold uppercase text-lg">OCR:</span>
                      {attached_media.attr_val.captured_ocr.map(
                        (single, index) => (
                          <div key={index}>{single.attr_val}</div>
                        )
                      )}
                    </>
                  ) : null}
                </div>

                <div>
                  <button onClick={() => close()}></button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
