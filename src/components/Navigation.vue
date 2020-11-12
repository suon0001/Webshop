<template>
  <div>
    <v-navigation-drawer right color="primary" v-model="drawer" app>
      <div v-if="currentUser">
        <v-row justify="space-around">
          <v-avatar class="ma-3" color="purple" justify="center">
            <v-icon dark> mdi-google-controller </v-icon>
          </v-avatar>
        </v-row>
        <h4 class="text-center">{{ currentUser.email }}</h4>
      </div>
      <ul>
        <router-link tag="li" to="/playstation">
          <v-icon color="purple">mdi-sony-playstation</v-icon>Playstation
        </router-link>
        <router-link tag="li" to="/xbox">
          <v-icon color="purple">mdi-microsoft-xbox</v-icon>Xbox
        </router-link>
        <router-link tag="li" to="/nintendo">
          <v-icon color="purple">mdi-nintendo-switch</v-icon>Nintendo
        </router-link>
        <router-link tag="li" to="/pc">
          <v-icon color="purple">mdi-laptop-chromebook</v-icon>PC
        </router-link>
        <router-link tag="li" to="/login">
          <v-icon color="purple">mdi-login</v-icon>Login
        </router-link>
        <router-link tag="li" to="/admin">
          <v-icon color="purple">mdi-lock</v-icon>Admin
        </router-link>
      </ul>
    </v-navigation-drawer>
    <v-app-bar app color="indigo" dark>
      <router-link class="title" to="/home"
        ><h1>Digital Codes For Gamers</h1></router-link
      >
      <v-spacer></v-spacer>
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon text v-bind="attrs" v-on="on">
            <v-badge right overlap color="purple">
              <template v-slot:badge> {{ basket.length }}</template>
              <router-link class="basketIcon" to="/basket"
                ><v-icon> mdi-basket </v-icon></router-link
              >
            </v-badge>
          </v-btn>
        </template>
        <v-card width="300px">
          <v-simple-table id="code-table" v-if="basket.length > 0">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left" style="width: 30%">Quntity</th>
                  <th class="text-left" style="width: 50%">Name of product</th>
                  <th class="text-left" style="width: 20%">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in basket" :key="item.name">
                  <td>
                    {{ item.quantity }}
                  </td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.price }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-menu>

      <v-btn
        m="7"
        color="white"
        text
        @click="signOut()"
        v-on:click="showHid = !showHid"
        v-show="showHid"
        >SignOut</v-btn
      >

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
  </div>
</template>

<script>
/*eslint-disable*/
import { db } from "../../firebase";

import firebase from "firebase";
import "firebase/firestore";
import store from "../store";

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch("setUser", user);
  } else {
    store.dispatch("setUser", null);
  }
});

export default {
  data: () => ({
    drawer: false,
    showHid: false,
  }),
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },

    basket() {
      return this.$store.getters.getBasketItems;
    },
  },
  basketCounter() {
    var basketCounter = 0;
    for (var items in this.basket) {
      var individualItem = this.basket[items];
      basketCounter += individualItem.quantity * individualItem.price;
    }
    return basketCounter;
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Logged Out");
          this.$router.replace("/");
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
nav ul {
  padding: 0;
  margin-top: 20px;
  text-decoration: none;
}

nav li {
  color: map-get($colorz, white);
  margin-left: 15%;
  padding: 5px 20px;
  list-style-type: none;
  cursor: pointer;
}

nav li i {
  margin-right: 10px;
}

nav li:last-child {
  position: absolute;
  bottom: 40px;
}

.title {
  text-decoration: none;
  color: white;
  text-shadow:  -1px -1px 0 #000,  
    1px -1px 0 #000,
    -1px 1px 0 #000,
     1px 1px 0 #000;
}

.basketIcon {
  text-decoration: none;
}
</style>
