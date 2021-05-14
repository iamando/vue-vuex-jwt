<template>
  <div class="container">
    <div
      v-if="!isLoggedIn"
      class="w-screen h-screen flex justify-center items-center"
    >
      <div class="container mx-auto max-w-sm w-full p-4 sm:w-1/2">
        <div
          class="card flex flex-col justify-center p-10 bg-white rounded-lg shadow-2xl"
        >
          <div class="prod-title pb-6">
            <p class="text-2xl uppercase text-gray-900 font-bold text-center">
              Let's Login
            </p>
          </div>
          <div class="prod-info grid gap-10">
            <div
              class="flex flex-col md:flex-row justify-center items-center text-indigo-900"
            >
              <router-link
                to="/login"
                class="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-indigo-800 hover:text-white border-2 border-indigo-900 focus:outline-none"
              >
                GO TO LOGIN
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isLoggedIn"
      class="w-screen h-screen flex justify-center items-center"
    >
      <div class="container mx-auto max-w-sm w-full p-4 sm:w-1/2">
        <div
          class="card flex flex-col justify-center p-10 bg-white rounded-lg shadow-2xl"
        >
          <div class="prod-title pb-6">
            <p class="text-2xl uppercase text-gray-900 font-bold text-center">
              Welcome Home
            </p>
          </div>
          <div class="prod-info grid gap-10">
            <div
              class="flex flex-col md:flex-row justify-center items-center text-indigo-900"
            >
              <button
                @click="sayHi"
                class="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-indigo-800 hover:text-white border-2 border-indigo-900 focus:outline-none"
              >
                SAY HI
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import axios from "axios";

export default {
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState({
      token: "token",
    }),
  },
  methods: {
    async sayHi() {
      await axios({
        method: "get",
        url: "http://localhost:5000/hi",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
</style>