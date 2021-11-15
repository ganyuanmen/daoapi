const path = require('path');
const webpack = require('webpack'); 
module.exports = { 
    entry:{
        app:__dirname+'/src/index.js',
    },
    output:{
        path: path.resolve(__dirname, './dist'),
        filename:'daoApi.js'   
    }
};