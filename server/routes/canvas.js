const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/canvas-proxy', async (req, res) => {
  const CANVAS_API_TOKEN = process.env.CANVAS_API_TOKEN;
  const CANVAS_DOMAIN = process.env.CANVAS_DOMAIN;

  try {
    const response = await axios({
      method: req.query.method || 'GET',
      url: `${CANVAS_DOMAIN}/api/v1${req.query.path}`,
      headers: {
        'Authorization': `Bearer ${CANVAS_API_TOKEN}`
      }
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data
    });
  }
});

module.exports = router;
