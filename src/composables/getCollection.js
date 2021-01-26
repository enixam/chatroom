// currently not in use
// need to figure out how to make this composable compatible with loading sign
import { ref } from "vue"
import { db } from "../firebase/config"

const getCollection = (collection) => {
    const documents = ref(null)
    const error = ref(null)
    let collectionRef = db.collection(collection)
        .orderBy("createdAt")
    collectionRef.onSnapshot(snap => {
        let results = []
        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push({
                ...doc.data(), id: doc.id
            })
        })
        documents.value = results
        error.value = null
    }, (err) => {
        error.value = err.message
        documents.value = null
    })

    return { documents, error }
}

export default getCollection