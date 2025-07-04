const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const favoritesRoutes = require('./routes/favorites');

const app = express();
app.use(cors()); // Adjust origin in production
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoritesRoutes);

app.listen(4000, '0.0.0.0', () => {
  console.log("API running on port 4000");
});
