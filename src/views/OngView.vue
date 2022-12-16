<script>
import navbarC from "../components/NavBar.vue";
import axios from "axios";
import postComp from "../components/PostComp.vue";

export default {
  components: {
    navbarC,
    postComp,
  },
  data() {
    return {
      ong: {},
      thisOngPosts: [],
    };
  },
  async mounted() {
    axios
      .get("http://localhost:8000/Ong/" + this.$route.params.id)
      .then((response) => {
        this.ong = response.data;
      });

    axios.get("http://localhost:8000/Post/").then((response) => {
      this.thisOngPosts = response.data.filter(
        (post) => post.autor == this.$route.params.id
      );
    });
  },
};
</script>

<template>
  <navbarC style="border-bottom: 2px solid #000;" />
  <div class="container-fluid mt-3 text-center">
    <div class="my-5">
      <header class="container mb-3">
        <img :src="ong.image" class="w-40 h-40 mx-auto rounded-full" alt="" />
      </header>
        <main class="mx-auto text-center">
        <h1 class="hh">{{ ong.name }}</h1>
        <p class="max-w-25">
          {{ ong.descricao }}
        </p>
      </main>
      <div>
        <main class="container mt-4">
          <div v-if="posts.length > 0">
            <post-comp :user="user" v-for="post in thisOngPosts" :key="post.id" :post="post" />
          </div>
          <div v-else class="mt-5 text-sm text-muted">
            Que pena está conta ainda não pussui nenhuma postagem  \º-º/
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style>
.logo-head {
  width: 350px;
}
div.teste {
  min-height: 90vh;
  min-width: 90vw;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (min-width: 1700px) {
  .logo-head {
    width: auto;
  }
}
</style>
