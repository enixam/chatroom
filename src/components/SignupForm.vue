<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" required placeholder="display name" v-model="name" />
    <input type="email" required placeholder="email" v-model="email" />
    <input type="password" required placeholder="password" v-model="password" />
    <div class="error" v-if="error">
      {{ error }}
    </div>
    <button>Sign up</button>
  </form>
  <teleport to="body">
    <spinner v-if="loading"></spinner>
  </teleport>
</template>

<script>
import { ref } from "vue";
import useSignup from "../composables/useSignup";

export default {
  setup(props, context) {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const loading = ref(false);

    const { error, signup } = useSignup();
    const handleSubmit = async () => {
      loading.value = true;
      await signup(email.value, password.value, name.value);
      if (!error.value) {
        context.emit("signup");
      } else if (
        error.value ===
        "The email address is already in use by another account."
      ) {
        email.value = "";
        password.value = "";
      } else if (error.value === "Password should be at least 6 characters") {
        password.value = "";
      }
      loading.value = false;
    };

    return { name, email, password, handleSubmit, error, loading };
  },
};
</script>
