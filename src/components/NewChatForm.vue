<template>
  <form v-if="!inputDisabled">
    <textarea
      placeholder="Write a message and hit enter to send ..."
      v-model="message"
      @keypress.enter.prevent="handleSubmit"
    >
    </textarea>
    <div class="error">
      {{ error }}
    </div>
  </form>
  <dot v-else></dot>
</template>

<script>
import { ref } from "vue";
import { timestamp } from "../firebase/config";
import getUser from "../composables/getUser";
import useCollection from "../composables/useCollection";

export default {
  setup() {
    const message = ref("");
    const inputDisabled = ref(false);
    let tempMessage = "";
    const { user } = getUser();
    const { error, addDoc } = useCollection("messages");
    const handleSubmit = async () => {
      tempMessage = message.value;
      inputDisabled.value = true;
      const chat = {
        name: user.value.displayName,
        message: message.value,
        createdAt: timestamp(),
      };
      message.value = "";
      await addDoc(chat);
      if (error.value) {
        message.value = tempMessage;
      }
      tempMessage = "";

      inputDisabled.value = false;
    };
    return { message, handleSubmit, error, inputDisabled };
  },
};
</script>

<style scoped>
form {
  margin: 10px;
}

textarea {
  outline: none;
  resize: none;
  width: 100%;
  max-width: 100%;
  margin-bottom: 6px;
  padding: 10px;
  border: none;
  border-radius: 20px;
  font-family: var(--main-font);
  font-size: 1rem;
  transition: 180ms box-shadow ease-in-out;
  background-color: #f4f4f4;
  transition: all 0.2s ease-in;
}

textarea:focus {
  box-shadow: 0 0 0 3px hsla(189, 100%, 57%, 0.795);
  outline: 3px solid transparent;
}
</style>
