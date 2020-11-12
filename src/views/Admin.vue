<template>
  <v-container>
    <v-snackbar v-model="updatedSucces" top>
      {{ UpdatedText }}
    </v-snackbar>
    <v-btn color="navy" text @click="snackbar = false"></v-btn>

    <v-row>
      <v-col offset-md="2" md="8">
        <h1>Products</h1>
        <div class="pa-2" id="info">
          <v-simple-table id="code-table">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left" style="width: 70%">
                    Name
                    <v-btn color="navy" small text to="/addNew">
                      <v-icon>mdi-plus</v-icon>
                      <span style="padding: 0 10px">Add Item</span>
                    </v-btn>
                  </th>
                  <th class="text-center" style="width: 100%">Image</th>
                  <th class="text-center" style="width: 100%">Price</th>
                  <th class="text-center" style="width: 100%">Edit</th>
                  <th class="text-center" style="width: 100%">Remove</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in menuItems" :key="item.name">
                  <td>
                    <span id="td_name">{{ item.name }}</span>
                    <br />
                    <span id="code_item_category">{{
                      item.category + " "
                    }}</span>
                    <br />
                    <span id="code_item_genre" class="font-italic">{{
                      item.genre + " "
                    }}</span>
                  </td>
                  <td id="image-file">
                    <v-img v-bind:src="item.image"></v-img>
                  </td>
                  <td>{{ item.price }} DKK</td>
                  <td>
                    <v-btn
                      small
                      text
                      @click.stop="dialog = true"
                      @click="editItem(item)"
                    >
                      <v-icon color="navy">mdi-pencil</v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <v-btn small text @click="deletedItem(item.id)">
                      <v-icon color="navy">mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <h1>Edit Item</h1>
          <div class="pa-2" id="info">
            <v-text-field
              label="Name of Game"
              required
              v-model="item.name"
            ></v-text-field>
            <v-text-field
              label="Description"
              required
              v-model="item.description"
            ></v-text-field>
            <v-text-field
              label="Price"
              required
              v-model="item.price"
            ></v-text-field>
            <v-file-input label="file input" @change="uploadImage">
            </v-file-input>
            <v-card-text>
              <v-container fluid>
                Category
                <v-row>
                  <v-col
                    cols="12"
                    sm="4"
                    md="6"
                    v-for="platform in platforms"
                    :key="platform"
                  >
                    <v-checkbox
                      v-model="item.category"
                      v-bind:label="platform"
                      color="navy"
                      v-bind:value="platform"
                      hide-details
                    ></v-checkbox>
                  </v-col>
                </v-row>
                <br />
                <v-divider></v-divider>
                <br />
                Genre
                <v-row>
                  <v-col
                    cols="12"
                    sm="4"
                    md="4"
                    v-for="select in selects"
                    :key="select"
                  >
                    <v-checkbox
                      v-model="item.genre"
                      v-bind:label="select"
                      color="navy"
                      v-bind:value="select"
                      hide-details
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-btn
              color="complete"
              to="/admin"
              @click="updateItem()"
              @click.stop="dialog = false"
              >Edit Item</v-btn
            >
            <v-btn
              color="complete"
              text
              to="/admin"
              @click.stop="dialog = false"
              >Cancel</v-btn
            >
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
/*eslint-disable*/
import { dbMenuAdd } from "../../firebase";

export default {
  data() {
    return {
      item: [],
      image: null,
      dialog: false,
      platforms: ["Playstation", "Xbox", "Nintendo", "Mobil", "PC", "VR"],
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
      activeEditItem: null,
      updatedSucces: false,
      UpdatedText: "Update",
    };
  },
  beforeCreate() {
    this.$store.dispatch("setMenuItems");
  },

  methods: {
    uploadImage(e) {
      let file = e;
      console.log(e);
      var storageRef = fb.storage().ref("games/" + file.name);

      let uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {},
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.image = downloadURL;
            console.log("File available at", downloadURL);
          });
        }
      );
    },
    editItem(item) {
      this.item = item;
      this.activeEditItem = item.id;
    },

    updateItem() {
      dbMenuAdd
        .doc(this.activeEditItem)
        .update(this.item)
        .then(() => {
          this.updatedSucces = true;
          console.log('"Document successfully updated!"');
        })
        .catch(function (error) {
          console.error("Error removing document;", error);
        });
    },

    deletedItem(id) {
      dbMenuAdd
        .doc(id)
        .delete()
        .then(function () {
          console.log("Document succesfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document;", error);
        });
    },

    addToBasket(item) {
      if (this.basket.find((itemInArray) => item.name === itemInArray.name)) {
        item = this.basket.find(
          (itemInArray) => item.name === itemInArray.name
        );
        this.increaseQtn(item);
      } else {
        this.basket.push({
          name: item.name,
          price: item.price,
          quantity: 1,
        });
      }
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
