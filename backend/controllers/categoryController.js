import Category from '../models/categoryModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const createCategory = asyncHandler(async (request, response) => {
    try {

        const { name } = request.body;

        if(!name){
            return response.json({error: "Il nome è obbligatorio!"})
        }


        const existingCategory = await Category.findOne({name})

        if (existingCategory) {
            return response.json({error: "La Categoria è gia esistente"})
        }


        const category = await new Category({name}).save()
        response.json({category})
        console.log(name);

    } catch (error) {

        console.log(error);
        return response.status(400).json(error);

    }
});



const updatedCategory = asyncHandler(async(request,response) =>{
    try {
        
        const {name} = request.body

        const {categoryId} = request.params

        const category = await Category.findOne({_id: categoryId})

        if(!Category){
            response.status(404).json({error: "Categoria non trovata.."})
        }

        category.name = name

        const updatedCategory = await category.save()
        response.json(updatedCategory)



    } catch (error) {
        console.error(error)
        response.status(500).json({error: 'internal server error ( updateCategory )'})
    }
})


const removeCategory = asyncHandler(async(request,response) =>{
    try {
        const removed = await Category.findByIdAndDelete(request.params.categoryId)
        response.json(removed)
    } catch (error) {
        console.error(error)
        response.status(500).json({error: "internal server error ( removeCategory )"})
    }
})

export { createCategory,updatedCategory,removeCategory };
