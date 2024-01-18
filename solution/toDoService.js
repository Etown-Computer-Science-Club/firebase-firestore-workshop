import { db } from "../firebase";
import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

export async function getToDos() {
	try {
		// Create a reference to the 'todos' collection in Firestore.
		// 'db' is the Firebase Firestore instance, and 'todos' is the name of the collection.
		const collectionRef = collection(db, "todos");

		// Perform a call to get all documents from the 'todos' collection.
		// 'getDocs' fetches the documents based on the reference provided (collectionRef).
		const queryResult = await getDocs(collectionRef);

		// Map over each document snapshot in the query result.
		// 'queryResult.docs' is an array of document snapshots, each representing a document.
		const result = queryResult.docs.map(doc => (
			{
				// Extract and include the document ID in the result.
				// Every document in Firestore has a unique ID, accessible via 'doc.id'.
				id: doc.id,
				// Extract specific fields ('title' and 'completed') from the document data.
				// 'doc.data()' returns the data stored in the document as an object.
				// We're accessing the 'title' and 'completed' properties of this object.
				title: doc.data().title,
				completed: doc.data().completed,
			}
		))

		return result;
	} catch (e) {
		console.error(e);
		return [];
	}
}

export async function addToDo(title, completed) {
	const collectionRef = collection(db, "todos");

	// Adds a new document to the 'todos' collection.
	// The new document contains the 'title' and 'completed' fields.
	const docRef = await addDoc(collectionRef,
		{
			title: title,
			completed: completed,
		}
	);

	// Return an object with the new document's ID and its data.
	// 'docRef.id' provides the automatically generated unique ID for the new document.
	return {
		id: docRef.id,
		title: title,
		completed: completed,
	};
}

export async function updateToDo(id, completed) {
	const collectionRef = collection(db, "todos");

	// Create a reference to a specific document in the 'todos' collection.
	// The specific document is identified by 'id'.
	const docRef = doc(collectionRef, id);

	// Update the 'completed' field of the specified document.
	// Only the 'completed' field is updated; other fields remain unchanged.
	await updateDoc(docRef,
		{
			completed: completed,
		}
	)
}

export async function deleteToDo(id) {
	const collectionRef = collection(db, "todos");

	const docRef = doc(collectionRef, id);

	// Delete the specified document from the Firestore collection.
	await deleteDoc(docRef);
}