import mongoose from "mongoose";

export const connectDb = async () => {
    return await mongoose.connect('mongodb+srv://suhailka744:iu5Y0TI23BEpLQSF@text-pro-db.orzgsof.mongodb.net/?retryWrites=true&w=majority&appName=text-pro-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
}