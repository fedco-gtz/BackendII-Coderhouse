import mongoose from "mongoose";

mongoose.connect("mongodb+srv://gutierrezfedericog:ZGu2Q70OsMrmWJL9@cluster0.yex3ufx.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Base de datos conectada correctamente"))
    .catch((error) => console.log("Hay algun error", error))