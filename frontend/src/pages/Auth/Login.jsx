import React,{useState, useEffect } from 'react'
import { Link,useLocation,useNavigate} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/api/userApiSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'




export const Login = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [login,{isLoading}] = useLoginMutation();

    const {userInfo} = useSelector(state => state.auth)

    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/'


    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[redirect,navigate,userInfo])



    //PREVENT DEFAULT PER FORM LOGIN
    const submitHandler = async (e) =>{
        e.preventDefault()
        try {
            const response = await login ({ email, password}).unwrap()
            console.log(response)
            dispatch(setCredentials({...response}))
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }





  return (
    <div className='bg-black'>
        <section className='pl-[10rem] flex flex-wrap'>
            <div className="mr-[10rem mt-[5rem]">
                <h1 className='text-2xl font-semibold mb-4 text-white'> Sign In</h1>
                <form onSubmit={submitHandler} className='container w-[40rem]'>
                    <div className='my-[2rem]'>
                        <label htmlFor="email" className='block text-sm font-medium text-white'>
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            className='mt-1 p-2 border rounded w-full' 
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                        />
                    </div>
                    <div className='my-[2rem]'>
                        <label htmlFor="password" className='block text-sm font-medium text-white'>
                            Password
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            className='mt-1 p-2 border rounded w-full' 
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                        />
                    </div>
                    <button disabled={isLoading} type='submit' className='hover:bg-pink-600 bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'>
                        {isLoading ? "Signing in..." : "Sign In"}
                    </button>
                    {isLoading && <Loader/>}
                </form>

                <div className='mt-4'>
                    <p className='text-white'>
                        New Customer ? {" "}
                        <Link className='text-pink-500 hover:underline' to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                            Register your account
                        </Link>
                    </p>

                </div>
            </div>

        </section>

    </div>
  )
}
