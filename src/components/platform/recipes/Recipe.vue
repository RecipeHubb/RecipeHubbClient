<template lang="">
  <div class="pt-10">
    <v-container v-if="editMode" fluid>
      <v-row justify="center" class="lg:text-5xl lg:pb-10 text-purple-500">
        <v-col class="lg:block hidden" cols="10" sm="1" lg="1" xs="1">
          <!-- <span @click="goBack" title="Go back to Recipes List">
              <i class="fas fa-chevron-left text-5xl text-purple-600 cursor-pointer"></i>
            </span>    -->
        </v-col>
        <v-col class="lg:display hidden" cols="10" lg="2" sm="2" xs="1"></v-col>
        <v-col class="hidden lg:block"  cols="10" lg="4" sm="4" xs="5">
          <v-text-field
            outlined
            label="Name*"
            v-model="name"
            dense
            color="deep-purple accent-2"
          ></v-text-field>
        </v-col>
        <v-col class="lg:block hidden" cols="10" sm="1" lg="1" xs="1">
          <div
            v-if="editMode"
            @click="switchIcon"
            title="Toggle Preview Mode"
            class=" lg:mr-2 lg:mb-5 m-0 p-0"
          >
            <i class="fas fa-eye lg:text-3xl text-sm text-gray-900 cursor-pointer "></i>
          </div>
        </v-col>

