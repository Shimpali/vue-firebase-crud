<template>
  <div v-if="smoothie" class="edit-smoothie container">
  <h2>Edit the {{smoothie.title}} Smoothie</h2>
  <form @submit.prevent="editSmoothie">
	<div class="field title">
	<label for="title">Smoothie Title</label>
	<input type="text" name="title" v-model="smoothie.title"> 
	</div>
	<div v-for="(ingredient, index) in smoothie.ingredients" :key="index" class="field">
		<label for="ingredient">Ingredient:</label>
		<input type="text" name="ingredient" v-model="smoothie.ingredients[index]">	
		<i class="material-icon delete" @click="deleteIngredient(ingredient)">delete</i>
	</div>
	<div class="field add-ingredient">
	<label for="title">Add an Ingredient</label>
	<input type="text" name="add-ingredient" @keydown.tab.prevent="addIngredient" v-model="another"> 
	</div>
	<div class="field center-align">
	<p v-if="feedback" class="red-text">{{feedback}}</p>
	<button class="btn pink" >Update Smoothie</button>
	</div>
	</form>
  </div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify';

export default {
	name: 'EditSmoothie',
	data() {
		return {
      smoothie: null,
      another: null,
      feedback: null
    };
	},
  methods: {
     editSmoothie(){
      //console.log(this.smoothie.title, this.smoothie.ingredients);
      	if (this.smoothie.title) {
				this.feedback = null;
				//create slug
				this.smoothie.slug = slugify(this.smoothie.title, {
					replacement: '-', //add '-' wherever there are spaces betwween words
					remove: /[$*_+~.()'"!\-:@]/g, //remove the mentioned characters
					lower: true //all letters in lower case
				});
				//console.log(this.slug);
				db.collection('smoothies').doc(this.smoothie.id)
					.update({
						title: this.smoothie.title,
						ingredients: this.smoothie.ingredients,
						slug: this.smoothie.slug
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
				this.smoothie.ingredients.push(this.another);
				console.log(this.ingredients);
				this.another = null;
				this.feedback = null;
			} else {
				this.feedback = 'Please enter an ingredient!';
			}
		},
		deleteIngredient(ing) {
			this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
				return ingredient != ing;
			});
		}
  },
  created(){
    let ref = db.collection('smoothies').where('slug', '==' , this.$route.params.smoothie_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        //console.log(doc.data());
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;
      });
    });
  }
};
</script>

<style>
.edit-smoothie{
  margin-top: 60px;
}
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
