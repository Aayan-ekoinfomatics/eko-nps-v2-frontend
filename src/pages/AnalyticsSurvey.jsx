import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// components
import Header from "../components/global-components/Header";
// helpers
import { tabList } from "../helpers/tabList";
// icons
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

// charts
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { analyticsData } from "../helpers/analyticsData";
import { BASE_API_LINK } from "../utils/BaseAPILink";
import axios from "axios";

const AnalyticsSurvey = () => {
  const params = useParams();
  const [pageData, setPageData] = useState({});
  const [selectedGraph, setSelectedGraph] = useState("NPS");
  const [selectGraphStatus, setSelectGraphStatus] = useState({
    avg_nps: false,
    nps_over_time: false,
    nss_over_time: false,
  });

  const [selectedGraphAvgNps, setSelectedGraphAvgNps] = useState([
    "Overall",
    "Passives",
  ]);

  const [selectedGraphNPSOverTime, setSelectedGraphNPSOverTime] = useState([
    "Passives",
    "Promoters",
  ]);

  const [selectedGraphNSSOverTime, setSelectedGraphNSSOverTime] = useState([
    "Neutral",
    "Positive",
  ]);

  useEffect(() => {
    // setPageData(analyticsData);

    axios
      .post(BASE_API_LINK + "ms/survey_analytics", {
        survey_id: params?.survey_id,
      })
      ?.then((res) => {
        console.log("########## analytics page response ##########", res?.data);
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
              to={"/survey-dashboard/survey_responses/" + params?.survey_id}
              className=" mb-2 px-10 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg active:scale-95 transition-all  text-xl flex items-center justify-center gap-1 "
            >
              <span className="scale-x-[-1] -translate-y-[0.20rem] block">
                <ArrowForwardIosRoundedIcon />
              </span>

              <span>Previous</span>
            </Link>
          </div>
          {/* tabs */}
          <div className="flex-1 flex justify-center items-center gap-5 ">
            {tabList?.map((data, i) => {
              return (
                <Link
                  to={data?.path + params?.survey_id}
                  key={i}
                  className={` ${
                    data?.name === "Analytics"
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
              to={"/survey-dashboard/survey_responses/" + params?.survey_id}
              className="mb-2 invisible px-10 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg active:scale-95 transition-all  text-xl flex items-center justify-center gap-1 "
            >
              <span>Next</span>
              <span className="-translate-y-[0.18rem] block">
                <ArrowForwardIosRoundedIcon />
              </span>
            </Link>
          </div>
        </div>

        {/* main content */}
        <div className="w-full py-5 mx-auto">
          {/* main body */}
          <div className="bg-white w-full ">
            <div className="w-full h-full mx-auto py-5 pt-0">
              {/* nps section */}
              <div>
                {/* heading */}
                <div className="flex  items-center -mb-3">
                  <div className=" h-[10px] border-t rounded-tl-xl  w-full"></div>
                  <h1 className="text-gray-800 text-2xl font-semibold text-center  w-fit mx-auto   px-10">
                    NPS
                  </h1>
                  <div className="h-[10px] border-t rounded-tr-xl w-full"></div>
                </div>
                {/* body */}
                <div className="p-5 mt-5 border border-t-transparent rounded-b-lg">
                  {/* cards */}
                  <div className="bg-white rounded-lg border grid grid-cols-3  md:grid-cols-6 divide-y md:divide-y-0 divide-x text-gray-900">
                    {pageData?.nps?.cards?.map((data, index) => {
                      return (
                        <div
                          key={index}
                          className="w-full flex flex-col justify-center items-center p-5 gap-2"
                        >
                          <h2 className=" text-gray-500 ">{data?.title}</h2>
                          <h1 className="text-3xl">{data?.value}</h1>
                        </div>
                      );
                    })}
                  </div>

                  {/* graphs */}
                  <div className=" mt-5 text-gray-900">
                    <div className="flex flex-col lg:flex-row items-center gap-5">
                      {/* nps summary */}
                      <div
                        // ref={npsSummary}
                        className="border bg-white rounded-lg p-5 flex-1 w-full"
                      >
                        <div className="flex justify-between items-center">
                          <h1 className="text-xl font-semibold ">
                            Net Promoter Score{" "}
                          </h1>

                          <button
                            // onClick={() => exportComponentAsPNG(npsSummary)}
                            title="Download"
                            className="text-gray-600"
                          >
                            <DownloadRoundedIcon />
                          </button>
                        </div>

                        <div className="mt-8">
                          <div className="flex gap-5 items-center">
                            {/* pie */}
                            <div className="flex-[0.3] relative">
                              {/* Pie graph */}
                              <div className="absolute  top-[50%]  left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                                <div className="flex flex-col justify-center items-center">
                                  <h1 className="text-[18px] opacity-80">
                                    NPS
                                  </h1>
                                  <p className="opacity-80 text-[24px] font-semibold">
                                    {
                                      pageData?.nps?.graphs?.nps_pie_bar
                                        ?.nps_score
                                    }
                                    %
                                  </p>
                                </div>
                              </div>
                              <ResponsiveContainer
                                height={250}
                                width="100%"
                                className=""
                              >
                                <PieChart
                                  height={220}
                                  width={250}
                                  key={pageData?.nps?.graphs?.nps_pie_bar}
                                >
                                  <defs>
                                    <linearGradient
                                      id="npsGradient"
                                      x1="0"
                                      y1="0"
                                      x2="0"
                                      y2="1"
                                    >
                                      <stop
                                        offset="5%"
                                        stopColor="#009DFF"
                                        stopOpacity={1}
                                      />
                                      <stop
                                        offset="95%"
                                        stopColor="#009DFF"
                                        stopOpacity={0.7}
                                      />
                                    </linearGradient>

                                    <linearGradient
                                      id="promoterGradient"
                                      x1="0"
                                      y1="0"
                                      x2="0"
                                      y2="1"
                                    >
                                      <stop
                                        offset="5%"
                                        stopColor="#00AC69"
                                        stopOpacity={1}
                                      />
                                      <stop
                                        offset="95%"
                                        stopColor="#00AC69"
                                        stopOpacity={0.7}
                                      />
                                    </linearGradient>

                                    <linearGradient
                                      id="passiveGradient"
                                      x1="0"
                                      y1="0"
                                      x2="0"
                                      y2="1"
                                    >
                                      <stop
                                        offset="5%"
                                        stopColor="#4D5552"
                                        stopOpacity={1}
                                      />
                                      <stop
                                        offset="95%"
                                        stopColor="#4D5552"
                                        stopOpacity={0.7}
                                      />
                                    </linearGradient>

                                    <linearGradient
                                      id="detractorGradient"
                                      x1="0"
                                      y1="0"
                                      x2="0"
                                      y2="1"
                                    >
                                      <stop
                                        offset="5%"
                                        stopColor="#DB2B39"
                                        stopOpacity={1}
                                      />
                                      <stop
                                        offset="95%"
                                        stopColor="#DB2B39"
                                        stopOpacity={0.7}
                                      />
                                    </linearGradient>

                                    <linearGradient
                                      id="negativeGradient"
                                      x1="0"
                                      y1="0"
                                      x2="0"
                                      y2="1"
                                    >
                                      <stop
                                        offset="5%"
                                        stopColor="#EE6123"
                                        stopOpacity={1}
                                      />
                                      <stop
                                        offset="95%"
                                        stopColor="#EE6123"
                                        stopOpacity={0.7}
                                      />
                                    </linearGradient>
                                  </defs>
                                  <Tooltip
                                    cursor={false}
                                    content={<CustomTooltip />}
                                  />

                                  <Pie
                                    data={pageData?.nps?.graphs?.nps_pie}
                                    dataKey="percentage"
                                    nameKey="label"
                                    cx="50%"
                                    cy="50%"
                                    // strokeWidth={2}
                                    // stroke="#00000"
                                    innerRadius="60%"
                                    outerRadius="100%"
                                    cornerRadius={6}
                                    paddingAngle={2}
                                    startAngle={-270}
                                    endAngle={-630}
                                    // startAngle={90}
                                    // endAngle={-268}
                                    minAngle={5}
                                    fill="#1e1e1e1e"
                                  >
                                    {pageData?.nps?.graphs?.nps_pie?.map(
                                      (entry, index) => (
                                        <Cell key={index} fill={entry?.color} />
                                      )
                                    )}
                                  </Pie>
                                </PieChart>
                              </ResponsiveContainer>
                            </div>

                            {/* pie bar */}
                            <div className="flex-[0.7] flex flex-col gap-5 justify-center ">
                              {/* promoter */}
                              <div>
                                {/* head  */}
                                <div className="flex justify-between items-center">
                                  <div className="text-gray-400 flex gap-2 ">
                                    <h3>Promoters</h3>
                                    <h4>
                                      {"(" +
                                        pageData?.nps?.graphs?.nps_pie_bar
                                          ?.promoters +
                                        "%)"}
                                    </h4>
                                  </div>

                                  <div className="text-gray-400 flex gap-2 ">
                                    <h3>
                                      {
                                        pageData?.nps?.graphs?.nps_pie_bar
                                          ?.total_promoters
                                      }
                                    </h3>

                                    <h4>
                                      <GroupsRoundedIcon />
                                    </h4>
                                  </div>
                                </div>
                                {/* bar */}
                                <div className="bg-white rounded-xl border">
                                  <div
                                    className="bg-[#00AC69] h-[25px] rounded-xl"
                                    style={{
                                      width:
                                        pageData?.nps?.graphs?.nps_pie_bar
                                          ?.promoters + "%",
                                    }}
                                  ></div>
                                </div>
                              </div>

                              {/* passive */}
                              <div>
                                {/* head  */}
                                <div className="flex justify-between items-center">
                                  <div className="text-gray-400 flex gap-2 ">
                                    <h3>Passives</h3>
                                    <h4>
                                      {"(" +
                                        pageData?.nps?.graphs?.nps_pie_bar
                                          ?.passive +
                                        "%)"}
                                    </h4>
                                  </div>

                                  <div className="text-gray-400 flex gap-2 ">
                                    <h3>
                                      {
                                        pageData?.nps?.graphs?.nps_pie_bar
                                          ?.total_passive
                                      }
                                    </h3>

                                    <h4>
                                      <GroupsRoundedIcon />
                                    </h4>
                                  </div>
                                </div>
                                {/* bar */}
                                <div className="bg-white rounded-xl border">
                                  <div
                                    className="bg-[#4D5552] h-[25px] rounded-xl"
                                    style={{
                                      width:
                                        pageData?.nps?.graphs?.nps_pie_bar
                                          ?.passive + "%",
                                    }}
                                  ></div>
                                </div>
                              </div>

                              {/* detractors */}
                              <div>
                                {/* head  */}
                                <div className="flex justify-between items-center">
                                  <div className="text-gray-400 flex gap-2 ">
                                    <h3>Detractors</h3>
                                    <h4>
                                      {"(" +
                                        pageData?.nps?.graphs?.nps_pie_bar
                                          ?.detractors +
                                        "%)"}
                                    </h4>
                                  </div>

                                  <div className="text-gray-400 flex gap-2 ">
                                    <h3>
                                      {
                                        pageData?.nps?.graphs?.nps_pie_bar
                                          ?.total_detractors
                                      }
                                    </h3>

                                    <h4>
                                      <GroupsRoundedIcon />
                                    </h4>
                                  </div>
                                </div>
                                {/* bar */}
                                <div className="bg-white rounded-xl border">
                                  <div
                                    className="bg-[#DB2B39] h-[25px] rounded-xl"
                                    style={{
                                      width:
                                        pageData?.nps?.graphs?.nps_pie_bar
                                          ?.detractors + "%",
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* average nps */}
                      <div
                        // ref={avgNps}
                        className="border bg-white rounded-lg p-5  flex-1 w-full hidden"
                      >
                        <div className="flex justify-between items-center gap-5 ">
                          <h1 className="text-xl font-semibold">Average NPS</h1>

                          {/* select , download and reset */}
                          <div className="flex gap-2 items-center text-gray-700">
                            <button
                              title="Download"
                              // onClick={() => exportComponentAsPNG(avgNps)}
                            >
                              <DownloadRoundedIcon />
                            </button>
                            <div className="relative">
                              <button
                                onClick={() => {
                                  setSelectGraphStatus({
                                    avg_nps: !selectGraphStatus?.avg_nps,
                                  });
                                }}
                                className="flex items-center gap-2  border-gray-600 bg-gray-200 text-black px-2 py-1 rounded-lg"
                              >
                                <span>Select graph</span>
                                <span>
                                  <KeyboardArrowDownRoundedIcon />
                                </span>
                              </button>
                              {/* dropdown */}
                              {selectGraphStatus?.avg_nps && (
                                <div className="absolute top-[110%]  border-gray-600  z-50 bg-gray-100 shadow-2xl rounded-b-lg left-0 right-0">
                                  {analyticsData?.nps?.legends?.avg_nps?.map(
                                    (data, index) => {
                                      return (
                                        <div
                                          key={index}
                                          className="flex gap-2 justify-between items-center p-2  text-sm hover:bg-gray-200 transition-all cursor-pointer"
                                          onClick={() => {
                                            if (
                                              selectedGraphAvgNps?.includes(
                                                data?.name
                                              )
                                            ) {
                                              if (
                                                selectedGraphAvgNps?.length > 1
                                              ) {
                                                setSelectedGraphAvgNps(
                                                  (selectGraphStatus) =>
                                                    arrayRemove(
                                                      selectGraphStatus,
                                                      data?.name
                                                    )
                                                );
                                              }
                                            } else {
                                              setSelectedGraphAvgNps(() => [
                                                ...selectedGraphAvgNps,
                                                data?.name,
                                              ]);
                                            }
                                          }}
                                        >
                                          <div className="flex items-center gap-2">
                                            <div
                                              style={{
                                                backgroundColor: data?.color,
                                              }}
                                              className="w-[8px] aspect-square  rounded-full"
                                            ></div>
                                            <div>{data?.name}</div>
                                          </div>

                                          <div>
                                            {selectedGraphAvgNps?.includes(
                                              data?.name
                                            ) && (
                                              <CheckCircleRoundedIcon
                                                fontSize="small"
                                                className="text-gray-600"
                                              />
                                            )}
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}

                                  <div className="text-sm  flex justify-between border-t">
                                    <button
                                      onClick={() => {
                                        setSelectedGraphAvgNps([
                                          "Promoters",
                                          "Detractors",
                                          "Passives",
                                          "Overall",
                                        ]);
                                      }}
                                      className="hover:underline hover:text-blue-500 p-2"
                                    >
                                      Select all
                                    </button>
                                    <button
                                      onClick={() => {
                                        setSelectedGraphAvgNps([
                                          "Overall",
                                          "Passives",
                                        ]);
                                      }}
                                      className="hover:underline hover:text-red-500 p-2"
                                    >
                                      Reset
                                    </button>
                                  </div>
                                </div>
                              )}
                              {/* overlay */}
                              {selectGraphStatus?.avg_nps && (
                                <div
                                  className="bg-black bg-opacity-0 fixed inset-0 z-[49]"
                                  onClick={() => {
                                    setSelectGraphStatus({
                                      avg_nps: false,
                                    });
                                  }}
                                ></div>
                              )}
                            </div>

                            {/* <button className="scale-x-[-1]" title="Reset">
                          <ReplayRoundedIcon />
                        </button> */}
                          </div>
                        </div>

                        {/* legend */}
                        <div className="flex items-center gap-5 justify-end my-5">
                          {analyticsData?.nps?.legends?.avg_nps?.map(
                            (data, index) => {
                              return (
                                <div key={index}>
                                  <div className="flex items-center gap-1">
                                    <div
                                      style={{ backgroundColor: data?.color }}
                                      className=" h-[8px] w-[8px] rounded-full"
                                    ></div>
                                    <div className="text-[12px] opacity-80">
                                      {data?.name}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>

                        {/* Graph */}
                        <div className=" w-full mt-5">
                          <ResponsiveContainer
                            width="98%"
                            height={220}
                            className=""
                          >
                            <ComposedChart
                              data={analyticsData?.nps?.graphs?.avg_nps}
                              margin={{
                                top: 0,
                                right: 0,
                                left: -20,
                                bottom: 0,
                              }}
                            >
                              <CartesianGrid
                                vertical={false}
                                horizontal={false}
                                opacity={0.5}
                              />

                              <XAxis
                                dataKey="month"
                                fontSize={12}
                                axisLine={false}
                                tickLine={false}
                                tickCount={10}
                                angle={0}
                                textAnchor="middle"
                              />
                              <YAxis
                                type="number"
                                // domain={["dataMin - 0.005", "dataMax + 0.0005"]}
                                axisLine={false}
                                tickLine={false}
                                fontSize={10}
                                tickFormatter={(number) =>
                                  `${number.toFixed(2)}`
                                }
                                margin={{ right: 20 }}
                              />

                              <Tooltip
                                cursor={false}
                                content={<CustomTooltip />}
                              />

                              {selectedGraphAvgNps?.includes("Promoters") && (
                                <Bar
                                  barSize={20}
                                  name="Promoters"
                                  dataKey="promoter"
                                  // fill="#00AC69"
                                  fill="url(#promoterGradient)"
                                  radius={[20, 20, 0, 0]}
                                />
                              )}

                              {selectedGraphAvgNps?.includes("Passives") && (
                                <Bar
                                  barSize={20}
                                  name="Passives"
                                  dataKey="passive"
                                  // fill="#4D5552"
                                  fill="url(#passiveGradient)"
                                  radius={[20, 20, 0, 0]}
                                />
                              )}
                              {selectedGraphAvgNps?.includes("Detractors") && (
                                <Bar
                                  barSize={20}
                                  name="Detractors"
                                  dataKey="detractor"
                                  // fill="#DB2B39"
                                  fill="url(#detractorGradient)"
                                  radius={[20, 20, 0, 0]}
                                />
                              )}
                              {selectedGraphAvgNps?.includes("Overall") && (
                                <Bar
                                  barSize={20}
                                  name="Overall"
                                  dataKey="nps"
                                  // fill="#0094E0"
                                  fill="url(#npsGradient)"
                                  radius={[20, 20, 0, 0]}
                                />
                              )}
                            </ComposedChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    {/* nps over time */}
                    <div
                      // ref={npsOverTime}
                      className="hidden mt-5 border bg-white rounded-lg p-5 flex-1 min-h-[350px]"
                    >
                      <div className="flex justify-between items-center gap-2">
                        <h1 className="text-xl font-semibold ">
                          {" "}
                          NPS Over Time
                        </h1>

                        {/* legend after md*/}
                        <div className="hidden md:flex items-center gap-5 justify-end my-5">
                          {analyticsData?.nps?.legends?.nps_over_time?.map(
                            (data, index) => {
                              return (
                                <div key={index}>
                                  <div className="flex items-center gap-1">
                                    <div
                                      style={{ backgroundColor: data?.color }}
                                      className=" h-[8px] w-[8px] rounded-full"
                                    ></div>
                                    <div className="text-[12px] opacity-80">
                                      {data?.name}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>

                        {/* select , download and reset */}
                        <div className="flex gap-2 items-center text-gray-700">
                          <button
                            title="Download"
                            // onClick={() => exportComponentAsPNG(npsOverTime)}
                          >
                            <DownloadRoundedIcon />
                          </button>
                          <div className="relative">
                            <button
                              onClick={() => {
                                setSelectGraphStatus({
                                  nps_over_time:
                                    !selectGraphStatus?.nps_over_time,
                                });
                              }}
                              className="flex items-center gap-2  border-gray-600 bg-gray-200 text-black px-2 py-1 rounded-lg"
                            >
                              <span>Select graph</span>
                              <span>
                                <KeyboardArrowDownRoundedIcon />
                              </span>
                            </button>
                            {/* dropdown */}
                            {selectGraphStatus?.nps_over_time && (
                              <div className="absolute top-[110%]  border-gray-600  z-50 bg-gray-100 shadow-2xl rounded-b-lg left-0 right-0">
                                {analyticsData?.nps?.legends?.nps_over_time?.map(
                                  (data, index) => {
                                    return (
                                      <div
                                        key={index}
                                        className="flex gap-2 justify-between items-center p-2  text-sm hover:bg-gray-200 transition-all cursor-pointer"
                                        onClick={() => {
                                          if (
                                            selectedGraphNPSOverTime?.includes(
                                              data?.name
                                            )
                                          ) {
                                            if (
                                              selectedGraphNPSOverTime?.length >
                                              1
                                            ) {
                                              setSelectedGraphNPSOverTime(
                                                (selectGraphStatus) =>
                                                  arrayRemove(
                                                    selectGraphStatus,
                                                    data?.name
                                                  )
                                              );
                                            }
                                          } else {
                                            setSelectedGraphNPSOverTime(() => [
                                              ...selectedGraphNPSOverTime,
                                              data?.name,
                                            ]);
                                          }
                                        }}
                                      >
                                        <div className="flex items-center gap-2">
                                          <div
                                            style={{
                                              backgroundColor: data?.color,
                                            }}
                                            className="w-[8px] aspect-square  rounded-full"
                                          ></div>
                                          <div>{data?.name}</div>
                                        </div>

                                        <div>
                                          {selectedGraphNPSOverTime?.includes(
                                            data?.name
                                          ) && (
                                            <CheckCircleRoundedIcon
                                              fontSize="small"
                                              className="text-gray-600"
                                            />
                                          )}
                                        </div>
                                      </div>
                                    );
                                  }
                                )}

                                <div className="text-sm  flex justify-between border-t">
                                  <button
                                    onClick={() => {
                                      setSelectedGraphNPSOverTime([
                                        "Promoters",
                                        "Detractors",
                                        "Passives",
                                        "NPS",
                                      ]);
                                    }}
                                    className="hover:underline hover:text-blue-500 p-2"
                                  >
                                    Select all
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedGraphNPSOverTime([
                                        "Passives",
                                        "Promoters",
                                      ]);
                                    }}
                                    className="hover:underline hover:text-red-500 p-2"
                                  >
                                    Reset
                                  </button>
                                </div>
                              </div>
                            )}
                            {/* overlay */}
                            {selectGraphStatus?.avg_nps && (
                              <div
                                className="bg-black bg-opacity-0 fixed inset-0 z-[49]"
                                onClick={() => {
                                  setSelectGraphStatus({
                                    avg_nps: false,
                                  });
                                }}
                              ></div>
                            )}
                          </div>

                          {/* <button className="scale-x-[-1]" title="Reset">
                        <ReplayRoundedIcon />
                      </button> */}
                        </div>
                      </div>

                      {/* legend before md*/}
                      <div className="flex md:hidden items-center gap-5 justify-end my-5">
                        {analyticsData?.nps?.legends?.nps_over_time?.map(
                          (data, index) => {
                            return (
                              <div key={index}>
                                <div className="flex items-center gap-1">
                                  <div
                                    style={{ backgroundColor: data?.color }}
                                    className=" h-[8px] w-[8px] rounded-full"
                                  ></div>
                                  <div className="text-[12px] opacity-80">
                                    {data?.name}
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>

                      {/* Graph */}
                      <div className="relative mt-5">
                        <ResponsiveContainer width="100%" height={300}>
                          <AreaChart
                            key={selectedGraph}
                            data={analyticsData?.nps?.graphs?.nps_over_time}
                            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                          >
                            <CartesianGrid
                              vertical={false}
                              horizontal={false}
                              opacity={0.5}
                            />
                            <XAxis
                              dataKey="month"
                              fontSize={12}
                              axisLine={false}
                              tickLine={false}
                              tickCount={6}
                              angle={0}
                              textAnchor="middle"
                            />
                            <YAxis
                              axisLine={false}
                              tickLine={false}
                              fontSize={12}
                              tickCount={4}
                              tickFormatter={(number) => `${number}`}
                              margin={{ right: 20 }}
                            />
                            <Tooltip
                              cursor={false}
                              content={<CustomTooltip />}
                            />

                            {selectedGraphNPSOverTime?.includes(
                              "Promoters"
                            ) && (
                              <Area
                                type="monotone"
                                name="promoter"
                                dataKey="promoter"
                                stroke="#00AC69 "
                                dot={false}
                                strokeWidth={4}
                                fill="url(#promoterGradient)"
                              />
                            )}

                            {selectedGraphNPSOverTime?.includes("Passives") && (
                              <Area
                                type="monotone"
                                name="passive"
                                dataKey="passive"
                                stroke="#4D5552 "
                                dot={false}
                                strokeWidth={4}
                                fill="url(#passiveGradient)"
                              />
                            )}

                            {selectedGraphNPSOverTime?.includes(
                              "Detractors"
                            ) && (
                              <Area
                                type="monotone"
                                name="detractor"
                                dataKey="detractor"
                                stroke="#DB2B39 "
                                dot={false}
                                strokeWidth={4}
                                fill="url(#detractorGradient)"
                              />
                            )}

                            {selectedGraphNPSOverTime?.includes("NPS") && (
                              <Area
                                type="monotone"
                                name="NPS"
                                dataKey="nps"
                                stroke="#0094E0 "
                                dot={false}
                                strokeWidth={4}
                                fill="url(#npsGradient)"
                              />
                            )}
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* sentiment section */}

              <div className="mt-5 hidden">
                {/* heading */}
                <div className="flex  items-center -mb-3">
                  <div className=" h-[10px]  border-t rounded-tl-xl  w-full"></div>
                  <h1 className="text-gray-800 text-2xl font-semibold text-center  w-fit mx-auto  bg-gray-50  px-10">
                    <span className="w-max block">Sentiment Analysis</span>
                  </h1>
                  <div className="h-[10px] border-t rounded-tr-xl   w-full"></div>
                </div>

                {/* body */}
                <div className="mt-5 p-5 border border-t-transparent rounded-b-lg ">
                  {/* cards */}
                  <div className="bg-white rounded-lg border grid grid-cols-3  md:grid-cols-6 divide-y md:divide-y-0 divide-x text-gray-900">
                    {analyticsData?.sentiment?.cards?.map((data, index) => {
                      return (
                        <div
                          key={index}
                          className="w-full flex flex-col justify-center items-center p-5 gap-2"
                        >
                          <h2 className=" text-gray-500 ">{data?.title}</h2>
                          <h1 className="text-3xl  ">{data?.value}</h1>
                        </div>
                      );
                    })}
                  </div>

                  {/* graphs */}
                  <div className=" mt-5 text-gray-900">
                    <div className="flex flex-col lg:flex-row items-center gap-5">
                      {/* nss summary */}
                      <div
                        // ref={nssSummary}
                        className="border bg-white rounded-lg p-5 flex-1 w-full"
                      >
                        <div className="flex justify-between items-center">
                          <h1 className="text-xl font-semibold ">
                            Sentiments{" "}
                          </h1>

                          <button
                            // onClick={() => exportComponentAsPNG(nssSummary)}
                            title="Download"
                            className="text-gray-600"
                          >
                            <DownloadRoundedIcon />
                          </button>
                        </div>

                        <div className="mt-8">
                          <div className="flex gap-5 items-center">
                            {/* pie */}
                            <div className="flex-[0.3] relative">
                              {/* Pie graph */}
                              <div className="absolute  top-[50%]  left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                                <div className="flex flex-col justify-center items-center">
                                  <h1 className="text-[18px] opacity-80">
                                    Sentiments
                                  </h1>
                                  <p className="opacity-80 text-[24px] font-semibold">
                                    {
                                      analyticsData?.sentiment?.graphs
                                        ?.nss_pie_bar?.nss_score
                                    }
                                    %
                                  </p>
                                </div>
                              </div>
                              <ResponsiveContainer
                                height={250}
                                width="100%"
                                className=""
                              >
                                <PieChart
                                  height={220}
                                  width={250}
                                  key={
                                    analyticsData?.sentiment?.graphs
                                      ?.nss_pie_bar
                                  }
                                >
                                  <Tooltip
                                    cursor={false}
                                    content={<CustomTooltip />}
                                  />

                                  <Pie
                                    data={
                                      analyticsData?.sentiment?.graphs
                                        ?.sentiment_pie
                                    }
                                    dataKey="percentage"
                                    nameKey="label"
                                    cx="50%"
                                    cy="50%"
                                    // strokeWidth={2}
                                    // stroke="#00000"
                                    innerRadius="60%"
                                    outerRadius="100%"
                                    cornerRadius={6}
                                    paddingAngle={2}
                                    startAngle={-270}
                                    endAngle={-630}
                                    // startAngle={90}
                                    // endAngle={-268}
                                    minAngle={5}
                                    fill="#1e1e1e1e"
                                  >
                                    {analyticsData?.sentiment?.graphs?.sentiment_pie?.map(
                                      (entry, index) => (
                                        <Cell key={index} fill={entry?.color} />
                                      )
                                    )}
                                  </Pie>
                                </PieChart>
                              </ResponsiveContainer>
                            </div>

                            {/* pie bar */}
                            <div className="flex-[0.7] flex flex-col gap-5 justify-center ">
                              {/* positive */}
                              <div>
                                {/* head  */}
                                <div className="flex justify-between items-center">
                                  <div className="text-gray-400 flex gap-2 ">
                                    <h3>Positives</h3>
                                    <h4>
                                      {"(" +
                                        analyticsData?.sentiment?.graphs
                                          ?.nss_pie_bar?.positives +
                                        "%)"}
                                    </h4>
                                  </div>

                                  <div className="text-gray-400 flex gap-2 ">
                                    <h3>
                                      {
                                        analyticsData?.sentiment?.graphs
                                          ?.nss_pie_bar?.total_positives
                                      }
                                    </h3>

                                    <h4>
                                      <GroupsRoundedIcon />
                                    </h4>
                                  </div>
                                </div>
                                {/* bar */}
                                <div className="bg-white rounded-xl border">
                                  <div
                                    className="bg-[#00AC69] h-[25px] rounded-xl"
                                    style={{
                                      width:
                                        analyticsData?.sentiment?.graphs
                                          ?.nss_pie_bar?.positives + "%",
                                    }}
                                  ></div>
                                </div>
                              </div>

                              {/* neutral */}
                              <div>
                                {/* head  */}
                                <div className="flex justify-between items-center">
                                  <div className="text-gray-400 flex gap-2 ">
                                    <h3>Neutrals</h3>
                                    <h4>
                                      {"(" +
                                        analyticsData?.sentiment?.graphs
                                          ?.nss_pie_bar?.neutrals +
                                        "%)"}
                                    </h4>
                                  </div>

                                  <div className="text-gray-400 flex gap-2 ">
                                    <h3>
                                      {
                                        analyticsData?.sentiment?.graphs
                                          ?.nss_pie_bar?.total_neutrals
                                      }
                                    </h3>

                                    <h4>
                                      <GroupsRoundedIcon />
                                    </h4>
                                  </div>
                                </div>
                                {/* bar */}
                                <div className="bg-white rounded-xl border">
                                  <div
                                    className="bg-[#4D5552] h-[25px] rounded-xl"
                                    style={{
                                      width:
                                        analyticsData?.nps?.graphs?.nps_pie_bar
                                          ?.passive + "%",
                                    }}
                                  ></div>
                                </div>
                              </div>

                              {/* negative */}
                              <div>
                                {/* head  */}
                                <div className="flex justify-between items-center">
                                  <div className="text-gray-400 flex gap-2 ">
                                    <h3>Negative</h3>
                                    <h4>
                                      {"(" +
                                        analyticsData?.sentiment?.graphs
                                          ?.nss_pie_bar?.negative +
                                        "%)"}
                                    </h4>
                                  </div>

                                  <div className="text-gray-400 flex gap-2 ">
                                    <h3>
                                      {
                                        analyticsData?.sentiment?.graphs
                                          ?.nss_pie_bar?.total_negative
                                      }
                                    </h3>

                                    <h4>
                                      <GroupsRoundedIcon />
                                    </h4>
                                  </div>
                                </div>
                                {/* bar */}
                                <div className="bg-white rounded-xl border">
                                  <div
                                    className="bg-[#EE6123] h-[25px] rounded-xl"
                                    style={{
                                      width:
                                        analyticsData?.sentiment?.graphs
                                          ?.nss_pie_bar?.negative + "%",
                                    }}
                                  ></div>
                                </div>
                              </div>

                              {/* Extreme */}
                              <div>
                                {/* head  */}
                                <div className="flex justify-between items-center">
                                  <div className="text-gray-400 flex gap-2 ">
                                    <h3>Extreme</h3>
                                    <h4>
                                      {"(" +
                                        analyticsData?.sentiment?.graphs
                                          ?.nss_pie_bar?.extreme +
                                        "%)"}
                                    </h4>
                                  </div>

                                  <div className="text-gray-400 flex gap-2 ">
                                    <h3>
                                      {
                                        analyticsData?.sentiment?.graphs
                                          ?.nss_pie_bar?.total_extreme
                                      }
                                    </h3>

                                    <h4>
                                      <GroupsRoundedIcon />
                                    </h4>
                                  </div>
                                </div>
                                {/* bar */}
                                <div className="bg-white rounded-xl border">
                                  <div
                                    className="bg-[#DB2B39] h-[25px] rounded-xl"
                                    style={{
                                      width:
                                        analyticsData?.sentiment?.graphs
                                          ?.nss_pie_bar?.extreme + "%",
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* nss Over Time */}
                      <div
                        // ref={nssOverTime}
                        className="border bg-white rounded-lg p-5  flex-1 w-full"
                      >
                        <div className="flex justify-between items-center gap-5 ">
                          <h1 className="text-xl font-semibold">
                            NSS Over Time
                          </h1>

                          {/* select , download and reset */}
                          <div className="flex gap-2 items-center text-gray-700">
                            <button
                              title="Download"
                              // onClick={() => exportComponentAsPNG(nssOverTime)}
                            >
                              <DownloadRoundedIcon />
                            </button>
                            <div className="relative">
                              <button
                                onClick={() => {
                                  setSelectGraphStatus({
                                    nss_over_time:
                                      !selectGraphStatus?.nss_over_time,
                                  });
                                }}
                                className="flex items-center gap-2  border-gray-600 bg-gray-200 text-black px-2 py-1 rounded-lg"
                              >
                                <span>Select graph</span>
                                <span>
                                  <KeyboardArrowDownRoundedIcon />
                                </span>
                              </button>
                              {/* dropdown */}
                              {selectGraphStatus?.nss_over_time && (
                                <div className="absolute top-[110%]  border-gray-600  z-50 bg-gray-100 shadow-2xl rounded-b-lg left-0 right-0">
                                  {analyticsData?.sentiment?.legends?.nss_over_time?.map(
                                    (data, index) => {
                                      return (
                                        <div
                                          key={index}
                                          className="flex gap-2 justify-between items-center p-2  text-sm hover:bg-gray-200 transition-all cursor-pointer"
                                          onClick={() => {
                                            if (
                                              selectedGraphNSSOverTime?.includes(
                                                data?.name
                                              )
                                            ) {
                                              if (
                                                selectedGraphNSSOverTime?.length >
                                                1
                                              ) {
                                                setSelectedGraphNSSOverTime(
                                                  (selectedGraphNSSOverTime) =>
                                                    arrayRemove(
                                                      selectedGraphNSSOverTime,
                                                      data?.name
                                                    )
                                                );
                                              }
                                            } else {
                                              setSelectedGraphNSSOverTime(
                                                () => [
                                                  ...selectedGraphNSSOverTime,
                                                  data?.name,
                                                ]
                                              );
                                            }
                                          }}
                                        >
                                          <div className="flex items-center gap-2">
                                            <div
                                              style={{
                                                backgroundColor: data?.color,
                                              }}
                                              className="w-[8px] aspect-square  rounded-full"
                                            ></div>
                                            <div>{data?.name}</div>
                                          </div>

                                          <div>
                                            {selectedGraphNSSOverTime?.includes(
                                              data?.name
                                            ) && (
                                              <CheckCircleRoundedIcon
                                                fontSize="small"
                                                className="text-gray-600"
                                              />
                                            )}
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}

                                  <div className="text-sm  flex justify-between border-t">
                                    <button
                                      onClick={() => {
                                        setSelectedGraphNSSOverTime([
                                          "Positive",
                                          "Neutral",
                                          "Negative",
                                          "Extreme",
                                          "Sentiment",
                                        ]);
                                      }}
                                      className="hover:underline hover:text-blue-500 p-2"
                                    >
                                      Select all
                                    </button>
                                    <button
                                      onClick={() => {
                                        setSelectedGraphNSSOverTime([
                                          "Positive",
                                          "Neutral",
                                        ]);
                                      }}
                                      className="hover:underline hover:text-red-500 p-2"
                                    >
                                      Reset
                                    </button>
                                  </div>
                                </div>
                              )}
                              {/* overlay */}
                              {selectGraphStatus?.nss_over_time && (
                                <div
                                  className="bg-black bg-opacity-0 fixed inset-0 z-[49]"
                                  onClick={() => {
                                    setSelectGraphStatus({
                                      avg_nps: false,
                                    });
                                  }}
                                ></div>
                              )}
                            </div>

                            {/* <button className="scale-x-[-1]" title="Reset">
                          <ReplayRoundedIcon />
                        </button> */}
                          </div>
                        </div>

                        {/* legend */}
                        <div className="flex items-center gap-5 justify-end my-5">
                          {analyticsData?.sentiment?.legends?.nss_over_time?.map(
                            (data, index) => {
                              return (
                                <div key={index}>
                                  <div className="flex items-center gap-1">
                                    <div
                                      style={{ backgroundColor: data?.color }}
                                      className=" h-[8px] w-[8px] rounded-full"
                                    ></div>
                                    <div className="text-[12px] opacity-80">
                                      {data?.name}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>

                        {/* Graph */}
                        <div className=" w-full mt-5">
                          <ResponsiveContainer
                            width="98%"
                            height={240}
                            className=""
                          >
                            <ComposedChart
                              data={
                                analyticsData?.sentiment?.graphs?.nss_over_time
                              }
                              margin={{
                                top: 0,
                                right: 0,
                                left: -20,
                                bottom: 0,
                              }}
                            >
                              <CartesianGrid
                                vertical={false}
                                horizontal={false}
                                opacity={0.5}
                              />

                              <XAxis
                                dataKey="month"
                                fontSize={12}
                                axisLine={false}
                                tickLine={false}
                                tickCount={10}
                                angle={0}
                                textAnchor="middle"
                              />
                              <YAxis
                                type="number"
                                // domain={["dataMin - 0.005", "dataMax + 0.0005"]}
                                axisLine={false}
                                tickLine={false}
                                fontSize={10}
                                tickFormatter={(number) =>
                                  `${number.toFixed(2)}`
                                }
                                margin={{ right: 20 }}
                              />

                              <Tooltip
                                cursor={false}
                                content={<CustomTooltip />}
                              />

                              {selectedGraphNSSOverTime?.includes(
                                "Positive"
                              ) && (
                                <Bar
                                  barSize={20}
                                  name="Positive"
                                  dataKey="positive"
                                  // fill="#00AC69"
                                  fill="url(#promoterGradient)"
                                  radius={[20, 20, 0, 0]}
                                />
                              )}

                              {selectedGraphNSSOverTime?.includes(
                                "Neutral"
                              ) && (
                                <Bar
                                  barSize={20}
                                  name="Neutral"
                                  dataKey="neutral"
                                  // fill="#4D5552"
                                  fill="url(#passiveGradient)"
                                  radius={[20, 20, 0, 0]}
                                />
                              )}
                              {selectedGraphNSSOverTime?.includes(
                                "Negative"
                              ) && (
                                <Bar
                                  barSize={20}
                                  name="Negative"
                                  dataKey="negative"
                                  // fill="#DB2B39"
                                  fill="url(#negativeGradient)"
                                  radius={[20, 20, 0, 0]}
                                />
                              )}
                              {selectedGraphNSSOverTime?.includes(
                                "Extreme"
                              ) && (
                                <Bar
                                  barSize={20}
                                  name="Extreme"
                                  dataKey="extreme"
                                  // fill="#DB2B39"
                                  fill="url(#detractorGradient)"
                                  radius={[20, 20, 0, 0]}
                                />
                              )}
                              {selectedGraphNSSOverTime?.includes(
                                "Sentiment"
                              ) && (
                                <Bar
                                  barSize={20}
                                  name="Sentiments"
                                  dataKey="nss"
                                  // fill="#0094E0"
                                  fill="url(#npsGradient)"
                                  radius={[20, 20, 0, 0]}
                                />
                              )}
                            </ComposedChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSurvey;

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-[1rem] shadow-2xl shadow-[#000000] ">
        {payload[0]?.payload?.month && (
          <h1 className="capitalize mr-2 text-lg mb-2 font-bold ">
            {payload[0]?.payload?.month}, {payload[0]?.payload?.year}
          </h1>
        )}

        {payload?.map((data, index) => (
          <div key={index} className="">
            {data?.payload?.cx && (
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-full items-center ">
                    <svg className="w-[10px] rounded-full overflow-hidden aspect-square ">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="5"
                        fill={data?.payload?.color}
                      />
                    </svg>
                  </div>
                  <h1 className="capitalize  text-lg  font-bold ">
                    {data?.name}
                  </h1>
                </div>

                <div className="flex justify-start items-center gap-1 ml-5">
                  <div className="flex justify-between items-center  w-full">
                    <span className="capitalize mr-2 text-base text-gray-600 font-semibold">
                      {data?.dataKey}:
                    </span>
                    <span className="text-base text-gray-600 font-semibold">
                      {data?.value}%
                    </span>
                  </div>
                </div>
              </div>
            )}
            {!data?.payload?.cx && (
              <div className="flex justify-start items-center gap-1 ">
                <div>
                  {data?.color && (
                    <svg className="w-[10px] rounded-full overflow-hidden aspect-square flex justify-center items-center">
                      <circle cx="50%" cy="50%" r="3.5" fill={data?.color} />
                    </svg>
                  )}
                </div>
                <div className="flex justify-between items-center  w-full">
                  <span className="capitalize mr-2 text-base text-gray-600 font-semibold">
                    {data?.name}:
                  </span>
                  <span className="text-base text-gray-600 font-semibold">
                    {data?.value}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
  return null;
}
