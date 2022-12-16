<script>
import axios from "axios";
import jwt_decode from "jwt-decode";

export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      new_username: "",
      new_password: "",
      email: "",
      name: "",
      city: "Selecione uma Cidade",
      error: "",
      formDataCreate: {},
    };
  },
  mounted() {
    if (this.$cookies.get("token") != null) {
      this.$router.push("/blog");
    }
  },
  methods: {
    login() {
      axios
        .post("http://localhost:8000/token/", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          this.$cookies.set("token", response.data.access, "30d");
          let decoded = jwt_decode(this.$cookies.get("token"));
          this.$cookies.set("userId", decoded.user_id, "30d");

          this.$router.push("/blog");
          this.error = null;
        })
        .catch((error) => {
          this.error = error;
        });
    },
    register() {
      this.formDataCreate.append("username", this.new_username);
      this.formDataCreate.append("password", this.new_password);
      this.formDataCreate.append("email", this.email);
      this.formDataCreate.append("name", this.name);
      this.formDataCreate.append("city", this.city);
      this.formDataCreate.append("is_active", true);

      axios
        .post("http://localhost:8000/Ong/", this.formDataCreate)
        .then((response) => {
          this.error = null;
        })
        .catch((error) => {
          this.error = error;
        });
    },

    onFileChange(event) {
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      this.formDataCreate = formData;
    },
  },
};
</script>

<template>
  <div class="w-screen md:h-screen flex items-center justify-content">
    <div class="mx-auto w-10/12 md:w-7/12 text-center">
      <header class="border-b border-black">
        <img src="../assets/logo.jpg" class="w-52 mx-auto" alt="" />
        <div v-if="error" class="pb-2">
          <p class="text-sm font-thin text-red-500">
            Algum Campo está invalido
          </p>
        </div>
      </header>
      <main class="md:flex md:justify-center">
        <div class="md:basis-6/12 md:border-r md:pr-8 md:border-black">
          <div class="text-2xl my-4 mt-8">
            <h2>Entrar</h2>
          </div>
          <div class="mb-6">
            <input
              type="text"
              name="name"
              v-model="username"
              class="py-3 pl-4 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Digite seu Username"
              required
            />
          </div>
          <div class="mb-6">
            <input
              placeholder="Digite sua Senha"
              type="password"
              name="password"
              id="password"
              v-model="password"
              class="py-3 pl-4 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <button
            @click="login"
            class="px-10 my-6 py-2 bg-cyan-600 rounded-lg text-white"
          >
            Entrar
          </button>
          <div class="hidden md:block">
            <img src="../assets/ondas.png" alt="" />
          </div>
        </div>
        <div class="md:basis-6/12 md:pl-8 md:border-black">
          <div class="md:my-4 md:mt-8">
            <h5 class="my-8 md:hidden">ou</h5>
            <h2 class="text-2xl mb-8 md:mb-0">Cadastre-se</h2>
          </div>
          <div class="">
            <div v-if="error == null" class="">
              <p class="text-green-600">Cadastro Realizado</p>
            </div>
            <div class="my-6">
              <input
                type="text"
                class="py-3 pl-4 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                name="nome"
                id="nome"
                placeholder="Digite seu Nome de Usuario"
                v-model="new_username"
              />
            </div>
            <div class="my-6">
              <input
                type="email"
                class="py-3 pl-4 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                name="email_create"
                id="email_create"
                placeholder="Digite seu Email"
                v-model="email"
              />
            </div>
            <div class="my-6">
              <input
                type="password"
                class="py-3 pl-4 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                name="password_create"
                id="password_create"
                placeholder="Digite sua Senha"
                v-model="new_password"
              />
            </div>
            <div class="">
              <input
                type="name"
                class="py-3 pl-4 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                name="password_create_2"
                id="password_create_2"
                placeholder="Digite seu Username"
                v-model="name"
              />
            </div>
            <div class="my-6">
              <select
                class="bg-white py-3 pl-4 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                v-model="city"
              >
                <option>Selecione uma Cidade</option>
                <option>Joinville</option>
                <option>Itapema</option>
                <option>Araquari</option>
              </select>
            </div>
            <div>
              <label
                class="px-10 my-6 py-2 bg-gray-500 rounded-lg text-white"
                for="exampleFormControlFile1"
              >
                Carregar Imagem
              </label>
              <input
                type="file"
                name="file"
                class="form-control-file"
                v-on:change="onFileChange"
                id="exampleFormControlFile1"
                required
              />
            </div>
            <button
              class="px-10 my-6 py-2 bg-gray-700 rounded-lg text-white"
              @click="register"
            >
              Cadastrar-se
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
