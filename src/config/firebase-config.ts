import getConfig from 'next/config';
import firebase from 'firebase/app';
import 'firebase/database';

const { publicRuntimeConfig } = getConfig();

const firebaseConfig = publicRuntimeConfig.firebaseConfig || {
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	databaseURL: process.env.DB_URL,
	projectId: process.env.PROJECT_ID,
	storageBucket: process.env.STORAGE_BUTCKET,
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID,
	measurementId: process.env.MEASUREMENT_ID
};

try {
	firebase.initializeApp(firebaseConfig);
} catch (err) {
	if (!/already exists/.test(err.message)) {
		console.error('Firebase initialization error', err.stack);
	}
}

const fire = firebase;

export const db = fire.database();
