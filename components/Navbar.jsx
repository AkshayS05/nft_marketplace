import { useState,useEffect,useContext } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
// nextjs optimized version for img tag as well as link
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import images from '../assets'

const MenuItems=({isMobile,active,setActive})=>{
const generateLink=(i)=>{
switch (i) {
    case 0:
        return '/';
      case 1:
        return '/created-nfts';
    case 2:
        return '/my-nfts';
    default:
      return '/';
}
}
return(
    <ul className={`list-none flexCenter flex-row ${isMobile && 'flex-col h-full'}`}>
    {['Explore NFTs','Listed NFTs','My NFTs'].map((item,i)=>(
        <li key={i} onClick={()=>{setActive(item)}} className={`flex flex-row items-center font-poppins font-semibold text-base
            dark:hover:text-white hover:text-nft-dark mx-3 
            ${active===item? 'dark:text-white text-nft-black-1':'dark:nft-text-gray-3 text-nft-gray-2'}
        `}>
        {/* here we will pass on the link index to generateLink function as per the item  */}
            <Link href={generateLink(i)}>{item}</Link>
        </li>
    ))} </ul>
)
}
// buttonGroup
const ButtonGroup=({setActive,router})=>{
    const hasConnected=true;
    return hasConnected?(
        <Button 
         btnName='Create' classStyles='mx-2 rounded-xl'
         handleClick={()=>{setActive('')

    router.push('/create-nft')}}
        />
    ):<Button btnName='Connect' classStyles='mx-2 rounded-xl'handleClick={()=>{}}/>
}
const Navbar = () => {
    // to set active state
    const [active, setActive] = useState('Explore NFTs');
    // to find if we are using light or a dark theme
    const {theme,setTheme}= useTheme();
    // to check of mobile menu is open or not
    const[open, setOpen] = useState(false);
//    router
const router= useRouter();
  return (
    <nav className="flexBetween w-full fixed z-10 p-4 border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
       <div className="flex flex-1 flex-row justify-start">
        <Link href='/'>
            <div className="flexCenter md:hidden cursor-pointer"onClick={()=>{}}>
                <Image src={images.logo02} objectFit='contain' width={32} height={32} alt="logo"/>
                <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">CryptoKet</p>
            </div>
        </Link>
        <Link href='/'>

            {/* for medium and small devices  */}
            <div className="hidden md:flex" onClick={()=>{}}><Image src={images.logo02} objectFit='contain' width={32} height={32} alt="logo"/></div>
        </Link>
       </div>
       {/* toggle button */}
       <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2">
            <input type="checkbox" id="checkbox" className="checkbox" onChange={()=>setTheme(theme==='light'?'dark':'light')}/>
            <label htmlFor="checkbox" className="w-8 h-4 bg-black flexBetween rounded-2xl p-1 relative label">
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />
             <div className="w-3 h-3 bg-white absolute rounded-full ball cursor-pointer"/>
            </label>
        </div>
       <div className="md:hidden flex">
       
            <MenuItems active={active} setActive={setActive}/>
       <div className="ml-4"><ButtonGroup setActive={setActive}router={router}/></div>
       </div>
       </div>
       {/* Mobile Navigation */}
       <div className="hidden md:flex ml-2">
        {/* check if menu is open or not */}
        {open?(
        <Image src={images.cross} 
        objectFit='contain'
        width={20}height={20}
        alt='close'
        onClick={()=>setOpen(false)}
        className={theme==='light' && 'filter invert'}
        />):(
        <Image src={images.menu} objectFit='contain'
        width={25}height={25}
        alt='menu'
        onClick={()=>setOpen(true)}
        className={theme==='light' && 'filter invert'}
        />)}
        {open && (
            <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
                <div className="flex-1 p-4">
                <MenuItems active={active} setActive={setActive}isMobile/>
                 </div>
                 <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
                    <ButtonGroup setActive={setActive} router={router}/>
                 </div>
            </div>
        )}
       </div>
    </nav>
  )
}

export default Navbar;