const express = require('express')
// to make api req
const request = require('request-promise')

// Initialize an Application
const app = express()
// create port
const PORT = process.env.PORT || 5000

// allow application to parse JSON input
app.use(express.json())

// Create routes
app.get('/', (req, res) => {
  res.send('Welcome to Amozon Scrapper API')
})

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
