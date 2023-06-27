import React, { useState } from "react";
import Header from "../components/global-components/Header";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SurveyDashboard = () => {
  const [pageData, setPageData] = useState();
  const [selectedSurvey, setSelectedSurvey] = useState();
  const navigate = useNavigate();

  const pageData2 = {
    existing_surveys: [
      {
        id: 1,
        name: "Order Survey",
        created_at: "Apr 10, 2023",
      },

      {
        id: 2,
        name: "Event Survey",
        created_at: "Feb 02, 2023",
      },

      {
        id: 3,
        name: "Feedback Survey",
        created_at: "Jan 30, 2023",
      },
    ],

    user_details: {},
  };

  useEffect(() => {
    setPageData(pageData2);
  }, []);

  const handleDeleteSurvey = (survey_id) => {
    let temp = pageData?.existing_surveys?.filter(
      (survey) => survey?.id !== survey_id
    );
    setPageData({
      ...pageData,
      existing_surveys: temp,
    });
  };
  return (
    <div>
      <Header />
      {/* create survey */}
      <div className=" p-5 mb-5">
        <div className=" flex flex-col   text-sky-600 font-medium gap-2 border-b  pb-5">
          <div className="w-fit">
            <h1 className=" mb-5">Start a new survey</h1>
            <Link
              to={"/survey-dashboard/survey_edit/" + new Date().getTime()}
              //   onClick={async () => {
              //     await axios
              //       .post(BASE_ADDRESS + `survey_create`)
              //       ?.then((res) => {
              //         console.log("create survey response", res?.data);
              //       });

              //     await axios
              //       .post(BASE_ADDRESS + `survey_dashboard`)
              //       ?.then((res) => {
              //         setPageData(res?.data);
              //       });
              //   }}
              className=" flex justify-center items-center w-[150px] aspect-square   bg-sky-100 rounded-md  transition-all duration-200 active:scale-95 hover:bg-sky-200 "
            >
              <span className=" text-sky-600 ">
                <AddRoundedIcon fontSize="large" className="scale-150 " />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* previos surveys */}
      <div className=" px-5">
        <div className="flex flex-col   text-gray-600 font-medium gap-2">
          <div className="">
            <h1 className=" mb-5 text-sky-600">Existing surveys</h1>
            {/* list of surveys */}
            {pageData?.existing_surveys?.length > 0 ? (
              <div className="flex gap-5 flex-wrap">
                {pageData?.existing_surveys?.map((data, index) => {
                  return (
                    <button
                      onClick={() => {
                        navigate(`/survey-dashboard/survey_edit/${data?.id}`);
                      }}
                      //   to={`/survey-dashboard/survey_edit/${data?.id}`}
                      key={index}
                      className="text-left   border-2 border-sky-100  p-5 rounded-md hover:outline-sky-200 outline outline-transparent transition-all cursor-pointer justify-between flex items-end gap-4"
                    >
                      <div>
                        <h1 className="font-semibold text-xl mb-5">
                          {data?.name}
                        </h1>

                        <p className="text-xs text-gray-500">
                          Created: {data?.created_at}
                        </p>
                      </div>

                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();

                            if (selectedSurvey === data?.id) {
                            } else {
                              setSelectedSurvey(data?.id);
                            }
                          }}
                          className=" cursor-pointer rounded-md hover:bg-sky-200 transition-all "
                        >
                          <MoreVertIcon />
                        </button>

                        {/* overlay */}
                        {selectedSurvey === data?.id && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSurvey(null);
                            }}
                            className="fixed inset-0 cursor-default z-50"
                          ></div>
                        )}

                        {/* menu */}
                        {selectedSurvey === data?.id && (
                          <div className="absolute top-[100%] bg-white z-[55] rounded-lg w-max shadow-2xl">
                            <button
                              onClick={(e) => {
                                e?.stopPropagation();
                                window.open(
                                  `/survey-dashboard/survey_edit/${data?.id}`,
                                  "_blank",
                                  "rel=noopener noreferrer"
                                );
                              }}
                              className="flex gap-5 font-normal justify-between items-center hover:bg-gray-200 transition-all  w-full p-5"
                            >
                              <span>
                                <OpenInNewIcon />
                              </span>
                              <h1 className="flex-1 text-left">
                                Open in new tab
                              </h1>
                            </button>

                            <button
                              onClick={(e) => {
                                e?.stopPropagation();
                                handleDeleteSurvey(data?.id);
                              }}
                              className="flex gap-5 font-normal justify-between items-center hover:bg-gray-200 transition-all  w-full p-5"
                            >
                              <span>
                                <DeleteIcon />
                              </span>
                              <h1 className="flex-1 text-left">Remove</h1>
                            </button>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div>
                <h2 className="text-gray-300 text-sm text-center ">
                  No surveys created yet
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyDashboard;
