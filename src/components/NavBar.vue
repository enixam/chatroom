<template>
  <nav v-if="user">
    <div>
      <p class="name">
        I am
        <span class="display-name">{{ user.displayName }}</span>
      </p>
      <p class="email">logged in as {{ user.email }}</p>
    </div>
    <button @click="handleClick">Logout</button>
    <div class="error" v-if="error">{{ error }}</div>
  </nav>
</template>

<script>
import useLogout from "../composables/useLogout";
import getUser from "../composables/getUser";
import { watch, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const editName = ref(false);
    const { error, logout } = useLogout();
    const { user } = getUser();
    const router = useRouter();

    const handleClick = async () => {
      await logout();
    };

    watch(user, () => {
      if (!user.value) {
        router.push({ name: "welcome" });
      }
    });
    return { handleClick, user, error };
  },
};
</script>

<style scoped>
nav {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav p {
  margin: 2px auto;
  font-size: 16px;
  color: #444;
}
nav p.email {
  font-size: 14px;
  color: #999;
}

.display-name {
  transition: all 0.1s ease-in;
}

.display-name:hover {
  font-weight: bold;
}
</style>
