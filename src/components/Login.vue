<template>
  <div class="container my-container">
    <form @submit="handleSubmit">
      <div
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
        style="width: 500px"
      >
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-full px-3">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <input
              class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
              id="username"
              type="text"
              placeholder="janedoe"
              v-model="data.username"
            />
          </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-full px-3">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
              id="password"
              type="password"
              placeholder="******************"
              v-model="data.password"
            />
          </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-full px-3">
            <button
              class="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-5 px-4 rounded"
              type="submit"
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  data: () => {
    return {
      data: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapMutations(["setUser", "setToken"]),
    async handleSubmit(e) {
      e.preventDefault();
      await axios({
        method: "post",
        url: "http://localhost:5000/login",
        data: this.data,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          const { user, token } = response.data;
          console.log(user, token);
          this.setUser(user);
          this.setToken(token);
          this.$router.push("/");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
.my-container {
  justify-content: center;
  display: flex;
  align-items: center;
  width: 100%;
  justify-self: center;
  height: 100%;
}
</style>