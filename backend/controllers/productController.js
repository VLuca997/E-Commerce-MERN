import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (request, response) => {
  try {
    // Destructure request fields for better readability
    const { name, description, price, category, quantity, brand, image } = request.fields;

    // Validation
    if (!name) {
      return response.status(400).json({ error: "Nome è obbligatorio" });
    }
    if (!brand) {
      return response.status(400).json({ error: "Brand è obbligatorio" });
    }
    if (!description) {
      return response.status(400).json({ error: "Descrizione è obbligatoria" });
    }
    if (!price) {
      return response.status(400).json({ error: "Prezzo è obbligatorio" });
    }
    if (!category) {
      return response.status(400).json({ error: "Categoria è obbligatoria" });
    }
    if (!quantity) {
      return response.status(400).json({ error: "Quantità è obbligatoria" });
    }

    // Check for image presence
    if (!image) {
      return response.status(400).json({ error: "Immagine del prodotto è obbligatoria" });
    }

    // Create new product using request data
    const product = new Product({ name, description, price, category, quantity, brand, image });

    // Save the product to the database
    const savedProduct = await product.save();

    // Send successful response with the created product data
    response.status(201).json(savedProduct); // 201 for created resources

  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Errore durante la creazione del prodotto" }); // Generic error for client
  }
});

export { addProduct };
