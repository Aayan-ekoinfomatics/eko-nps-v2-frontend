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
import NSSCard from "../components/individual-components/NSSCard";
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
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PuffLoader from "react-spinners/PuffLoader";
import Header from "../components/global-components/Header";
import DoubleArrowRoundedIcon from "@mui/icons-material/DoubleArrowRounded";

const GoogleReviewsDashboard = () => {
  const data02 = [
    { name: "A1", value: 100 },
    { name: "A2", value: 300 },
    { name: "B1", value: 100 },
    { name: "B2", value: 80 },
    { name: "B3", value: 40 },
    { name: "B4", value: 30 },
    { name: "B5", value: 50 },
    { name: "C1", value: 100 },
    { name: "C2", value: 200 },
    { name: "D1", value: 150 },
    { name: "D2", value: 50 },
  ];

  const ratingData = {
    rating: "3.8",
    stars: 3,
    total: "67",
    _5: "90%",
    _4: "60%",
    _3: "50%",
    _2: "70%",
    _1: "30%",
  };

  const sentiments = {
    positive: "36%",
    satisfactory: "23%",
    negative: "31%",
    extreame: "41%",
  };

  const smallCardData = [
    { title: "Surveyed", score: "23,050" },
    { title: "Comments", score: "16,315" },
    { title: "Alerts", score: "32" },
  ];

  const [ratingCardData, setRatingCardData] = useState();

  const [smallCardApiData, setSmallCardApiData] = useState();

  const [reviewsData, setReviewsData] = useState();

  const [alertData, setAlertData] = useState();

  const [expandComment, setExpandComment] = useState("");

  const [clickCount, setClickCount] = useState(false);

  const [totalViewedComments, setTotalViewedComments] = useState(30);

  function handleLoadMore() {
    setTotalViewedComments(totalViewedComments + 50);
  }

  // truncate function
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

  useEffect(() => {
    axios.post(VITE_BASE_LINK + "google/get_rating").then((response) => {
      // console.log(response?.data);
      setRatingCardData(response?.data?.data);
    });

    axios.post(VITE_BASE_LINK + "google/net_cards").then((response) => {
      // console.log(response?.data);
      setSmallCardApiData(response?.data?.data);
    });

    axios.post(VITE_BASE_LINK + "google/all_comments").then((response) => {
      // console.log(response?.data);
      setReviewsData(response?.data);
    });

    axios.post(VITE_BASE_LINK + "google/all_alerts").then((response) => {
      // console.log(response?.data);
      setAlertData(response?.data);
    });
  }, []);

  return (
    <div className="w-full max-w-[99wv] ">
      {/* header */}
      <Header />

      {/* body */}
      <div className="w-full">
        {/* main cards */}
        <div className="w-full px-4">
          <div className="w-full flex flex-wrap xl:flex-nowrap gap-4">
            {/* card 1 */}
            <div className="w-full max-w-[600px] md:max-w-[100%]  gap-4 flex items-center border p-4 rounded-[10px]">
              {/* rating */}
              <div className="w-[30%] ">
                <h1 className="font-semibold mb-2">Rating</h1>
                <div>
                  <h1 className="text-3xl sm:text-6xl ">
                    {ratingCardData?.rating?.toString()?.split(".")[0]}.
                    <span className="text-xl sm:text-3xl">
                      {ratingCardData?.rating?.toString()?.split(".")[1]}
                    </span>
                  </h1>

                  {/* ratings */}
                  <div className="flex">
                    {ratingCardData?.star === 1 ? (
                      <>
                        <StarRoundedIcon
                          fontSize="small"
                          className=" text-yellow-500"
                        />
                        <StarOutlineRoundedIcon
                          fontSize="small"
                          className=" "
                        />
                        <StarOutlineRoundedIcon
                          fontSize="small"
                          className=" "
                        />
                        <StarOutlineRoundedIcon
                          fontSize="small"
                          className=" "
                        />
                        <StarOutlineRoundedIcon
                          fontSize="small"
                          className=" "
                        />
                      </>
                    ) : ratingCardData?.star === 2 ? (
                      <>
                        <StarRoundedIcon
                          fontSize="small"
                          className=" text-yellow-500"
                        />
                        <StarRoundedIcon
                          fontSize="small"
                          className=" text-yellow-500"
                        />
                        <StarOutlineRoundedIcon fontSize="small" className="" />
                        <StarOutlineRoundedIcon fontSize="small" className="" />
                        <StarOutlineRoundedIcon fontSize="small" className="" />
                      </>
                    ) : ratingCardData?.star === 3 ? (
                      <>
                        <StarRoundedIcon
                          fontSize="small"
                          className=" text-yellow-500"
                        />
                        <StarRoundedIcon
                          fontSize="small"
                          className=" text-yellow-500"
                        />
                        <StarRoundedIcon
                          fontSize="small"
                          className=" text-yellow-500"
                        />
                        <StarOutlineRoundedIcon fontSize="small" className="" />
                        <StarOutlineRoundedIcon fontSize="small" className="" />
                      </>
                    ) : ratingCardData?.star === 4 ? (
                      <>
                        <StarRoundedIcon
                          fontSize="small"
                          className=" text-yellow-500"
                        />
                        <StarRoundedIcon
                          fontSize="small"
                          className=" text-yellow-500"
                        />
                        <StarRoundedIcon
                          fontSize="small"
                          className=" text-yellow-500"
                        />
                        <StarRoundedIcon
                          fontSize="small"
                          className=" text-yellow-500"
                        />
                        <StarOutlineRoundedIcon fontSize="small" className="" />
                      </>
                    ) : ratingCardData?.star === 5 ? (
                      <>
                        <StarRoundedIcon
                          fontSize="small"
                          className=" text-yellow-500"
                        />
                        <StarRoundedIcon
                          fontSize="small"
                          className=" text-yellow-500"
                        />
                        <StarRoundedIcon
                          fontSize="small"
                          className=" text-yellow-500"
                        />
                        <StarRoundedIcon
                          fontSize="small"
                          className=" text-yellow-500"
                        />
                        <StarRoundedIcon
                          fontSize="small"
                          className=" text-yellow-500"
                        />
                      </>
                    ) : null}

                    {/* <StarOutlineRoundedIcon />
                                        <StarOutlineRoundedIcon />
                                        <StarOutlineRoundedIcon />
                                        <StarOutlineRoundedIcon />
                                        <StarOutlineRoundedIcon /> */}
                  </div>
                  <h1 className="text-[13px] mt-2 ">
                    {ratingCardData?.total} total
                  </h1>
                </div>
              </div>

              {/*horizontal bar graph */}
              <div className="w-full flex flex-col justify-start items-start gap-2">
                <div className="w-full text-[13px] bg-gray-200 rounded-[3px] flex gap-2 relative">
                  <span className="absolute right-[4px] font-[600] text-gray-400 text-[11px] bottom-[10%]">
                    5 ★
                  </span>
                  <div
                    className="bg-[var(--secondary-color)] rounded-[3px] h-[20px] flex justify-start pt-1 items-center text-[13px] pl-2 text-gray-200"
                    style={{ width: ratingCardData?._5 }}
                  ></div>
                </div>
                <div className="w-full text-[13px] bg-gray-200 rounded-[3px] flex gap-2 relative">
                  <span className="absolute right-[4px] font-[600] text-gray-400 text-[11px] bottom-[10%]">
                    4 ★
                  </span>
                  <div
                    className="bg-[var(--secondary-color)] rounded-[3px] h-[20px] flex justify-start pt-1 items-center text-[13px] pl-2 text-gray-200"
                    style={{ width: ratingCardData?._4 }}
                  ></div>
                </div>
                <div className="w-full text-[13px] bg-gray-200 rounded-[3px] flex gap-2 relative">
                  <span className="absolute right-[4px] font-[600] text-gray-400 text-[11px] bottom-[10%]">
                    3 ★
                  </span>
                  <div
                    className="bg-[var(--secondary-color)] rounded-[3px] h-[20px] flex justify-start pt-1 items-center text-[13px] pl-2 text-gray-200"
                    style={{ width: ratingCardData?._3 }}
                  ></div>
                </div>
                <div className="w-full text-[13px] bg-gray-200 rounded-[3px] flex gap-2 relative">
                  <span className="absolute right-[4px] font-[600] text-gray-400 text-[11px] bottom-[10%]">
                    2 ★
                  </span>
                  <div
                    className="bg-[var(--secondary-color)] rounded-[3px] h-[20px] flex justify-start pt-1 items-center text-[13px] pl-2 text-gray-200"
                    style={{ width: ratingCardData?._2 }}
                  ></div>
                </div>
                <div className="w-full text-[13px] bg-gray-200 rounded-[3px] flex gap-2 relative">
                  <span className="absolute right-[4px] font-[600] text-gray-400 text-[11px] bottom-[10%]">
                    1 ★
                  </span>
                  <div
                    className="bg-[var(--secondary-color)] rounded-[3px] h-[20px] flex justify-start pt-1 items-center text-[13px] pl-2 text-gray-200"
                    style={{ width: ratingCardData?._1 }}
                  ></div>
                </div>
              </div>
            </div>

            {/* card 2 */}
            <NSSCard />

            {/* card 3 */}
            <div className="w-full row-start-2 col-start-1 col-end-3 grid grid-cols-3 gap-4 ">
              {smallCardApiData?.map((data, i) => (
                <div
                  key={i}
                  className="border rounded-[10px] flex flex-col gap-4 justify-center items-center w-full"
                >
                  <h1 className="text-xs pt-2 xl:pt-0 sm:text-sm text-gray-400 font-[500]">
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
        <div className="w-full p-4">
          <NSSOverTime />
        </div>

        {/* comments & alerts */}
        <div className="w-full p-4 flex flex-col 2xl:flex-row gap-5 pb-10">
          {/* comments */}
          <div className="hidden md:block w-full border rounded-[10px]">
            <div className="w-full p-4">
              <h1 className="text-md">
                Comments &#40;{reviewsData?.length}&#41;
              </h1>
            </div>

            {/* table heading */}
            <div className="w-[98%] mx-auto grid grid-cols-[80px_100px_100px_80px_1fr] border-b pb-2">
              <h1 className="text-xs text-gray-400 font-[500]">Date</h1>
              <h1 className="text-xs text-gray-400 font-[500]">Name</h1>
              <h1 className="text-xs text-gray-400 font-[500]">Rating</h1>
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
                          className="w-full grid grid-cols-[80px_100px_100px_80px_1fr] py-4 border-b"
                        >
                          <h1 className="text-sm">{data?.date}</h1>
                          <h1 className="text-sm">{data?.name}</h1>
                          {/* <h1 className='text-sm xl:pr-6'>{data?.review}</h1> */}

                          <h1 className="text-sm pl-5">{data?.rating}</h1>
                          <h1 className="text-sm pl-5">
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

                          {/* name */}
                          <span className="flex gap-1 py-2 border-b border-b-gray-50 items-center">
                            <h1 className="text-xs text-gray-400 font-[600] min-w-[70px]">
                              Name
                            </h1>{" "}
                            <h1 className="text-sm">{data?.name}</h1>
                          </span>

                          {/* rating */}
                          <span className="flex gap-1 py-2 border-b border-b-gray-50 items-center">
                            <h1 className="text-xs text-gray-400 font-[600] min-w-[70px]">
                              Rating
                            </h1>{" "}
                            <h1 className="text-sm ">{data?.rating}</h1>
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
            <div className="w-[98%] mx-auto grid grid-cols-[80px_100px_100px_80px_1fr] border-b pb-2 ">
              <h1 className="text-xs text-gray-400 font-[500]">Date</h1>
              <h1 className="text-xs text-gray-400 font-[500]">Name</h1>
              <h1 className="text-xs text-gray-400 font-[500]">Rating</h1>
              <h1 className="text-xs text-gray-400 font-[500]">Sentiment</h1>
              <h1 className="text-xs text-gray-400 font-[500]">Review</h1>
            </div>

            {/* table data */}
            <div className="w-full px-4 max-h-[300px] overflow-y-scroll">
              {alertData?.map((data, i) => (
                <div
                  key={i}
                  className="w-full grid grid-cols-[80px_100px_100px_80px_1fr] py-4 border-b"
                >
                  <h1 className="text-sm ">{data?.date}</h1>
                  <h1 className="text-sm ">{data?.name}</h1>
                  <h1 className="text-sm  pl-5">{data?.rating}</h1>
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
                  {/* name */}
                  <div className="flex gap-1 py-2 border-b border-b-gray-50 items-center">
                    <h1 className="text-xs text-gray-400 font-[600] min-w-[70px]">
                      Name
                    </h1>
                    <h1 className="text-sm">{data?.name}</h1>
                  </div>
                  {/* rating */}
                  <div className="flex gap-1 py-2 border-b border-b-gray-50 items-center">
                    <h1 className="text-xs text-gray-400 font-[600] min-w-[70px]">
                      Rating
                    </h1>
                    <h1 className="text-sm ">{data?.rating}</h1>
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

export default GoogleReviewsDashboard;
