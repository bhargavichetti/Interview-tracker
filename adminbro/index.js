const express = require('express');
const {default : AdminBro} = require('admin-bro');
const mongoose = require('mongoose');
const buildAdminRouter = require('./admin.router');
const options = require('./admin.options');
const app = express();
//const port = 'http://localhost:3000';
const url = 'mongodb+srv://Bhargavi:test1234@cluster0.b73md.mongodb.net/node-auth';

const run = async (MongooseDb) => {
    const mongooseDb = await mongoose.connect(url, {
        useNewUrlParser : true, 
        useUnifiedTopology : true
    })
    const admin = new AdminBro({
        databases : [mongooseDb],
        //rootPath: 'http://localhost:3000/admin',
    });
    console.log(MongooseDb);
    //const admin = new AdminBro(options)
    const router = buildAdminRouter(admin);
    app.use(admin.rootPath, router);
    app.use(port, router);
    // app.listen(port, () => {
    //     console.log(`App listening at http://localhost:${port}`)
    // });
};

module.exports = run;