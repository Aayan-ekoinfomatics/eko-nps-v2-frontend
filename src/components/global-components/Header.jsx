import React, { useEffect, useRef, useState } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import EventIcon from "@mui/icons-material/Event";
import { useLocation, useNavigate } from "react-router-dom";
import { VITE_BASE_LINK } from "../../../baseLink";
import SidebarAtom from "../../recoil/global-atoms/SidebarAtom";
import { useRecoilState } from "recoil";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { BASE_API_LINK } from "../../utils/BaseAPILink";
import axios from "axios";
import logo from "../../assets/img/NPS Dashboard/logoCCD.png";

const Header = () => {
  const [sidebarToggle, setSidebarToggle] = useRecoilState(SidebarAtom);

  const location = useLocation();

  const [selectedFile, setSelectedFile] = useState();

  const [isFilePicked, setIsFilePicked] = useState(false);

  const [uploadLogStatus, setUploadStatus] = useState(false);
  const [uploadModalStatus, setUploadModalStatus] = useState(false);
  const [uploadLogData, setUploadData] = useState();

  const uploadLogRef = useRef();

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
        alert(result?.message);
        setUploadModalStatus(false);
        if (result?.status) {
          window.location.reload(false);
        }
      })
      .catch((error) => {});
  };

  const handleSubmission = () => {
    // setLoaderStatus(true);
    const formData = new FormData();
    formData.append("username", "usernameLocal");
    formData.append("file", selectedFile);

    fetch(VITE_BASE_LINK + "nps/file_upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response?.json())
      .then((result) => {
        console.log("response after upload:");
        console.log(result);
        setUploadModalStatus(false);
        alert(result?.message);
      })
      .catch((error) => {});
  };

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

  useEffect(() => {
    const handleClickOutsideUploadLog = (event) => {
      if (
        uploadLogRef.current &&
        !uploadLogRef.current.contains(event.target)
      ) {
        onClickOutsideUploadLog();
      }
    };

    const onClickOutsideUploadLog = () => {
      setUploadStatus(false);
    };

    document.addEventListener("mousedown", (event) => {
      handleClickOutsideUploadLog(event);
    });
    return () => {
      document.removeEventListener("mousedown", (event) => {
        handleClickOutsideUploadLog(event);
      });
    };
  }, []);

  // mock data fro upload log
  const upload_log_data = [
    {
      id: 1,
      file_name: "data.csv",
      file_size: 1000,
      file_type: "text/plain",
      user_name: "Vivek",
      uploaded_time: "20/06/23",
    },
    {
      id: 2,
      file_name: "data2.xlxs",
      file_size: 1000,
      file_type: "text/plain",
      user_name: "Aayan",
      uploaded_time: "21/06/23",
    },
    {
      id: 3,
      file_name: "data3.csv",
      file_size: 1000,
      file_type: "text/plain",
      user_name: "Utkarsh ",
      uploaded_time: "22/06/23",
    },
  ];

  useEffect(() => {
    axios.post(BASE_API_LINK + `nps/upload_file_log`)?.then((res) => {
      setUploadData(res?.data);
    });
  }, []);

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
      {/* <div className="w-fit xl:w-full max-w-[250px] rounded-[10px] border p-1.5 md:p-3 text-[14px] flex justify-center items-center gap-5 bg-sky-100">
        <span>
          <EventIcon className="text-sky-700" />
        </span>{" "}
        <span className="text-sky-700 hidden xl:inline-block font-medium">
          Jan 2023 - Nov 2023
        </span>
      </div> */}

      <div>
        <img src={logo} alt="ccd logo" />
      </div>

      {/*file upload and delete buttons flex */}
      <div className="w-full flex justify-end items-center">
        {/* file upload */}
        {!location?.pathname?.includes("/nps-dashboard") ? null : (
          <div className="flex items-center gap-4">
            {/* upload log vivek */}
            <div ref={uploadLogRef} className="relative hidden">
              <button
                onClick={() => setUploadStatus(!uploadLogStatus)}
                className="bg-sky-600 text-white p-2 rounded-lg "
              >
                <AssignmentOutlinedIcon />
              </button>

              {/* {uploadLogStatus && (
                <div className="absolute z-[10] top-[100%] right-0 p-5 rounded-lg bg-white border shadow-lg w-[400px]">
                  <div>
                    <h1 className="text-base font-semibold text-[#1e1e1e] ">
                      Upload log
                    </h1>
                  </div>
                  <div className="grid grid-cols-5 gap-5 text-sm py-2 border-b border-b-[#e9e7e7]">
                    <div className="text-xs text-gray-600 ">Time</div>
                    <div className="text-xs text-gray-600 ">Username</div>
                    <div className="text-xs text-gray-600 col-span-2">
                      Filename
                    </div>
                    <div className="text-xs text-gray-600 ">File Size</div>
                  </div>
                  {uploadLogData?.map((data) => {
                    return (
                      <div
                        key={data?.id}
                        className="grid grid-cols-5 gap-5 text-sm py-2 border-b border-b-[#e9e7e77e]"
                      >
                        <div className="hidden"></div>
                        <div>
                          {" "}
                          {data?.date} {data?.time} jjjjj
                        </div>
                        <div> {data?.user_id} </div>
                        <div className="col-span-2"> {data?.file_name} </div>
                        <div>{data?.file_size}</div>
                      </div>
                    );
                  })}
                </div>
              )} */}
            </div>

            {/* upload file interface vivek */}
            <button
              onClick={() => setUploadModalStatus(true)}
              className="p-2 px-3  bg-sky-600 text-center  rounded-md  text-white transition-all active:scale-95 cursor-pointer  border"
            >
              <FileUploadOutlinedIcon fontSize="small" />
            </button>

            {uploadModalStatus && (
              <>
                <div
                  onClick={() => setUploadModalStatus(false)}
                  className="fixed inset-0 bg-black opacity-0 z-[100]"
                ></div>
                <div className="fixed top-20 right-16  bg-white p-5 z-[101] rounded-lg shadow-3xl border shadow-2xl">
                  <div>
                    <h1 className="text-lg font-semibold text-[#1e1e1e] mb-5">
                      Upload Data
                    </h1>

                    <form className=" flex  justify-center items-center w-full border-2 border-dashed">
                      <label
                        htmlFor="file-upload"
                        className=" relative  text-[#1e1e1e] w-full p-5 cursor-pointer"
                      >
                        <input
                          type="file"
                          name="file"
                          id="file-upload"
                          onChange={changeHandler}
                          onClick={(event) => (event.target.value = "")}
                          accept={".csv, .xlsx"}
                          placeholder="upload"
                          className="absolute -top-2 -bottom-2 -left-2 -right-2 w-full opacity-0 z-[-100] cursor-pointer"
                        />

                        <div className="flex flex-col justify-center items-center">
                          <FileUploadOutlinedIcon
                            fontSize="large"
                            className="text-gray-400"
                          />
                          <p className="text-sm text-gray-500">Select a file</p>
                        </div>

                        <div className="mt-5  w-fit mx-auto">
                          <h1 className="flex items-center gap-2">
                            <span className="font-semibold text-sm w-[100px] text-gray-400">
                              Size
                            </span>
                            :
                            <span className="text-sm text-gray-400">
                              less than 20MB
                            </span>
                          </h1>
                          <h1 className="flex items-center gap-2 ">
                            <span className="font-semibold text-sm w-[100px] text-gray-400 ">
                              File type
                            </span>
                            :
                            <span className="text-sm text-gray-400">
                              .csv or .xlsx
                            </span>
                          </h1>

                          <h1 className="flex items-center gap-2 ">
                            <span className="font-semibold text-sm w-[100px] text-gray-400 ">
                              Columns
                            </span>
                            :
                            <span className="text-sm text-gray-400">
                              review, nps, date
                              <br /> (case insensitive)
                            </span>
                          </h1>

                          <h1 className="flex items-center gap-2">
                            <span className="font-semibold text-sm w-[100px] text-gray-400">
                              Date Format
                            </span>
                            :
                            <span className="text-sm text-gray-400">
                              YYYY-MM-DD
                            </span>
                          </h1>
                        </div>
                      </label>
                    </form>

                    <div className="flex justify-end mt-2">
                      <button
                        onClick={delete_records}
                        className="text-xs hover:underline underline-offset-4 text-red-500   "
                      >
                        Clear data
                      </button>
                    </div>
                  </div>

                  {/* upload log */}
                  <div>
                    <div>
                      <h1 className="text-base font-semibold text-[#1e1e1e] ">
                        Upload log
                      </h1>
                    </div>
                    <div className="grid grid-cols-4 gap-5 text-sm py-2 border-b border-b-[#e9e7e7]">
                      <div className="text-xs text-gray-600 ">Time</div>
                      <div className="text-xs text-gray-600 col-span-2">
                        Filename
                      </div>
                      <div className="text-xs text-gray-600 ">File Size</div>
                    </div>
                    {uploadLogData?.map((data) => {
                      return (
                        <div
                          key={data?.id}
                          className="grid grid-cols-4 gap-5 text-sm py-2 border-b border-b-[#e9e7e77e]"
                        >
                          <div className="hidden"></div>
                          <div>
                            <h1>{data?.date}</h1>
                            <h3 className="text-xs">{data?.time}</h3>
                          </div>

                          <div className="col-span-2"> {data?.file_name} </div>
                          <div>{data?.file_size}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
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
