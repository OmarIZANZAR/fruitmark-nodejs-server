const mongoose = require('mongoose')
const { DB_URI } = require('./env.js')

const connOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const ConnectDB = async () => {
    return new Promise(async (resolve, reject)=>{
        try {
            const conn = await mongoose.connect(process.env.MONGODB_URI, connOptions)
            console.log(`mongodb connected to db: ${conn.connection.name}...`)
            resolve(conn)
    
        } catch (error) {
            console.log('mongodb connection error')
            console.error(error)
            process.exit(1)
            reject(error)
        }
    })
} 

module.exports = ConnectDB