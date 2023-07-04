import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// components
import Header from "../components/global-components/Header";
// helpers
import { tabList } from "../helpers/tabList";
// icons
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import zIndex from "@mui/material/styles/zIndex";
import { BASE_API_LINK } from "../utils/BaseAPILink";
import axios from "axios";

const ResponseSurvey = () => {
  // local variables
  const [responsesCollectionStatus, setResponseCollectionStatus] =
    useState("true");
  const [pageData, setPageData] = useState({});
  const params = useParams();

  const pageData4 = {
    questions: [
      "On a scale of 0 to 10, how likely are you to recommend our company/product/service to a friend or colleague?",
      " In your opinion, what improvements could the company make that would warrant a higher rating from you? ",
    ],
    answers: [
      [5, "guiguigui"],
      [10, "nabjJBSHUVHSBD"],
    ],
    status_code: 200,
    title: "Response generated",
    message: "Response generated for survey id 18",
  };

  useEffect(() => {
    // setPageData(pageData4);
    axios
      ?.post(BASE_API_LINK + "ms/survey_response_data", {
        survey_id: params?.survey_id,
      })
      ?.then((res) => {
        console.log(res?.data);
        setPageData(res?.data);
      });
  }, []);
  return (
    <div>
      <Header />
      <div className="px-5">
        {/* tab list */}
        <div className="flex justify-between items-end z-50 sticky top-0 bg-white border-b pt-2">
          {/* previous btn */}
          <div className=" ">
            <Link
              to={"/survey-dashboard/survey_share/" + params?.survey_id}
              className=" mb-2 px-10 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg active:scale-95 transition-all  text-xl flex items-center justify-center gap-1 "
            >
              <span className="scale-x-[-1] -translate-y-[0.20rem] block">
                <ArrowForwardIosRoundedIcon />
              </span>

              <span>Previous</span>
            </Link>
          </div>
          {/* tabs */}
          <div className="flex-1 flex justify-center items-center gap-5">
            {tabList?.map((data, i) => {
              return (
                <Link
                  to={data?.path + params?.survey_id}
                  key={i}
                  className={` ${
                    data?.name === "Responses"
                      ? "font-semibold  border-b-sky-700"
                      : "border-b-transparent"
                  } text-center border-b-2 transition-all py-1 w-[100px]`}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400">Step {i + 1}</span>
                    <span className="text-sky-700">{data?.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* next btn */}
          <div>
            <Link
              to={"/survey-dashboard/survey_analytics/" + params?.survey_id}
              className="mb-2 px-10 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg active:scale-95 transition-all  text-xl flex items-center justify-center gap-1 "
            >
              <span>Next</span>
              <span className="-translate-y-[0.18rem] block">
                <ArrowForwardIosRoundedIcon />
              </span>
            </Link>
          </div>
        </div>

        {/* main content */}
        <div className="w-full  mx-auto py-4">
          {/* responses stats */}
          <div className="bg-white rounded-lg flex justify-between items-end p-5 ">
            <h1 className="text-3xl font-medium text-gray-800 ">
              <span>{pageData?.answers?.length}</span>
              <span className="text-sm text-gray-500 pl-2 font-normal">
                responses collected
              </span>
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {responsesCollectionStatus
                  ? " Accepting responses"
                  : " Not accepting responses"}
              </span>
              <button
                onClick={() =>
                  setResponseCollectionStatus(!responsesCollectionStatus)
                }
                className={`${
                  responsesCollectionStatus ? " bg-green-100" : "bg-red-100"
                } bg-gray-300 w-[40px] aspect-video relative rounded-full`}
              >
                <div
                  className={` ${
                    responsesCollectionStatus
                      ? "left-[20px] bg-green-500 ease-in duration-300"
                      : "left-0 bg-red-500 ease-in duration-300"
                  }  rounded-full aspect-square w-[25px] absolute  top-[-2%] transition-all `}
                ></div>
              </button>
            </div>
          </div>

          {/* all responses */}
          <div className="overflow-x-scroll  border rounded-lg mt-10 bg-white">
            {/* headings / question list */}
            <div className={` flex bg-red-500 `}>
              {pageData?.questions?.map((questions_data, questions_index) => {
                return (
                  <div
                    key={questions_index}
                    title={questions_data}
                    className="flex gap-2 text-sm  w-full min-w-[300px] bg-gray-50 border-b p-2 py-5 font-semibold "
                  >
                    <h1>{questions_index + 1}.</h1>
                    <h1 className="truncate">{questions_data}</h1>
                  </div>
                );
              })}
            </div>

            <div className="min-h-[60vh] relative">
              {/* all answers  */}
              <div>
                {pageData?.answers?.map((answers_data, answers_index) => {
                  return (
                    <div
                      key={answers_index}
                      className="flex border-b  border-b-gray-100"
                    >
                      {/* {answers_data?.all_answers?.map(
                      (all_answers_data, all_answers_index) => {
                        return (
                          <div
                            key={all_answers_index}
                            className="flex gap-2 text-sm text-gray-800 w-full min-w-[300px] border-b p-2 pl-5"
                          >
                            <h1 className="truncate">
                              {all_answers_data ? (
                                all_answers_data
                              ) : (
                                <p className="text-gray-400 ">No response</p>
                              )}
                            </h1>
                          </div>
                        );
                      }
                    )} */}
                      {answers_data?.map((a_data, a_index) => {
                        return (
                          <div
                            className="flex-1 pl-6 text-gray-700 py-1"
                            key={a_index}
                          >
                            {a_data?.toString()?.length > 0 ? (
                              <div>{a_data}</div>
                            ) : (
                              <div className="text-gray-300">No Response</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* rows and colums count */}
          <div className="bg-gray-100 rounded-b-lg  flex justify-end items-center gap-5 py-5 px-5">
            <div className="flex gap-1 items-center ">
              <h1 className="text-gray-500">Total Questions : </h1>
              <h2 className=" text-black font-semibold">
                {pageData?.questions?.length}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseSurvey;
