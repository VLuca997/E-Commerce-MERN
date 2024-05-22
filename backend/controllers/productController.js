import { response } from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (request, response) => {
  try {

    const { name, description, price, category, quantity, brand, image } = request.fields;
    switch (true) {
        case !name:
          return response.status(400).json({ error: "Nome è obbligatorio" });
        case !brand:
          return response.status(400).json({ error: "Brand è obbligatorio" });
        case !description:
          return response.status(400).json({ error: "Descrizione è obbligatoria" });
        case !price:
          return response.status(400).json({ error: "Prezzo è obbligatorio" });
        case !category:
          return response.status(400).json({ error: "Categoria è obbligatoria" });
        case !quantity:
          return response.status(400).json({ error: "Quantità è obbligatoria" });
        case !image:
          return response.status(400).json({ error: "Immagine del prodotto è obbligatoria" });
        default:
          break;
      }
      

    const product = new Product({ name, description, price, category, quantity, brand, image });
    const savedProduct = await product.save();
    response.status(201).json(savedProduct); 


  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Errore durante la creazione del prodotto" });
  }
});




const updateProductDetails = asyncHandler(async(request,response)=> {
    try {
        const { name, description, price, category, quantity, brand, image } = request.fields;
        switch (true) {
            case !name:
              return response.status(400).json({ error: "Nome è obbligatorio" });
            case !brand:
              return response.status(400).json({ error: "Brand è obbligatorio" });
            case !description:
              return response.status(400).json({ error: "Descrizione è obbligatoria" });
            case !price:
              return response.status(400).json({ error: "Prezzo è obbligatorio" });
            case !category:
              return response.status(400).json({ error: "Categoria è obbligatoria" });
            case !quantity:
              return response.status(400).json({ error: "Quantità è obbligatoria" });
            case !image:
              return response.status(400).json({ error: "Immagine del prodotto è obbligatoria" });
            default:
              break;
          }

          const product = await Product.findByIdAndUpdate(request.params.id, {...request.fields}, {new: true})
          await product.save();
          response.json(product)
    } catch (error) {
        console.error(error)
        response.status(400).json(error.message)
    }
})



const removeProduct = asyncHandler(async (request,response) =>{


    try {
        const product = await Product.findByIdAndDelete(request.params.id)
        response.json(product)
        
    } catch (error) {
        console.error(error)
        response.status(400).json(error.message)
    }


})



export { addProduct, updateProductDetails,removeProduct};
