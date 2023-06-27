import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { VITE_BASE_LINK } from "../../../baseLink";
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PuffLoader } from "react-spinners";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { exportComponentAsPNG } from "react-component-export-image";
import mockData from "../../helpers/GoogleRatingsAndSentimentOverTimeMockData.json";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

const GoogleRatingsAndSentimentOverTime = () => {
  const typesOfGraph = [
    { label: "Avg Ratings", color: "#009DFF" },
    { label: "NSS", color: "#009DFF" },
  ];
  const [graphName, setGraphName] = useState("NSS");
  const [selectedGraphName, setSelectedGraphName] = useState(["NSS"]);
  const [showGraphSelection, setShowGraphSelection] = useState(false);

  const [apiData, setApiData] = useState();
  const NPSAllGraphComponent = useRef();

  useEffect(() => {
    axios
      .post(VITE_BASE_LINK + "google/rating_sentiment_over_time")
      .then((response) => {
        setApiData(response?.data?.data?.rating_over_time);
      });

    // setApiData(mockData?.composed_chart_data);
  }, []);

  useEffect(() => {
    console.log("selectedGraphName :", selectedGraphName);
  }, [selectedGraphName]);

  return (
    <div
      ref={NPSAllGraphComponent}
      className="p-2 md:p-5 w-full border  rounded-lg bg-white  relative min-h-[300px]"
    >
      {!apiData && (
        <div className="min-h-[130px] bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
          <PuffLoader color="#0284c7" size={50} width={100} />
        </div>
      )}

      {apiData && (
        <div className="w-full">
          <div className="flex justify-between items-center mb-7">
            <h1 className=" font-bold opacity-80 text-[18px] ">
              Google Trends
            </h1>

            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowGraphSelection(!showGraphSelection)}
                  className="flex justify-between items-center gap-2 text-sm text-gray-500 border rounded-lg px-3 py-2"
                >
                  <span>Select Graph</span>
                  <span>
                    <ArrowDropDownRoundedIcon />
                  </span>
                </button>

                {showGraphSelection && (
                  <div className="absolute text-sm bg-white border z-10 shadow-md text-gray-700 w-full">
                    {typesOfGraph?.map((mapedGraphName, i) => {
                      return (
                        <div
                          key={i}
                          className="cursor-pointer p-2 flex items-center gap-2"
                          onClick={() => {
                            setGraphName(mapedGraphName.label);

                            if (
                              selectedGraphName?.includes(mapedGraphName?.label)
                            ) {
                              selectedGraphName?.length > 1 &&
                                setSelectedGraphName(
                                  selectedGraphName.filter(
                                    (filtered_graphName) => {
                                      return (
                                        filtered_graphName !==
                                        mapedGraphName?.label
                                      );
                                    }
                                  )
                                );
                            } else {
                              setSelectedGraphName([
                                ...selectedGraphName,
                                mapedGraphName?.label,
                              ]);
                            }
                          }}
                        >
                          <span>
                            {selectedGraphName?.includes(
                              mapedGraphName?.label
                            ) ? (
                              <CheckCircleOutlineRoundedIcon
                                fontSize="small"
                                className="text-blue-500"
                              />
                            ) : (
                              <RadioButtonUncheckedRoundedIcon fontSize="small" />
                            )}
                          </span>
                          <span> {mapedGraphName.label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {showGraphSelection && (
                  <div
                    onClick={() => setShowGraphSelection(false)}
                    className="fixed inset-0 z-[5]"
                  ></div>
                )}
              </div>
              <button
                onClick={() => exportComponentAsPNG(NPSAllGraphComponent)}
              >
                <FileDownloadOutlinedIcon
                  fontSize="small"
                  className="text-gray-400"
                />
              </button>
            </div>
          </div>

          <div className=" items-center gap-5 justify-end mb-2 hidden sm:flex ">
            <div className="flex items-center gap-1">
              <div className="bg-[#009DFF] h-[8px] w-[8px] rounded-full"></div>
              <div className="text-[12px] opacity-80"> Avg Rating</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="bg-[#009DFF] h-[8px] w-[8px] rounded-full"></div>
              <div className="text-[12px] opacity-80"> NSS</div>
            </div>
          </div>

          {/* Graph */}
          <div className="relative ">
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart
                key={graphName}
                data={apiData}
                margin={{ top: 0, right: 20, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="nssGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#009DFF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#009DFF" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
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
                <Tooltip cursor={false} content={<CustomTooltip />} />
                {selectedGraphName?.includes("Avg Ratings") && (
                  <Area
                    type="monotone"
                    name="sentiments"
                    dataKey="avg_rating"
                    stroke="#0094E0"
                    dot={false}
                    strokeWidth={4}
                    fill="url(#nssGradient)"
                  />
                )}

                {selectedGraphName?.includes("NSS") && (
                  <Bar
                    stackId="a"
                    barSize={20}
                    name="sentiments"
                    dataKey="nss"
                    fill="#0094E0"
                    radius={[5, 5, 0, 0]}
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleRatingsAndSentimentOverTime;

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-[1rem] shadow-2xl shadow-[#000000]">
        <h1 className="capitalize mr-2 text-[13px] mb-2 font-bold ">
          {payload[0]?.payload?.month}, {payload[0]?.payload?.year}
        </h1>
        {payload?.map((data) => {
          return (
            <div key={Math?.random()} className="">
              <div className="flex justify-start items-center ">
                <div
                  style={{ background: data?.color }}
                  className={`h-[5px] w-[5px] rounded-full mr-2 `}
                ></div>
                <div className="flex justify-between items-center  w-full">
                  <span className=" mr-2 text-[11px] font-semibold capitalize">
                    {data?.dataKey} :
                  </span>
                  <span className="text-[11px] font-semibold">
                    {data?.value}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
}
