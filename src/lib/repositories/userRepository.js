import DBLocal from 'db-local' 
import bcrypt from 'bcrypt'
import fs from 'fs'
import path from 'path'

// Check db exist
const dbPath = path.resolve(process.cwd(), 'public','db');  
// If doesn't exist create the db
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, '', 'utf8');
}

// initialize DBLocal
const { Schema } = new DBLocal({ path: dbPath });

const User = Schema('User',{
    _id: {type: String, required: true},
    username: {type: String, required: true},
    salt:{type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true}
})

// No dependency injection. constructor. 
export class userRepository {
    static async create ({username, password}){ 
        //Here add any validations
        if (!username || !password) {
            console.log('username or password should not be empty: ' + username + ' - ' + password)
            throw new Error ('username or password should not be empty')
          } 

        //Check user is not already registered 
        const user = await User.findOne({username}) 
        if (user) {
            console.log('user already Exists: ' + username)
            throw new Error ('username already Exists')
        }

        const id = crypto.randomUUID() //if DB generates it (MongoDB), then use them      
                                       //randomUUID may not be good for indexization and performance
        const salt =  await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const role = 'standard'
        const newUser = { _id: id, username, salt, password: hashedPassword, role };
        
          
        // Attempt to save the new user 
        const userCreated = await User.create(newUser).save(); 

        return userCreated._id  
    }

    static login ({username,password}){

    }
}