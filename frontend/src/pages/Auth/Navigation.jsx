import React, { useState, useRef, useEffect } from 'react'; // Importa React Hooks necessari
import { useSelector, useDispatch } from 'react-redux'; // Importa Hooks Redux per accedere allo stato globale e dispatch azioni
import { useLoginMutation,useLogoutMutation } from '../../redux/api/userApiSlice'; // Importa la funzione di mutazione per il login/logout dallo slice della API Redux
import { logout } from '../../redux/features/auth/authSlice'; // Importa l'azione di logout dallo slice dell'autenticazione Redux
import { AiOutlineHome, AiOutlineLogin, AiOutlineShopping, AiOutlineShoppingCart, AiOutlineUserAdd } from 'react-icons/ai'; // Importa icone da React Icons
import { FaHeart } from 'react-icons/fa'; // Importa icona del cuore da React Icons
import { Link, useNavigate } from 'react-router-dom'; // Importa Link e useNavigate da React Router per la navigazione
import './Navigation.css'; // Importa il file CSS per lo stile della navigazione

// Definizione del componente Navigation
export default function Navigation() {
    const { userInfo } = useSelector(state => state.auth); // Estrae le informazioni sull'utente dallo stato globale Redux
    const [dropdownOpen, setDropdownOpen] = useState(false); // Stato per gestire l'apertura/chiusura del dropdown
    const dispatch = useDispatch(); // Ottiene la funzione dispatch dallo store Redux
    const navigate = useNavigate(); // Ottiene la funzione navigate per la navigazione programmatica
    const dropdownRef = useRef(null); // Crea un riferimento per il dropdown

    // Funzione per aprire o chiudere il dropdown
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Funzione per chiudere il dropdown quando si fa clic al di fuori di esso
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

    const [logoutApiCall] = useLogoutMutation(); // Ottiene la funzione di mutazione per il logout dalla API Redux Toolkit

    // Funzione per gestire il logout
    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap(); // Chiama la funzione di mutazione per il logout e unwrap per ottenere il risultato
            dispatch(logout()); // Esegue l'azione di logout per azzerare lo stato dell'autenticazione
            navigate("/login"); // Naviga verso la pagina di login dopo il logout
        } catch (error) {
            console.error(error);
        }
    };

    // Rendering del componente Navigation
    return (
        <div id='navigation-container' className="flex flex-col justify-between p-4 text-white bg-black h-[100vh] fixed">
            <div className='flex flex-col justify-center space-y-4'>
                {/* Link per la Home */}
                <Link to="/" className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineHome className='mr-2 mt-[3rem]' size={26} />
                    <span id='nav-item-name' className='mt-[3rem]'>HOME PAGE</span>
                </Link>
                {/* Link per il Negozio */}
                <Link to="/shop" className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineShopping className='mr-2 mt-[3rem]' size={26} />
                    <span id='nav-item-name' className='mt-[3rem]'>SHOPPING</span>
                </Link>
                {/* Link per il Carrello */}
                <Link to="/cart" className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineShoppingCart className='mr-2 mt-[3rem]' size={26} />
                    <span id='nav-item-name' className='mt-[3rem]'>CARRELLO</span>
                </Link>
                {/* Link per i Preferiti */}
                <Link to="/favorite" className='flex items-center transition-transform transform hover:translate-x-2'>
                    <FaHeart className='mr-2 mt-[3rem]' size={26} />
                    <span id='nav-item-name' className='mt-[3rem]'>PREFERITI</span>
                </Link>
            </div>

            {/* Dropdown per le opzioni utente */}
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
                {/* Menù a discesa con opzioni utente */}
                {dropdownOpen && userInfo && (
                    <ul className={`absolute right-0 mt-2 space-y-2 bg-white text-gray-600 bottom-[2rem]`}>
                        {/* Link per il Dashboard dell'amministratore (mostrato solo se l'utente è un admin) */}
                        {userInfo.isAdmin && (<>
                            <li>
                                <Link to="/admin/dashboard" className='block px-4 py-2 hover:bg-gray-200'>
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/productlist" className='block px-4 py-2 hover:bg-gray-200'>
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/categorylist" className='block px-4 py-2 hover:bg-gray-200'>
                                    Category
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/orderlist" className='block px-4 py-2 hover:bg-gray-200'>
                                    Orders
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/userlist" className='block px-4 py-2 hover:bg-gray-200'>
                                    Users
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/profile" className='block px-4 py-2 hover:bg-gray-200'>
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    onClick={logoutHandler}
                                    to="/admin/logout" className='block px-4 py-2 hover:bg-gray-200'>
                                    Logout
                                </Link>
                            </li>
                            
                        </>)}
                    </ul>
                )}
            </div>

            {/* Se l'utente non è autenticato, mostra i link per il login e la registrazione */}
            {!userInfo && (
                <div className="flex flex-col space-y-2">
                    {/* Link per il login */}
                    <Link to="/login" className='flex items-center transition-transform transform hover:translate-x-2'>
                        <AiOutlineLogin className='mr-2 mt-[3rem]' size={26} />
                        <span id='nav-item-name' className='mt-[3rem]'>LOGIN</span>
                    </Link>
                    {/* Link per la registrazione */}
                    <Link to="/register" className='flex items-center transition-transform transform hover:translate-x-2'>
                        <AiOutlineUserAdd className='mr-2 mt-[3rem]' size={26} />
                        <span id='nav-item-name' className='mt-[3rem]'>REGISTER</span>
                    </Link>
                </div>
            )}
        </div>
    );
}
