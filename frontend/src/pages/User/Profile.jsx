import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { Link } from 'react-router-dom'
import { useProfileMutation } from '../../redux/api/userApiSlice'

export const Profile = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassowrd] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { userInfo } = useSelector(state => state.auth)
    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();


    useEffect(() => {
        setUsername(userInfo.username)
        setEmail(userInfo.email)

    }, [userInfo.email, userInfo.username])

    const dispatch = useDispatch();

    const submitHandler = async (e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error('le password non corrispondono')
        }else{

            try {
                const response = await updateProfile({_id: userInfo._id, username, email, password}).unwrap()
                dispatch(setCredentials({...response}))
                toast.success("Prodilo aggironato correttametne")
            } catch (error) {
                toast.error(error?.data?.message  || error.message)
            }
        }
    }


    return (
        <div className='container mx-auto p4 mt-[10rem]'>
            <div className="flex justify-center align-center md:flex md:space-x-4">

                <div className='md:w-1/3'>
                <h2 className='text-2xl font-semibold mb-4'>Update Profile</h2>
                      <form onSubmit={submitHandler}>
                    <div className="mb-4  bg-gray-500">

                        <label htmlFor="" className="block  mb-2 ">
                            Nome
                        </label>
                        <input
                            type="text"
                            placeholder='Enter Name'
                            className='form-input border border-zinc-950 p-4 rounded-sm w-full'
                            value={username}
                            onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-4  bg-gray-500">

                        <label htmlFor="" className="block  mb-2 ">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder='Enter email'
                            className='form-input border border-zinc-950 p-4 rounded-sm w-full'
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4  bg-gray-500">

                        <label htmlFor="" className="block  mb-2 ">
                            password
                        </label>
                        <input
                            type="password"
                            placeholder='Enter password'
                            className='form-input border border-zinc-950 p-4 rounded-sm w-full'
                            value={password}
                            onChange={e => setPassowrd(e.target.value)} />
                    </div>
                    <div className="mb-4  bg-gray-500">

                        <label htmlFor="" className="block  mb-2 ">
                            confirm password
                        </label>
                        <input
                            type="password"
                            placeholder='confirm password'
                            className='form-input border border-zinc-950 p-4 rounded-sm w-full'
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)} />
                        </div>

                    <div className="flex justify-between">
                        <button className="bg-pink-500 rounded text-white py-2 px-4 hover:bg-pink-700" type='submit'>update</button>
                        <Link to='/user-orders' className='bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-700'>
                            My orders
                        </Link>
                    </div>


                </form>
                </div>
                {loadingUpdateProfile && <Loader />}
            </div>

        </div>
    )
}
