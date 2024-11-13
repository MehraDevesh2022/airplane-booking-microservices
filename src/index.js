const express = require("express");
const app = express();
const { serverConfig } = require("./config");
const apiRoutes = require("./routers")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);
app.listen(serverConfig.PORT, () => {
    console.log(`Server is running on PORT : ${serverConfig.PORT}`);


})




