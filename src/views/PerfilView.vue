<script>
import axios from "axios";
import postComp from "../components/PostComp.vue";
import navBar from "../components/NavBar.vue";

export default {
  name: "Home",
  data() {
    return {
      posts: [],
      ong: {},
      trocarFoto: {},
      changing: false,
    };
  },
  mounted() {
    axios.get("http://localhost:8000/Post/").then((response) => {
      this.posts = response.data.filter(
        (post) => post.autor == this.$cookies.get("userId")
      );
    });

    const user = this.$cookies.get("userId");
    axios.get("http://localhost:8000/Ong/" + user).then((response) => {
      this.ong = response.data;
    });
  },
  components: {
    postComp,
    navBar,
  },
  methods: {
    async changeDesc() {
      const user = this.$cookies.get("userId");

      if (this.changing == "desc") {
        let toChange = {
          id: user,
          descricao: this.ong.descricao,
        };

        axios
          .patch("http://localhost:8000/Ong/" + user + "/", toChange)
          .then(() => {
            window.location.reload();
          });
      }
      if (this.changing == "foto") {
        let toChange = this.formDataImage;
        toChange.append("id", this.$cookies.get("userId"));
        axios
          .patch("http://localhost:8000/Ong/" + user + "/", toChange)
          .then(() => {
            window.location.reload();
          });
      }
    },
    onFileChange(event) {
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      this.formDataImage = formData;
      this.changing = "foto";
    },
    log_out(){
      this.$cookies.remove("userId")
      this.$cookies.remove("token")
      window.location.reload();
    },
    delete_user(){
      axios
      .delete(`http://localhost:8000/Ong/${this.$cookies.get("userId")}`)
      .then(
        () => {
            this.$cookies.remove("userId")
            this.$cookies.remove("token")
            window.location.reload()
          }
        )
    }
  },
};
</script>

<template>
  <header style="border-bottom: 2px solid #000">
    <navBar />
  </header>
  <div class="mt-3 text-center container-fluid">
    <div class="my-5">
      <header class="container my-3">
        <img :src="ong.image" class="w-40 h-40 mx-auto rounded-full" alt="" />
      </header>
      <main class="mx-auto text-center">
        <h1 class="hh">
          {{ ong.name }}
          <span>
            <button class="btn" data-toggle="modal" data-target="#modal-perfil">
              <i class="bi bi-pencil-square"></i>
            </button>
          </span>
        </h1>
        <p class="max-w-25">
          {{ ong.descricao }}
        </p>
        <div class="container mt-4">
          <div v-if="posts.length > 0">
            <post-comp :user="user" v-for="post in posts" :key="post.id" :post="post" />
          </div>
          <div v-else class="mt-5 text-sm text-muted">
            Que pena você não pussui nenhuma postagem  \º-º/
          </div>
        </div>
      </main>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="modal-perfil"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">
            Informações da Conta
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div>
            <div class="form-group">
              <label for="name">Nickname</label>
              <input
                type="text"
                class="form-control"
                id="name"
                :value="ong.name"
                disabled
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                :value="ong.email || 'Não informado'"
                aria-describedby="emailHelp"
                disabled
              />
            </div>
            <div class="form-group">
              <label for="desc">Descrição</label>
              <textarea
                class="form-control"
                id="desc"
                rows="3"
                v-model="ong.descricao"
                @change="this.changing = 'desc'"
              ></textarea>
            </div>
            <div class="form-group" v-if="this.changing != 'desc'">
              <label class="block">Foto de Perfil</label>
              <label for="img-src" class="bg-cyan-600 py-2 px-4 my-2 text-white rounded-lg">Mudar foto de Perfil</label>
              <input
                type="file"
                class="form-control-file"
                id="img-src"
                @change="onFileChange"
              />

              <img :src="ong.image" class="w-40 h-40 mx-auto rounded-full" alt="" />
            </div>
            <div class="row">
              <button @click="delete_user" class="btn btn-secondary col-5 mx-auto">
                Deletar Conta
              </button>
              <button @click="log_out" class="btn btn-danger col-5 mx-auto">
                Sair
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="changeDesc" class="btn btn-info">Salvar</button>
        </div>
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

.hh {
  font-size: 2em;
}

@media screen and (min-width: 1700px) {
  .logo-head {
    width: auto;
  }

  .hh {
    font-size: 2.2em;
  }
}
</style>
