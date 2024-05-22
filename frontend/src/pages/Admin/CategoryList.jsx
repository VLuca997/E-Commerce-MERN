import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation, useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice'
import Modal from '../../components/Modal.jsx'
import CategoryForm from '../../components/CategoryForm.jsx'

export const CategoryList = () => {
    const { data: categories } = useFetchCategoriesQuery()
    console.log(categories)

    const [name, setName] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [updatingName, setUpdatingName] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    const [createCategory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()


    
    const handleCreateCategory = async (e) => {
        e.preventDefault()

        if (!name) {
            toast.error('Il nome della categoria è obbligatorio!')
            return
        }

        try {
            const result = await createCategory({ name }).unwrap()
            if (result.error) {
                toast.error(result.error)
            } else {
                setName("")
                toast.success(`La categoria ${result.name} è stata creata`)
            }
        } catch (error) {
            console.error(error)
            toast.error('Creazione della categoria fallita, riprova!')
        }
    }





    const handleUpdateCategory = async (e) =>{
        e.preventDefault()

        if(!updatingName){
            toast.error('Il Nome della categoria è obbligatorio')
            return
        }
        try {
            
            const result = await updateCategory({categoryId: selectedCategory._id, updateCategory:{
                name: updatingName
            }}).unwrap();

            if(result.error){
                toast.error(result.error)
            }else{
                toast.success(`${result.name} è stato modificato!`)
                setSelectedCategory('')
                setModalVisible(false)
            }

        } catch (error) {
            console.error(error)
        }
    }



    const handleDeleteCategory = async () =>{
        try {
            const result = await deleteCategory(selectedCategory._id).unwrap();

            if(result.error){
                toast.error(result.error)
            }else{
                toast.success(`${result.name} è stato cancellato`)
                setSelectedCategory(null)
                setModalVisible(false)
            }
        } catch (error) {
            console.error(error);
            toast.error("Eliminazione della categoria fallita, riprova")
        }
    }



    return (
        <div className="flex flex-col md:flex-row ml-[10rem]">
            <div className="md:w-3/4 p-3">
                <div className="h-12">Gestione Categorie</div>
                <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory} />
                <br />
                <hr />
                <div className="flex flex-wrap">
                    {categories?.map((category) => (
                        <div key={category._id} className='px-4 py-4'>
                            <button
                                className='bg-white hover:bg-pink-500 borde-pink-500 text-pink-500 hover:text-white py-2 px-4 m-1 rounded-lg 
                                            focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50'
                                onClick={() => {
                                    setModalVisible(true)
                                    setSelectedCategory(category)
                                    setUpdatingName(category.name)
                                }}
                            >
                                {category.name}
                            </button>
                        </div>
                    ))}
                </div>
                <Modal isOpen={modalVisible} onClose={() => setModalVisible(true)}>
                    <CategoryForm 
                        value={updatingName} 
                        setValue={value => setUpdatingName(value)} 
                        handleSubmit={handleUpdateCategory} 
                        buttonText='Update' 
                        handleDelete={handleDeleteCategory}/>
                </Modal>
            </div>
        </div>
    )
}
