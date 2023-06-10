import React, { useEffect, useState } from 'react'
import Sidebar from '../components/global-components/Sidebar'
import eko_logo from '../assets/icons/eko_logo.png'
import EventIcon from '@mui/icons-material/Event';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import SentimentVerySatisfiedRoundedIcon from '@mui/icons-material/SentimentVerySatisfiedRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import SentimentDissatisfiedRoundedIcon from '@mui/icons-material/SentimentDissatisfiedRounded';
import SentimentVeryDissatisfiedRoundedIcon from '@mui/icons-material/SentimentVeryDissatisfiedRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Bar, BarChart, Pie, PieChart, ResponsiveContainer } from 'recharts';
import NSSCard from '../components/individual-components/NSSCard';
import reviewData from '../helpers/reviewsTableData.json'
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import axios from 'axios';
import { VITE_BASE_LINK } from '../../baseLink';
import NSSOverTime from '../components/individual-components/NSSOvertime';
import PositiveIcon from "../assets/img/NPS Dashboard/Positive.svg";
import NegativeIcon from "../assets/img/NPS Dashboard/Negative.svg";
import ExtremeIcon from "../assets/img/NPS Dashboard/Extreme.svg";
import NeutralIcon from "../assets/img/NPS Dashboard/Neutral.svg";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SecondaryHeader from '../components/global-components/SecondaryHeader';
import PuffLoader from "react-spinners/PuffLoader";
import DoubleArrowRoundedIcon from "@mui/icons-material/DoubleArrowRounded";

