// react hooks
import { useEffect, useState } from "react";
import Header from "../components/global-components/Header";
// api calls
import axios from "axios";
import { VITE_BASE_LINK } from "../../baseLink";
// components
import NPSTrend from "../components/individual-components/NPSTrend";
import NPSCardForConsolidatedDashboard from "../components/individual-components/NPSCardForConsolidatedDashboard";
import GoogleReviewsTrend from "../components/individual-components/GoogleReviewsTrend";
// misc
import PuffLoader from "react-spinners/PuffLoader";
// material ui
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import DoubleArrowRoundedIcon from "@mui/icons-material/DoubleArrowRounded";
// local media assets
import PositiveIcon from "../assets/img/NPS Dashboard/Positive.svg";
import NegativeIcon from "../assets/img/NPS Dashboard/Negative.svg";
import ExtremeIcon from "../assets/img/NPS Dashboard/Extreme.svg";
import NeutralIcon from "../assets/img/NPS Dashboard/Neutral.svg";
import GoogleRatingsAndSentimentOverTime from "../components/individual-components/GoogleRatingsAndSentimentOverTime";

const ConsolidatedDashboard = () => {
  // local variables
  const [ratingCardData, setRatingCardData] = useState();
  const [reviewsData, setReviewsData] = useState();
  const [googleReviewsData, setGoogleReviewsData] = useState();
  const [totalViewedComments, setTotalViewedComments] = useState(30);
  const [expandComment, setExpandComment] = useState("");
  const [clickCount, setClickCount] = useState(false);

  // api calls
  useEffect(() => {
    axios.post(VITE_BASE_LINK + "google/get_rating").then((response) => {
      setRatingCardData(response?.data?.data);
    });

    axios.post(VITE_BASE_LINK + "nps/all_comments").then((response) => {
      setReviewsData(response?.data);
    });

    axios.post(VITE_BASE_LINK + "google/all_comments").then((response) => {
      setGoogleReviewsData(response?.data);
    });
  }, []);
  // trunctae text handler
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
  // handle load more
  function handleLoadMore() {
    setTotalViewedComments(totalViewedComments + 50);
  }
  return (
    <div>
      <Header />
      <div className="px-5 flex flex-col md:flex-row  gap-5">
        {/* nps */}
        <div className="flex-1 md:w-[50%] border rounded-md  p-5">
          <h1 className="font-semibold text-center  text-xl">
            Net Promoter Score
          </h1>

          <div className="mt-5">
            <NPSCardForConsolidatedDashboard />
          </div>

          <div className="mt-5">
            <NPSTrend />
          </div>

          <div className="mt-5">
            {/* nps comments  */}
            <div className="w-full flex flex-col 2xl:flex-row gap-5 ">
              {/* comments */}
              <div className="hidden xl:block w-full border rounded-[10px]">
                <div className="w-full p-4">
                  <h1 className="text-md">
                    Feedback Reviews &#40;{reviewsData?.length}&#41;
                  </h1>
                </div>

                {/* table heading */}
                <div className="w-[98%] mx-auto grid grid-cols-[80px_100px_80px_1fr] border-b pb-2">
                  <h1 className="text-xs text-gray-400 font-[500]">Date</h1>
                  <h1 className="text-xs text-gray-400 font-[500]">NPS Type</h1>
                  <h1 className="text-xs text-gray-400 font-[500]">
                    Sentiment
                  </h1>
                  <h1 className="text-xs text-gray-400 font-[500]">Review</h1>
                </div>

                {/* table data */}
                <div className="w-full px-4 max-h-[400px] overflow-y-scroll">
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
                            <div className="text-xs text-gray-500">
                              Load More
                            </div>
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
              <div className="block xl:hidden w-full border rounded-[10px]">
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
                            <div className="text-xs text-gray-500">
                              Load More
                            </div>
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
            </div>
          </div>
        </div>

        {/* google */}
        <div className="flex-1 md:w-[50%] border rounded-md p-5">
          <h1 className="font-semibold text-center  text-xl">Google Review</h1>

          {/* google rating */}
          <div className="mt-5">
            {/* google rating */}
            <div className="w-full max-w-[600px] md:max-w-[100%]  gap-4 flex flex-col lg:flex-row items-center border p-4 rounded-[10px]">
              {/* rating */}
              <div className="w-full lg:w-[30%] ">
                <h1 className="font-semibold mb-5">Rating</h1>
                <div className="mx-auto w-fit text-center">
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
              <div className="w-full flex flex-col justify-start items-start gap-2 lg:gap-5">
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
          </div>

          <div className="mt-5">
            {/* <GoogleReviewsTrend /> */}
            <GoogleRatingsAndSentimentOverTime />
          </div>

          <div className="mt-5">
            {/* comments & alerts */}
            <div className="w-full flex flex-col 2xl:flex-row gap-5 ">
              {/* comments */}
              <div className="hidden xl:block w-full border rounded-[10px]">
                <div className="w-full p-4">
                  <h1 className="text-md">
                    Google Reviews &#40;{googleReviewsData?.length}&#41;
                  </h1>
                </div>

                {/* table heading */}
                <div className="w-[98%] mx-auto grid grid-cols-[80px_100px_100px_80px_1fr] border-b pb-2">
                  <h1 className="text-xs text-gray-400 font-[500]">Date</h1>
                  <h1 className="text-xs text-gray-400 font-[500]">Name</h1>
                  <h1 className="text-xs text-gray-400 font-[500]">Rating</h1>
                  <h1 className="text-xs text-gray-400 font-[500]">
                    Sentiment
                  </h1>
                  <h1 className="text-xs text-gray-400 font-[500]">Review</h1>
                </div>

                {/* table data */}
                <div className="w-full px-4 max-h-[400px] overflow-y-scroll">
                  {googleReviewsData ? (
                    <>
                      {googleReviewsData?.map((data, i) => {
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
                      {googleReviewsData?.length > totalViewedComments && (
                        <div className=" flex  justify-center items-center p-2">
                          <div
                            className="flex flex-col justify-center items-center cursor-pointer "
                            onClick={handleLoadMore}
                          >
                            <DoubleArrowRoundedIcon className="text-gray-400 rotate-90 " />
                            <div className="text-xs text-gray-500">
                              Load More
                            </div>
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
              <div className="block xl:hidden w-full border rounded-[10px]">
                <div className="w-full p-4">
                  <h1 className="text-md">
                    Comments &#40;{googleReviewsData?.length}&#41;
                  </h1>
                </div>

                {/* table data */}
                <div className="w-full px-4 max-h-[400px] overflow-y-scroll py-2">
                  {googleReviewsData ? (
                    <>
                      {googleReviewsData?.map((data, i) => {
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
                                <h1 className="text-sm">{data?.name} </h1>
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
                            <div className="text-xs text-gray-500">
                              Load More
                            </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsolidatedDashboard;
