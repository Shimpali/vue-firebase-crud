<template>
  <div class="edit-smoothie container">
  <h2>Edit the Smoothie {{this.$route.params.smoothie_slug}}</h2>
  </div>
</template>

<script>
export default {
	name: 'EditSmoothie',
	data() {
		return {};
	}
};
</script>

<style>
.edit-smoothie{
  margin-top: 60px;
}
</style>
