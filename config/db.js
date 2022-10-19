const mongooes = require('mongoose');
const connectDB = async() =>{
    const conn = await mongooes.connect(process.env.MONGO_URI,{
        // useNewUrlParser :true,
        // useCreateIndex: true,
        // useFindAndModify:false
    });
    console.log(`connected ${conn.connection.host}`);
    // console.log(`this is ${process.env.MONGO_URI}`);
}
module.exports = connectDB;