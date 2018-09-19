<template>
  <div class="add-smoothie">
	<h2 class="center-align">Add New Smoothie Recipe</h2>
	<form @submit.prevent="addSmoothie">
	<div class="field title">
	<label for="title">Smoothie Title</label>
	<input type="text" name="title" v-model="title"> 
	</div>
	<div v-for="(ingredient, index) in ingredients" :key="index" class="field">
		<label for="ingredient">Ingredient:</label>
		<input type="text" name="ingredient" v-model="ingredients[index]">	
		<i class="material-icon delete" @click="deleteIngredient(ingredient)">delete</i>
	</div>
	<div class="field add-ingredient">
	<label for="title">Add an Ingredient</label>
	<input type="text" name="add-ingredient" @keydown.tab.prevent="addIngredient" v-model="another"> 
	</div>
	<div class="field center-align">
	<p v-if="feedback" class="red-text">{{feedback}}</p>
	<button class="btn pink" >Add Smoothie</button>
	</div>
	</form>
	</div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify';

export default {
	name: 'AddSmoothie',
	data() {
		return {
			title: null,
			another: null,
			ingredients: [],
			feedback: null,
			slug: null
		};
	},
	methods: {
		addSmoothie() {
			//console.log(this.title, this.ingredients);
			if (this.title) {
				this.feedback = null;
				//create slug
				this.slug = slugify(this.title, {
					replacement: '-', //add '-' wherever there are spaces betwween words
					remove: /[$*_+~.()'"!\-:@]/g, //remove the mentioned characters
					lower: true //all letters in lower case
				});
				//console.log(this.slug);
				db.collection('smoothies')
					.add({
						title: this.title,
						ingredients: this.ingredients,
						slug: this.slug
					})
					.then(() => {
						this.$router.push({ name: 'Index' });
					})
					.catch(error => {
						console.log(error);
					});
			} else {
				this.feedback = 'Please enter a Smoothie title!';
			}
		},
		addIngredient() {
			if (this.another) {
				this.ingredients.push(this.another);
				console.log(this.ingredients);
				this.another = null;
				this.feedback = null;
			} else {
				this.feedback = 'Please enter an ingredient!';
			}
		},
		deleteIngredient(ing) {
			this.ingredients = this.ingredients.filter(ingredient => {
				return ingredient != ing;
			});
		}
	}
};
</script>

<style>
.add-smoothie {
	margin-top: 60px;
	padding: 20px;
	max-width: 500px;
}
.add-smoothie h2 {
	font-size: 2em;
	margin: 20px auto;
}
.add-ingredient .field {
	margin: 20px auto;
}
.delete {
	right: 0;
	bottom: 16px;
	color: #aaa;
	font-size: 1.4em;
	cursor: pointer;
}
</style>
