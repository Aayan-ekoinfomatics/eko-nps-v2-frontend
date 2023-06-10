import React, { useEffect } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import eko_logo from "../../assets/icons/eko_logo.png";
import CampaignIcon from "@mui/icons-material/Campaign";
import { Link, useLocation, useParams } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import HexagonOutlinedIcon from "@mui/icons-material/HexagonOutlined";
import MoodOutlinedIcon from "@mui/icons-material/MoodOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import { useRecoilState } from "recoil";
import SidebarAtom from "../../recoil/global-atoms/SidebarAtom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";

const Sidebar = () => {
  const location = useLocation();

  const [sidebarToggle, setSidebarToggle] = useRecoilState(SidebarAtom);

  // useEffect(() => {
  //     console.log(sidebarToggle)
  // }, [])

  return (
    <div
      className={`w-full ${
        sidebarToggle ? "max-w-[100%]" : "max-w-0 overflow-hidden"
      } sm:max-w-[60px] lg:max-w-[200px] 2xl:max-w-[230px] fixed bg-sky-50 h-screen transition-all duration-200 ease-out z-[100]`}
    >
      <div className="w-full">
        <div className="block sm:hidden w-full pl-5 pt-5">
          <span
            className="cursor-pointer z-[250]"
            onClick={() => setSidebarToggle(!sidebarToggle)}
          >
            <CloseRoundedIcon fontSize="large" className="text-sky-600" />
          </span>
        </div>
        <div className="w-full">
          <div className="w-full flex justify-center items-center h-[100px]">
            <img
              src={eko_logo}
              className="w-full max-w-[60px] sm:max-w-[40px] lg:max-w-[80px]"
              alt=""
            />
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-2 lg:items-stretch relative mb-6 lg:pl-4 mt-[20px]">
          <Link
            onClick={() => setSidebarToggle(false)}
            to="/"
            className={`w-full justify-center flex items-center gap-2 mb-2 ${
              location?.pathname === "/"
                ? " border-r-[5px] border-[var(--secondary-color)]"
                : ""
            }`}
          >
            <DashboardRoundedIcon fontSize="small" className="text-sky-600" />
            <h1
              className={`sm:hidden lg:inline-block sm:w-full transition-all duration-200 ease-out py-1 text-md  `}
            >
              Dashboard
            </h1>
          </Link>
          <Link
            onClick={() => setSidebarToggle(false)}
            to="/google-dashboard"
            className={`w-full justify-center flex items-center gap-2 mb-2 ${
              location?.pathname === "/google-dashboard"
                ? " border-r-[5px] border-[var(--secondary-color)]"
                : ""
            }`}
          >
            <GoogleIcon fontSize="small" className="text-sky-600" />
            <h1
              className={`sm:hidden lg:inline-block sm:w-full transition-all duration-200 ease-out py-1 text-md  `}
            >
              Google Reviews
            </h1>
          </Link>
          <Link
            onClick={() => setSidebarToggle(false)}
            to="/sentiments"
            className={`w-full py-[1px] lg:py-0 justify-center flex items-center gap-2 ${
              location?.pathname?.includes("/sentiments")
                ? " border-r-[5px] border-[var(--secondary-color)]"
                : ""
            }`}
          >
            <MoodOutlinedIcon
              fontSize="extraSmall"
              className="scale-105 lg:scale-90 lg:ml-2 text-sky-600"
            />
            <h1
              className={`sm:hidden lg:inline-block sm:w-full text-sm text-gray-500 cursor-pointer active:scale-95 transition-all duration-300 ease-out hover:text-gray-80 my-[8px] `}
            >
              Sentiments
            </h1>
          </Link>
          <Link
            onClick={() => setSidebarToggle(false)}
            to="/comments"
            className={`w-full py-[1px] lg:py-0 justify-center flex items-center gap-2 ${
              location?.pathname?.includes("/comments")
                ? " border-r-[5px] border-[var(--secondary-color)]"
                : ""
            }`}
          >
            <RateReviewOutlinedIcon
              fontSize="extraSmall"
              className="scale-105 lg:scale-90 lg:ml-2 text-sky-600"
            />
            <h1
              className={`sm:hidden lg:inline-block sm:w-full text-sm text-gray-500 cursor-pointer active:scale-95 transition-all duration-300 ease-out hover:text-gray-80 my-[8px]`}
            >
              Comments
            </h1>
          </Link>
        </div>

        <div className="w-full flex flex-col items-center gap-2 lg:items-stretch relative lg:pl-4">
          <Link
            onClick={() => setSidebarToggle(false)}
            to="/nps-dashboard"
            className={`w-full justify-center flex items-center gap-2 mb-2 ${
              location?.pathname?.includes("/nps-dashboard")
                ? " border-r-[5px] border-[var(--secondary-color)]"
                : ""
            }`}
          >
            <CampaignIcon fontSize="medium" className="text-sky-600" />
            <h1
              className={`sm:hidden lg:inline-block sm:w-full transition-all duration-200 ease-out py-1 text-md  `}
            >
              Net Promoter Score
            </h1>
          </Link>
          <Link
            onClick={() => setSidebarToggle(false)}
            to="/nps-sentiments"
            className={`w-full py-[1px] lg:py-0 justify-center flex items-center gap-2 ${
              location?.pathname?.includes("/nps-sentiments")
                ? " border-r-[5px] border-[var(--secondary-color)]"
                : ""
            }`}
          >
            <MoodOutlinedIcon
              fontSize="extraSmall"
              className="scale-105 lg:scale-90 lg:ml-2 text-sky-600"
            />
            <h1
              className={`sm:hidden lg:inline-block sm:w-full text-sm text-gray-500 cursor-pointer active:scale-95 transition-all duration-300 ease-out hover:text-gray-80 my-[8px] ' : ''}`}
            >
              Sentiments
            </h1>
          </Link>
          <Link
            onClick={() => setSidebarToggle(false)}
            to="/nps-comments"
            className={`w-full py-[1px] lg:py-0 justify-center flex items-center gap-2 ${
              location?.pathname?.includes("/nps-comments")
                ? " border-r-[5px] border-[var(--secondary-color)]"
                : ""
            }`}
          >
            <RateReviewOutlinedIcon
              fontSize="extraSmall"
              className="scale-105 lg:scale-90 lg:ml-2 text-sky-600"
            />
            <h1
              className={`sm:hidden lg:inline-block sm:w-full text-sm text-gray-500 cursor-pointer active:scale-95 transition-all duration-300 ease-out hover:text-gray-80 my-[8px] ' : ''}`}
            >
              Comments
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
