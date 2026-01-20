import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const serviceAccount = require(path.join(__dirname, '../../serviceAccountKey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export const db = admin.database();
export default admin;