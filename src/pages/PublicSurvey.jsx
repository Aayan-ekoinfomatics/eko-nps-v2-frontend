import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_API_LINK } from "../utils/BaseAPILink";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#0284c7",
  },
  "& .MuiRating-iconHover": {
    color: "#0284c7",
  },
});

const PublicSurvey = () => {
  // local variables
  const [pageData, setPageData] = useState({});
  const [activeInputId, setActiveInputId] = useState();
  const [activeThankYouScreen, setActiveThankYouScreen] = useState(false);
  const scalePoints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const params = useParams();

  const mockPageData = {
    survey_basic_detail: {
      name: "NPS Survey",
      desc: " NPS is a common metric used to determine customer perception and experience. Organizations use NPS scores to help find business areas that need improvement to create better customer loyalty.",
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
      //   required: true,
      // },
      {
        id: 2,
        question:
          "On a scale of 0 to 10, how likely are you to recommend our company/product/service to a friend or colleague?",
        question_type: "Scale (0-10)",
        // start_label: "Extremely low",
        // end_label: "Extremely high",
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

      //   {
      //     id: 4,
      //     question: "How would you rate our quality of service?",
      //     question_type: "Star Rating",
      //     answer: "",
      //     required: false,
      //   },
    ],
  };

  useEffect(() => {
    axios
      .post(BASE_API_LINK + "ms/survey_edit", {
        survey_id: params?.survey_id,
      })
      ?.then((res) => {
        console.log("get survey data", res?.data);
        setPageData(res?.data);
      });

    // setPageData(mockPageData);
  }, []);

  return (
    <div className="bg-sky-50 min-h-screen">
      <div className="w-[60%] mx-auto pt-5">
        {activeThankYouScreen ? (
          <div className="flex justify-center items-center min-h-[90vh]">
            <div className="bg-white p-10 rounded-lg flex justify-center items-center flex-col text-4xl">
              <h1 className="text-gray-900">Thank you for your time!</h1>
              <p className="text-sm text-gray-700 mt-5">
                Your response has been collected
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-white rounded-lg text-gray-700 p-5 mb-5">
              <h1 className="text-4xl font-semibold mb-5">
                {pageData?.survey_basic_detail?.name}
              </h1>
              <p className="text-gray-700">
                {pageData?.survey_basic_detail?.description}
              </p>
            </div>
            {/* all questions */}
            <div>
              {pageData?.all_questionnaire?.map((data, i) => {
                return (
                  <div
                    key={data?.id}
                    onClick={() => {
                      setActiveInputId(data?.id);
                    }}
                    onMouseEnter={() => {
                      setActiveInputId(data?.id);
                    }}
                    className="bg-white rounded-lg text-gray-700 p-5 mb-5 "
                  >
                    <h1 className="text-xl font-semibold mb-5">
                      <span> {data?.question}</span>
                      {data?.required && (
                        <span className="text-red-500 font-semibold">*</span>
                      )}
                    </h1>

                    <div>
                      {data?.question_type === "Short Answer" && (
                        <div>
                          <input
                            type="text"
                            className="w-full border text-lg p-2 rounded-lg outline-sky-500"
                            placeholder="Type your response here"
                            value={data?.answer}
                            onChange={(e) => {
                              setPageData({
                                ...pageData,
                                all_questionnaire:
                                  pageData?.all_questionnaire?.map((m_data) => {
                                    if (m_data?.id === activeInputId) {
                                      return {
                                        ...m_data,
                                        answer: e?.target?.value,
                                      };
                                    } else return m_data;
                                  }),
                              });
                            }}
                          />
                        </div>
                      )}

                      {data?.question_type === "Email" && (
                        <div>
                          <input
                            type="email"
                            className="w-full border text-lg p-2 rounded-lg outline-sky-500"
                            placeholder="Enter your email here"
                            value={data?.answer}
                            onChange={(e) => {
                              setPageData({
                                ...pageData,
                                all_questionnaire:
                                  pageData?.all_questionnaire?.map((m_data) => {
                                    if (m_data?.id === activeInputId) {
                                      return {
                                        ...m_data,
                                        answer: e?.target?.value,
                                      };
                                    } else return m_data;
                                  }),
                              });
                            }}
                          />
                        </div>
                      )}

                      {data?.question_type === "Long Answer" && (
                        <div>
                          <textarea
                            value={data?.answer}
                            onChange={(e) => {
                              setPageData({
                                ...pageData,
                                all_questionnaire:
                                  pageData?.all_questionnaire?.map((m_data) => {
                                    if (m_data?.id === activeInputId) {
                                      return {
                                        ...m_data,
                                        answer: e?.target?.value,
                                      };
                                    } else return m_data;
                                  }),
                              });
                            }}
                            rows={5}
                            className="w-full border text-lg p-2 rounded-lg outline-sky-500"
                            placeholder="Type your response here"
                          />
                        </div>
                      )}

                      {data?.question_type === "Star Rating" && (
                        <div>
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

                      {data?.question_type === "Scale (0-10)" && (
                        <div>
                          <div className="flex gap-3 items-center justify-center flex-wrap py-5">
                            {scalePoints?.map((s_data) => {
                              return (
                                <div
                                  key={s_data}
                                  onClick={() => {
                                    setPageData({
                                      ...pageData,
                                      all_questionnaire:
                                        pageData?.all_questionnaire?.map(
                                          (m_data) => {
                                            if (m_data?.id === activeInputId) {
                                              return {
                                                ...m_data,
                                                answer: s_data,
                                              };
                                            } else return m_data;
                                          }
                                        ),
                                    });
                                  }}
                                  className={`${
                                    data?.answer === s_data
                                      ? "bg-sky-700 text-white "
                                      : "hover:bg-sky-300 "
                                  } aspect-square rounded-xl bg-sky-200 w-[50px] flex justify-center items-center cursor-pointer  transition-all`}
                                >
                                  {s_data}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* submit */}
            <div className="pb-10 flex justify-between items-center">
              <button
                onClick={(e) => {
                  console.log("submit clicked");
                  e?.preventDefault();
                  setActiveThankYouScreen(true);
                  axios
                    .post(BASE_API_LINK + "ms/response_from_survey", pageData)
                    ?.then((res) => {
                      console.log("res from form submit", res);
                    });
                }}
                className="bg-sky-500 text-white text-lg font-semibold px-8 py-3 rounded-lg hover:bg-sky-600 transition-all active:scale-95"
              >
                Submit
              </button>

              {/* <button className=" transition-all active:scale-95  hover:bg-gray-200 py-3 px-5 text-lg rounded-lg text-red-500">
              Reset form
            </button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicSurvey;