<!-- MOBILE INPUT TAILWIND CSS -->
        <div class="lg:hidden block flex mx-5 p-0">
            <v-text-field
              outlined
              label="Name*"
              v-model="name"
              dense
              color="deep-purple accent-2"
          ></v-text-field>  
           <div
            v-if="editMode"
            @click="switchIcon"
            title="Toggle Preview Mode"
            class=" lg:mr-2 lg:mb-5 m-0 px-2"
          >
            <i class="fas fa-eye text-3xl  text-gray-900 cursor-pointer "></i>
          </div>
          </div>
        <v-col class="lg:block hidden" cols="10" lg="1" sm="2" xs="1"></v-col>
      </v-row>
      <v-row  class="lg:flex lg:justify-center">
        <v-col cols="12" lg="4" sm="6" xs="10">
          <!-- Image -->
          <v-row>
            <v-col cols="12" sm="12">
              <div>
                <div>
                  <img
                    :src="recipeImage"
                    height="200"
                    width="200"
                    class="bg-gray-400 w-full lg:w-1/2"
                  />
                </div>
                <input
                  class="mt-2"
                  type="file"
                  accept="image/*"
                  @change="previewImage"
                />
              </div>
            </v-col>
            <!-- Tags -->
            <v-col cols="12" sm="12">
              <v-autocomplete
                :items="[
                  'Breakfast',
                  'Lunch',
                  'Dinner',
                  'Dessert',
                  'Snack',
                  'American',
                  'Mexican',
                  'Italian',
                  'Thai',
                  'Indian',
                  'Chinese',
                  'Seafood',
                  'Chicken',
                  'Beef',
                  'Pork',
                  'Vegetables',
                  'Fruit',
                  'Sweet',
                  'Spicy',
                  'Savory',
                  'Other',
                ]"
                v-model="tags"
                label="Tags"
                color="deep-purple accent-2"
                multiple
                outlined
              ></v-autocomplete>
            </v-col>
            <!-- So easy meter -->
            <v-col cols="12" sm="12">
              <v-slider
                v-model="soEasyRating"
                class="align-center"
                max="5"
                min="0"
                label="So-Easy Rating:"
                color="deep-purple accent-2"
                hide-details
              >
                <template v-slot:append>
                  <span class="pt-1 text-purple-600 text-xl">{{
                    soEasyRating
                  }}</span>
                </template>
              </v-slider>
            </v-col>
            <!-- Serves -->
            <v-col cols="12" sm="12">
              <v-slider
                v-model="servingSize"
                class="align-center"
                max="20"
                min="0"
                label="Serves:"
                color="deep-purple accent-2"
                hide-details
              >
                <template v-slot:append>
                  <span class="pt-1 text-purple-600 text-xl">{{
                    servingSize
                  }}</span>
                </template>
              </v-slider>
            </v-col>
            <!-- Public -->
            <!-- Favorited -->
            <v-col cols="12" sm="12">
              <v-checkbox
                v-model="isPublic"
                :label="`Public`"
                color="deep-purple accent-2"
              ></v-checkbox>
              <!-- <v-checkbox
                  v-model="favorited"
                  :label="`Favorite`"
                  color="deep-purple accent-2"
                ></v-checkbox> -->
            </v-col>
          </v-row>
        </v-col>

        <v-col class="lg:block hidden" cols="12" lg="1"> </v-col>

        <v-col cols="12" lg="4" sm="6" xs="10">
          <!-- Ingredients -->
          <v-row>
            <v-col cols="12" sm="12">
              <div class="ml-2 text-purple-500 text-xl font-medium pb-4">
                Add/Remove Ingredients
              </div>
              <v-row>
                <v-col cols="12" sm="3" class="ma-0 pa-0">
                  <v-select
                    dense
                    :items="[
                      '1/4',
                      '1/2',
                      '3/4',
                      '1',
                      '1 1/4',
                      '1 1/2',
                      '1 3/4',
                      '2',
                      '3',
                      '4',
                    ]"
                    outlined
                    placeholder="3"
                    v-model="newIngredientAmount"
                    color="deep-purple accent-2"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="3" class="ma-0 pa-0">
                  <v-select
                    dense
                    :items="[
                      'tsp',
                      'tbsp',
                      'oz',
                      'cup',
                      'pint',
                      'quart',
                      'gallon',
                      'lb',
                    ]"
                    placeholder="oz"
                    outlined
                    v-model="newIngredientMeasurement"
                    color="deep-purple accent-2"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="5" class="ma-0 pa-0">
                  <v-text-field
                    outlined
                    dense
                    label="New Ingredient"
                    placeholder="2 lb Chicken breast"
                    v-model="newIngredientName"
                    @keydown.enter="addIngredient"
                    color="deep-purple accent-2"
                    class="ma-0 pa-0"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="1">
                  <div
                    class="text-green-600 text-5xl cursor-pointer -mt-4 pb-5 -ml-3"
                    :disabled="isAddIngredientBlank"
                    title="Add this ingredient"
                    @click="addIngredient"
                  >
                    +
                  </div>
                </v-col>
              </v-row>
              <!-- Ingredients List -->
              <div class="overflow-y-auto h-60 pt-2 pl-3">
                <span v-for="(ingredient, index) of ingredients" :key="index">
                  <v-row>
                    <v-col cols="12" sm="10" class="ma-0 pa-0">
                      <div class="text-lg">{{ ingredient.value }}</div>
                      <!-- <v-text-field
                          outlined
                          dense
                          :value="ingredient"
                        ></v-text-field> -->
                    </v-col>
                    <v-col cols="12" sm="1" class="ma-0 pa-0">
                      <span
                        class="text-red-600 text-2xl cursor-pointer"
                        title="Remove this ingredient"
                        @click="deleteIngredient(index)"
                        >X</span
                      >
                    </v-col>
                  </v-row>
                </span>
              </div>
            </v-col>
            <!-- Instructions -->
            <v-col cols="12" sm="12">
              <div class="ml-2 text-purple-500 text-xl">Instructions</div>
              <v-textarea
                outlined
                name="input-7-4"
                placeholder="Enter additonal cooking instructions here..."
                v-model="instructions"
                color="deep-purple accent-2"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!-- End Main section-->
      <v-row justify="center">
        <v-btn outlined class="bg-green-500 mr-4" @click="updateRecipe">
          Save
        </v-btn>
        <v-btn outlined class="bg-red-500" @click="openDialog">
          Delete
        </v-btn>
      </v-row>
    </v-container>
    <!-- - - - - - - - - Preview Mode - - - - - - - - - - - - - - -->
    <v-container v-else fluid>
      <v-row justify="center" class="lg:pt-12 p-0 ">
        <v-col class="lg:block hidden"  cols="12" sm="1" lg="1">
          <span  @click="goBack" title="Go back to Recipes List" class="mt-4">
            <i
              class="fas fa-chevron-left lg:text-5xl text-xl  text-purple-600 cursor-pointer"
            ></i>
          </span>
        </v-col>

        <v-col class="lg:block hidden" cols="12" sm="2" lg="2"></v-col>

        <v-col class="lg:block hidden" cols="12" sm="6" lg="4">
          <h1 class="lg:text-5xl text-xl lg:pb-10 text-purple-500">
            {{ name }}
          </h1>
        </v-col>

        <v-col class="lg:block hidden" cols="12" sm="2" lg="1">
          <span
            v-show="editAccess"
            v-if="!editMode"
            @click="switchIcon"
            title="Toggle Edit Mode"
            ><i
              class="far fa-edit lg:text-3xl text-2xl p-0 m-0 text-gray-900 cursor-pointer"
            ></i
          ></span>
        </v-col>
