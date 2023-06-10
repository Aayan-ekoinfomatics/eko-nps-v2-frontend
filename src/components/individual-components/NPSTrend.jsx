import React, { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
// import mockData from "../../../../mock_API/NPS/NPS Main Dashboard/NSSOverTime.json";
import chevron from "../../assets/img/global-img/DownChevron.svg";
import { useRecoilState } from "recoil";
import startDateValue from "../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../recoil/atoms/StartMonthAtom";
import endDateValue from "../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../recoil/atoms/EndMonth";
import sendData from "../../recoil/atoms/sendDatesValueAtom";
import axios from "axios";
import { PuffLoader } from "react-spinners";
import sentimentOverTimeApiData from "../../recoil/atoms/sentimentOverTimeApiData";
import { useDetectClickOutside } from "react-detect-click-outside";
import RefreshIcon from "@mui/icons-material/Refresh";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { exportComponentAsPNG } from "react-component-export-image";
import { VITE_BASE_LINK } from "../../../baseLink";

const NPSTrend = () => {
  const [graphName, setGraphName] = useState("Sentiment Score");

  const [positives, setPositive] = useState(false);
  const [neutrals, setNeutrals] = useState(false);
  const [negative, setNegative] = useState(false);
  const [extreme, setExtreme] = useState(false);
  const [nssScore, setNssScore] = useState(true);

  const [apiData, setApiData] = useState();

  useEffect(() => {
    // setApiData(nssOverTimeAPIData);
    axios.post(VITE_BASE_LINK + "google/nss_over_time").then((response) => {
      // console.log(response?.data);
      setApiData(response?.data?.data);
    });
  }, []);

  const NPSAllGraphComponent = useRef();

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
        <div className="w-full ">
          <div className="flex justify-between items-center mb-7">
            <h1 className=" font-bold opacity-80 text-[18px] ">NPS Trend</h1>

            <div className="flex items-center gap-2">
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
              <div className="text-[12px] opacity-80"> Avg NPS</div>
            </div>
          </div>

          {/* Graph */}
          <div className="relative ">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                key={graphName}
                data={apiData?.nss_over_time}
                margin={{ top: 0, right: 20, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="nssGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#009DFF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#009DFF" stopOpacity={0.05} />
                  </linearGradient>

                  <linearGradient
                    id="positiveGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#00AC69" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00AC69" stopOpacity={0.05} />
                  </linearGradient>

                  <linearGradient
                    id="neutralGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#939799" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#939799" stopOpacity={0.05} />
                  </linearGradient>

                  <linearGradient
                    id="negativeGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#EE6123" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#EE6123" stopOpacity={0.05} />
                  </linearGradient>

                  <linearGradient
                    id="extremeGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#DB2B39" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#DB2B39" stopOpacity={0.05} />
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
                {nssScore && (
                  <Area
                    type="monotone"
                    name="sentiments"
                    dataKey="nss"
                    stroke="#0094E0 "
                    dot={false}
                    strokeWidth={4}
                    fill="url(#nssGradient)"
                  />
                )}

                {positives && (
                  <Area
                    type="monotone"
                    name="positive"
                    dataKey="positive"
                    stroke="#00AC69 "
                    dot={false}
                    strokeWidth={4}
                    fill="url(#positiveGradient)"
                  />
                )}

                {neutrals && (
                  <Area
                    type="monotone"
                    name="neutral"
                    dataKey="neutral"
                    stroke="#939799 "
                    dot={false}
                    strokeWidth={4}
                    fill="url(#neutralGradient)"
                  />
                )}

                {negative && (
                  <Area
                    type="monotone"
                    name="negative"
                    dataKey="negative"
                    stroke="#EE6123 "
                    dot={false}
                    strokeWidth={4}
                    fill="url(#negativeGradient)"
                  />
                )}

                {extreme && (
                  <Area
                    type="monotone"
                    name="extreme"
                    dataKey="extreme"
                    stroke="#DB2B39 "
                    dot={false}
                    strokeWidth={4}
                    fill="url(#extremeGradient)"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default NPSTrend;

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-[1rem] shadow-2xl shadow-[#000000]">
        <h1 className="capitalize mr-2 text-[13px] mb-2 font-bold ">
          {payload[0]?.payload?.month}, {payload[0]?.payload?.year}
        </h1>
        {payload?.map((data) => (
          <div key={Math?.random()} className="">
            <div className="flex justify-start items-center ">
              <div
                style={{ background: data?.color }}
                className={`h-[5px] w-[5px] rounded-full mr-2 `}
              ></div>
              <div className="flex justify-between items-center  w-full">
                <span className="capitalize mr-2 text-[11px] font-semibold">
                  Avg NPS:
                </span>
                <span className="text-[11px] font-semibold">{data?.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
