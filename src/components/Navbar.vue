<template>
<div >
    <nav class="nav-wrapper navbar">
       <div class="nav-content">
    <router-link :to="{name: 'Index'}">
      <span class="nav-title">Ninja Smoothies</span>
    </router-link>
    <a href="" class="btn-floating btn-large waves-effect waves-light pink add-button">
       <router-link :to="{name: 'AddSmoothie'}">
      <i class="material-icon">add_to_photos</i>
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
.add-button{
  margin-left: 200px;
}
</style>
