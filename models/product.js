const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
        product_name:{
            type:String,
            required: true
        },
        model:{
            type:String,
            required:true
        },
        average_ating: {
            type: Number,
            default: 0,
          },
        num_of_eviews: {
            type: Number,
            default: 0,
          },
        free_delivery: Boolean,
        featured: Boolean,
        description : String,
        price: Number,
        images: [String],
        promo_price: String,
        specifications: {
            internal_storage: String,
            ram: String,
            battery: String,
            battery_health: String,
            condition: String,
            second_condition: [String],
            colors: [String],
            card_slot: Boolean,
            selfie_camera: String,
            main_camera: String,
            sim: String,
            exchangeable: Boolean,
            screen_size: String,
            display_type: String

        }
},

{
    timestamps: true
}
)

const productModel = mongoose.models.product || mongoose.model('product', productSchema);

module.exports = productModel;