export const mysql = require('serverless-mysql')({
  config: {
    host: 'us-cdbr-east-02.cleardb.com',
    database: 'heroku_c96e248066e8d6a',
    user: 'b2982d2a9ead65',
    password: '845d7be3'
  }
})