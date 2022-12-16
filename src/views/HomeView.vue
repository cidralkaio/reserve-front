<template>
  <div class="w-full h-screen flex items-center justify-content">
    <div class="container mx-auto w-10/12 md:w-6/12 flex flex-col items-center text-center">
      <header>
        <img src="../assets/sol.png" class="w-20 lg:w-32" alt="" />
      </header>
      <main class="">
        <img
          src="../assets/logo.jpg"
          class="w-full lg:w-96 mx-auto"
          alt=""
        />
        <img src="../assets/text-header.png" class="lg:w-80 mx-auto mb-8" alt="" />
        <div class="mt-3 mx-auto">
          <router-link to="/login" class="bg-cyan-600 text-white px-6 py-2 rounded-lg">
            Entre ou Cadastre-se
          </router-link>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    if (this.$cookies.get("token") != null) {
      this.$router.push("/blog");
    }
  },
};
</script>