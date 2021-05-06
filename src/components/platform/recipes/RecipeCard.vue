<template>
  <v-card class="mx-auto" min-width="300" min-height="300" elevation="15">
    <div class="d-none d-sm-flex">
      <v-img
        v-if="recipe.recipeImage"
        alt="No Image Available"
        class="white--text align-end cursor-pointer "
        height="200px"
        max-height="200px"
        position="center"
        :src="recipe.recipeImage"
        @click="routeToRecipe"
        title="Click image to view more recipe details"
      >
      </v-img>
      <div v-else class="text-center ml-13" @click="routeToRecipe">
      <v-img
        alt="No Image Available"
        class="white--text align-end cursor-pointer "
        height="200"
        width="250"
        :src="noImage"
        @click="routeToRecipe"
        title="Click image to view more recipe details"
      >
      </v-img>
      </div>
    </div>
    <div class="d-flex d-sm-none">
      <v-img
        v-if="recipe.recipeImage"
        alt="No Image Available"
        class="white--text align-end cursor-pointer class='d-none d-sm-flex "
        height="200px"
        max-height="200px"
        width="340px"
        position="center"
        :src="recipe.recipeImage"
        @click="routeToRecipe"
        title="Click image to view more recipe details"
      >
      </v-img>
      <div v-else class="text-center mb-12 mt-12" @click="routeToRecipe">
        <i class="fas fa-apple-alt text-8xl text-gray-700 cursor-pointer"></i>
      </div>
    </div>

    <v-card-subtitle class="pb-0">
      <span class="text-2xl text-purple-500">{{ recipe.name }}</span>
    </v-card-subtitle>

    <v-card-text class="text--primary -mb-5">
      <div>Date Added: {{ createdDate }}</div>

      <div v-if="recipe.tags.length > 0">
        <v-chip-group multiple>
          <v-chip v-for="tag in recipe.tags" :key="tag">
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </div>
      <div v-else class="pt-3.5 text-purple-400">
        No Tags Included
      </div>
      <div class="pt-2 -mb-3 text-purple-400">
        <v-row>
          <v-col cols="12" sm="10">
            <div
              title="Scale of 1-5 how easy the recipe is to prepare, tools needed, prep time, etc."
            >
              <v-slider
                v-model="recipe.soEasyRating"
                class="align-center"
                max="5"
                min="0"
                label="So-Easy Rating:"
                color="deep-purple accent-2"
                hide-details
                readonly
              >
              </v-slider>
            </div>
          </v-col>
          <v-col cols="12" sm="2">
            <div class="mt-1 text-lg text-purple-500">
              {{ recipe.soEasyRating }}
            </div>
          </v-col>
        </v-row>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="purple darken-1" text>
        <router-link
          :to="{
            name: route,
            params: { id: this.recipe._id, recipeName: this.recipe.name },
          }"
        >
          View
        </router-link>
      </v-btn>
      <v-rating
        v-if="avgRating"
        half-increments
        v-model="avgRating"
        background-color="deep-purple accent-2"
        color="deep-purple accent-2"
        title="average rating on this recipe"
        readonly
        small
      ></v-rating>
      <span class="pl-1 pt-1 text-purple-500 text-sm ">
        ({{ getAvgRating }})
      </span>
    </v-card-actions>
  </v-card>
</template>
<script>
import CommentService from "../../../service/CommentService";
import noImage from "../../../assets/No-image-available.png"

export default {
  name: "RecipeCard",
  props: ["recipe", "route"],

  data: function() {
    return {
      createdDate: null,
      avgRating: null,
      noImage,
    };
  },
  methods: {
    routeToRecipe() {
      this.$router.push({
        name: this.route,
        params: { id: this.recipe._id, recipeName: this.recipe.name },
      });
    },
  },
  mounted: async function() {
    this.createdDate = new Date(this.recipe.createdAt).toDateString();
    // get comments attached to recipe
    let comments = await CommentService.getCommentsToRecipe(this.recipe._id);
    if (comments) {
      this.avgRating =
        comments.data && comments.data.average ? Number(comments.data.average.toFixed(1)) : null;
    }
  },
  computed: {
    getAvgRating() {
      return this.avgRating ? this.avgRating : "No ratings yet";
    },
  },
};
</script>
