import React from 'react'
import NSSDetailedCard from '../components/individual-components/NSSDetailedCard'
import NSSAllCard from '../components/individual-components/NSSAllCard'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SecondaryHeader from '../components/global-components/SecondaryHeader';

const NPSSentimentsTablePage = () => {
  return (
    <div>
    <SecondaryHeader />
        <div className='p-4'>
        <NSSDetailedCard />
        </div>
        <div className='p-4'>
        <NSSAllCard />
        </div>
    </div>
  )
}

export default NPSSentimentsTablePage