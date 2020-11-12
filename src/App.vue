<template>
  <v-app id="app">
    <navigation />

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Navigation from "@/components/Navigation.vue";

export default {
  components: {
    Navigation,
  },
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
  }),
};
</script>

<style lang="scss">
main {
  background-image: url("./assets/noctis.jpg");
  background-size: cover;
}

.col h1 {
  @include infobox_mixin(
    5px,
    map-get($colorz, white),
    10px,
    5px,
    map-get($colorz, white)
  );
  font-weight: bold;
  text-transform: uppercase;
  font-size: 16px;
  text-align: right;
}

.col:last-child h1 {
  text-align: left;
}

#info {
  background-color: white;
}
</style>