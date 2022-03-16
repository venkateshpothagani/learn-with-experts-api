import mongoose from "mongoose";

const dbConnect = (URI: string) => {
  return (() => {
    mongoose
      .connect(URI)
      .then((response) => {
        console.log("=========Successfully connected to ===========");
        console.log(`Connected to "${response.connection.name}"`);
        console.log("==============================================");
      })
      .catch((error) => {
        console.log("=======Failed to connect DB=======");
        console.log(error.message);
        console.log("==================================");
      });
  })();
};

export default dbConnect;
