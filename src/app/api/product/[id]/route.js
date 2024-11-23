import connectToDatabase from '../../../../../lib/mongodb';
import productModel from '../../../../../models/product';
import mongoose from 'mongoose';

export async function GET(req, {params}) {
    try {
      await connectToDatabase();
      const { id } = params
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        // return res.status(400).json({ error: "Invalid product ID format" });
        return new Response(JSON.stringify({ error:"invalid product ID format" }), { status: 400 });
      }  
  
        const product = await productModel.findById(id);
  
        if (!product){
            // res.status(400).json({error: "this product does not exist"})
            return new Response(JSON.stringify({error: "this product does not exist"}), {status: 404})
            
        } else {
            // res.status(200).json({productDetails: product})
            return new Response(JSON.stringify({product: product}), {status: 200})
  
        }
  } catch (error) {
    // res.status(500).json({ error: "Internal server error", details: error.message });
    return new Response(JSON.stringify({error: "Internal server error", details: error.message}), {status: 500})
  
  }
}


export async function DELETE(req, {params}) {
    try {
        const {id} = params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return new Response(JSON.stringify({error: "invalid product ID format"}), {status: 400})
          }

        // Find and update the document
        const DeletetedProduct = await productModel.findByIdAndDelete(id);     
            
            
          if(!DeletetedProduct){
              return new Response(JSON.stringify({error: "this product does not exist"}), {status: 400})

          } else {
            return new Response(JSON.stringify({message: "product Deleted successfully"}), {status: 200})

          }

        
        
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status: 500})

    }
}

export async function PUT(req, {params}){
    try {
        const {id} = params
        const updates = await req.json();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return new Response(JSON.stringify({error: "invalid product ID format"}), {status: 400})
          }

        // Find and update the document
        const updatedProduct = await productModel.findByIdAndUpdate(id, updates, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation rules are applied
        });     
            
            
          if(!updatedProduct){
              return new Response(JSON.stringify({error: "this product does not exist"}), {status: 400})

          } else {
            // res.status(200).json({message: "product updated successfully",updatedProduct})
            return new Response(JSON.stringify({message: "product updated successfully",updatedProduct}), {status: 200})

          }

        
        
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status: 500})

    }
}