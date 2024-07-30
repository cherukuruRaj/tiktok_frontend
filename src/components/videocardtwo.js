import React, { useEffect, useState } from 'react'
import CountryFlag from 'react-country-flag';
import countryCodeLookup from 'country-code-lookup';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { IoShareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";


import ReactPlayer from 'react-player';

export const Videocardtwo = (props) => {

  const { obj, name, isCheckedImage, isCheckedVideo } = props;

  // Access properties of the obj object
  const { tweet_id, content, url, attached_media, reply_count, retweet_count, like_count } = obj;

  const [nameVisibility, setNameVisibility] = useState(true);
  const [ext, setExt] = useState('');
  const [contentDisplay, setContentDisplay] = useState(true);

  // console.log("narrative obj", obj)

  // if(  attached_media && attached_media.attr_val.detected_faces.length > 0  ){
  //   attached_media.attr_val.detected_faces.forEach((single)=>{
  //     console.log("just detected faces", single.attr_val)
  //   })
  // }


    // if(name !== "NONE"){
    //   let isNameVisible = false;
    //   if(attached_media && attached_media.attr_val.detected_faces.length >0){
    //     attached_media.attr_val.detected_faces.map((single)=>{
    //       if(single.attr_val == name){
    //         isNameVisible = true;
    //         setNameVisibility(isNameVisible);
    //       }
    //     })
    //   }
    // }



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
      } 
      else{
        setNameVisibility(true);
      }
      
    }, [name, attached_media]);

    

  //   if(country){
  //     country=country.trim();
  //   }
    

  //   if (country === "Galápagos Islands") {
  //     country = "Ecuador"; // or handle it as needed
  // }

  // if(country =="Second Thomas Shoal"){
  //   country="Philippines"
  // }

  // if(country=="S. Korea"){
  //   country="South Korea"
  // }

  // let countryCode;
  

    
    
  //   if(country==="DRC"){
  //     countryCode="CD"
  //   }
  //   else if(country==="Congo"){
  //     countryCode="CG"
  //   }
  //   else {
  //     let countryData = countryCodeLookup.byCountry(country);
  //     countryCode= countryData?  countryData.iso2 : null;
  //   }

  //   if(country){
  //     country=country.toUpperCase();
  //   }
    



    
  // const mediaExists = attached_media && attached_media.location;
  // console.log(attached_media.location)


  useEffect(() => {
    if (attached_media && attached_media.location) {
      const extension = attached_media.location.split('.').pop().toLowerCase();
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
            width='100%'
            height='100%'
          />
        );
      } else if (ext === "png" || ext === "jpg") {
        return (
          <img
            src={`https://1225507153-tiktok.s3.amazonaws.com/media-russia%26china/${attached_media.location}`}
            alt="media"
            style={{ width: '100%', height: '100%' }}
          />
        );
      }
    }
    return null;
  };
    
    
  
  return ( <>
  { true   ? (
    <div className='flex flex-col gap-2 min-h-96 w-72 border-2 p-2'>
      <div className='rounded-lg'>
        {renderMedia()}
      </div>

      <div className='flex flex-col gap-4'>
        <a href={url} target='_blank' rel='noopener noreferrer' className='pointer hover:underline text-blue-800'>Tweet Link</a>
        <p className='overflow-hidden max-h-24'>
          <span className='uppercase font-bold'>tweet - </span>{content}
        </p>
      </div>

      <div>
        <Popup trigger={<button> <IoShareOutline />
          </button>} modal nested>
          {close => (
            <div className='modal'>


            <div className='flex flex-row justify-around'>

            <a href={url} target='_blank' rel='noopener noreferrer' className='pointer hover:underline text-blue-800'>Tweet Link</a>
            <div className='flex flex-row gap-1 items-center font-bold'>   <FaRegComment />
             <div>{reply_count}</div></div>

             

             <div className='flex flex-row gap-1 items-center font-bold'>   <FaRegHeart />
             <div>{like_count}</div></div>


             <div className='flex flex-row gap-1 items-center font-bold'>   <BiRepost size={20} />
             <div>{retweet_count}</div></div>

              </div>

              <div className='flex flex-col gap-2'>
                <span className='font-bold uppercase text-2xl'>Summary: </span>
                {attached_media && attached_media.attr_val.generated_description.length > 0
                  ? attached_media.attr_val.generated_description.map((single, index) => (
                      <div key={index}>{single.attr_val}</div>
                    ))
                  : <></>}
              </div>

              

              <div className='flex flex-col gap-2 '>
                  {attached_media && attached_media.attr_val.captured_transcription.length > 0 ? (
                    <>
                      <span className='font-bold uppercase text-2xl'>Transcription: </span>
                      {attached_media.attr_val.captured_transcription.map((single, index) => (
                        <div className="max-h-36 overflow-hidden" key={index}>{single.attr_val}</div>
                      ))}
                    </>
                  ) : null}
                </div>


                <div className='flex flex-col gap-2'>
                  {attached_media && attached_media.attr_val.captured_ocr.length > 0 ? (
                    <>
                      <span className='font-bold uppercase text-2xl'>OCR: </span>
                      {attached_media.attr_val.captured_ocr.map((single, index) => (
                        <div key={index}>{single.attr_val}</div>
                      ))}
                    </>
                  ) : null}
                </div>


              {/* <div className='flex flex-row gap-2'>
                <span className='font-bold uppercase text-2xl'>Faces: </span>
                {attached_media && attached_media.attr_val.detected_faces.length > 0
                  ? attached_media.attr_val.detected_faces.map((single, index) => (
                      <div key={index}>{single.attr_val}</div>
                    ))
                  : <></>}
              </div>

              <div className='flex flex-row gap-2'>
                <span className='font-bold uppercase text-2xl'>Flags: </span>
                {attached_media && attached_media.attr_val.detected_flags.length > 0
                  ? attached_media.attr_val.detected_flags.map((single, index) => (
                      <div key={index}>{single.attr_val}</div>
                    ))
                  : <></>}
              </div> */}

              <div>
                <button onClick={() => close()}>
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </div>
  ) : <></>}
</>
)

}
