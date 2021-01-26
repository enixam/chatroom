<template>
  <div class="container">
    <nav-bar></nav-bar>
    <chat-window></chat-window>
    <new-chat></new-chat>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import NewChatRoom from "../components/NewChatForm.vue";
import ChatWindow from "../components/ChatWindow.vue";

export default {
  components: {
    "nav-bar": NavBar,
    "chat-window": ChatWindow,
    "new-chat": NewChatRoom,
  },
};
</script>

<style></style>
