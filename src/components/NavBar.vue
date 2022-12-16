<script>
import axios from "axios";

export default {
  mounted() {
    if (this.$cookies.get("token") == null) {
      this.$router.push("/");
    }
    let userId = this.$cookies.get("userId");

    axios
      .get("http://localhost:8000/Ong/" + userId + "/")
      .then((response) => {
        this.user = response.data;
      })
      .catch((error) => {
        this.error = error;
      });
  },
  data() {
    return {
      user: {},
    };
  },
};
</script>

<template>
  <header class="header py-2 container-fluid">
    <router-link to="/blog">
      <div class="opa">
        <img src="../assets/title-logo.png" alt="" />
      </div>
    </router-link>
    <div class="d-flex">
      <router-link to="/perfil" class="nav-link text-dark">
        <span class="d-none d-md-inline">
          {{ user.name || "Carregando" }}
        </span>
        <i class="bi w-bi bi-person-circle ml-2"></i>
      </router-link>
    </div>
  </header>
</template>