<!-- MOBILE EDIT -->
<div class="flex lg:hidden block px-3">
  <span  @click="goBack" title="Go back to Recipes List" class="px-2">
            <i
              class="fas fa-chevron-left text-xl  text-purple-600 cursor-pointer"
            ></i>
          </span>
           <h1 class="text-xl ml-12 text-purple-500">
            {{ name }}
          </h1>
           <span
            v-show="editAccess"
            v-if="!editMode"
            @click="switchIcon"
            title="Toggle Edit Mode"
            ><i
              class="far fa-edit mb-4 ml-16 text-xl text-gray-900 cursor-pointer"
            ></i
          ></span>
  </div>
        <v-col class="lg:block hidden" cols="12" sm="2" lg="1"></v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" lg="4" sm="6" xs="10">
          <!-- Image -->
          <v-row>
            <v-col cols="12" sm="12">
              <div>
                <div>
                  <img
                    :src="recipeImage"
                    height="200"
                    width="200"
                    class="bg-gray-400 w-full lg:w-1/2"
                  />
                </div>
              </div>
            </v-col>
            <!-- Tags -->
            <v-col cols="12" sm="12">
              <v-chip-group multiple>
                <v-chip v-for="tag in tags" :key="tag">
                  {{ tag }}
                </v-chip>
              </v-chip-group>
            </v-col>
            <!-- So easy meter -->
            <v-col cols="12" sm="12">
              <v-slider
                v-model="soEasyRating"
                class="align-center"
                max="5"
                min="0"
                label="So-Easy Rating: "
                hide-details
                disabled
              >
                <template v-slot:append>
                  <span class="pt-1 text-purple-600 text-xl">{{
                    soEasyRating
                  }}</span>
                </template>
              </v-slider>
            </v-col>
            <!-- Serves -->
            <v-col cols="12" sm="12">
              <v-slider
                v-model="servingSize"
                class="align-center"
                max="20"
                min="0"
                label="Serves: "
                hide-details
                disabled
              >
                <template v-slot:append>
                  <span class="pt-1 text-purple-600 text-xl">{{
                    servingSize
                  }}</span>
                </template>
              </v-slider>
            </v-col>
            <!-- Public -->
            <!-- Favorited -->
            <v-col cols="12" sm="12">
              <v-checkbox
                v-show="editAccess"
                v-model="isPublic"
                color="purple"
                :label="`Public`"
                disabled
              ></v-checkbox>
              <!-- <v-checkbox
                  v-show="editAccess"
                  v-model="favorited"
                  color="purple"
                  :label="`Favorite`"
                  disabled
                ></v-checkbox> -->
            </v-col>
          </v-row>
        </v-col>

        <v-col class="lg:block hidden" cols="12" lg="1"> </v-col>

        <v-col cols="12" lg="3" sm="6" xs="10">
          <!-- Ingredients -->
          <v-row>
            <v-col cols="12" sm="12">
              <h3 class="text-2xl -pt-30 pb-2 text-purple-500">
                Ingredients
              </h3>
              <div v-for="(ingredient, index) of ingredients" :key="index">
                <div>
                  {{ ingredient.value }}
                </div>
              </div>
            </v-col>
            <!-- Instructions -->
            <v-col cols="12" sm="12">
              <h3 class="text-2xl pt-10 pb-2 text-purple-500">
                Instructions
              </h3>
              <p class="text-justify">
                {{ instructions }}
              </p>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" lg="1"> </v-col>

        <!-- Comment Section -->
        <v-col cols="12" lg="3" sm="6" xs="9">
          <!-- Ingredients -->
          <v-row>
            <v-col cols="12" sm="9" lg="12">
              <v-row>
                <v-col cols="12" sm="9" xs="8">
                  <div class="text-purple-500 text-xl  pb-4">
                    Comments/Ratings
                  </div>
                </v-col>

                <v-col cols="12" sm="2" xs="3">
                  <div
                    v-show="!editAccess"
                    class="text-green-600 text-4xl cursor-pointer -mt-4 pt-2 -ml-3"
                    title="Add new comment"
                    @click="openCommentDialog"
                  >
                    +
                  </div>
                </v-col>
              </v-row>

              <!-- Comments List -->
              <div class="overflow-y-auto overflow-x-none h-full pt-3 pl-3">
                <span v-for="(comment, index) of comments" :key="index">
                  <v-row>
                    <v-col cols="12" lg="11" xs="11" class="ma-0 pa-0">
                      <div class="bg-purple-100 pl-4 pr-4 pt-2 rounded-3xl">
                        <v-rating
                          v-model="comment.rating"
                          background-color="deep-purple accent-2"
                          color="deep-purple accent-2"
                          readonly
                          small
                        ></v-rating>
                        <div class="flex flex-wrap">
                          <div class="text-md pb-2">{{ comment.body }}</div>
                          <div class="text-sm">
                            - {{ comment.commentOwnerUserName }} |
                            {{ formatDate(comment.dateCreated) }}
                          </div>
                        </div>
                        <div
                          v-if="canRemoveComment(comment.commentOwnerId)"
                          @click="deleteComment(comment._id, index)"
                          class="text-red-500 font-bold cursor-pointer hover:text-black"
                          title="delete this comment"
                        >
                          Remove
                        </div>
                      </div>
                      <div class="bg-white p-3"></div>
                    </v-col>
                  </v-row>
                </span>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <div data-app>
      <ConfirmDeleteDialog
        @close-dialog="closeDialog"
        @delete-recipe="deleteRecipe"
        :open="deleteOpen"
      />
    </div>
    <div data-app>
      <CommentDialog
        @close-dialog="closeCommentDialog"
        @add-comment="commentDialogAdd"
        :open="commentDialogOpen"
      />
    </div>
  </div>
