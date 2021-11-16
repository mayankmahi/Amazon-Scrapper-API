const express = require('express')
// to make api req
const request = require('request-promise')

// Initialize an Application
const app = express()
// create port
const PORT = process.env.PORT || 5000

const generateScrapperUrl = apiKey =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

// allow application to parse JSON input
app.use(express.json())

// Create routes
app.get('/', (req, res) => {
  res.send('Welcome to Amozon Scrapper API')
})

// Get product details
app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params
  const { api_key } = req.query
  try {
    const response = await request(
      `${generateScrapperUrl(
        api_key
      )}&url=https://www.amazon.com/dp/${productId}`
    )
    res.json(JSON.parse(response))
    console.log(response)
  } catch (error) {
    res.json(error)
  }
})

// get products reviews
app.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params
  const { api_key } = req.query

  try {
    const response = await request(
      `${generateScrapperUrl(
        api_key
      )}&url=https://www.amazon.com/product-reviews/${productId}`
    )
    res.json(JSON.parse(response))
  } catch (error) {
    res.json(error)
  }
})
// get products offers
app.get('/products/:productId/offers', async (req, res) => {
  const { productId } = req.params
  const { api_key } = req.query

  try {
    const response = await request(
      `${generateScrapperUrl(
        api_key
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    )
    res.json(JSON.parse(response))
  } catch (error) {
    res.json(error)
  }
})

// get search Results
app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params
  const { api_key } = req.query

  try {
    const response = await request(
      `${generateScrapperUrl(
        api_key
      )}&url=https://www.amazon.com/s?k=${searchQuery}`
    )
    res.json(JSON.parse(response))
  } catch (error) {
    res.json(error)
  }
})

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
