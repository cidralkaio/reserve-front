<script>
import axios from "axios";
export default {
  data() {
    return {
      texto: "",
      formDataImage: {},
    };
  },
  methods: {
    async criarPost() {
      const autor = this.$cookies.get("userId");

      let post = {
        text: this.texto,
        autor,
      };

      axios.post("http://localhost:8000/Post/", post).then((res) => {
        this.formDataImage.append("post", res.data.id);
        this.formDataImage.append("autor", autor);

        axios
          .post("http://localhost:8000/midia/", this.formDataImage)
          .then(() => {
            window.location.reload();
          });
      });
    },
    onFileChange(event) {
      const formData = new FormData();
      formData.append("midia", event.target.files[0]);
      this.formDataImage = formData;
    },
  },
};
</script>

<template>
  <div class="mt-4 mb-6 border border-gray-200 rounded-3xl md:rounded-b-3xl p-6 md:p-10">
    <form @submit.prevent="criarPost()" enctype="multipart/form-dqata">
      <div class="w-full">
        <label class="block text-center w-full px-10 mb-6 py-2 bg-gray-700 rounded-lg text-white" for="exampleFormControlFile1"
          >Carregar Imagem</label
        >
        <input
          type="file"
          name="file"
          v-on:change="onFileChange"
          id="exampleFormControlFile1"
          required
        />
      </div>
      <textarea
        placeholder="Digite oque está pensando..."
        class="block w-full pl-4 pr-10 my-6 py-2 border border-gray-200 rounded-lg"
        v-model="texto"
        id="exampleFormControlTextarea1"
        rows="3"
      ></textarea>
      <button type="submit" class="w-full text-center py-2 bg-cyan-600 rounded-lg text-white">
        Criar Nova Publicação
      </button>
    </form>
  </div>
</template>

<style scoped>
textarea {
  min-height: 120px;
  font-size: 1.1em;
}

.card-desc {
  border-top: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
