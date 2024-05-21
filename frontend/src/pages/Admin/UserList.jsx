import { useEffect, useState } from "react"
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa'
import Loader from '../../components/Loader.jsx'

import { toast } from 'react-toastify'

import { useGetUserQuery, useDeleteUserMutation, useGetUserDetailsQuery, useUpdateUserMutation } from '../../redux/api/userApiSlice.js'
import { useStore } from "react-redux"
import Message from "../../components/Message.jsx"


export const UserList = () => {

    const { data: users, refetch, isLoading, error } = useGetUserQuery()



    const [deleteUser] = useDeleteUserMutation()
    const [updateUser] = useUpdateUserMutation()


    const [editableUserId, setEditableUserId] = useState(null)
    const [editableUserName, setEditableUserName] = useState('')
    const [editableUserEmail, setEditableUserEmail] = useState('')

    useEffect(() => {
        refetch()
    }, [refetch]);



    const deleteHandler = async (id) => {
        if(window.confirm(`sei sicuro ?`)){
            try {
                await deleteUser(id)
            } catch (error) {
                toast.error(error.data.message || error.error)
            }
        }
    }



    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Users</h1>
            {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message || error.message}</Message>) : (
                <div className="flex flex-col md:flex-row">
                    {/* <AdminMenu /> */}
                    <table className="w-full md:w-4/5 mx-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">NAME</th>
                                <th className="px-4 py-2 text-left">EMAIL</th>
                                <th className="px-4 py-2 text-left">ADMIN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>


                                    <td className="px-4 py-2">
                                        {user._id}
                                    </td>


                                    <td>
                                        {editableUserId === user._id ? (
                                            <div className="flex items-center">
                                                <input type="text" value={editableUserName} onChange={e => setEditableUserName(e.target.value)} className="w-full p-2 border rounded-lg" />
                                                <button onClick={() => updateHandler(user._id)} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg">
                                                    <FaCheck />
                                                </button>
                                            </div>) : (
                                            <div className="flex items-center">
                                                {user.username}{" "}
                                                <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                                    <FaEdit className="ml-[1rem]" />
                                                </button>
                                            </div>
                                        )}
                                    </td>

                                    <td className="px-4 py-2">
                                        {editableUserId == user._id ? (

                                            <div className="flex items-center">
                                                <input type="text" value={editableUserEmail} onChange={e => setEditableUserEmail(e.target.value)} className="w-full border rounded-lg" />
                                                <button onClick={() => updateHandler(user._id)} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg">
                                                    <FaCheck/>
                                                </button>
                                            </div>

                                        ) : (
                                            <div className="flex items-center">
                                                <p>{user.email}</p>
                                                <button onClick={() => toggleEdit(user._id,user.username,user.email)} >
                                                    <FaEdit className="ml-[1rem]"/>
                                                </button>
                                            </div>
                                        )}
                                    </td>

                                   <td className="px-4 py-2">
                                    {user.isAdmin ? (
                                        <FaCheck style={{color:"green"}} />
                                        ) :(
                                        <FaCheck style={{color:"red"}} />
                                        ) }
                                   </td>

                                   <td className="px-4 py-2">
                                        {!user.isAdmin && (
                                            <div className="flex">
                                                <button onClick={()=> deleteHandler(user._id)} className="bg-red-600 hover:bg-red-700 text-white font-bold rounded px-4 py-2">
                                                    <FaTrash/>
                                                </button>
                                            </div>
                                        )}

                                   </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
