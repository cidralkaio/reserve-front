<script>
import axios from "axios";
import dayjs from "dayjs";
import locale_pt_br from "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      author: {},
      image: {},
      like_key: false,
      user_id: this.$cookies.get("userId"),
      new_comment: {
        text: "",
        autor: this.$cookies.get("userId"),
        post: this.post.id
      },
    };
  },
  async mounted() {
    // arruma a data do post
    this.post.data = dayjs(this.post.data).locale(locale_pt_br).fromNow();
    // pega as informações da ong
    axios
      .get("http://localhost:8000/Ong/" + this.post.autor)
      .then((response) => {
        this.author = response.data;
      });

    // pega as informações da imagem do post
    axios
      .get("http://localhost:8000/midia/" + this.post.id)
      .then((response) => {
        this.image = response.data;
      });

    // pega os comentários
    axios.get("http://localhost:8000/Comentarios/").then((res) => {
      this.comments = res.data;
      // arruma o autor
      this.comments.forEach((comment) => {
        axios
          .get("http://localhost:8000/Ong/" + comment.autor)
          .then((response) => {
            comment.autor = { name: response.data.name, image: response.data.image, id: response.data.id };
          })
      })

      // arruma a data dos comentários
      this.comments.forEach((comment) => {
        comment.data = dayjs(comment.data).locale(locale_pt_br).fromNow();
      })


      // filtra apenas pelo post
      this.comments = this.comments.filter(
        (comment) => comment.post == this.post.id
      );
    })
  },
  methods: {
    comentar() {
      // cria o comentário
      axios
        .post("http://localhost:8000/Comentarios/", this.new_comment)
        .then(() => {
            window.location.reload();
          }
        );
    },
    delete_post(){
      axios.delete(`http://localhost:8000/Post/${this.post.id}`).then(
        () => {
          window.location.reload();
        }
      )
    },
    delete_comment(id){
      axios.delete(`http://localhost:8000/Comentarios/${id}`).then(
        this.comments = this.comments.filter( (item) => item.id != id )
      )
    },
    like_comment(){
      if(this.like_key){
        axios.patch(`http://localhost:8000/Post/${this.post.id}/`, {
          likes: this.post.likes--
        })
        this.like_key = false
      } else {
        axios.patch(`http://localhost:8000/Post/${this.post.id}/`, {
          likes: this.post.likes++
        })
        this.like_key = true
      }
    },
  }
};
</script>

<template>
  <div class="w-full border border-gray-200 p-0 rounded-3xl mb-6">
    <div class="flex px-6 pt-3 justify-between items-center">
      <div class="text-sm flex justify-start items-center">
        <img :src="author.image" class="rounded-circle img-author" alt="" />
          <p class="pl-2">
            <strong>{{ author.name }}</strong>
          </p>
       
      </div>
      <div class="font-thin pr-2 flex gap-4 items-center">
        <strong>{{ post.data }}</strong>
        <div v-if="author.id == user_id">
          <button @click="delete_post" class="">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
    <img class="w-full my-2" :src="image.midia" alt="Card image cap" />
    <div class="px-6 py-2 flex items-center justify-between">
      <p class="text-xl">
        {{ post.text }}
      </p>
      <div>
        <button
        class="p-4"
        data-toggle="modal"
        :data-target="`#post${post.id}`"
      >
        <i class="bi bi-chat"></i>
      </button>
      <button
        class="px-3 py-2 rounded-lg transition-all"
        :class="{'bg-cyan-600 text-white': like_key}" 
        @click="like_comment"
      >
        {{post.likes}}
        <i class="bi bi-hand-thumbs-up"></i>
      </button>
      </div>
    </div>
  
  <!-- Modal -->
  <div
    class="modal fade"
    :id="`post${post.id}`"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Comentários</h5>
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
          <div
            v-if="comments.length > 0"
            v-for="comment in comments"
            v-bind:key="comment.id"
            class="border border-dark rounded m-4 p-4"
          >
            <div class="flex justify-between">
              <div class="flex items-center gap-4">
                <img :src="comment.autor.image"
                  class="overflow-hidden relative w-8 h-8 bg-gray-100 rounded-full dark:bg-gray-600" />
                <p class="">{{ comment.autor.name }}</p>
              </div>
              <div v-if="comment.autor.id == user_id">
                <button @click="delete_comment(comment.id)" class="">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
            <p class="pt-4 text-left">{{ comment.text }}</p>
            <!-- teste dos testes -->
          </div>
          <div v-else class="my-5 text-sm text-muted text-center">
            Que pena está postagem ainda não tem comentários  \º-º/
          </div>
        </div>
        <div class="modal-footer">
          <input class="pr-4 pl-2 bg-gray-100 border border-gray-300 rounded-lg" type="text" v-model="new_comment.text" />
          <button 
          type="button" @click="comentar" class="btn btn-info bg-cyan-600">
            fazer um comentário
          </button>
        </div>
      </div>
    </div>
  </div>
  </div>
  
</template>
