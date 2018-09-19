<template>
<div >
    <nav class="nav-wrapper navbar">
       <div class="nav-content">
    <router-link to="">
      <span class="nav-title">Ninja Smoothies</span>
    </router-link>
    <a href="" class="btn-floating btn-large waves-effect waves-light pink">
       <router-link to="">
      <i class="material-icon">add</i>
    </router-link>
    </a>

  </div>
</nav>
</div>
</template>

<script>
export default {
  name: 'Navbar'
};
</script>

<style>
.navbar {
  padding: 30px;
}
.nav-title {
  color: black;
}
</style>
