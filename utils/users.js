// /utils/users.js
import fs from 'fs';
import path from 'path'; 
import bcrypt from 'bcrypt'; 
import {stringify } from 'csv-stringify/sync';
import csvParser from 'csv-parser'; 

const usersFilePath = path.join(process.cwd(), 'public','db','User.json'); 

//// READ user from db User.json
export const getUsers = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const users = JSON.parse(data);
          resolve(users);
        } catch (parseError) {
          reject(parseError);
        }
      }
    });
  });
};

// Add User to CSV File
export const addUser = async (username, password, role) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = { username, salt, password: hashedPassword, role };

  return new Promise((resolve, reject) => {
    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          // Si el archivo no existe, crear uno nuevo
          const users = [newUser];
          fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf-8', (writeErr) => {
            if (writeErr) {
              reject(writeErr);
            } else {
              resolve();
            }
          });
        } else {
          reject(err);
        }
      } else {
        try {
          const users = JSON.parse(data);
          users.push(newUser);
          fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf-8', (writeErr) => {
            if (writeErr) {
              reject(writeErr);
            } else {
              resolve();
            }
          });
        } catch (parseError) {
          reject(parseError);
        }
      }
    });
  });
};
