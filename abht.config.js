const path = require('path')

var config = {
  apiUrl: '//localhost:3030/api',
  uploadDir: './uploads',
  images: {
    resize: [
      { name: 'thumb', size: [175, 175], crop: true },
      { name: 'small', size: [350, null] },
      { name: 'medium', size: [600, null] },
      { name: 'large', size: [1024, null] },
    ]
  }
}

module.exports = config
