const mongoose = require('mongoose')

let mongodb_uri = "mongodb://localhost:27017/fruitmark"

if(process.env.NODE_ENV == "production") {
    mongodb_uri = process.env.MONGODB_URI
}

const connOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const ConnectDB = async () => {
    return new Promise(async (resolve, reject)=>{
        try {
            const conn = await mongoose.connect(mongodb_uri, connOptions)
            console.log(`mongodb connected to db: ${conn.connection.name}...`)
            resolve(conn)
    
        } catch (error) {
            console.log('mongodb connection error')
            console.error(error)
            process.exit(1)
        }
    })
} 

module.exports = ConnectDB