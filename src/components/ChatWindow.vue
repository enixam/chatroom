<template>
  <div class="chat-window">
    <div v-if="error">{{ error }}</div>
    <spinner v-if="loading"></spinner>
    <div class="messages" v-if="documents" ref="messages">
      <div
        class="singleMessage"
        v-for="doc in formattedDocuments"
        :key="doc.id"
      >
        <div class="messageInfo">
          <span class="name">{{ doc.name }}</span>
          <span class="created-at">{{ doc.createdAt }}</span>
        </div>
        <div class="messageContent">
          <span class="message">{{ doc.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import getCollection from "../composables/getCollection";
import { ref, computed, onUpdated, watchEffect } from "vue";
import { db } from "../firebase/config";
import { formatDistanceToNow } from "date-fns";

export default {
  setup() {
    const messages = ref(null);
    const documents = ref(null);
    const error = ref(null);
    const loading = ref(true);
    let collectionRef = db.collection("messages").orderBy("createdAt");
    // update messages when the collection changes
    const unsub = collectionRef.onSnapshot(
      (snap) => {
        let results = [];
        snap.docs.forEach((doc) => {
          doc.data().createdAt &&
            results.push({
              ...doc.data(),
              id: doc.id,
            });
        });
        if (!results) {
          error.value =
            "could not fetch the data, this is most likely due to a network problem.";
        } else {
          documents.value = results;
          error.value = null;
        }
        loading.value = false;
      },
      (err) => {
        error.value = err.message;
        documents.value = null;
        loading.value = false;
      }
    );
    const formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.map((doc) => {
          return {
            ...doc,
            createdAt: formatDistanceToNow(doc.createdAt.toDate()),
          };
        });
      }
    });

    onUpdated(() => {
      if (messages.value) {
        messages.value.scrollTop = messages.value.scrollHeight;
      }
    });
    watchEffect((onInvalidate) => {
      // unsubscribe from previous snapshop when component unmounted
      onInvalidate(() => unsub());
    });

    return { formattedDocuments, documents, error, loading };
  },
};
</script>

<style scoped>
.chat-window {
  background: #fafafa;
  padding: 30px 20px;
}

.messages {
  max-height: 400px;
  overflow: auto;
}

.singleMessage {
  margin: 18px 0;
}
.created-at {
  color: #999;
  font-size: 12px;
  margin-bottom: 4px;
}
.name {
  font-weight: bold;
  margin-right: 10px;
}

.messageInfo {
  margin-bottom: 10px;
}

.messageContent {
  display: block;
  font-family: var(--main-font);
}
</style>
