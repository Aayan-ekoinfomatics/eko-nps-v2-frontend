import React from 'react'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useRecoilState } from 'recoil';
import SidebarAtom from '../../recoil/global-atoms/SidebarAtom';

const SecondaryHeader = () => {

    const [sidebarToggle, setSidebarToggle] = useRecoilState(SidebarAtom);

    const logout = () => {
        localStorage?.clear();
        navigate('/login');
    }

    return (
        <div className='w-full p-4 border-t-2 border-b-2 flex justify-between sm:justify-end items-center  z-[200] text-sky-600'>
            <div className='block sm:hidden w-fit pr-4 pl-1'>
                <span className='cursor-pointer z-[250]' onClick={() => setSidebarToggle(!sidebarToggle)}><MenuRoundedIcon fontSize='large' className='text-sky-600' /></span>
            </div>
            <span onClick={logout} className='cursor-pointer'><LogoutOutlinedIcon /></span>
        </div>
    )
}

export default SecondaryHeader