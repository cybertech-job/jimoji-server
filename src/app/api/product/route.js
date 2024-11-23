import connectToDatabase from '../../../../lib/mongodb';
import productModel from '../../../../models/product';
import mongoose from 'mongoose';

export async function GET(req) {
  try {
    await connectToDatabase();
   
      const products = await productModel.find({})
    
    return new Response(JSON.stringify(products), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(req){
  try {
    
    const productData = await req.json();

    if(productData?.product_name === '' || productData?.model === '') {
      return new Response(JSON.stringify({error: "please product name and model must not be empty"}), {status: 403})
    } else {
        const newProduct = new productModel(productData);

        const savedProduct = await newProduct.save()


        return new Response(JSON.stringify({message: "product added successfully", savedProduct}), {status: 200})
    }

    

} catch (error) {
return new Response(JSON.stringify({error: error.message}), {status: 500})

}
}


