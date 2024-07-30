import React, { useEffect, useState } from "react";
import { Custombutton } from "../components/custombutton";
import ReactPlayer from "react-player";
import { Videocard } from "../components/videocard";
import { TikTokEmbed } from "react-social-media-embed";
import CountryFlag from "react-country-flag";
import { Videocardtwo } from "../components/videocardtwo";

import {
  narrativefacefilter,
  narrativeflagfilter,
  topicfacefilter,
  topicflagfilter,
} from "../data";

export const Videopage = (props) => {
  const [objects, setObjects] = useState([]);
  const [narrativeObj, setNarrativeObj] = useState([]);

  const setReply = props.setReply;
  const setLike = props.setLike;
  const setRetweet = props.setRetweet;
  const setStance = props.setStance;

  const [name, setName] = useState("Faces");
  const [flag, setFlag] = useState("flags");

  const [isCheckedVideo, setIsCheckedVideo] = useState(true);
  const [isCheckedImage, setIsCheckedImage] = useState(true);

  const [filter, setFilter] = useState("Topic");
  const [narrativeFilter, setNarrativefilter] = useState("Narrative");
  const backendUrl = process.env.REACT_APP_REACT_BACKEND_API;

  // console.log("backend url", backendUrl)

  // const dispalyFilterNames= {
  //   "NONE" : "NONE",
  //   "mao_zedong": "Mao Zedong",
  //   "emmanuel_macron": "Emmanuel Macron",
  //   "viktor_orban": "Viktor Orbán",
  //   "lin_jian": "Lin Jian",
  //   "kim_jong": "Kim Jong-un",
  //   "vladimir_putin": "Vladimir Putin",
  //   "sergey_viktorovich": "Sergey Lavrov",
  //   "joe_biden": "Joe Biden",
  //   "dmitry_medvedev": "Dmitry Medvedev",
  //   "lloyd_austin": "Lloyd Austin",
  //   "jen_stoltenberg": "Jens Stoltenberg",
  //   "wu_qian": "Wu Qian",
  //   "melissa_biden": "Melissa Biden",
  //   "donald_trump": "Donald Trump",
  //   "justin_trudeau": "Justin Trudeau",
  //   "jens_stoltenberg": "Jens Stoltenberg",
  //   "xi_jinping": "Xi Jinping",
  //   "antony_blinken": "Antony Blinken",
  //   "jackson_hinkle": "Jackson",
  //   "charles_michel": "Charles Michel",
  //   "hunter_biden": "Hunter Biden",
  //   "jake_sullivan": "Jake Sullivan",
  //   "von_derLeyen": "Ursula von der Leyen",
  //   "volodymyr_zelenskyy": "Volodymyr Zelensky",
  //   "xi_jingping": "Xi Jinping",
  //   "Olaf Scholz": "Olaf Scholz",
  //   "sergei_shoigu": "Sergey Shoigu",
  //   "wang_yi": "Wang Yi",
  //   "john_kirby": "John Kirby",
  //   "diana_panchenko": "Diana Panchenko",
  //   "petr_pavel": "Petr Pavel",
  //   "maria_zakharova": "Maria Zakharova",
  //   "china": "China",
  //   "israel": "Israel",
  //   "ukraine": "Ukraine",
  //   "uk": "United Kingdom",
  //   "france": "France",
  //   "usa": "United States",
  //   "russia": "Russia",
  //   "eu": "European Union"
  // };

  // console.log(dispalyFilterNames.joe_biden)

  async function fetchData() {
    try {
      console.log("this is the filter we are sending", filter);
      let response;
      if (filter !== "Topic" && narrativeFilter == "Narrative") {
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
      // console.log(tweets);

      // console.log("this is how the body looks like")
      // console.log(videoInfo);
      setObjects(tweets);

      setStance(stance[0]);

      setReply(reply);
      setLike(likes);
      setRetweet(retweets);

      // props.setTotalLikes(total[0]);
      // props.setTotalComments(total[1]);
      // props.setTotalShares(total[2]);
      // props.setTotalVideos(total[3]);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, [filter, narrativeFilter, isCheckedImage, isCheckedVideo, name, flag]);

  //   const NUCLEAR = ["NONE", "Nuclear Tensions: Global Powers on the Brink"];
  //   const NAZISM = ["NONE", "Russia's Battle Against Nazism for Humanity", "Nazism in the Ukraine Conflict", "Nazism and the Bandera Ideology in Ukraine Conflict"];
  //   const CIVILIANS = ["NONE", "Civilians Impacted by Ukrainian Attacks in Crimea and Sevastopol"];
  //   const MERCENARIES = ["NONE", "Foreign Mercenaries in the Ukraine are Eliminated", "Mercenaries and Atrocities in Ukraine", "Laurent Brayard warns French Mercenaries in Ukraine"];
  //   const CORRUPT = ["NONE", "West is Corrupt and Causes Death in Ukraine Conflict", "Biden Family's Foreign Influence and Corruption"];
  //   const CONFLICT = ["NONE", "US has Double Standards in Global Conflicts", "US Rejects Peace Deal Despite Americans Desire"];
  //   const AGREEMENT = ["NONE", "Global Push for Ceasefire", "Swiss Peace Summit Highlights Divisions Over Ukraine War", "China's Advocacy for a Political Settlement in the Ukraine Crisis", "Key Nations Refuse to Sign Final Declaration"];
  //   const AID = ["NONE", "So-Called 'Humanitarian' Aid in Global Conflicts"];
  //   const CRIME = ["NONE", "Ukraine's Unit No. 110: Horrifying Crimes Against Humanity"];
  //   const ALLIANCE = ["NONE", "NATO will Punish China"];
  //   const DIPLOMACY = ["NONE", "Diplomatic Efforts for Peace in Nizhny Novgorod"];

  // const NONE= ["NONE"]

  const nf = [
    "Narrative",
    "Nuclear Tensions: Global Powers on the Brink",
    "Russia's Battle Against Nazism for Humanity",
    "Civilians Impacted by Ukrainian Attacks in Crimea and Sevastopol",
    "Nazism in the Ukraine Conflict",
    "Foreign Mercenaries in the Ukraine are Eliminated",
    "West is Corrupt and Causes Death in Ukraine Conflict",
    "US has Double Standards in Global Conflicts",
    "Mercenaries and Atrocities in Ukraine",
    "Nazism and the Bandera Ideology in Ukraine Conflict",
    "Biden Family's Foreign Influence and Corruption",
    "US Rejects Peace Deal Despite Americans Desire",
    "Global Push for Ceasefire",
    "So-Called 'Humanitarian' Aid in Global Conflicts",
    "Swiss Peace Summit Highlights Divisions Over Ukraine War",
    "China's Advocacy for a Political Settlement in the Ukraine Crisis",
    "Ukraine's Unit No. 110: Horrifying Crimes Against Humanity",
    "NATO will Punish China",
    "Laurent Brayard warns French Mercenaries in Ukraine",
    "Diplomatic Efforts for Peace in Nizhny Novgorod",
    "Key Nations Refuse to Sign Final Declaration",
  ];

  // const [dynamic, setDynamic]= useState(NONE)

  // if (selectedFilter === "NUCLEAR") {
  //   setDynamic(NUCLEAR);
  // } else if (selectedFilter === "NAZISM") {
  //   setDynamic(NAZISM);
  // } else if (selectedFilter === "CIVILIANS") {
  //   setDynamic(CIVILIANS);
  // } else if (selectedFilter === "MERCENARIES") {
  //   setDynamic(MERCENARIES);
  // } else if (selectedFilter === "CORRUPT") {
  //   setDynamic(CORRUPT);
  // } else if (selectedFilter === "CONFLICT") {
  //   setDynamic(CONFLICT);
  // } else if (selectedFilter === "AGREEMENT") {
  //   setDynamic(AGREEMENT);
  // } else if (selectedFilter === "AID") {
  //   setDynamic(AID);
  // } else if (selectedFilter === "CRIME") {
  //   setDynamic(CRIME);
  // } else if (selectedFilter === "ALLIANCE") {
  //   setDynamic(ALLIANCE);
  // } else if (selectedFilter === "DIPLOMACY") {
  //   setDynamic(DIPLOMACY);
  // } else {
  //   setDynamic(NONE);
  // }

  const handleFilterChange = async (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    setNarrativefilter("Narrative");
    setName("Faces");
    setFlag("flags");
  };

  const handleNarrativeChange = async (e) => {
    const selectedFilter = e.target.value;
    setNarrativefilter(selectedFilter);
    setFilter("Topic");
    setName("Faces");
    setFlag("flags");
  };

  const handleNameChange = async (e) => {
    const selectedFilter = e.target.value;
    setName(selectedFilter);
    setFlag("flags");
  };

  const handleFlagChange = (e) => {
    const selectedFilter = e.target.value;
    setFlag(selectedFilter);
    setName("Faces");
  };

  console.log(isCheckedImage, isCheckedVideo);

  const topics = [
    "Topic",
    "NUCLEAR",
    "MISSILES",
    "MERCENARIES",
    "AID",
    "WAR",
    "SANCTIONS",
    "ATTACKS",
    "TERROR",
    "CONFLICT",
    "CRIME",
    "CORRUPTION",
    "COVID",
    "NAZISM",
    "GOVERNMENT",
    "ECONOMY",
    "SPACE",
    "ROCKETS",
    "DRONES",
    "INTEL",
    "BASES",
    "ARMED FORCES",
    "WEAPONS",
    "DEFENSE",
    "RESOURCES",
    "INFRASTRUCTURE",
    "HISTORY",
    "CIVILIANS",
    "DIPLOMACY",
    "AGREEMENT",
    "ALLIANCE",
  ];

  //   const names = [
  //     "NONE",
  // "antony_blinken",
  // "charles_michel",
  // "diana_panchenko",
  // "dmitry_medvedev",
  // "donald_trump",
  // "emmanuel_macron",
  // "hunter_biden",
  // "jackson_hinkle",
  // "jake_sullivan",
  // "jens_stoltenberg",
  // "joe_biden",
  // "john_kirby",
  // "justin_trudeau",
  // "kim_jong",
  // "lin_jian",
  // "lloyd_austin",
  // "mao_zedong",
  // "maria_zakharova",
  // "melissa_biden",
  // "petr_pavel",
  // "sergei_shoigu",
  // "sergey_viktorovich",
  // "viktor_orban",
  // "vladimir_putin",
  // "volodymyr_zelenskyy",
  // "von_derLeyen",
  // "wang_yi",
  // "wu_qian",
  // "xi_jingping"

  //   ];

  // console.log(names.sort());

  return (
    <div className="w-11/12 mx-auto  bg-white">
      <div className=" flex flex-row gap-3 mb-3 font-semibold bg-white p-5 sticky top-2 z-10 ">
        <select
          value={filter}
          onChange={(e) => handleFilterChange(e)}
          className=" bg-white text-black p-2 rounded-lg text-xl border-2 border-black "
        >
          {topics.map((topic, index) => (
            <option key={index} value={topic}>
              {topic == "Topic" ? "TOPICS" : topic}
            </option>
          ))}
        </select>

        <select
          value={narrativeFilter}
          onChange={(e) => handleNarrativeChange(e)}
          className="bg-white text-black p-2 rounded-lg text-xl border-2 border-black w-44"
        >
          {nf.map((d, index) => (
            <option key={index} value={d}>
              {d == "Narrative" ? "Top Narratives" : d}
            </option>
          ))}
        </select>

        <select
          value={name}
          onChange={(e) => handleNameChange(e)}
          className="bg-white text-black p-2 rounded-lg text-xl border-2 border-black"
        >
          {filter !== "Topic" && narrativeFilter == "Narrative" ? (
            topicfacefilter[filter] ? (
              topicfacefilter[filter].map((name, index) => (
                <option key={index} value={name.value}>
                  {name.name === "Faces" ? "FACES" : name.name}
                  {name.number && (
                    <span className="text-blue-500">{`  {${name.number}}`}</span>
                  )}
                </option>
              ))
            ) : (
              <option value="Faces">FACES</option>
            )
          ) : narrativefacefilter[narrativeFilter] ? (
            narrativefacefilter[narrativeFilter].map((name, index) => (
              <option key={index} value={name.value}>
                {name.name === "Faces" ? "FACES" : name.name}
                {name.number && (
                  <span className="text-blue-500">{`  {${name.number}}`}</span>
                )}
              </option>
            ))
          ) : (
            <option value="Faces">FACES</option>
          )}
        </select>

        <select
          value={flag}
          onChange={(e) => handleFlagChange(e)}
          className="bg-white text-black p-2 rounded-lg text-xl border-2 border-black"
        >
          {filter !== "Topic" && narrativeFilter == "Narrative" ? (
            topicflagfilter[filter] ? (
              topicflagfilter[filter].map((name, index) => (
                <option key={index} value={name.value}>
                  {name.name === "Flags" ? "FLAGS" : name.name}
                  {name.number && (
                    <span className="text-blue-500">{`  {${name.number}}`}</span>
                  )}
                </option>
              ))
            ) : (
              <option value="flags">FLAGS</option>
            )
          ) : narrativeflagfilter[narrativeFilter] ? (
            narrativeflagfilter[narrativeFilter].map((name, index) => (
              <option key={index} value={name.value}>
                {name.name === "Flags" ? "FLAGS" : name.name}
                {name.number && (
                  <span className="text-blue-500">{`  {${name.number}}`}</span>
                )}
              </option>
            ))
          ) : (
            <option value="flags">FLAGS</option>
          )}
        </select>

        <label>
          <input
            type="checkbox"
            checked={isCheckedVideo}
            onChange={() => setIsCheckedVideo((prevState) => !prevState)}
          />
          Videos
        </label>

        <label>
          <input
            type="checkbox"
            checked={isCheckedImage}
            onChange={() => setIsCheckedImage((prevState) => !prevState)}
          />
          Images
        </label>
      </div>

      <div className="flex flex-row gap-4">
        {/* <button className={` ${color=="all" ? "bg-gray-900 text-white" : " bg-white text-black"} p-2 rounded-lg text-xl border-2 border-black`}
                onClick={()=>(setColor("all"))}>
                All
                </button>

                <button className={` ${color=="Africa" ? "bg-gray-900 text-white" : " bg-white text-black"} p-2 rounded-lg text-xl border-2 border-black`}
                onClick={()=>(setColor("Africa"))}>
                Africa
                </button>


                <button className={` ${color=="SCS" ? "bg-gray-900 text-white" : " bg-white text-black"} p-2 rounded-lg text-xl border-2 border-black`}
                onClick={()=>(setColor("SCS"))}>
                South China Sea
                </button>

                

                <button className={` ${color=="Eastern Pacific" ? "bg-gray-900 text-white" : " bg-white text-black"} p-2 rounded-lg text-xl border-2 border-black`}
                onClick={()=>(setColor("Eastern Pacific"))}>
                Eastern Pacific
                </button>

                <button className={` ${color=="ECS" ? "bg-gray-900 text-white" : " bg-white text-black"} p-2 rounded-lg text-xl border-2 border-black`}
                onClick={()=>(setColor("ECS"))}>
                East China Sea
                </button> */}

        {/* 
                

                <div  style={{ width: '100px' }}>
                  <CountryFlag style={{ width: '100px', height:'50px' }}  countryCode="GH" svg />
                </div>

                <div  style={{ width: '100px' }}>
                  <CountryFlag style={{ width: '100px', height:'50px' }}  countryCode="US" svg />
                </div>

                <div  style={{ width: '100px' }}>
                  <CountryFlag style={{ width: '100px', height:'50px' }}  countryCode="AR" svg />
                </div>

                <div  style={{ width: '100px' }}>
                  <CountryFlag style={{ width: '100px', height:'50px' }}  countryCode="EC" svg />
                </div>

                <div  style={{ width: '100px' }}>
                  <CountryFlag style={{ width: '100px', height:'50px' }}  countryCode="JP" svg />
                </div>

                <div  style={{ width: '100px' }}>
                  <CountryFlag style={{ width: '100px', height:'50px' }}  countryCode="KR" svg />
                </div>

                <div  style={{ width: '100px' }}>
                  <CountryFlag style={{ width: '100px', height:'50px' }}  countryCode="CN" svg />
                </div>

                <div  style={{ width: '100px' }}>
                  <CountryFlag style={{ width: '100px', height:'50px' }}  countryCode="ID" svg />
                </div>

                <div  style={{ width: '100px' }}>
                  <CountryFlag style={{ width: '100px', height:'50px' }}  countryCode="PH" svg />
                </div>

                <div  style={{ width: '100px' }}>
                  <CountryFlag style={{ width: '100px', height:'50px' }}  countryCode="TW" svg />
                </div>

                <div  style={{ width: '100px' }}>
                  <CountryFlag style={{ width: '100px', height:'50px' }}  countryCode="VN" svg />
                </div>

                */}
      </div>

      <div></div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 ">
        {/* { filter != "NONE" && narrativeFilter =="NONE" ?

         

          :

          narrativeObj.map((obj, index) => (
            <Videocard key={index} obj={obj} name={name}  isCheckedVideo={isCheckedVideo} isCheckedImage={isCheckedImage} />
          ))
          
        } */}

        {objects.map((obj, index) => (
          <Videocardtwo
            key={index}
            obj={obj}
            name={name}
            isCheckedImage={isCheckedImage}
            isCheckedVideo={isCheckedVideo}
          />
        ))}
      </div>
    </div>
  );
};
