import React from 'react'
import Nav from '../../components/Nav/NavMain'
import MainFooter from '../../components/Footer/MainFooter'
import DownloadsHero from './DownloadHero'
import DownloadCard from "./DownloadCard"
import DownloadHead from './DownloadHead'
const Download = () => {
  return (
    <div className='flex flex-col '>
       <DownloadHead/>
       
      
        <DownloadCard/>
       
        <MainFooter/>
    </div>
  )
}

export default Download