<template>
  <v-container>
    <v-row>
      <v-col offset-md="1" md="6">
        <h1>Add new game</h1>
        <div class="pa-4" id="info">
          <v-col>
            <v-text-field
              label="Name of Game"
              required
              dense
              v-model="name"
            ></v-text-field>
            <v-text-field
              label="Description"
              required
              dense
              v-model="description"
            ></v-text-field>
            <v-text-field
              label="Price"
              required
              dense
              v-model="price"
            ></v-text-field>
            <v-file-input label="file input" @change="uploadImage">
            </v-file-input>
          </v-col>

          <v-card-text>
            <v-container fluid>
              Category
              <v-row>
                <v-col
                  cols="12"
                  sm="4"
                  md="6"
                  v-for="device in devices"
                  :key="device"
                >
                  <v-checkbox
                    v-model="category"
                    v-bind:label="device"
                    color="navy"
                    v-bind:value="device"
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
                    v-model="genre"
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
            text
            @click="addNewMenuItem()"
            :disabled="btnDisable"
            @click.prevent="admin()"
            >Add Item</v-btn
          >
          <v-btn color="complete" text to="/admin">Cancel</v-btn>
        </div>
      </v-col>
      <v-col offset-md="1" md="4" id="sidebar">
        <h1>Preview</h1>
        <div>
          <v-simple-table id="code-table">
            <thead>
              <tr>
                <th class="text-left" style="width: 70%">Name</th>
                <th class="text-left" style="width: 100%">Category</th>
                <th class="text-left" style="width: 100%">Price DKK</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span id="td_name">{{ name }}</span>
                  <br />
                  <span id="code_item_description">{{ description }}</span>
                  <br />
                  <span id="code_item_description">{{ genre.join(", ") }}</span>
                </td>
                <td>
                  <span id="td_name">{{ category.join(", ") }}</span>
                </td>
                <td id="preview_item_price">{{ price }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/*eslint-disable*/
import { dbMenuAdd, fb } from "../../../firebase";

export default {
  data() {
    return {
      name: "",
      description: "",
      price: "",
      image: null,
      btnDisable: true,
      category: [],
      genre: [],
      basket: [],
      devices: ["Playstation", "Xbox", "Nintendo", "Mobil", "PC", "VR"],
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
    };
  },
  methods: {
    admin() {
      firebase;
      this.$router.replace("/admin");
    },
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
            this.btnDisable = false;
            console.log("File available at", downloadURL);
          });
        }
      );
    },
    addNewMenuItem() {
      dbMenuAdd.add({
        name: this.name,
        description: this.description,
        price: this.price,
        image: this.image,
        category: this.category,
        genre: this.genre,
      });
      // send mig til forside.
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

#sidebar {
  position: fixed;
  right: 70px;
  width: 400px;
}

</style>
