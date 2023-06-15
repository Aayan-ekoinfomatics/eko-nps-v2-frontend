// routing
import { Link, useLocation } from "react-router-dom";
// state management (recoil.js)
import { useRecoilState } from "recoil";
import SidebarAtom from "../../recoil/global-atoms/SidebarAtom";
// local assets
import eko_logo from "../../assets/icons/eko_logo.png";
// material ui
import CampaignIcon from "@mui/icons-material/Campaign";
import GoogleIcon from "@mui/icons-material/Google";
import MoodOutlinedIcon from "@mui/icons-material/MoodOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";

const Sidebar = () => {
  // global variables
  const [sidebarToggle, setSidebarToggle] = useRecoilState(SidebarAtom);
  // local variables
  const location = useLocation();
  const sidebarData = [
    {
      title: "Dashboard",
      icon: <DashboardRoundedIcon fontSize="small" className="text-sky-600" />,
      path: "/",
    },
    {
      title: " Google Reviews",
      icon: <GoogleIcon fontSize="small" className="text-sky-600" />,
      path: "/google-dashboard",
      child: [
        {
          title: "Sentiments",
          icon: (
            <MoodOutlinedIcon
              fontSize="extraSmall"
              className="scale-105 lg:scale-90 lg:ml-2 text-sky-600"
            />
          ),
          path: "/google-dashboard/sentiments",
        },
        {
          title: "Comments",
          icon: (
            <RateReviewOutlinedIcon
              fontSize="extraSmall"
              className="scale-105 lg:scale-90 lg:ml-2 text-sky-600"
            />
          ),
          path: "/google-dashboard/comments",
        },
      ],
    },
    {
      title: "Net Promoter Score",
      icon: <CampaignIcon fontSize="small" className="text-sky-600" />,
      path: "/nps-dashboard",
      child: [
        {
          title: "Sentiments",
          icon: (
            <MoodOutlinedIcon
              fontSize="extraSmall"
              className="scale-105 lg:scale-90 lg:ml-2 text-sky-600"
            />
          ),
          path: "/nps-dashboard/sentiments",
        },
        {
          title: "Comments",
          icon: (
            <RateReviewOutlinedIcon
              fontSize="extraSmall"
              className="scale-105 lg:scale-90 lg:ml-2 text-sky-600"
            />
          ),
          path: "/nps-dashboard/comments",
        },
      ],
    },
  ];
  return (
    <div
      className={`w-full ${
        sidebarToggle ? "max-w-[100%]" : "max-w-0 overflow-hidden"
      } sm:max-w-[60px] lg:max-w-[200px] 2xl:max-w-[230px] fixed bg-sky-50 h-screen transition-all duration-200 ease-out z-[100]`}
    >
      <div className="w-full">
        {/* close icon in small devices */}
        <div className="block sm:hidden w-full pl-5 pt-5">
          <span
            className="cursor-pointer z-[250]"
            onClick={() => setSidebarToggle(!sidebarToggle)}
          >
            <CloseRoundedIcon fontSize="large" className="text-sky-600" />
          </span>
        </div>
        {/* product/brand logo */}
        <div className="w-full">
          <div className="w-full flex justify-center items-center h-[100px]">
            <img
              src={eko_logo}
              className="w-full max-w-[60px] sm:max-w-[40px] lg:max-w-[80px]"
              alt=""
            />
          </div>
        </div>

        {/* sidebar links  */}
        <div className="w-full flex flex-col items-center gap-5 lg:items-stretch relative mb-6 lg:pl-4 mt-[20px] ">
          {sidebarData.map((item, index) => {
            return (
              <div key={index}>
                {/* parent link */}
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setSidebarToggle(false)}
                  className={`w-full lg:justify-between justify-center flex items-center gap-2 ${
                    location?.pathname === item.path
                      ? " border-r-[5px] border-[var(--secondary-color)]"
                      : ""
                  }`}
                >
                  <div
                    className={`w-[200px]   sm:w-auto lg:w-[200px] mx-auto justify-start sm:justify-between lg:justify-start  items-center flex gap-5 ${
                      item?.child?.length > 0 ? "" : ""
                    }`}
                  >
                    <div className="">{item.icon}</div>
                    <h1 className="sm:hidden lg:inline-block sm:w-full transition-all duration-200 ease-out py-1 text-md text-sky-600">
                      {item.title}
                    </h1>
                  </div>
                </Link>

                {/* child link */}
                {item?.child &&
                  item?.child?.map((child, c_index) => {
                    return (
                      <Link
                        key={c_index}
                        to={child?.path}
                        onClick={() => setSidebarToggle(false)}
                        className={`w-full lg:justify-between justify-center flex items-center gap-2 ${
                          location?.pathname === child?.path
                            ? " border-r-[5px] border-[var(--secondary-color)]"
                            : ""
                        }`}
                      >
                        <div
                          className={`w-[200px] pl-5 sm:pl-0 sm:w-auto lg:w-[200px] mx-auto justify-start sm:justify-between lg:justify-start  items-center flex gap-5 ${
                            item?.child?.length > 0 ? "" : ""
                          }`}
                        >
                          <div className="">{child?.icon}</div>
                          <h1 className="sm:hidden lg:inline-block sm:w-full transition-all duration-200 ease-out py-1 text-md text-sky-600">
                            {child?.title}
                          </h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