const ReviewsTablePage = () => {

    const [reviewsData, setReviewsData] = useState();

    const [alertData, setAlertData] = useState();

    const [expandComment, setExpandComment] = useState("");

    const [clickCount, setClickCount] = useState(false);

    const [totalViewedComments, setTotalViewedComments] = useState(30);

    function truncate(string, n) {
        return (
            <span>
                {string?.length > n && (
                    <span>
                        {string.substr(0, n - 1)}{" "}
                        <span className="text-[10px] text-gray-500 cursor-pointer">
                            {" "}
                            ... Read more
                        </span>
                    </span>
                )}
                {string?.length <= n && <span>{string}</span>}
            </span>
        );
    }

    function handleLoadMore() {
        setTotalViewedComments(totalViewedComments + 50);
    }

    useEffect(() => {

        axios.post(VITE_BASE_LINK + 'google/all_comments').then((response) => {
            // console.log(response?.data);
            setReviewsData(response?.data)
        })

        axios.post(VITE_BASE_LINK + 'google/all_alerts').then((response) => {
            // console.log(response?.data);
            setAlertData(response?.data)
        })
    }, [])


    return (
        <div>
            <SecondaryHeader />

            {/* comments & alerts */}
            <div className='w-full p-4'>

                {/* comments */}
                <div className='hidden md:block w-full border rounded-[10px]'>
                    <div className='w-full p-4'>
                        <h1 className='text-md'>Comments</h1>
                    </div>

                    {/* table heading */}
                    <div className='w-[98%] mx-auto grid grid-cols-[80px_150px_auto_150px_150px]  border-b pb-2'>
                        <h1 className='text-xs text-gray-600 font-[500]'>Date</h1>
                        <h1 className='text-xs text-gray-600 font-[500]'>Name</h1>
                        <h1 className='text-xs text-gray-600 font-[500]'>Review</h1>
                        <h1 className='text-xs text-gray-600 font-[500]'>Rating</h1>
                        <h1 className='text-xs text-gray-600 font-[500]'>Sentiment</h1>
                    </div>


                    {/* table data */}
                    <div className='w-full px-4 max-h-[300px] overflow-y-scroll'>
                        {
                            reviewsData ?
                                <>

                                    {
                                        reviewsData?.map((data, i) => {
                                            return (
                                                i <= totalViewedComments && (
                                                    <div key={i} className='w-full grid grid-cols-[80px_150px_auto_150px_150px] py-4 border-b'>
                                                        <h1 className='text-xs'>{data?.date}</h1>
                                                        <h1 className='text-xs'>{data?.name}</h1>
                                                        {/* <h1 className='text-xs xl:pr-6'>{data?.review}</h1> */}
                                                        <h1 className='text-xs xl:pr-6'>
                                                            <div className=" ">
                                                                <div
                                                                    className="w-full"
                                                                    onClick={() => {
                                                                        setExpandComment(data.id);
                                                                        setClickCount(!clickCount);
                                                                    }}
                                                                >
                                                                    {expandComment == data?.id && clickCount
                                                                        ? data?.review
                                                                        : truncate(data?.review, 100)}
                                                                </div>
                                                            </div>
                                                        </h1>
                                                        <h1 className='text-xs pl-5'>{data?.rating}</h1>
                                                        <h1 className='text-xs pl-5'>{
                                                            data?.sentiment === 'Positive' ?
                                                                <img src={PositiveIcon} alt="Positive" className="w-[20px]" />
                                                                :
                                                                data?.sentiment === 'Neutral' ?
                                                                    <img src={NeutralIcon} alt="Neutral" className="w-[20px]" />
                                                                    :
                                                                    data?.sentiment === 'Negative' ?
                                                                        <img src={NegativeIcon} alt="Negative" className="w-[20px]" />
                                                                        :
                                                                        data?.sentiment === 'Extreme' ?
                                                                            <img src={ExtremeIcon} alt="Extreme" className="w-[20px]" />
                                                                            :
                                                                            null
                                                        }</h1>
                                                    </div>
                                                )


                                            )
                                        })
                                    }
                                    {reviewsData?.length > totalViewedComments && (
                                        <div className=" flex  justify-center items-center p-2">
                                            <div
                                                className="flex flex-col justify-center items-center cursor-pointer "
                                                onClick={handleLoadMore}
                                            >
                                                <DoubleArrowRoundedIcon className="text-gray-400 rotate-90 " />
                                                <div className="text-xs text-gray-500">Load More</div>
                                            </div>
                                        </div>
                                    )}
                                </>
                                :
                                <div className='w-full min-h-[30vh] flex justify-center items-center'>
                                    <PuffLoader color="#0284c7" size={50} width={100} />
                                </div>
                        }
                    </div>
                </div>

                {/* comments - mobile screen */}
                <div className='block md:hidden w-full border rounded-[10px]'>
                    <div className='w-full p-4'>
                        <h1 className='text-md'>Comments</h1>
                    </div>


                    {/* table data */}
                    <div className='w-full px-4 max-h-[300px] overflow-y-scroll py-2'>
                        {
                            reviewsData ?
                                <>

                                    {
                                        reviewsData?.map((data, i) => {
                                            return (
                                                i <= totalViewedComments && (
                                                    <div key={i} className='w-full mb-4 p-3 rounded-[10px] shadow-md border'>
                                                        <span className='flex gap-1 py-1 items-center'><h1 className='text-[11px] text-gray-600 font-[600]'>Date</h1><h1 className='text-xs font-[600] text-gray-600'>:</h1> <h1 className='text-xs'>{data?.date}</h1></span>

                                                        <span className='flex gap-1 py-1 items-center'><h1 className='text-[11px] text-gray-600 font-[600]'>Name</h1><h1 className='text-xs font-[600] text-gray-600'>:</h1> <h1 className='text-xs'>{data?.name}</h1></span>

                                                        <span className='flex gap-1 py-1 items-start'><h1 className='text-[11px] text-gray-600 font-[600]'>Review</h1><h1 className='text-xs font-[600] text-gray-600'>:</h1> <h1 className='text-xs xl:pr-6'>
                                                            <div className=" ">
                                                                <div
                                                                    className="w-full"
                                                                    onClick={() => {
                                                                        setExpandComment(data.id);
                                                                        setClickCount(!clickCount);
                                                                    }}
                                                                >
                                                                    {expandComment == data?.id && clickCount
                                                                        ? data?.review
                                                                        : truncate(data?.review, 100)}
                                                                </div>
                                                            </div>
                                                        </h1></span>
                                                        <span className='flex gap-1 py-1 items-center'><h1 className='text-[11px] text-gray-600 font-[600]'>Rating</h1><h1 className='text-xs font-[600] text-gray-600'>:</h1> <h1 className='text-xs '>{data?.rating}</h1></span>
                                                        {/* <h1 className='text-xs xl:pr-6'>{data?.review}</h1> */}

                                                        <span className='flex gap-1 py-1 items-center'><h1 className='text-[11px] text-gray-600 font-[600]'>Sentiment</h1><h1 className='text-xs font-[600] text-gray-600'>:</h1> <h1 className='text-xs '>{
                                                            data?.sentiment === 'Positive' ?
                                                                <img src={PositiveIcon} alt="Positive" className="w-[20px]" />
                                                                :
                                                                data?.sentiment === 'Neutral' ?
                                                                    <img src={NeutralIcon} alt="Neutral" className="w-[20px]" />
                                                                    :
                                                                    data?.sentiment === 'Negative' ?
                                                                        <img src={NegativeIcon} alt="Negative" className="w-[20px]" />
                                                                        :
                                                                        data?.sentiment === 'Extreme' ?
                                                                            <img src={ExtremeIcon} alt="Extreme" className="w-[20px]" />
                                                                            :
                                                                            null
                                                        }</h1></span>



                                                    </div>
                                                )


                                            )
                                        })
                                    }
                                    {reviewsData?.length > totalViewedComments && (
                                        <div className=" flex  justify-center items-center p-2">
                                            <div
                                                className="flex flex-col justify-center items-center cursor-pointer "
                                                onClick={handleLoadMore}
                                            >
                                                <DoubleArrowRoundedIcon className="text-gray-400 rotate-90 " />
                                                <div className="text-xs text-gray-500">Load More</div>
                                            </div>
                                        </div>
                                    )}
                                </>
                                :
                                <div className='w-full min-h-[30vh] flex justify-center items-center'>
                                    <PuffLoader color="#0284c7" size={50} width={100} />
                                </div>
                        }
                    </div>
                </div>


                {/* alerts */}
                <div className='hidden md:block w-full border rounded-[10px] mt-4'>
                    <div className='w-full p-4'>
                        <h1 className='text-md'>Alerts</h1>
                    </div>

                    {/* table heading */}
                    <div className='w-[98%] mx-auto grid grid-cols-[80px_150px_auto_150px_150px] border-b pb-2'>
                        <h1 className='text-xs text-gray-600 font-[500]'>Date</h1>
                        <h1 className='text-xs text-gray-600 font-[500]'>Name</h1>
                        <h1 className='text-xs text-gray-600 font-[500]'>Review</h1>
                        <h1 className='text-xs text-gray-600 font-[500]'>Rating</h1>
                        <h1 className='text-xs text-gray-600 font-[500]'>Sentiment</h1>
                    </div>


                    {/* table data */}
                    <div className='w-full px-4 max-h-[300px] overflow-y-scroll'>
                        {
                            alertData?.map((data, i) => (
                                <div key={i} className='w-full grid grid-cols-[80px_150px_auto_150px_150px] py-4 border-b'>
                                    <h1 className='text-xs'>{data?.date}</h1>
                                    <h1 className='text-xs'>{data?.name}</h1>
                                    <h1 className='text-xs pr-6'>{data?.review}</h1>
                                    <h1 className='text-xs pl-5'>{data?.rating}</h1>
                                    <h1 className='text-xs pl-5'>{
                                        data?.sentiment === 'Positive' ?
                                            <img src={PositiveIcon} alt="Positive" className="w-[20px]" />
                                            :
                                            data?.sentiment === 'Neutral' ?
                                                <img src={NeutralIcon} alt="Neutral" className="w-[20px]" />
                                                :
                                                data?.sentiment === 'Negative' ?
                                                    <img src={NegativeIcon} alt="Negative" className="w-[20px]" />
                                                    :
                                                    data?.sentiment === 'Extreme' ?
                                                        <img src={ExtremeIcon} alt="Extreme" className="w-[20px]" />
                                                        :
                                                        null
                                    }</h1>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* alerts - mobile screen */}
                <div className='block md:hidden w-full border rounded-[10px] mt-4'>
                    <div className='w-full p-4'>
                        <h1 className='text-md'>Alerts</h1>
                    </div>


                    {/* table data */}
                    <div className='w-full px-4 max-h-[300px] overflow-y-scroll'>
                        {
                            alertData?.map((data, i) => (
                                <div key={i} className='w-full mb-4 p-3 rounded-[10px] shadow-md border'>
                                    <span className='flex gap-1 py-1 items-center'><h1 className='text-[11px] text-gray-600 font-[600]'>Date</h1><h1 className='text-xs font-[600] text-gray-600'>:</h1> <h1 className='text-xs'>{data?.date}</h1></span>

                                    <span className='flex gap-1 py-1 items-center'><h1 className='text-[11px] text-gray-600 font-[600]'>Name</h1><h1 className='text-xs font-[600] text-gray-600'>:</h1> <h1 className='text-xs'>{data?.name}</h1></span>

                                    <span className='flex gap-1 py-1 items-start'><h1 className='text-[11px] text-gray-600 font-[600]'>Review</h1><h1 className='text-xs font-[600] text-gray-600'>:</h1> <h1 className='text-xs xl:pr-6'>
                                        <div className=" ">
                                            <div
                                                className="w-full"
                                                onClick={() => {
                                                    setExpandComment(data.id);
                                                    setClickCount(!clickCount);
                                                }}
                                            >
                                                {expandComment == data?.id && clickCount
                                                    ? data?.review
                                                    : truncate(data?.review, 100)}
                                            </div>
                                        </div>
                                    </h1></span>
                                    <span className='flex gap-1 py-1 items-center'><h1 className='text-[11px] text-gray-600 font-[600]'>Rating</h1><h1 className='text-xs font-[600] text-gray-600'>:</h1> <h1 className='text-xs '>{data?.rating}</h1></span>
                                    {/* <h1 className='text-xs xl:pr-6'>{data?.review}</h1> */}

                                    <span className='flex gap-1 py-1 items-center'><h1 className='text-[11px] text-gray-600 font-[600]'>Sentiment</h1><h1 className='text-xs font-[600] text-gray-600'>:</h1> <h1 className='text-xs '>{
                                        data?.sentiment === 'Positive' ?
                                            <img src={PositiveIcon} alt="Positive" className="w-[20px]" />
                                            :
                                            data?.sentiment === 'Neutral' ?
                                                <img src={NeutralIcon} alt="Neutral" className="w-[20px]" />
                                                :
                                                data?.sentiment === 'Negative' ?
                                                    <img src={NegativeIcon} alt="Negative" className="w-[20px]" />
                                                    :
                                                    data?.sentiment === 'Extreme' ?
                                                        <img src={ExtremeIcon} alt="Extreme" className="w-[20px]" />
                                                        :
                                                        null
                                    }</h1></span>



                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewsTablePage