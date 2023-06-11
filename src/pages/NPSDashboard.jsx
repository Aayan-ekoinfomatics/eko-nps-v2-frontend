import React, { useEffect, useState } from "react";
import Sidebar from "../components/global-components/Sidebar";
import eko_logo from "../assets/icons/eko_logo.png";
import EventIcon from "@mui/icons-material/Event";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import SentimentVerySatisfiedRoundedIcon from "@mui/icons-material/SentimentVerySatisfiedRounded";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import SentimentVeryDissatisfiedRoundedIcon from "@mui/icons-material/SentimentVeryDissatisfiedRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Bar, BarChart, Pie, PieChart, ResponsiveContainer } from "recharts";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import NSSCard from "../components/individual-components/NSSCard";
import reviewData from "../helpers/reviewsTableData.json";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import axios from "axios";
import { VITE_BASE_LINK } from "../../baseLink";
import NSSOverTime from "../components/individual-components/NSSOvertime";
import PositiveIcon from "../assets/img/NPS Dashboard/Positive.svg";
import NegativeIcon from "../assets/img/NPS Dashboard/Negative.svg";
import ExtremeIcon from "../assets/img/NPS Dashboard/Extreme.svg";
import NeutralIcon from "../assets/img/NPS Dashboard/Neutral.svg";
import NPSCard from "../components/individual-components/NPSCard";
import Header from "../components/global-components/Header";
import NPSSentimentCard from "../components/individual-components/NPSSentimentCard";
import PuffLoader from "react-spinners/PuffLoader";
import NSSOvertimeNPS from "../components/individual-components/NSSOvertimeNPS";
import DoubleArrowRoundedIcon from "@mui/icons-material/DoubleArrowRounded";
import NPSvsSentiment from "../components/individual-components/NPSvsSentiment";

