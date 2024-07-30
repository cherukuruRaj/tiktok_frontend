import React, { useEffect, useState } from 'react';
import CountryFlag from 'react-country-flag';
import countryCodeLookup from 'country-code-lookup';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ReactPlayer from 'react-player';

export const Videocard = (props) => {
  const { obj, name, isCheckedImage, isCheckedVideo, setLike, setReply, setRetweet } = props;

  // Access properties of the obj object
  const { tweet_id, content, url, attached_media, reply_count, retweet_count, like_count } = obj;

  // console.log("this is the narrativeobj", obj)

  const [nameVisibility, setNameVisibility] = useState(true);
  const [ext, setExt] = useState('');
  const [contentDisplay, setContentDisplay] = useState(true);

  console.log(reply_count, retweet_count, like_count);

  useEffect(() => {
    if (name !== "NONE") {
      let isNameVisible = false;
      
    
      
      if (attached_media.length > 0 && attached_media[0].detected_faces) {
        attached_media[0].detected_faces.forEach((single) => {
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
    if (attached_media.length > 0 && attached_media[0].location) {
      const extension = attached_media[0].location.split('.').pop().toLowerCase();
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
    if (attached_media.length > 0 && attached_media[0].location) {
      if (ext === "mp4") {
        return (
          <ReactPlayer
            url={`https://1225507153-tiktok.s3.amazonaws.com/media-russia%26china/${attached_media[0].location}`}
            controls={true}
            width='100%'
            height='100%'
          />
        );
      } else if (ext === "png" || ext === "jpg") {
        return (
          <img
            src={`https://1225507153-tiktok.s3.amazonaws.com/media-russia%26china/${attached_media[0].location}`}
            alt="media"
            style={{ width: '100%', height: '100%' }}
          />
        );
      }
    }
    return null;
  };



  return (
    <>
      {true ? (
        <div className='flex flex-col gap-2 min-h-96 w-72 border-2 p-2'>
          <div className='rounded-lg'>
            {renderMedia()}
          </div>

          <div className='flex flex-col gap-4'>
            <a href={url} target='blank' className='pointer hover:underline text-blue-800'>Tweet Link</a>
            <p className='overflow-hidden max-h-24'>
              <span className='uppercase font-bold'>tweet - </span>{content}
            </p>
          </div>

          <div>
            <Popup trigger={<button> ... </button>} modal nested>
              {close => (
                <div className='modal'>
                  <div className='flex flex-col gap-2'>
                    <span className='font-bold uppercase text-2xl'>Summary: </span>
                    {attached_media.length > 0 && attached_media[0].generated_description &&
                      attached_media[0].generated_description.map((single, index) => (
                        <div key={index}>{single.attr_val}</div>
                      ))}
                  </div>

                  <div className='flex flex-col gap-2'>
                    <span className='font-bold uppercase text-2xl'>Transcription:  </span>
                    {attached_media.length > 0 && attached_media[0].captured_transcription &&
                      attached_media[0].captured_transcription.map((single, index) => (
                        <div key={index}>{single.attr_val}</div>
                      ))}
                  </div>

                  <div className='flex flex-col gap-2'>
                    <span className='font-bold uppercase text-2xl'>OCR: </span>
                    {attached_media.length > 0 && attached_media[0].captured_ocr &&
                      attached_media[0].captured_ocr.map((single, index) => (
                        <div key={index}>{single.attr_val}</div>
                      ))}
                  </div>

                  {/* <div className='flex flex-row flex-wrap gap-2'>
                    <span className='font-bold uppercase text-2xl'>Faces: </span>
                    {attached_media.length > 0 && attached_media[0].detected_faces &&
                      attached_media[0].detected_faces.map((single, index) => (
                        <div key={index}>{single.attr_val}</div>
                      ))}
                  </div>

                  <div className='flex flex-row gap-2'>
                    <span className='font-bold uppercase text-2xl'>Flags: </span>
                    {attached_media.length > 0 && attached_media[0].detected_flags &&
                      attached_media[0].detected_flags.map((single, index) => (
                        <div key={index}>{single.attr_val}</div>
                      ))}
                  </div>  */}
                  <div>
                    <button onClick={() => close()}>
                      Close
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
      ) : null}
    </>
  );
}
