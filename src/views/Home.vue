<template>
  <v-container grid-list-xs >
    <v-layout row wrap>
      <v-flex xs8 class="pr-4">
        <v-card color="navy">
          <v-carousel v-model="model">
            <v-carousel-item
              v-for="(product, i) in products"
              :key="i"
              :src="product.src"
              height="200"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
        </v-card>
      </v-flex>
      <v-flex>
        <v-layout column justify-space-between fill-height>
          <v-card dark class="mx-auto" width="350">
            <v-img id="comingSoon" height="180"></v-img>
            <v-card-actions>
              <v-btn text color="purple accent-4">
                Coming Soon
              </v-btn>
            </v-card-actions>
          </v-card>
          <br />
          <v-card dark class="mx-auto" width="350">
            <v-img id="daily" height="180"></v-img>
            <v-card-actions>
              <v-btn text color="purple accent-4">
                Daily offer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-layout>
      </v-flex>
      <v-flex>
        <v-sheet dark color="rgb(0, 0, 0, 0.2)">
          <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
            <v-slide-item sm3 ma-1 v-for="item in menuItems" :key="item">
              <v-card width="200" class="ma-4">
                <v-img contain :src="item.image" height="200" class="mt-0">
                </v-img>

                <br />
                <h4 class="mb-0 ml-4">{{ item.name }}</h4>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { dbMenuAdd } from "../../firebase";
export default {
  data: () => ({
    basketDump: [],
    menuItems: [],
    name: "",
    description: "",
    price: "",
    image: null,
    category: [],
    genre: [],
    chips: [],
    selects: [
      "Action",
      "Adventure",
      "Battle Royal",
      "Educational",
      "Fighting",
      "FPS",
      "Horror",
      "Multiplayer",
      "Open World",
      "Party",
      "Racing",
      "RGP",
      "Rhythm",
      "Shooting",
      "Simulation",
      "Sport",
      "Survival",
      "Trivia",
    ],
    products: [
      {
        src: "https://i.ytimg.com/vi/E7Ncl_QgTfc/maxresdefault.jpg",
      },

      {
        src:
          "https://images.prismic.io/prisjakt/fda7629f-1184-499a-8b23-fc241e256320_sony-playstation-5-1.jpg?auto=compress,format",
      },
      {
        src:
          "https://storage.tweak.dk/spil/Her_er_prisen_p%C3%A5_Xbox_Series_X_og_Series_X/Xbox-Series-X-og-Series-S-pris-og-tilg%C3%A6ngelighed.jpg",
      },
    ],
  }),
  created() {
    dbMenuAdd.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        var menuItemData = doc.data();
        this.menuItems.push({
          id: doc.id,
          name: menuItemData.name,
          description: menuItemData.description,
          price: menuItemData.price,
          image: menuItemData.image,
        });
      });
    });
  },
};
</script>

<style lang="scss">
.info_box .flex h1 {
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
  text-align: center;
}
.info_box .flex div {
  background-color: white;
  padding: 20px;
}

.layout:first-child {
  height: 40vh;
}

.layout:last-child {
  height: 40vh;
}

#daily {
  background-image: url("https://upload.wikimedia.org/wikipedia/en/1/1f/Animal_Crossing_New_Horizons.jpg");
  background-size: cover;
}

#comingSoon {
  background-image: url("https://upload.wikimedia.org/wikipedia/en/8/88/Godfall_cover_art.jpg");
  background-size: cover;
}
</style>
