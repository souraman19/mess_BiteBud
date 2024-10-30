import mongoose from "mongoose";
import MenuItem from "./MenuItem.js";

const messMenuPerSlotSchema = new mongoose.Schema({
    menuId:{
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        unique: true,
        required: true,
    },
    slot:{
        type: String,
        enum: ["Breakfast", "Lunch", "Snacks", "Dinner"],
        required: true,
    },
    menuItems:{
        type:[{
            title: {type: String, required: true},
            menuItemId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'MenuItem'}
        }],
        default: []
    },
    averageRating:{  //update it as you need
        type: Number,
        default: 0
    }
}, {timestamps: true})

/*

// Method to calculate the average rating
messMenuPerSlotSchema.methods.calculateAverageRating = async function () {
    try {
        // Get the IDs of all menu items in this slot
        const menuItemIds = this.menuItems.map(item => item.menuItemId);

        // Fetch all ratings for the menu items in this slot
        const ratings = await MenuItemRatingBucket.find({ itemId: { $in: menuItemIds } });

        // Flatten ratings and calculate the average
        const allRatings = ratings.flatMap(bucket => bucket.ratings.map(r => r.rating));

        if (allRatings.length > 0) {
            const total = allRatings.reduce((acc, rating) => acc + rating, 0);
            this.averageRating = total / allRatings.length;
        } else {
            this.averageRating = 0; // No ratings available
        }

        // Save the updated average rating
        await this.save();
    } catch (error) {
        console.error("Error calculating average rating:", error);
    }
};

*/

const MessMenuPerSlot = new mongoose.model('MessMenuPerSlot', messMenuPerSlotSchema);
export default MessMenuPerSlot;