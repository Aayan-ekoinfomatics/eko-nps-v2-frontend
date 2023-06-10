import React, { useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
// import mockApiData from "../../../../mock_API/NPS/NPS Main Dashboard/NSSOverTime.json";
import { useRecoilState } from "recoil";
// import endDateValue from "../../../../recoil/atoms/EndDateAtom";
// import endMonthValue from "../../../../recoil/atoms/EndMonth";
// import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
// import startDateValue from "../../../../recoil/atoms/StartDateAtom";
// import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
// import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
// import { BASE_API_LINK } from "../../../../utils/BaseAPILink";
import sentimentOverTimeApiData from "../../recoil/atoms/sentimentOverTimeApiData";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { exportComponentAsPNG } from "react-component-export-image";
import axios from "axios";
import { VITE_BASE_LINK } from "../../../baseLink";

const NSSOvertimeNPS = () => {
  const [apiData, setApiData] = useState();

  const [nssOverTimeAPIData, setNssOverTimeAPIData] = useRecoilState(
    sentimentOverTimeApiData
  );

  useEffect(() => {
    axios.post(VITE_BASE_LINK + 'nps/nss_over_time').then((response) => {
        // console.log(response?.data);
        setApiData(response?.data?.data)
    })
    // setApiData(nssOverTimeAPIData);
    // console.log("nssOverTimeAPIData:");
    // console.log(nssOverTimeAPIData);
  }, []);

  const NSSOverTimeComponent = useRef();

  return (
    <div
      className="p-2 md:p-5 w-full border  rounded-lg bg-white flex justify-center md:justify-center items-center "
      ref={NSSOverTimeComponent}
    >
      {!apiData && (
        <div className="min-h-[170px] w-full bg-[#ffffff] z-[0] rounded-lg flex justify-center items-center">
          <PuffLoader color="#0284c7" size={50} width={100} />
        </div>
      )}

      {apiData && (
        <div className="w-full">
          <div className="flex justify-between items-center mb-2">
            <h1 className=" font-bold opacity-80 ">Sentiment Over Time</h1>
            <button onClick={() => exportComponentAsPNG(NSSOverTimeComponent)}>
              <FileDownloadOutlinedIcon
                fontSize="small"
                className="text-gray-400"
              />
            </button>
          </div>

          <div className="flex justify-end items-center gap-[4px] ">
            <div className="bg-[#0094E0] h-[10px] w-[10px] rounded-full"></div>
            <p className="text-[10px]">Sentiments</p>
          </div>

          {/* Graph */}
          <div className="relative ">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={apiData?.nss_over_time}
                margin={{ top: 0, right: 20, left: -20, bottom: 0 }}
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
                  axisLine={false}
                  tickLine={false}
                  fontSize={10}
                  tickCount={4}
                  tickFormatter={(number) => `${number}`}
                  margin={{ right: 20 }}
                />
                <Tooltip cursor={false} content={<CustomTooltip />} />

                <Bar
                  stackId="a"
                  barSize={20}
                  name="sentiments"
                  dataKey="nss"
                  fill="#0094E0"
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default NSSOvertimeNPS;

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-[1rem] shadow-2xl shadow-[#000000]">
        <h1 className="capitalize mr-2 text-[13px] mb-2 font-bold ">
          {payload[0]?.payload?.month}, {payload[0]?.payload?.year}
        </h1>
        {payload?.map((data) => (
          <div key={Math.random()} className="">
            <div className="flex justify-start items-center ">
              <div
                style={{ background: data?.color }}
                className={`h-[5px] w-[5px] rounded-full mr-2 `}
              ></div>
              <div className="flex justify-between items-center  w-full">
                <span className="capitalize mr-2 text-[11px] font-semibold">
                  {data?.name}:
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