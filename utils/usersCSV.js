// /utils/users.js
import fs from 'fs';
import path from 'path'; 
import bcrypt from 'bcrypt'; 
import {stringify } from 'csv-stringify/sync';
import csvParser from 'csv-parser'; 

const usersFilePath = path.join(process.cwd(), 'public', 'users.csv'); 

//// READ user from CSV
export const getUsers = async () => {
  return new Promise((resolve, reject) => {
    const users = [];
    fs.createReadStream(usersFilePath)
      .pipe(csvParser())                                                            
      .on('data', (row) => {
        users.push(row);
      })
      .on('end', () => {
        resolve(users);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

// Add User to CSV File
export const addUser = async (username, password, role) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = { username, salt, password: hashedPassword, role };

  return new Promise((resolve, reject) => {
    try {
      const users = fs.existsSync(usersFilePath)
        ? fs.readFileSync(usersFilePath, 'utf-8')
        : '';
      const newUserString = stringify([newUser], { header: false });
      const data = users ? `${users.trim()}\n${newUserString}` : newUserString;
      //const data = users ? `${users}\n${stringify([newUser], { header: false })}` : stringify([newUser], { header: true });
      fs.writeFileSync(usersFilePath, data, 'utf-8');
      resolve();
    } catch (error) {
      reject(error);
    } 
  });
};
