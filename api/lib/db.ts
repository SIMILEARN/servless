export const mysql = require('serverless-mysql')({
  config: {
    //host: 'us-cdbr-east-02.cleardb.com',
    //database: 'heroku_c96e248066e8d6a',
    //user: 'b2982d2a9ead65',
    //password: '845d7be3'
    

    Host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'local'

  }
})

//GRANT ALL PRIVILEGES ON heroku_c96e248066e8d6a.* TO 'b2982d2a9ead65'@'us-cdbr-east-02.cleardb.com' IDENTIFIED BY '845d7be3';


//mysql://b2982d2a9ead65:845d7be3@us-cdbr-east-02.cleardb.com/heroku_c96e248066e8d6a?