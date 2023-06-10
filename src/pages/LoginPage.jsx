import React, { useEffect, useState } from 'react'
import loginImg from '../assets/images/login-image.svg'
import eko_logo from '../assets/icons/eko_logo.png'
import robot from '../assets/images/robot_image.png'
import axios from 'axios'
import { VITE_BASE_LINK } from '../../baseLink'
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {

    const navigate = useNavigate()

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })

    const login = () => {
        axios.post(VITE_BASE_LINK + 'auth/login', loginData).then((response) => {
            console.log(response?.data)
            if(response?.data?.status) {
                localStorage?.setItem('token', response?.data?.user_data?.token)
                navigate('/')
            }
        })
    }

    // useEffect(() => {console.log(loginData)}, [loginData])


  return (
    <div className='bg-gray-100 h-screen'>


        {/* header */}
        <div className='w-full p-6'>
            <div className='w-full max-w-[60px]'>
                <img src={eko_logo} className='w-full' alt="" />
            </div>
        </div>


        <div className='w-full'>
            <div className='w-[90%] mx-auto flex flex-col-reverse lg:flex-row'>

                {/* flex 1 */}
                <div className='px-6 w-full lg:max-w-[40vw] flex justify-center items-center'>

                    {/* login component */}
                    <div className='w-full xl:min-w-[400px] max-w-[400px] bg-white px-6 py-8 rounded-[10px] shadow-md'>
                        <h1 className='text-3xl font-[600] leading-none text-gray-600 pb-10'>Login</h1>
                        <div className='w-full flex flex-col gap-5'>
                            <div className='w-full flex flex-col gap-1'>
                                <label htmlFor="email" className='text-gray-600 text-xs font-[700] pl-1'>Email Address</label>
                                <input type="email" onChange={(e) => setLoginData({
                                    ...loginData,
                                    email: e?.target?.value
                                })} name='email' className='w-full outline-none p-2 border-2 text-sm text-gray-700 placeholder:italic placeholder:text-[13px] rounded-[8px]' placeholder='youremail@example.com'/>
                            </div>
                            <div className='w-full flex flex-col gap-1'>
                                <label htmlFor="password" className='text-gray-600 text-xs font-[700] pl-1'>Password</label>
                                <input type="password" onChange={(e) => setLoginData({
                                    ...loginData,
                                    password: e?.target?.value
                                })} name='password' className='w-full outline-none p-2 border-2 text-sm text-gray-700 placeholder:italic placeholder:text-[13px] rounded-[8px]' placeholder='****************'/>
                            </div>
                            <div className='w-full flex pt-4'>
                                <button onClick={login} className='w-full hover:bg-[#00ac6ad3] active:scale-95 transition-all duration-300 ease-in-out py-[10px] rounded-[10px] flex justify-center items-center text-[14px] font-[600] text-white bg-[var(--secondary-color)]'>LOGIN</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* flez 2 */}
                <div className='flex-1 flex justify-center items-center'>

                    {/* login page image */}
                    <div className='w-fit relative'>
                        <img src={loginImg} className='w-full' alt="" />
                        <img src={robot} className='absolute top-0 right-0 w-full max-w-[140px]' alt="" />
                        <div className='w-full absolute top-0 flex justify-center'>
                        <h1 className='text-center text-2xl font-[700] text-gray-700'>WELCOME TO CxPro</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPage