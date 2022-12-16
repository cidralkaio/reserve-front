<script>
import axios from "axios";
import postComp from "../components/PostComp.vue";
import navBar from "../components/NavBar.vue";
import CriarPost from "../components/criarPost.vue";

export default {
  name: "Home",
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    axios.get("http://localhost:8000/Post/").then((response) => {
      this.posts = response.data;
    });
  },
  components: {
    postComp,
    navBar,
    CriarPost,
  },
};
</script>

<template>
  <navBar />
  <div>
    <main class="w-10/12 lg:w-7/12 mx-auto">
      <div>
        <CriarPost></CriarPost>
        <div v-if="posts.length > 0">
          <post-comp v-for="post in posts.reverse()" :key="post.id" :post="post" />
        </div>
        <div v-else class="my-36 text-sm text-muted text-center">
          Escreva uma postagem, ela irá aparecer aqui  \º-º/
        </div>
      </div>
    </main>
  </div>
  <div class="bg-gray-900 py-8 text-center w-full mt-20 text-white text-sm">
    <p>
      <i class="bi bi-c-circle"></i>
      Copyright - 2022 Preserve Blog
    </p>
  </div>
</template>

<style scoped>
@media screen and (min-width: 1024px) {
  .header {
    border-bottom: 2px solid #000;
  }
}
</style>
