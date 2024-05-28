
const express = require('express');
const app = express();
const routes = require('./src/routes/index');

const PORT = process.env.PORT || 3000;

app.use('/', routes);

// Start the servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`);
});
