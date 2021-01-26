import { ref } from "vue"
import { db } from "../firebase/config"

const useCollection = (collection) => {
    const error = ref(null)
    const addDoc = async (data) => {
        error.value = null
        try {
            await db.collection(collection).add(data)
        } catch (err) {
            error.value = err.message
        }
    }
    return { error, addDoc }
}

export default useCollection