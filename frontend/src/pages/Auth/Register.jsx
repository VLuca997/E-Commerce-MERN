import  { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader.jsx';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../../redux/api/userApiSlice.js';

export const Register = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector(state => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        toast.error("La password non corrisponde, controlla bene");
    } else {
        try {
            const userData = { username, email, password };
            console.log('Dati utente inviati:', userData); // Log per il debugging
            const response = await register(userData).unwrap();
            console.log('Risposta del server:', response); // Log per il debugging

            dispatch(setCredentials({ ...response }));
            navigate(redirect);
            toast.success('Utente registrato con successo');
        } catch (error) {
            console.error('Errore durante la registrazione:', error);
            toast.error(error.data.message || 'Errore nella registrazione');
        }
    }
};

  return (
    <section className='pl-[10rem] flex flex-wrap bg-black'>
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className='text-2xl font-semibold mb-4 text-white'>
          REGISTER
        </h1>
        <form onSubmit={submitHandler} className='container w-[40rem]'>
          <div className='my-[2rem]'>
            <label className='block text-sm font-medium text-white' htmlFor="name">
              Nome
            </label>
            <input
              type="text"
              id='name'
              className='mt-1 p-2 border rounded w-full'
              placeholder='Enter name'
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className='my-[2rem]'>
            <label className='block text-sm font-medium text-white' htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id='email'
              className='mt-1 p-2 border rounded w-full'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='my-[2rem]'>
            <label className='block text-sm font-medium text-white' htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id='password'
              className='mt-1 p-2 border rounded w-full'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='my-[2rem]'>
            <label className='block text-sm font-medium text-white' htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id='confirmPassword'
              className='mt-1 p-2 border rounded w-full'
              placeholder='Enter Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button disabled={isLoading} type='submit' className='hover:bg-pink-700 transition-all duration-300 bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'>
            {isLoading ? "Ti stai registrando, Attendi..." : "Registrati"}
          </button>
          {isLoading && <Loader />}
        </form>
        <div className="mt-4">
          <p className="text-white">
            Hai già un Account? {" "}
            <Link
              className='font-semibold text-pink-500 hover:underline hover:text-pink-700'
              to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Accedi Subito!
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