const NPSDashboard = () => {
  const [npsDataCard, setnpsDataCard] = useState();

  const [expandComment, setExpandComment] = useState("");

  const [smallCardApiData, setSmallCardApiData] = useState();

  const [reviewsData, setReviewsData] = useState();

  const [clickCount, setClickCount] = useState(false);

  const [alertData, setAlertData] = useState();

  const [totalViewedComments, setTotalViewedComments] = useState(30);

  function truncate(string, n) {
    return (
      <span>
        {string?.length > n && (
          <span>
            {string.substr(0, n - 1)}{" "}
            <span className="text-[10px] text-gray-500 cursor-pointer">
              {" "}
              ... Read more
            </span>
          </span>
        )}
        {string?.length <= n && <span>{string}</span>}
      </span>
    );
  }

  function handleLoadMore() {
    setTotalViewedComments(totalViewedComments + 50);
  }

  useEffect(() => {
    axios.post(VITE_BASE_LINK + "nps/net_cards").then((response) => {
      // console.log(response?.data);
      setSmallCardApiData(response?.data?.data);
    });

    axios.post(VITE_BASE_LINK + "nps/all_comments").then((response) => {
      // console.log(response?.data);
      setReviewsData(response?.data);
    });

    axios.post(VITE_BASE_LINK + "nps/all_alerts").then((response) => {
      // console.log(response?.data);
      setAlertData(response?.data);
    });
  }, []);

  return (
    <div className="w-full max-w-[99wv] overflow-hidden">
      {/* header */}
      <Header />
      {/* body */}

      <div className="w-full">
        {/* main cards */}
        <div className="w-full px-4">
          <div className="w-full flex flex-col lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* card 1 */}
            <NPSCard />

            {/* card 2 */}
            <NPSSentimentCard />

            {/* card 3 */}
            <div className="w-full col-start-1 col-end-3 xl:col-start-3 grid grid-cols-3 gap-4 ">
              {smallCardApiData?.map((data, i) => (
                <div
                  key={i}
                  className="border rounded-[10px] flex flex-col gap-4 p-2 justify-center items-center w-full"
                >
                  <h1 className="text-sm text-gray-400 font-[500]">
                    {data?.title}
                  </h1>
                  {data?.title === "Surveyed" ? (
                    <PollOutlinedIcon className="text-blue-400" />
                  ) : data?.title === "Comments" ? (
                    <CommentOutlinedIcon className="text-blue-400" />
                  ) : data?.title === "Alerts" ? (
                    <AddAlertOutlinedIcon className="text-blue-400" />
                  ) : null}
                  <h1 className="text-lg font-[600] text-gray-500">
                    {data?.value}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* bar chart */}

        <div className="w-full p-4 flex flex-col 2xl:flex-row gap-5 ">
          <NSSOvertimeNPS />
          <NPSvsSentiment />
        </div>

        {/* comments & alerts  */}
        <div className="w-full p-4 flex flex-col 2xl:flex-row gap-5 pb-10">
          {/* comments */}
          <div className="hidden md:block w-full border rounded-[10px]">
            <div className="w-full p-4">
              <h1 className="text-md">
                Comments &#40;{reviewsData?.length}&#41;
              </h1>
            </div>

            {/* table heading */}
            <div className="w-[98%] mx-auto grid grid-cols-[80px_100px_80px_1fr] border-b pb-2">
              <h1 className="text-xs text-gray-400 font-[500]">Date</h1>
              <h1 className="text-xs text-gray-400 font-[500]">NPS Type</h1>
              <h1 className="text-xs text-gray-400 font-[500]">Sentiment</h1>
              <h1 className="text-xs text-gray-400 font-[500]">Review</h1>
            </div>

            {/* table data */}
            <div className="w-full px-4 max-h-[300px] overflow-y-scroll">
              {reviewsData ? (
                <>
                  {reviewsData?.map((data, i) => {
                    return (
                      i <= totalViewedComments && (
                        <div
                          key={i}
                          className="w-full grid grid-cols-[80px_100px_80px_1fr] py-4 border-b"
                        >
                          <h1 className="text-sm">{data?.date}</h1>

                          <h1 className="text-sm ">{data?.nps_type}</h1>
                          <h1 className="text-sm pl-2 ">
                            {data?.sentiment === "Positive" ? (
                              <img
                                src={PositiveIcon}
                                alt="Positive"
                                className="w-[20px]"
                              />
                            ) : data?.sentiment === "Neutral" ? (
                              <img
                                src={NeutralIcon}
                                alt="Neutral"
                                className="w-[20px]"
                              />
                            ) : data?.sentiment === "Negative" ? (
                              <img
                                src={NegativeIcon}
                                alt="Negative"
                                className="w-[20px]"
                              />
                            ) : data?.sentiment === "Extreme" ? (
                              <img
                                src={ExtremeIcon}
                                alt="Extreme"
                                className="w-[20px]"
                              />
                            ) : null}
                          </h1>

                          <h1 className="text-sm ">
                            <div className=" ">
                              <div
                                className="w-full"
                                onClick={() => {
                                  setExpandComment(data.id);
                                  setClickCount(!clickCount);
                                }}
                              >
                                {expandComment == data?.id && clickCount
                                  ? data?.review
                                  : truncate(data?.review, 100)}
                              </div>
                            </div>
                          </h1>
                        </div>
                      )
                    );
                  })}
                  {reviewsData?.length > totalViewedComments && (
                    <div className=" flex  justify-center items-center p-2">
                      <div
                        className="flex flex-col justify-center items-center cursor-pointer "
                        onClick={handleLoadMore}
                      >
                        <DoubleArrowRoundedIcon className="text-gray-400 rotate-90 " />
                        <div className="text-xs text-gray-500">Load More</div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full min-h-[30vh] flex justify-center items-center">
                  <PuffLoader color="#0284c7" size={50} width={100} />
                </div>
              )}
            </div>
          </div>

          {/* comments - mobile screen */}
          <div className="block md:hidden w-full border rounded-[10px]">
            <div className="w-full p-4">
              <h1 className="text-md">
                Comments &#40;{reviewsData?.length}&#41;
              </h1>
            </div>

            {/* table data */}
            <div className="w-full px-4 max-h-[400px] overflow-y-scroll py-2">
              {reviewsData ? (
                <>
                  {reviewsData?.map((data, i) => {
                    return (
                      i <= totalViewedComments && (
                        <div
                          key={i}
                          className="w-full mb-4 p-3 rounded-[10px] shadow-md border"
                        >
                          {/* date */}
                          <span className="flex gap-1 py-2 border-b border-b-gray-50 items-center ">
                            <h1 className="text-xs text-gray-400 font-[600] min-w-[70px]">
                              Date
                            </h1>{" "}
                            <h1 className="text-sm">{data?.date} </h1>
                          </span>

                          {/* nps type */}
                          <span className="flex gap-1 py-2 border-b border-b-gray-50 items-center">
                            <h1 className="text-xs text-gray-400 font-[600] min-w-[70px]">
                              NPS Type
                            </h1>{" "}
                            <h1 className="text-sm ">{data?.nps_type}</h1>
                          </span>
                          {/* <h1 className='text-sm xl:pr-6'>{data?.review}</h1> */}
                          {/* sentiment */}
                          <span className="flex gap-1 py-2 border-b border-b-gray-50 items-center">
                            <h1 className="text-xs text-gray-400 font-[600] min-w-[70px]">
                              Sentiment
                            </h1>{" "}
                            <h1 className="text-sm ">
                              {data?.sentiment === "Positive" ? (
                                <img
                                  src={PositiveIcon}
                                  alt="Positive"
                                  className="w-[20px]"
                                />
                              ) : data?.sentiment === "Neutral" ? (
                                <img
                                  src={NeutralIcon}
                                  alt="Neutral"
                                  className="w-[20px]"
                                />
                              ) : data?.sentiment === "Negative" ? (
                                <img
                                  src={NegativeIcon}
                                  alt="Negative"
                                  className="w-[20px]"
                                />
                              ) : data?.sentiment === "Extreme" ? (
                                <img
                                  src={ExtremeIcon}
                                  alt="Extreme"
                                  className="w-[20px]"
                                />
                              ) : null}
                            </h1>
                          </span>

                          {/* review */}
                          <span className="flex gap-1 py-2 items-start">
                            <h1 className="text-xs text-gray-400 font-[600] min-w-[70px]">
                              Review
                            </h1>{" "}
                            <h1 className="text-sm xl:pr-6">
                              <div className=" ">
                                <div
                                  className="w-full"
                                  onClick={() => {
                                    setExpandComment(data.id);
                                    setClickCount(!clickCount);
                                  }}
                                >
                                  {expandComment == data?.id && clickCount
                                    ? data?.review
                                    : truncate(data?.review, 100)}
                                </div>
                              </div>
                            </h1>
                          </span>
                        </div>
                      )
                    );
                  })}
                  {reviewsData?.length > totalViewedComments && (
                    <div className=" flex  justify-center items-center p-2">
                      <div
                        className="flex flex-col justify-center items-center cursor-pointer "
                        onClick={handleLoadMore}
                      >
                        <DoubleArrowRoundedIcon className="text-gray-400 rotate-90 " />
                        <div className="text-xs text-gray-500">Load More</div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full min-h-[30vh] flex justify-center items-center">
                  <PuffLoader color="#0284c7" size={50} width={100} />
                </div>
              )}
            </div>
          </div>

          {/* alerts */}
          <div className="hidden md:block w-full border rounded-[10px] ">
            <div className="w-full p-4">
              <h1 className="text-md">Alerts &#40;{alertData?.length}&#41;</h1>
            </div>

            {/* table heading */}
            <div className="w-[98%] mx-auto grid grid-cols-[80px_100px_80px_1fr] border-b pb-2 ">
              <h1 className="text-xs text-gray-400 font-[500]">Date</h1>
              <h1 className="text-xs text-gray-400 font-[500]">NPS Type</h1>
              <h1 className="text-xs text-gray-400 font-[500]">Sentiment</h1>
              <h1 className="text-xs text-gray-400 font-[500]">Review</h1>
            </div>

            {/* table data */}
            <div className="w-full px-4 max-h-[300px] overflow-y-scroll">
              {alertData?.map((data, i) => (
                <div
                  key={i}
                  className="w-full grid grid-cols-[80px_100px_80px_1fr] py-4 border-b"
                >
                  <h1 className="text-sm ">{data?.date}</h1>
                  <h1 className="text-sm  ">{data?.nps_type}</h1>
                  <h1 className="text-sm  pl-5">
                    {data?.sentiment === "Positive" ? (
                      <img
                        src={PositiveIcon}
                        alt="Positive"
                        className="w-[20px]"
                      />
                    ) : data?.sentiment === "Neutral" ? (
                      <img
                        src={NeutralIcon}
                        alt="Neutral"
                        className="w-[20px]"
                      />
                    ) : data?.sentiment === "Negative" ? (
                      <img
                        src={NegativeIcon}
                        alt="Negative"
                        className="w-[20px]"
                      />
                    ) : data?.sentiment === "Extreme" ? (
                      <img
                        src={ExtremeIcon}
                        alt="Extreme"
                        className="w-[20px]"
                      />
                    ) : null}
                  </h1>
                  <h1 className="text-sm  xl:pr-6">{data?.review}</h1>
                </div>
              ))}
            </div>
          </div>

          {/* alerts - mobile screen */}
          <div className="block md:hidden w-full border rounded-[10px] mt-4">
            <div className="w-full p-4">
              <h1 className="text-md">Alerts &#40;{alertData?.length}&#41;</h1>
            </div>

            {/* table data */}
            <div className="w-full px-4 max-h-[400px] overflow-y-scroll">
              {alertData?.map((data, i) => (
                <div
                  key={i}
                  className="w-full mb-4 p-3 rounded-[10px] shadow-md border"
                >
                  {/* date */}
                  <div className="flex gap-1 py-2 border-b border-b-gray-50 items-center">
                    <h1 className="text-xs text-gray-400 font-[600] min-w-[70px]">
                      Date
                    </h1>
                    <h1 className="text-sm">{data?.date}</h1>
                  </div>

                  {/* rating */}
                  <div className="flex gap-1 py-2 border-b border-b-gray-50 items-center">
                    <h1 className="text-xs text-gray-400 font-[600] min-w-[70px]">
                      NPS Type
                    </h1>
                    <h1 className="text-sm ">{data?.nps_type}</h1>
                  </div>
                  {/* <h1 className='text-xs xl:pr-6'>{data?.review}</h1> */}
                  {/* sentiment */}
                  <div className="flex gap-1 py-2 border-b border-b-gray-50 items-center">
                    <h1 className="text-xs text-gray-400 font-[600] min-w-[70px]">
                      Sentiment
                    </h1>
                    <h1 className="text-sm ">
                      {data?.sentiment === "Positive" ? (
                        <img
                          src={PositiveIcon}
                          alt="Positive"
                          className="w-[20px]"
                        />
                      ) : data?.sentiment === "Neutral" ? (
                        <img
                          src={NeutralIcon}
                          alt="Neutral"
                          className="w-[20px]"
                        />
                      ) : data?.sentiment === "Negative" ? (
                        <img
                          src={NegativeIcon}
                          alt="Negative"
                          className="w-[20px]"
                        />
                      ) : data?.sentiment === "Extreme" ? (
                        <img
                          src={ExtremeIcon}
                          alt="Extreme"
                          className="w-[20px]"
                        />
                      ) : null}
                    </h1>
                  </div>
                  {/* review */}
                  <div className="flex gap-1 py-2  items-start">
                    <h1 className="text-xs text-gray-400 font-[600] min-w-[70px]">
                      Review
                    </h1>
                    <h1 className="text-sm xl:pr-6">
                      <div className=" ">
                        <div
                          className="w-full"
                          onClick={() => {
                            setExpandComment(data.id);
                            setClickCount(!clickCount);
                          }}
                        >
                          {expandComment == data?.id && clickCount
                            ? data?.review
                            : truncate(data?.review, 100)}
                        </div>
                      </div>
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NPSDashboard;
