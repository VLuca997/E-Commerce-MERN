import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation, useLogoutMutation } from '../../redux/api/userApiSlice';
import { logout } from '../../redux/features/auth/authSlice';
import { AiOutlineHome, AiOutlineLogin, AiOutlineShopping, AiOutlineShoppingCart, AiOutlineUserAdd } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
    const { userInfo } = useSelector(state => state.auth);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeDropdown);
        return () => {
            document.removeEventListener('mousedown', closeDropdown);
        };
    }, []);

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div id='navigation-container' className="flex flex-col justify-between p-4 text-white bg-black h-[100vh] fixed">
            <div className='flex flex-col justify-center space-y-4'>
                <Link to="/" className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineHome className='mr-2 mt-[3rem]' size={26} />
                    <span id='nav-item-name' className='mt-[3rem]'>HOME PAGE</span>
                </Link>
                <Link to="/shop" className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineShopping className='mr-2 mt-[3rem]' size={26} />
                    <span id='nav-item-name' className='mt-[3rem]'>SHOPPING</span>
                </Link>
                <Link to="/cart" className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineShoppingCart className='mr-2 mt-[3rem]' size={26} />
                    <span id='nav-item-name' className='mt-[3rem]'>CARRELLO</span>
                </Link>
                <Link to="/favorite" className='flex items-center transition-transform transform hover:translate-x-2'>
                    <FaHeart className='mr-2 mt-[3rem]' size={26} />
                    <span id='nav-item-name' className='mt-[3rem]'>PREFERITI</span>
                </Link>
            </div>
            <div ref={dropdownRef} className="relative">
                <button onClick={toggleDropdown} className='flex items-center text-gray-800 focus:outline-none'>
                    {userInfo ? <span className='text-white'>{userInfo.username}</span> : null}
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className={`h-4 w-4 ml-1 transition-transform ${dropdownOpen ? "rotate-0" : "rotate-180"}`}
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='white'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M5 15l7-7 7 7'
                        />
                    </svg>
                </button>
                {dropdownOpen && userInfo && (
                    <ul className={`absolute right-0 mt-2 space-y-2 bg-white text-gray-600 bottom-[2rem]`}>
                        <li>
                            <Link to="/profile" className='block px-4 py-2 hover:bg-gray-300'>
                                Profile
                            </Link>
                        </li>
                        {userInfo.isAdmin && (
                            <>
                                <li>
                                    <Link to="/admin/dashboard" className='block px-4 py-2 hover:bg-gray-300'>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/productlist" className='block px-4 py-2 hover:bg-gray-300'>
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/categorylist" className='block px-4 py-2 hover:bg-gray-300'>
                                        Category
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/orderlist" className='block px-4 py-2 hover:bg-gray-300'>
                                        Orders
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/userlist" className='block px-4 py-2 hover:bg-gray-300'>
                                        Users
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <button onClick={logoutHandler} className='block w-full text-left px-4 py-2 hover:bg-gray-300'>
                                Logout
                            </button>
                        </li>
                    </ul>
                )}
            </div>
            {!userInfo && (
                <div className="flex flex-col space-y-2">
                    <Link to="/login" className='flex items-center transition-transform transform hover:translate-x-2'>
                        <AiOutlineLogin className='mr-2 mt-[3rem]' size={26} />
                        <span id='nav-item-name' className='mt-[3rem]'>LOGIN</span>
                    </Link>
                    <Link to="/register" className='flex items-center transition-transform transform hover:translate-x-2'>
                        <AiOutlineUserAdd className='mr-2 mt-[3rem]' size={26} />
                        <span id='nav-item-name' className='mt-[3rem]'>REGISTER</span>
                    </Link>
                </div>
            )}
        </div>
    );
}
