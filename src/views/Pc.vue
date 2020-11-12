<template>
  <v-container grid-list-xs>
    <v-carousel>
      <v-carousel-item
        v-for="(product, i) in products"
        :key="i"
        :src="product.src"
        height="200"
        reverse-transition="fade-transition"
        transition="fade-transition"
        ><v-banner dark>PC</v-banner></v-carousel-item
      >
    </v-carousel>
    <br />
    <v-combobox
      v-model="chips"
      :items="selects"
      dark
      chips
      clearable
      label="Filter"
      multiple
      prepend-icon="mdi-filter-variant"
      solo
    >
      <template v-slot:selection="{ attrs, item, select, selected }">
        <v-chip
          v-bind="attrs"
          :input-value="selected"
          close
          @click="select"
          @click:close="remove(item)"
        >
          <strong>{{ item }}</strong
          >&nbsp;
        </v-chip>
      </template>
    </v-combobox>
    <v-sheet dark color="rgb(0, 0, 0, 0.2)">
      <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
        <v-slide-item sm3 ma-1 v-for="item in menuItems" :key="item">
          <v-card dark width="300" class="ma-4">
            <v-img contain :src="item.image" height="200" class="mt-8"> </v-img>

            <v-card primary-title>
              <br />
              <h3 class="headline mb-0 ml-4">{{ item.name }}</h3>
              <h4 class="headline mb-0 ml-4">{{ item.price }} DKK</h4>

              <v-btn class="add" small text @click="addToBasket(item)"
                >add</v-btn
              >
            </v-card>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
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
        src:
          "https://gameranx.com/wp-content/uploads/2020/07/halo-infinite-art.jpg",
      },
      {
        src:
          "https://i1.wp.com/www.ivlogyt.com/wp-content/uploads/2020/09/Gotham-Knights-are-Coming-to-PlayStation-Xbox-and-PC-in-2021.jpg",
      },
      {
        src:
          "https://d28ipuewd7cdcq.cloudfront.net/assets/article/2020/07/23/hello-neighbor-2_feature.jpg",
      },
      {
        src:
          "https://s1.pearlcdn.com/SEA/Upload/News/6e4e140755520180823052533990.jpg",
      },
    ],
  }),

  created() {
    dbMenuAdd
      .where("category", "array-contains-any", ["PC"])
      .get()
      .then((querySnapshot) => {
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
  beforeCreate() {
    this.$store.dispatch("setMenuItems");
  },
  methods: {
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },

    addToBasket(item) {
      // if (this.basket.find((itemInArray) => item.name === itemInArray.name)) {
      //   item = this.basket.find(
      //     (itemInArray) => item.name === itemInArray.name
      //   );
      //   this.increaseQtn(item);
      // } else {
      //   this.basket.push({
      //     name: item.name,
      //     price: item.price,
      //     quantity: 1,
      //   });
      // }
      this.basketDump.push({
        name: item.name,
        price: item.price,
        quantity: 1,
      });
      this.$store.commit("addBasketItems", this.basketDump);
      this.basketDump = [];
    },
    addNewMenuItem() {
      dbMenuAdd.add({
        name: this.name,
        category: this.category,
        genre: this.genre,
        description: this.description,
        price: this.price,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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

.headline {
  font-size: 1.2rem !important;
  font-weight: 300;
  line-height: 2rem;
  letter-spacing: normal !important;
  font-family: "Roboto", sans-serif !important;
}

.add {
  margin-left: 240px;
  margin-bottom: 10px;
}
</style>