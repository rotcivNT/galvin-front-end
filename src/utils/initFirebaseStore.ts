import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';

import { fireBaseConfig } from '~/configs/configs';

// Initialize Firebase
const app = initializeApp(fireBaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
