import { createRouter, createWebHashHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import ChatRoom from '../views/ChatRoom.vue'
import { auth } from "../firebase/config"

// users can only enter the chatroom after logging in
const chatGuard = (to, from, next) => {
  let user = auth.currentUser
  if (user) {
    next()
  } else next({ name: "welcome" })
}
// redirect from the welcome page to chatroom for users who have logged in
const welcomeGuard = (to, from, next) => {
  let user = auth.currentUser
  if (user) {
    next({ name: "chatroom" })
  } else next()
}



const routes = [
  {
    path: "/",
    name: "welcome",
    component: Welcome,
    beforeEnter: welcomeGuard
  },
  {
    path: "/chat",
    name: "chatroom",
    component: ChatRoom,
    beforeEnter: chatGuard
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
