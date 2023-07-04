import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// components
import Header from "../components/global-components/Header";
// icons
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
// mui ratings
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import { tabList } from "../helpers/tabList";
import { BASE_API_LINK } from "../utils/BaseAPILink";
import axios from "axios";
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#0284c7",
  },
  "& .MuiRating-iconHover": {
    color: "#0284c7",
  },
});

const EditSurvey = () => {
  const params = useParams();

  // default data
  const questionTypes = [
    "Scale (0-10)",
    "Star Rating",
    "Short Answer",
    "Long Answer",
    "Email",
  ];

  const scalePoints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const mockPageData = {
    survey_basic_detail: {
      name: "NPS Survey",
      description: "Lorem ipsum dolor sit amet",
      cover: "img path here",
      primary_color: "#ac0069",
      logo: "img path here",
    },

    all_questionnaire: [
      // {
      //   id: 1,
      //   question: " Email ID ",
      //   question_type: "Short Answer",
      //   answer: "",
      //   required: false,
      // },
      {
        id: 2,
        question:
          "On a scale of 0 to 10, how likely are you to recommend our company/product/service to a friend or colleague?",
        question_type: "Scale (0-10)",
        start_label: "Extremely low",
        end_label: "Extremely high",
        answer: "",
        required: false,
      },
      {
        id: 3,
        question:
          " In your opinion, what improvements could the company make that would warrant a higher rating from you? ",
        question_type: "Long Answer",
        answer: "",
        required: false,
      },

      // {
      //   id: 4,
      //   question: "How would you rate our quality of service?",
      //   question_type: "Star Rating",
      //   answer: "",
      //   required: false,
      // },
    ],
  };

  const [pageData, setPageData] = useState();
  const [activeInputId, setActiveInputId] = useState();
  const [changeQuestionId, setChangeQuestionId] = useState();

  useEffect(() => {
    console.log("params from question tab:", params);
    axios
      ?.post(BASE_API_LINK + "ms/survey_edit", {
        survey_id: params?.survey_id,
      })
      ?.then((res) => {
        console.log("questions res:", res?.data);
        setPageData(res?.data);
      });
  }, [params]);

  useEffect(() => {
    console.log("PageData:", pageData);
  }, [pageData]);

  const handleEdit = () => {
    axios
      ?.put(BASE_API_LINK + "ms/survey_edit", {
        data: pageData,
      })
      ?.then((res) => {
        console.log("edit res:", res?.data);
        // setPageData(res?.data);
      });
  };

  return (
    <div className="">
      <Header />
      <div className="px-5 ">
        {/* tab list */}
        <div className="flex justify-between items-end z-50 sticky top-0 bg-white border-b pt-2">
          {/* previous btn */}
          <div className=" ">
            <button className="invisible px-10 py-3 bg-sky-200  text-white rounded-lg cursor-not-allowed transition-all  text-xl flex items-center justify-center gap-1 ">
              <span className="scale-x-[-1] -translate-y-[0.20rem] block">
                <ArrowForwardIosRoundedIcon />
              </span>

              <span>Previous</span>
            </button>
          </div>
          {/* tabs */}
          <div className="flex-1 flex justify-center items-center gap-5 ">
            {tabList?.map((data, i) => {
              return (
                <Link
                  to={data?.path + params?.survey_id}
                  key={i}
                  className={` ${
                    data?.name === "Create"
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
              to={"/survey-dashboard/survey_share/" + params?.survey_id}
              onClick={() => {
                axios
                  .put(BASE_API_LINK + "ms/survey_edit", pageData)
                  ?.then((res) => {
                    console.log("create survey response", res?.data);
                  });
              }}
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

        <div className="w-full mx-auto p-5   ">
          {/* survey name and description */}
          <div className="bg-white border p-5 rounded-lg mb-5">
            <input
              autoFocus
              type="text"
              value={pageData?.survey_basic_detail?.name}
              onChange={(e) => {
                setPageData({
                  ...pageData,
                  survey_basic_detail: {
                    ...pageData?.survey_basic_detail,
                    name: e?.target?.value,
                  },
                });
              }}
              className="block w-full border-b outline-none focus:border-b-2 focus:border-b-gray-400 p-2 text-2xl font-semibold mb-5"
              placeholder="Survey Name"
            />

            <textarea
              rows={3}
              placeholder="Survey description"
              className="border-b block w-full outline-none focus:border-b-2 focus:border-b-gray-400 p-2"
              value={pageData?.survey_basic_detail?.description}
              onChange={(e) => {
                setPageData({
                  ...pageData,
                  survey_basic_detail: {
                    ...pageData?.survey_basic_detail,
                    description: e?.target?.value,
                  },
                });
              }}
            />
          </div>

          {/* survey questions */}
          <div>
            {/* question block */}
            {pageData?.all_questionnaire?.map((data, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setActiveInputId(data?.id);
                  }}
                  onMouseEnter={() => {
                    setActiveInputId(data?.id);
                  }}
                  draggable
                  className="bg-white border p-5 rounded-lg mb-5 cursor-move"
                >
                  <div className="flex items-center gap-5">
                    {/* question */}
                    <div className="flex-1">
                      <input
                        type="text"
                        className="block w-full border-b outline-none focus:border-b-2 focus:border-b-gray-400 p-2 text-xl  mb-5"
                        value={data?.question}
                        onChange={(e) => {
                          setPageData({
                            ...pageData,
                            all_questionnaire: pageData?.all_questionnaire?.map(
                              (all_q_data) => {
                                if (activeInputId === all_q_data?.id) {
                                  return {
                                    ...all_q_data,
                                    question: e?.target?.value,
                                  };
                                } else return all_q_data;
                              }
                            ),
                          });
                        }}
                        placeholder="Write your question here"
                      />
                    </div>

                    {/* question type */}
                    <div>
                      <h1 className="text-gray-500 text-xs mb-1">
                        Question Type
                      </h1>
                      <div className="relative">
                        <div
                          className="border rounded-lg py-2 px-5 flex items-center justify-between gap-2 cursor-pointer w-[200px]"
                          onClick={() => {
                            changeQuestionId === data?.id
                              ? setChangeQuestionId(null)
                              : setChangeQuestionId(data?.id);
                          }}
                        >
                          <h1>{data?.question_type}</h1>
                          <span>
                            <ArrowDropDownRoundedIcon />
                          </span>
                        </div>

                        {changeQuestionId === data?.id && (
                          <div className="absolute top-[110%] shadow-2xl  border bg-gray-50 z-[55] rounded-lg  right-0 left-0 overflow-hidden">
                            {questionTypes?.map((m_data) => {
                              return (
                                <div
                                  key={m_data}
                                  className={` ${
                                    m_data === data?.question_type
                                      ? "bg-sky-200"
                                      : "hover:bg-sky-100"
                                  } p-2 cursor-pointer`}
                                  onClick={() => {
                                    setPageData({
                                      ...pageData,
                                      all_questionnaire:
                                        pageData?.all_questionnaire?.map(
                                          (a_data) => {
                                            if (
                                              changeQuestionId === a_data?.id
                                            ) {
                                              return {
                                                ...data,
                                                question_type: m_data,
                                              };
                                            } else return a_data;
                                          }
                                        ),
                                    });

                                    setChangeQuestionId(null);
                                  }}
                                >
                                  {m_data}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {changeQuestionId === data?.id && (
                          <div
                            onClick={() => {
                              setChangeQuestionId(null);
                            }}
                            className="z-50  fixed inset-0"
                          ></div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    {data?.question_type === "Email" && (
                      <div>
                        <input
                          type="email"
                          placeholder="Enter your email id here"
                          className="w-full p-2 border mb-5"
                        />
                      </div>
                    )}
                    {data?.question_type === "Short Answer" && (
                      <div>
                        <input
                          type="text"
                          placeholder="Short answer here"
                          className="w-full p-2 border mb-5"
                        />
                      </div>
                    )}
                    {data?.question_type === "Long Answer" && (
                      <div>
                        <textarea
                          rows={5}
                          placeholder="Long answer here"
                          className="w-full p-2 border mb-5"
                        />
                      </div>
                    )}
                    {data?.question_type === "Scale (0-10)" && (
                      <div>
                        <div className="flex gap-3 items-center justify-center flex-wrap py-5">
                          {scalePoints?.map((s_data) => {
                            return (
                              <div
                                key={s_data}
                                className="aspect-square rounded-xl bg-sky-100 w-[50px] flex justify-center items-center cursor-pointer hover:bg-sky-200"
                              >
                                {s_data}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {data?.question_type === "Star Rating" && (
                      <div
                        className="flex justify-start items-center gap-10"
                        autoFocus
                      >
                        <button
                          className={`mb-3 rounded-lg ml-10 outline-none items-center cursor-pointer transition-all scale-150 `}
                        >
                          <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            precision={0.5}
                            icon={<StarIcon fontSize="large" />}
                            emptyIcon={<StarBorderIcon fontSize="large" />}
                            onChange={(event, newValue) => {
                              setPageData({
                                ...pageData,
                                survey: pageData?.survey?.map(
                                  (c_data, c_index) => {
                                    if (activeQuestionIndex === c_index) {
                                      return {
                                        ...c_data,
                                        answer: newValue,
                                      };
                                    } else {
                                      return c_data;
                                    }
                                  }
                                ),
                              });
                            }}
                          />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="border-t  flex justify-end items-center pt-5 gap-5">
                    {/* <ContentCopyRoundedIcon className="text-gray-600" /> */}
                    <DeleteForeverRoundedIcon
                      className="text-sky-600 cursor-pointer hover:text-red-500 transition-all"
                      onClick={() => {
                        let filteredArray = pageData?.all_questionnaire
                          ?.filter((f_data, f_index) => {
                            if (f_index !== index) {
                              return f_data;
                            }
                          })
                          ?.map((m_data) => {
                            return m_data;
                          });

                        setPageData({
                          ...pageData,
                          all_questionnaire: filteredArray,
                        });
                      }}
                    />
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-sky-600">Required</span>
                      <button
                        onClick={() =>
                          setPageData({
                            ...pageData,
                            all_questionnaire: pageData?.all_questionnaire?.map(
                              (m_data) => {
                                if (activeInputId === m_data?.id) {
                                  return {
                                    ...m_data,
                                    required: !m_data?.required,
                                  };
                                } else return m_data;
                              }
                            ),
                          })
                        }
                        className={`${
                          data?.required
                            ? " bg-green-100 border-green-300"
                            : "bg-gray-100 border-sky-300"
                        } bg-sky-100  border w-[35px] aspect-video relative rounded-full`}
                      >
                        <div
                          className={` ${
                            data?.required
                              ? "left-[20px] bg-green-500 ease-in duration-300"
                              : "left-0 bg-gray-500 ease-in duration-300"
                          }  rounded-full aspect-square w-[20px] absolute  top-[-2%] transition-all `}
                        ></div>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-center items-center gap-2 flex-col text-gray-500 text-xl py-5 ">
              <button
                onClick={() => {
                  setPageData({
                    ...pageData,
                    all_questionnaire: [
                      ...pageData?.all_questionnaire,
                      {
                        id: new Date().getTime(),
                        question: "",
                        question_type: "Short Answer",
                        required: false,
                      },
                    ],
                  });
                }}
                className="active:scale-95 transition-all "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-16 h-16 stroke-sky-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <h1 className="text-sky-600">Add Questions</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSurvey;
