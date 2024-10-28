import mongoose from "mongoose";

const workingSlotSchema = new mongoose.Schema({
    start:{
        type: String,
        required: true,
        validate:{
            validator: function(v){
                /^\d{2}:\d{2}$/.test(v);
            },
            message: props => `${props.value} is not a valid time format!`
        }
    },
    end:{
        type: String,
        required: true,
        validate:{
            validator: function(v){
                /^\d{2}:\d{2}$/.test(v);
            },
            message: props => `${props.value} is not a valid time format!`
        }
    },
})

export default workingSlotSchema; //default export //while import use import workingSlotSchema from "";