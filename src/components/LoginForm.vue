<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" required placeholder="email" v-model="email" />
    <input type="password" required placeholder="password" v-model="password" />
    <button>Log in</button>
    <div class="error" v-if="error">
      {{ error }}
    </div>
    <teleport to="body">
      <spinner v-if="loading"></spinner>
    </teleport>
  </form>
</template>

<script>
import { ref } from "vue";
import useLogin from "../composables/useLogin";

export default {
  setup(props, context) {
    const email = ref("");
    const password = ref("");
    const loading = ref(false);

    const { error, login } = useLogin();
    const handleSubmit = async () => {
      loading.value = true;
      await login(email.value, password.value);
      if (!error.value) {
        context.emit("login");
      } else {
        console.log(error.value);
      }
      loading.value = false;
    };
    return { email, password, handleSubmit, error, loading };
  },
};
</script>
