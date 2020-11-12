<template>
  <div>
    <v-card class="mx-auto" color="grey" dark width="600">
      Thank you so much for your purchase! <br />
      Here is the download code for you to redeem so you can get started with
      your new game. We hope you enjoy it! <br />
      <h1>{{ message1 }} -{{message2 }} -{{ message3 }} -{{ message4 }}</h1>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message1: "",
      message2: "",
      message3: "",
      message4: "",
    };
  },
  methods: {
    rndStr(len) {
      let text = " ";
      let chars =
        "ABCDEFGHIJKLMNOPQRSTVWXYZ0123456789";

      for (let i = 0; i < len; i++) {
        text += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      return text;
    },
  },
  mounted() {
    let message1 = this.rndStr(4);
    this.message1 = message1;
    let message2 = this.rndStr(4);
    this.message2 = message2;
    let message3 = this.rndStr(4);
    this.message3 = message3;
    let message4 = this.rndStr(4);
    this.message4 = message4;
  },
};
</script>
