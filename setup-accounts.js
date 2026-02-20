// Setup script to create test accounts
// Run this with: node setup-accounts.js

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBRQgcZiyD9o4vVzOrGBWsEz8_mQ1e4ssk',
  authDomain: 'food-a-18243.firebaseapp.com',
  databaseURL: 'https://food-a-18243-default-rtdb.firebaseio.com',
  projectId: 'food-a-18243',
  storageBucket: 'food-a-18243.appspot.com',
  messagingSenderId: '214825260236',
  appId: '1:214825260236:web:5d8d39ed7ba84e2d845e69',
  measurementId: 'G-TYR489GRSH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const accounts = [
  { email: 'user@test.com', password: 'user123456', role: 'user' },
  { email: 'admin@test.com', password: 'admin123456', role: 'admin' }
];

async function createAccounts() {
  console.log('🚀 Starting account creation...\n');

  for (const account of accounts) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        account.email,
        account.password
      );
      console.log(`✅ Successfully created ${account.role} account:`);
      console.log(`   Email: ${account.email}`);
      console.log(`   Password: ${account.password}`);
      console.log(`   UID: ${userCredential.user.uid}\n`);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log(`ℹ️  Account already exists: ${account.email}\n`);
      } else {
        console.error(`❌ Error creating ${account.email}:`, error.message, '\n');
      }
    }
  }

  console.log('✨ Account setup complete!');
  console.log('\nYou can now sign in with:');
  console.log('  User: user@test.com / user123456');
  console.log('  Admin: admin@test.com / admin123456');
  
  process.exit(0);
}

createAccounts();
