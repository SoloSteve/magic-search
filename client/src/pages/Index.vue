<template>
  <q-page class="flex flex-center column">
    <div id="selection-section">
      <q-btn rounded push size="xl" color="red" label="Victim" :icon="targetIcon"
             @click="targetIdSelector=true"
      />
      <q-btn rounded push size="xl" color="blue" label="Mastermind" :icon="mastermindIcon"
             @click="mastermindIdSelector=true"
      />
    </div>

    <!--  Dialog for connecting to mastermind  -->
    <q-dialog v-model="targetIdSelector" @hide="connectionError=false">
      <q-card style="width: 350px">
        <q-card-section>
          <div class="text-h6">Mastermind PIN</div>
        </q-card-section>
        <q-card-section class="q-pt-none flex flex-center">
          <q-input
            class="connection-id content-center"
            autofocus
            type="tel"
            maxlength="7"
            mask="#-#-#-#"
            v-model="pinValue"
            prefix="#"
            :error="connectionError"
            error-message="No mastermind with that PIN"
          />
        </q-card-section>
        <q-card-actions align="center" class="text-primary" vertical>
          <q-btn :loading="loading" :disable="loading" @click="connectToSession" flat class="full-width">
            Connect
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left"/>
              Connecting...
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!--  Dialog for creating session  -->
    <q-dialog v-model="mastermindIdSelector" @hide="connectionError=false">
      <q-card style="width: 350px">
        <q-card-section>
          <div class="text-h6">Create Unique Pin</div>
        </q-card-section>
        <q-card-section class="q-pt-none flex flex-center">
          <q-input
            class="connection-id content-center"
            autofocus
            type="tel"
            maxlength="7"
            mask="#-#-#-#"
            v-model="pinValue"
            prefix="#"
            :error="connectionError"
            error-message="That PIN is taken, chose another"
          />
        </q-card-section>
        <q-card-actions align="center" class="text-primary" vertical>
          <q-btn :loading="loading" :disable="loading" @click="createSession" flat class="full-width">
            Create Session
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left"/>
              Creating...
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!--  Dialog for waiting for victim to connect  -->
    <q-dialog v-model="waitingForVictim" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Waiting for victim to connect</div>
        </q-card-section>
        <q-card-section class="flex flex-center" style="justify-content: space-evenly">
          <q-spinner-radio size="3em"/>
          Magic in progress...
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat label="Cancel" color="primary" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!--  Dialog for text search  -->
    <q-dialog v-model="executeSearchModal" persistent>
      <q-card style="">
        <q-card-section>
          <div class="text-h6 text-center">Execute Google Image Search</div>
        </q-card-section>
        <q-card-section class="q-pt-none flex flex-center">
          <q-input
            square
            outlined
            autofocus
            filled
            autogrow
            label="Google Image Search"
            class="search-input"
            v-model="searchValue"
          />
        </q-card-section>
        <q-card-actions align="center" class="text-primary" vertical>
          <q-btn @click="sendSearch" flat class="full-width">
            Send Search To Victim
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!--  Dialog for dark modal  -->
    <q-dialog
      v-model="darkenModal"
      persistent
      :maximized="true"
    >
      <div style="background-color: black"/>
    </q-dialog>
  </q-page>
</template>

<script>
import io from "socket.io-client";

import targetIcon from "../assets/victim.svg";
import mastermindIcon from "../assets/mastermind.svg";

export default {
  name: 'PageIndex',
  data() {
    return {
      targetIcon: null, // Created at runtime
      mastermindIcon: null, // Created at runtime

      targetIdSelector: false,
      mastermindIdSelector: false,
      waitingForVictim: false,
      executeSearchModal: false,
      darkenModal: false,

      pinValue: "",
      searchValue: "",
      connectionError: false,
      loading: false,

      socket: null
    };
  },
  methods: {
    async darken() {
      await this.$q.fullscreen.request();
      this.darkenModal = true;
    },
    search(text) {
      // Can this cause some sort of exploit?
      window.location.replace(`https://google.com/search?q=${text.replaceAll(" ", "+")}&tbm=isch`);
    },
    clear() {
      this.loading = false;
      this.connectionError = false;
    },
    createSession() {
      this.loading = true;
      this.socket.emit("make-session", {sessionId: this.pinValue});
      this.socket.once("session-created", () => {
        this.loading = false;
        this.mastermindIdSelector = false;
        this.waitingForVictim = true;
        this.socket.once("session-joined", () => {
          this.waitingForVictim = false;
          this.executeSearchModal = true;
        })
      });
    },
    connectToSession() {
      this.loading = true;
      this.socket.emit("connect-to-session", {sessionId: this.pinValue});
      this.socket.once("session-joined", () => {
        this.loading = false;
        this.targetIdSelector = false;
        this.darken().catch(()=>console.error);
      });
    },
    sendSearch() {
      this.socket.emit("send-search", {text: this.searchValue});
      location.reload();
    }
  },
  created() {
    this.targetIcon = `img:${targetIcon}`;
    this.mastermindIcon = `img:${mastermindIcon}`;
  },
  mounted() {
    this.socket = io("/");

    this.socket.on("session-exists", () => {
      this.connectionError = true;
      this.loading = false;
    });

    this.socket.on("session-taken", () => {
      this.connectionError = true;
      this.loading = false;
    })

    this.socket.once("execute-search", (text) => {
      console.log("Executing search", text);
      this.search(text);
    })
  },
  destroyed() {
    this.socket.disconnect();
  }
}
</script>
<style>
#selection-section {
  position: absolute;
  top: 17%;

  height: 60%;
  width: 100%;

  padding: 0 10%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.connection-id {
  font-size: 48px;
}

input {
  text-align: center;
}

.search-input {
  width: 90%;
  font-size: medium;
}
</style>
