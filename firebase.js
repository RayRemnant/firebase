const { initializeApp /* firestore */ } = require("firebase/app");

const firestore = require("firebase/firestore/lite");

const firebaseConfig = {
	apiKey: process.env.apiKey,
	authDomain: process.env.authDomain,
	projectId: process.env.projectId,
	storageBucket: process.env.storageBucket,
	messagingSenderId: process.env.messagingSenderId,
	appId: process.env.appId,
};

// Get a reference to Firestore
const app = initializeApp(firebaseConfig);
const db = firestore.getFirestore(app);

// Get single doc
async function getDoc(collectionName, docId) {
	const docRef = firestore.doc(db, collectionName, docId);
	const docSnap = await firestore.getDoc(docRef);

	if (docSnap.exists()) {
		console.log(docSnap.data());

		console.log("GET DOC OK");
		return docSnap.data();
	} else {
		// docSnap.data() will be undefined in this case
		console.log("No such document!");
		return {};
	}
}

// Get multiple docs
async function getDocs(collectionName) {
	const collectionData = firestore.collection(db, collectionName);
	const collectionSnapshot = await firestore.getDocs(collectionData);
	const docs = collectionSnapshot.docs.map((_doc) => _doc.data());
	return docs;
}

// Set single doc
async function setDoc(collectionName, doc) {
	try {
		await firestore.setDoc(firestore.doc(db, collectionName, doc.id), {
			...doc,
			updated: firestore.serverTimestamp(),
		});

		console.log("DOC WRITE OK");
	} catch (error) {
		console.error("DOC WRITE ERROR: ", error);
	}
}

// Set multiple docs
async function setDocs(collectionName, docs) {
	//consider integrating batch for more efficient operation
	//var batch = db.batch();
	//batch.commit();

	for (const doc of docs) {
		await setDoc(collectionName, doc);
	}
}

module.exports = { getDoc, getDocs, setDoc, setDocs };
