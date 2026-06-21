import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "quickshow",
    });

    console.log(" Database Connected Successfully");
  } catch (error) {
    console.error(" Database Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
