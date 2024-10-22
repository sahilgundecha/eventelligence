import React from 'react';
import Logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className='bg-white py-4 border-b border-[#D9D9D9] w-full sticky top-0 z-50'>
      <div className='flex justify-between items-center w-4/5 mx-auto'>
        <img
          src={Logo}
          alt='logo'
          onClick={() => navigate('/dashboard')}
          className='cursor-pointer'
        />
        <div className='profile flex gap-3 items-center'>
          <img src='/bell.png' alt='' className='w-6 h-7' />
          <img src='/ProfilePic.png' alt='' className='w-11 h-11' />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
