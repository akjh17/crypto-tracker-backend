const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cryptoRoutes = require("./routes/cryptoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/crypto", cryptoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
