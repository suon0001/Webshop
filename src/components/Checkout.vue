<template>
  <v-container>
    <v-row>
      <v-col offset-md="1" md="5">
        <h1>Contact information</h1>
        <div class="pa-2" id="info">
          <v-stepper v-model="checkout" vertical>
            <v-stepper-step :complete="checkout > 1" step="1">
              Contact
            </v-stepper-step>

            <v-stepper-content step="1">
              <v-card class="mb-12" height="300px">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        label="First Name"
                        required
                        @keydown.space.prevent
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="lastname"
                        :rules="nameRules"
                        label="Last Name"
                        required
                        @keydown.space.prevent
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="phone"
                    label="Phone"
                    type="tel"
                  ></v-text-field>

                  <v-checkbox
                    v-model="checkbox"
                    :rules="[(v) => !!v || 'You must agree to continue!']"
                    label="Do you agree to the conditions?"
                    required
                  ></v-checkbox>
                </v-form>
              </v-card>
              <v-btn
                :disabled="!valid"
                class="mr-4"
                @click="validate"
                color="primary"
                @click.prevent="checkout = 2"
              >
                Continue
              </v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="checkout > 2" step="2">
              Payment infomation
            </v-stepper-step>

            <v-stepper-content step="2">
              <v-card class="mb-12" height="200px">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="card"
                    :rules="[rules.required, rules.min]"
                    label="Card Number"
                    outlined
                    required
                    type="text"
                  ></v-text-field>
                  <v-row>
                    <v-col>
                      <v-select :items="Month" label="Month"></v-select>
                    </v-col>
                    <v-col>
                      <v-select :items="Year" label="Year"></v-select>
                    </v-col>
                    <v-col>
                      <v-text-field
                        :rules="cvc"
                        label="CVC"
                        required
                        type="tel"
                        :max="3"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card>
              <v-btn
                :disabled="!valid"
                class="mr-4"
                @click="validate"
                color="primary"
                @click.prevent="code()"
              >
                Continue
              </v-btn>
              <v-btn text @click="checkout = 1">
                Cancel
              </v-btn>
            </v-stepper-content>
          </v-stepper>
        </div>
      </v-col>
      <v-col offset-md="1" md="4">
        <h1>Order</h1>
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
                    {{ item.quantity }}
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
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  data() {
    return {
      checkbox: false,
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      card: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 16 || "",
      },
      max: 16,
      Month: ["01", "02", "03", "04", "05", "06", "07", "08", "09", 10, 11, 12],
      Year: [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
      checkout: 1,
      basketDump: [],
      image: null,
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
    validate() {
      this.$refs.form.validate();
    },
    code() {
      firebase;
      this.$router.replace("/code");
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
  max-width: 100px;
  max-height: 100px;
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