</template>

<script>
import AuthService from "../../../service/AuthService";
import RecipeService from "../../../service/RecipeService";
import ConfirmDeleteDialog from "../../utility/ConfirmDeleteDialog";
import CommentDialog from "../comments/CommentDialog";
import CommentService from "../../../service/CommentService";

export default {
  name: "Recipe",
  props: ["publicViewed"],
  components: {
    ConfirmDeleteDialog,
    CommentDialog,
  },
  data() {
    return {
      recipe: null,
      comments: null,
      editMode: false,
      deleteOpen: false,
      commentDialogOpen: false,

      name: null,
      recipeImage: null,
      previewImg: null,
      instructions: null,
      tags: [],
      servingSize: 0,
      soEasyRating: 0,
      ingredients: [],
      newIngredientAmount: "",
      newIngredientMeasurement: "",
      newIngredientName: "",
      newIngredient: "",
      isPublic: false,
      favorited: false,
      recipeID: null,
      recipeOwnerId: null,
    };
  },
  mounted: async function() {
    if (!AuthService.getToken()) {
      AuthService.logOut();
    }
    //get recipe data from API/DB from params
    let res = await RecipeService.getRecipeByID(this.$route.params.id);
    this.name = res.data.name;
    this.recipeImage = res.data.recipeImage;
    this.instructions = res.data.instructions;
    this.tags = res.data.tags;
    this.servingSize = res.data.servingSize;
    this.soEasyRating = res.data.soEasyRating;
    this.ingredients = res.data.ingredients;
    this.isPublic = res.data.public;
    this.favorited = res.data.favorited;
    this.recipeID = res.data._id;
    this.recipeOwnerId = res.data.ownerId;

    // get comments attached to recipe
    let res2 = await CommentService.getCommentsToRecipe(this.$route.params.id);
    console.log(typeof res2.data.comments);
    this.comments = res2.data.comments;
  },
  methods: {
    updateRecipe: async function() {
      if (!this.name) {
        this.$vToastify.error(
          "Please fill out required fields before updating"
        );
        return;
      }
      const res = await RecipeService.updateRecipe(this.recipeID, {
        name: this.name,
        ingredients: this.ingredients,
        instructions: this.instructions,
        recipeImage: this.recipeImage ? JSON.stringify(this.recipeImage) : null,
        servingSize: this.numPeopleServed,
        soEasyRating: this.soEasyRating,
        tags: this.tags,
        favorited: this.favorited,
        public: this.isPublic,
      });
      if (res.status === 200) {
        this.editMode = false;
        this.$vToastify.success(`${this.name} sucessfully updated`);
      }
    },

    deleteRecipe: async function() {
      const res = await RecipeService.deleteRecipe(this.recipeID);
      if (res.status === 200) {
        this.editMode = false;
        this.$vToastify.success(`${this.name} sucessfully deleted`);
        if (this.$router.history.current.fullPath.includes("/recipes")) {
          this.$router.push("/recipes");
          this.$router.go();
        } else this.$router.push("/recipes");
      }
    },

    previewImage: function(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImg = e.target.result;
          this.recipeImage = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    addIngredient: function() {
      if (!this.isAddIngredientBlank) {
        this.ingredients.push({
          name: this.newIngredientName,
          amount: this.newIngredientAmount,
          measurement: this.newIngredientMeasurement,
          value: `${this.newIngredientAmount} ${this.newIngredientMeasurement} ${this.newIngredientName}`,
        });
        this.newIngredientName = "";
        this.newIngredientAmount = "";
        this.newIngredientMeasurement = "";
      } else {
        this.$vToastify.warning("all ingredient fields needed before adding");
        return;
      }
    },

    deleteIngredient: function(index) {
      this.ingredients.splice(index, 1);
    },

    switchIcon: function() {
      this.editMode = !this.editMode;
    },

    goBack: function() {
      if (!this.editAccess) {
        this.$router.push("/public/recipes");
      } else this.$router.push("/recipes");
    },

    closeDialog: function() {
      this.deleteOpen = false;
    },
    closeCommentDialog: function() {
      this.commentDialogOpen = false;
    },
    commentDialogAdd: async function() {
      let res2 = await CommentService.getCommentsToRecipe(
        this.$route.params.id
      );
      this.comments = res2.data.comments;
      this.commentDialogOpen = false;
    },
    deleteComment: async function(commentId, index) {
      const res = await CommentService.deleteComment(commentId);
      if (res.status !== 200) {
        this.$vToastify.error(`something went wrong`);
      } else {
        this.comments.splice(index, 1);
        this.$vToastify.success(`comment successfully deleted`);
      }
    },

    openDialog: function() {
      this.deleteOpen = true;
    },
    openCommentDialog: function() {
      this.commentDialogOpen = true;
    },
    formatDate: function(date) {
      return new Date(date).toDateString();
    },
    canRemoveComment(ownerCommentId) {
      // if you own the recipe OR if you own the comment inside the not-owned recipe
      return (
        this.recipeOwnerId === this.$store.state.user.id ||
        ownerCommentId === this.$store.state.user.id
      );
    },
  },
  computed: {
    isAddIngredientBlank() {
      return (
        this.newIngredientName === "" ||
        this.newIngredientAmount === "" ||
        this.newIngredientMeasurement === ""
      );
    },
    editAccess() {
      return !this.$router.history.current.fullPath.includes("/public/");
    },
  },
};
</script>
