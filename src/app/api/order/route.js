import connectToDatabase from '../../../../lib/mongodb';
import ordertModel from '../../../../models/order';
import mongoose from 'mongoose';

export async function GET(req) {
  try {
    await connectToDatabase();
   
      const order = await ordertModel.find({})
    
    return new Response(JSON.stringify(order), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}