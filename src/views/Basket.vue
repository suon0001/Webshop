<template>
  <v-container>
    <v-row>
      <v-col offset-md="1" md="5">
        <h1>Sign Up</h1>
        <div class="pa-2" id="info">
          <v-simple-table id="code-table">
            <template v-slot:default>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                hint="At least 8 characters"
                :rules="[rules.required, rules.min]"
                @click:append="show1 = !show1"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="emailRules"
                label="Comfirm password"
                required
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2"
              ></v-text-field>
              <router-link to=""
                ><v-btn id="checkout" color="navy">Sign up</v-btn></router-link
              >
            </template>
          </v-simple-table>
        </div>
      </v-col>
      <v-col offset-md="1" md="4">
        <h1>Current Basket</h1>
        <div class="pa-2" id="info">
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
                    <v-icon color="navy" @click="increaseQtn(item)"
                      >mdi-plus-circle</v-icon
                    >
                    {{ item.quantity }}
                    <v-icon color="navy" @click="decreaseQtn(item)"
                      >mdi-minus-circle</v-icon
                    >
                  </td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.price }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <v-simple-table v-else>
            <p>The basket is empthy</p>
          </v-simple-table>

          <v-divider></v-divider>
          <v-row id="basket_checkout" class="mt-4" style="margin: 0">
            <v-col>
              <p>Subtotal</p>
              <p>Delivery</p>
              <p>Total amount</p>
            </v-col>
            <v-col class="text-right">
              <p>{{ subTotal }} DKK</p>
              <p>40 DKK</p>
              <p>
                <b>{{ total }} DKK</b>
              </p>
            </v-col>
          </v-row>
          <v-row style="margin: 0">
            <v-spacer></v-spacer>
            <router-link to="/Checkout"
              ><v-btn id="checkout" color="navy">Checkout</v-btn></router-link
            >
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      show2: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      basketDump: [],
      // menuItems: [
      /*  {
          name: "Assassin's Creed Valhalla",
          description:
            "Assassin's Creed Valhalla is an open world action-adventure game, structured around several main story quests and numerous optional side missions.",
          price: 599,
        },
        {
          name: "Pokémon Sword Expansion Pass",
          description:
            "DLC. Explore The Isle of Armor and The Crown Tundra to meet new people and catch new Pokémon!",
          price: 237,
        },
        {
          name: "Ghost of Tsushima",
          description:
            "Ghost of Tsushima is an action-adventure stealth game played from a third-person perspective. Featuring a large open world, there are no waypoints and can be explored without guidance.",
          price: 369,
        },
        {
          name: "The Last of Us Part II",
          description:
            "The Last of Us Part II is an action-adventure game played from a third-person perspective.",
          price: 459,
        },
        {
          name: "Paper Mario: The Origami King",
          description:
            "Paper Mario combines traditional role-playing game (RPG) elements with concepts and features from the Mario series.",
          price: 549,
        }, 
      ],*/
    };
  },

  beforeCreate() {
    this.$store.dispatch("setMenuItems");
  },
  methods: {
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
    increaseQtn(item) {
      item.quantity++;
    },
    decreaseQtn(item) {
      item.quantity--;

      if (item.quantity === 0) {
        this.basket.splice(this.basket.indexOf(item), 1);
      }
    },
  },
  computed: {
    basket() {
      // return this.$store.state.basketItems
      return this.$store.getters.getBasketItems;
    },

    menuItems() {
      return this.$store.getters.getMenuItems;
    },

    subTotal() {
      var subCost = 0;
      for (var items in this.basket) {
        var individualItem = this.basket[items];
        subCost += individualItem.quantity * individualItem.price;
      }
      return subCost;
    },
    total() {
      var shipping = 40;
      var totalCost = this.subTotal;
      return totalCost + shipping;
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
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

tr th {
  font-weight: 300;
}

#td_name {
  font-weight: bold;
}

tr td {
  padding: 10px, 10px, 10px, 16px;
}

#image-file {
  max-width: 10px;
  max-height: 10px;
}

#code_item_description {
  font-style: italic;
  font-weight: 300;
  color: map-get($colorz, darkgrey);
  font-size: 13px;
}

#basket_checkout {
  font-size: 13px;
}

#basket_checkout p:first-child {
  line-height: 2px;
}

#checkout {
  color: white;
}
</style>
