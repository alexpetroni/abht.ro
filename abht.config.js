const path = require('path')

var config = {
  //apiUrl: 'http://localhost:3030/api',
  apiUrl: 'http://lucrari.abht.ro:8080/api',
  uploadDir: './uploads',
  images: {
    resize: [
      { name: 'thumb', size: [175, 175], crop: true },
      { name: 'small', size: [350, null] },
      { name: 'medium', size: [600, null] },
      { name: 'large', size: [1024, null] },
    ]
  },

  chart: {

     colors: {
      red:  '255, 99, 132' ,
      blue: '54, 162, 235',
      yellow: '255, 206, 86',
      green:  '75, 192, 192',
      purple: '153, 102, 255',
      orange: '255, 159, 64',
    },

    bgTranspareny: 0.5,
    borderTransparency: 1
  }
}

module.exports = config
