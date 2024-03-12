// Import the functions you need from the SDKs you need
const { initializeApp /* firestore */ } = require("firebase/app");

const firestore = require("firebase/firestore/lite");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

// Get a list of cities from your database
async function getDocs(collectionName) {
  const collectionData = firestore.collection(db, collectionName);
  const collectionSnapshot = await firestore.getDocs(collectionData);
  const docs = collectionSnapshot.docs.map((_doc) => _doc.data());
  return docs;
}

async function setDoc(collectionName, doc) {
  try {
    await firestore.setDoc(firestore.doc(db, collectionName, doc.id), {
      ...doc,
      updated: firestore.serverTimestamp(),
    });

    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
}

async function setDocs(collectionName, docs) {
  //var batch = db.batch();

  for (const doc of docs) {
    await setDoc(collectionName, doc);
  }

  //batch.commit();
}

module.exports = { getDocs, setDoc, setDocs };
