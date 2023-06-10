import React, { useEffect, useState } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import EventIcon from "@mui/icons-material/Event";
import { useLocation, useNavigate } from "react-router-dom";
import { VITE_BASE_LINK } from "../../../baseLink";
import SidebarAtom from "../../recoil/global-atoms/SidebarAtom";
import { useRecoilState } from "recoil";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const Header = () => {
  const [sidebarToggle, setSidebarToggle] = useRecoilState(SidebarAtom);

  const location = useLocation();

  const [selectedFile, setSelectedFile] = useState();

  const [isFilePicked, setIsFilePicked] = useState(false);

  const navigate = useNavigate();

  const changeHandler = (event) => {
    console.log("reached change handler");
    console.log(event?.target?.files[0]?.name);
    setSelectedFile(event?.target?.files[0]);
    setIsFilePicked(true);
  };

  const delete_records = (event) => {
    fetch(VITE_BASE_LINK + "nps/delete_records", {
      method: "POST",
    })
      .then((response) => response?.json())
      .then((result) => {
        console.log("delete records response:");
        console.log(result);
        alert(result?.message);
        if (result?.status) {
          window.location.reload(false);
        }
      })
      .catch((error) => {});
  };

  const handleSubmission = () => {};

  const logout = () => {
    localStorage?.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (selectedFile) {
      if (selectedFile !== "noFiles") {
        handleSubmission();
        // setLoaderStatus(true);
      }
    }
  }, [selectedFile]);

  return (
    <div className="w-full p-4 border-t-2 flex justify-between items-center  z-[200] ">
      {/* sidebar toggle */}
      <div className="block sm:hidden w-fit pr-4 pl-1">
        <span
          className="cursor-pointer z-[250]"
          onClick={() => setSidebarToggle(!sidebarToggle)}
        >
          <MenuRoundedIcon fontSize="large" className="text-sky-600" />
        </span>
      </div>

      {/* calender */}
      <div className="w-fit xl:w-full max-w-[250px] rounded-[10px] border p-1.5 md:p-3 text-[14px] flex justify-center items-center gap-5 bg-sky-100">
        <span>
          <EventIcon className="text-sky-700" />
        </span>{" "}
        <span className="text-sky-700 hidden xl:inline-block font-medium">
          Jan 2023 - Nov 2023
        </span>
      </div>

      {/*file upload and delete buttons flex */}
      <div className="w-full flex justify-end items-center">
        {/* file upload */}
        {!location?.pathname?.includes("/nps-dashboard") ? null : (
          <div className="flex items-center gap-4">
            {/* file upload delete button  amrittt  */}
            <form className=" flex w-fit">
              <span
                onClick={delete_records}
                // className="absolute -top-2 -bottom-2 -left-2 -right-2 w-full opacity-0 z-[-100] cursor-pointer text-white"
                className="py-1 sm:py-2 px-3 sm:px-4 bg-sky-600 flex justify-center items-center text-center  rounded-md  text-white transition-all duration-200 active:scale-95 cursor-pointer text-[15px]"
              >
                X
              </span>
            </form>

            {/* file upload button  aayyaaaaan */}
            <form className=" flex w-fit">
              <label
                htmlFor="file-upload"
                className="p-2 sm:py-3 bg-sky-600 text-center sm:w-[50px] rounded-md  text-white transition-all active:scale-95 cursor-pointer relative border"
              >
                <input
                  type="file"
                  name="file"
                  id="file-upload"
                  onChange={changeHandler}
                  onClick={(event) => (event.target.value = "")}
                  accept={".csv, .xlsx"}
                  placeholder="upload"
                  className="absolute -top-2 -bottom-2 -left-2 -right-2 w-full opacity-0 z-[-100] cursor-pointer "
                />

                <div className="flex flex-col justify-center items-center">
                  <svg
                    width="8"
                    height="11"
                    viewBox="0 0 8 11"
                    className={` `}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="white"
                    strokeWidth={0.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.14663 0.146894C3.19308 0.100331 3.24825 0.0633877 3.309 0.0381812C3.36974 0.0129748 3.43486 0 3.50063 0C3.5664 0 3.63152 0.0129748 3.69227 0.0381812C3.75301 0.0633877 3.80819 0.100331 3.85463 0.146894L6.85463 3.14689C6.94852 3.24078 7.00126 3.36812 7.00126 3.50089C7.00126 3.63367 6.94852 3.76101 6.85463 3.85489C6.76075 3.94878 6.63341 4.00153 6.50063 4.00153C6.36786 4.00153 6.24052 3.94878 6.14663 3.85489L4.00063 1.70789V10.5009C4.00063 10.6335 3.94795 10.7607 3.85419 10.8544C3.76042 10.9482 3.63324 11.0009 3.50063 11.0009C3.36802 11.0009 3.24085 10.9482 3.14708 10.8544C3.05331 10.7607 3.00063 10.6335 3.00063 10.5009V1.70789L0.854632 3.85489C0.808144 3.90138 0.752955 3.93826 0.692215 3.96342C0.631476 3.98858 0.566376 4.00153 0.500632 4.00153C0.434888 4.00153 0.369788 3.98858 0.309048 3.96342C0.248309 3.93826 0.19312 3.90138 0.146632 3.85489C0.100144 3.80841 0.0632674 3.75322 0.0381083 3.69248C0.0129493 3.63174 -4.89829e-10 3.56664 0 3.50089C4.89831e-10 3.43515 0.0129493 3.37005 0.0381083 3.30931C0.0632674 3.24857 0.100144 3.19338 0.146632 3.14689L3.14663 0.146894Z"
                      fill="white"
                    />
                  </svg>

                  <svg
                    width="16"
                    height="5"
                    viewBox="0 0 16 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="white"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M0.5 0C0.632608 0 0.759785 0.052679 0.853553 0.146447C0.947322 0.240215 1 0.367392 1 0.5V3C1 3.26522 1.10536 3.51957 1.29289 3.70711C1.48043 3.89464 1.73478 4 2 4H14C14.2652 4 14.5196 3.89464 14.7071 3.70711C14.8946 3.51957 15 3.26522 15 3V0.5C15 0.367392 15.0527 0.240215 15.1464 0.146447C15.2402 0.052679 15.3674 0 15.5 0C15.6326 0 15.7598 0.052679 15.8536 0.146447C15.9473 0.240215 16 0.367392 16 0.5V3C16 3.53043 15.7893 4.03914 15.4142 4.41421C15.0391 4.78929 14.5304 5 14 5H2C1.46957 5 0.960859 4.78929 0.585786 4.41421C0.210714 4.03914 0 3.53043 0 3V0.5C0 0.367392 0.0526784 0.240215 0.146447 0.146447C0.240215 0.052679 0.367392 0 0.5 0V0Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </label>
            </form>
          </div>
        )}
      </div>

      {/* logout button */}
      <span onClick={logout} className="cursor-pointer">
        <LogoutOutlinedIcon className="text-sky-600 ml-6" />
      </span>
    </div>
  );
};

export default Header;
