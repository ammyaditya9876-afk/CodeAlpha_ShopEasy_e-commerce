import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

admin.initializeApp({
  projectId: 'shopeasy-e-commerce-64eb7',
});

export default admin;
