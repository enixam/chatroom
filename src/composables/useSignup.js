import { ref } from "vue"
import { auth } from "../firebase/config"

const error = ref(null)
const signup = async (email, password, name) => {
    error.value = null
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password)
        if (!res) {
            throw Error("Could not complete the signup.")
        }
        await res.user.updateProfile({
            displayName: name
        })
        error.value = null
        return { res }
    } catch (err) {
        error.value = err.message
    }
}

const useSignup = () => {
    return { error, signup }
}

export default useSignup