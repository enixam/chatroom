<template>
  <div class="welcome container">
    <p id="welcome">welcome</p>
    <div v-if="showLogin">
      <h2>Login</h2>
      <log-in @login="enterChat"></log-in>
      <p>
        No account yet? <span @click="showLogin = false">Sign up</span> instead
      </p>
    </div>
    <div v-else>
      <h2>Sign up</h2>
      <sign-up @signup="enterChat"></sign-up>
      <p>
        Already registerd? <span @click="showLogin = true">Log in</span> instead
      </p>
    </div>
  </div>
</template>

<script>
import SignupForm from "../components/SignupForm.vue";
import LoginForm from "../components/LoginForm.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    "sign-up": SignupForm,
    "log-in": LoginForm,
  },
  setup() {
    const showLogin = ref(true);
    const router = useRouter();
    const enterChat = () => {
      router.push({ name: "chatroom" });
    };

    return { showLogin, enterChat };
  },
};
</script>

<style>
.welcome {
  text-align: center;
  padding: 20px 0;
}
/* form styles */
.welcome form {
  width: 300px;
  margin: 20px auto;
}
.welcome label {
  display: block;
  margin: 20px 0 10px;
}
.welcome input {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #eee;
  outline: none;
  color: #999;
  margin: 10px auto;
}

.welcome span {
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
}

.welcome button {
  margin: 20px auto;
}

#welcome {
  margin-bottom: 1rem;
}
</style>
