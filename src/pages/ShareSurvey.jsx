import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
// components
import Header from "../components/global-components/Header";
// helpers
import { tabList } from "../helpers/tabList";
// icons
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import SendAndArchiveRoundedIcon from "@mui/icons-material/SendAndArchiveRounded";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const ShareSurvey = () => {
  // local variables
  const params = useParams();
  const [file, setFile] = useState();
  const [emails, setEmails] = useState();
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <Header />

      <div className="px-5">
        {/* tab list */}
        <div className="flex justify-between items-end z-50 sticky top-0 bg-white border-b pt-2">
          {/* previous btn */}
          <div className=" ">
            <Link
              to={"/survey-dashboard/survey_edit/" + params?.survey_id}
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
                    data?.name === "Share"
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
              className="mb-2 px-10 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg active:scale-95 transition-all  text-xl flex items-center justify-center gap-1 "
            >
              <span>Next</span>
              <span className="-translate-y-[0.18rem] block">
                <ArrowForwardIosRoundedIcon />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* main contents */}
      <div className="w-full px-5 mx-auto  py-4 flex flex-col gap-5 ">
        {/* share link section */}
        <div className="bg-white border p-5 rounded-lg  w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-lg text-gray-800 font-semibold">Survey Link</h1>

            <button
              title="Copy link to share"
              //   onClick={() =>
              //     copyText(`${BASE_ADDRESS_FE}public_survey/${params?.survey_id}`)
              //   }
            >
              <ContentCopyRoundedIcon className="text-sky-600" />
            </button>
          </div>

          <div className="p-3 border rounded-lg mt-5 text-gray-800 flex justify-between items-center gap-2">
            <span>
              {/* {BASE_ADDRESS_FE}public_survey/{params?.survey_id} */}
              http://localhost:8080/public-survey/123
            </span>
            {/* <Link
              target="_blank"
              to={`${BASE_ADDRESS_FE}public_survey/${params?.survey_id}`}
            > */}
            <OpenInNewIcon className="text-sky-600" />
            {/* </Link> */}
          </div>
        </div>

        {/* Share via email */}
        <div className="bg-white border p-5 rounded-lg w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-lg text-gray-800 font-semibold">
              Share via email
            </h1>

            <div>
              <button className="relative cursor-default border border-sky-700  hover:bg-sky-700 px-3 p-2 rounded-lg text-sky-600 hover:text-white active:scale-95 transition-all font-semibold flex items-center gap-3 group">
                <span>
                  <SendAndArchiveRoundedIcon className="text-sky-600 group-hover:text-white transition-all" />
                </span>
                <span>Import Emails</span>

                <input
                  type="file"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet-.csv"
                  onChange={handleFileChange}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
              </button>

              <div>{file && `${file.name} `}</div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              //   const formData = new FormData();
              //   formData?.append("emails", emails?.toString());
              //   formData?.append("subject", subject);
              //   formData?.append("message", message);
              //   axios
              //     ?.post(BASE_ADDRESS + "send_email", formData)
              //     ?.then((res) => {
              //       console.log("res from send email:", res?.data);

              //       setEmails("");
              //       setSubject("");
              //       setMessage("");

              //       alert("Email sent successfully!");
              //     });
            }}
          >
            <div className="mb-5">
              <h3 className="text-sm text-gray-500 mb-1">To</h3>
              <textarea
                rows={2}
                value={emails}
                onChange={(e) => setEmails(e?.target?.value)}
                className="border w-full  rounded-lg p-2 text-gray-800"
              />
            </div>

            <div className="mb-5">
              <h3 className="text-sm text-gray-500 mb-1">Subject</h3>
              <input
                type="text"
                className="border w-full  rounded-lg p-2"
                value={subject}
                onChange={(e) => {
                  setSubject(e?.target?.value);
                }}
              />
            </div>

            <div className="mb-5">
              <h3 className="text-sm text-gray-500 mb-1">Message</h3>
              <textarea
                rows={5}
                className="border w-full  rounded-lg p-2"
                value={message}
                onChange={(e) => {
                  setMessage(e?.target?.value);
                }}
              />
            </div>

            <button className="border border-sky-800 text-sky-700 hover:bg-sky-700 px-3 p-2 rounded-lg hover:text-white active:scale-95 transition-all font-semibold flex justify-center items-center gap-3 group w-full ">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShareSurvey;
