import mongoose from 'mongoose';

const ProfileSchema=new mongoose.Schema({
    
    gender:{
        type:String,
    },

    dateofBirth:{
type:String,
},

    about:{
            type:String,
        trim:true,
},
    contactNumber:{
        type:String,
        trim:true,
    }
   

})

export default mongoose.model("Profile",ProfileSchema);