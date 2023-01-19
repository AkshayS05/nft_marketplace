import React from 'react'

const Banner = ({name,parentStyles,childStyles}) => {
  return (
    // getting some styles from the parent as a prop in order to reuse this component
    <div className={`relative w-full flex items-center z-0 overflow-hidden nft-gradient ${parentStyles}`}>
    <p className={`text-5xl font-bold font-poppins ${childStyles}`}>
    Discover, Collect, and sell extraordinary NFTs</p>
    <div className='white-bg h-48 w-48 sm:w-32 sm:h-32 rounded-full absolute -top-9 -left-16 -z-5' />
    <div className='white-bg h-72 w-72 sm:w-56 sm:h-56 rounded-full absolute -bottom-24 -right-14 -z-5' />
   
    </div>
    
  )
}

export default Banner;