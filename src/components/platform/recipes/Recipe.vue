<template lang="">
    <div class='pt-10'>
      <v-container v-if="editMode" fluid>
        <div class='d-none d-sm-flex'>
          <v-row justify="center" class="text-5xl pb-10 text-purple-500">
            <v-col
              cols='10'
              sm='1'
              lg='1'
            >
              <!-- <span @click="goBack" title="Go back to Recipes List">
                <i class="fas fa-chevron-left text-5xl text-purple-600 cursor-pointer"></i>
              </span>    -->
            </v-col>
            <v-col cols='10' lg='2' sm='2'></v-col>
            <v-col
              cols='10'
              lg='4'
              sm='4'
            >
              <v-text-field
                outlined
                label="Name*"
                v-model="name"
                dense
                color="deep-purple accent-2"
              ></v-text-field>
            </v-col>
            <v-col
              cols='10'
              sm='1'
              lg='1'
            >
              <div v-if="editMode" @click="switchIcon" title="Toggle Preview Mode" class=" mr-2 mb-5">
                <i class="fas fa-eye text-3xl text-gray-900 cursor-pointer "></i>
              </div>
            </v-col>
            <v-col cols='10' lg='1' sm='2'></v-col>
          </v-row>
        </div>
        <div class="d-flex d-sm-none">
          <v-row justify="center" class="text-5xl pb-10 text-purple-500 pl-4 pr-4">
              <v-text-field
                outlined
                label="Name*"
                v-model="name"
                dense
                color="deep-purple accent-2"
              ></v-text-field>

              <div v-if="editMode" @click="switchIcon" title="Toggle Preview Mode" class=" ml-3 mr-2 -mt-1">
                <i class="fas fa-eye text-3xl text-gray-900 cursor-pointer "></i>
              </div>
          </v-row>
        </div>
        <v-row justify="center" align="center">
          <v-col
            cols='12'
            lg='4'
            sm='6'
            xs='10'
          >
            <!-- Image -->
            <v-row>
              <v-col
                cols='12'
                sm='12'
              >
                <div>
                  <div>
                    <img 
                      :src="recipeImage" 
                      height="200" 
                      width="200"
                      class="bg-gray-400"
                    >
                  </div>
                  <input
                    class="mt-2"
                    type="file"
                    accept="image/*"
                    @change="previewImage"
                  >
                </div>
              </v-col>
           <!-- Tags -->
              <v-col
                cols='12'
                sm='12'
              >
                <v-autocomplete
                  :items="['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack','American',
                  'Mexican', 'Italian', 'Thai', 'Indian', 'Chinese', 'Seafood', 'Chicken',
                  'Beef', 'Pork', 'Vegetables', 'Fruit','Sweet', 'Spicy', 'Savory', 'Other'
                  ]"
                  v-model="tags"
                  label="Tags"
                  color="deep-purple accent-2"
                  multiple
                  outlined
                ></v-autocomplete>
              </v-col>
            <!-- So easy meter -->
              <v-col
                cols='12'
                sm='12'
              >
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
                    <span class="pt-1 text-purple-600 text-xl">{{soEasyRating}}</span>
                  </template>
                </v-slider>
              </v-col>
           <!-- Serves -->
              <v-col
                cols='12'
                sm='12'
              >
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
                    <span class="pt-1 text-purple-600 text-xl">{{servingSize}}</span>
                  </template>
                </v-slider>
              </v-col>
           <!-- Public -->
           <!-- Favorited -->
              <v-col
                cols='12'
                sm='12'
              >
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

          <v-col
            cols='12'
            lg='1'
          >
          </v-col>

          <v-col
            cols='12'
            lg='4'
            sm='6'
            xs='10'
          >
           <!-- Ingredients -->
            <v-row>
              <v-col
                cols="12"
                sm="12"
              >
                <div class="ml-2 text-purple-500 text-xl font-medium pb-4">Add/Remove Ingredients</div>
                  <v-row>
                    <v-col
                      cols="12"
                      sm='3'
                      class="ma-0 pa-0"
                    >
                      <!-- <v-select
                      dense
                        :items="['1/4','1/2','3/4', '1', '1 1/4', '1 1/2', '1 3/4', '2', '3', '4']"
                        outlined
                        placeholder="3"
                        v-model="newIngredientAmount"
                        color="deep-purple accent-2"
                      ></v-select> -->
                      <v-text-field
                        outlined
                        dense
                        placeholder="4"
                        v-model="newIngredientAmount"
                        required
                        color="deep-purple accent-2"
                        @keydown.enter="addIngredient"
                        class="ma-0 pa-0"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm='3'
                      class="ma-0 pa-0"
                    >
                      <!-- <v-select
                      dense
                        :items="['tsp', 'tbsp', 'oz', 'cup', 'pint', 'quart', 'gallon', 'lb']"
                        placeholder="oz"
                        outlined
                        v-model="newIngredientMeasurement"
                        color="deep-purple accent-2"
                      ></v-select> -->
                      <v-text-field
                        outlined
                        dense
                        placeholder="oz"
                        v-model="newIngredientMeasurement"
                        required
                        color="deep-purple accent-2"
                        @keydown.enter="addIngredient"
                        class="ma-0 pa-0"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm='5'
                      class="ma-0 pa-0"
                    >
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
                    <v-col
                      cols="12"
                      sm='1'
                    >
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
                      <v-col
                        cols="12"
                        sm='10'
                        class="ma-0 pa-0"
                      >
                      <div class="text-lg">{{ingredient.value}}</div>
                        <!-- <v-text-field
                          outlined
                          dense
                          :value="ingredient"
                        ></v-text-field> -->
                      </v-col>
                      <v-col
                        cols="12"
                        sm='1'
                        class="ma-0 pa-0"
                      >
                        <span class="text-red-600 text-2xl cursor-pointer" title="Remove this ingredient" @click="deleteIngredient(index)">X</span>
                      </v-col>
                    </v-row>
                  </span>
                </div>
              </v-col> 
              <!-- Instructions -->
              <v-col
                cols='12'
                sm='12'
              >
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


        </v-row> <!-- End Main section-->
        <v-row justify="center">
          <v-btn 
            outlined
            class="bg-green-500 mr-4" 
            @click="updateRecipe"
          >
            Save
          </v-btn>
          <v-btn 
            outlined
            class="bg-red-500" 
            @click="openDialog"
          >
            Delete
          </v-btn>

        </v-row>
      </v-container>
      <!-- - - - - - - - - Preview Mode - - - - - - - - - - - - - - -->
      <v-container v-else fluid>
        <div class='d-none d-sm-flex'>
          <v-row justify="center" class="pt-12">
            <v-col
              cols='12'
              sm='1'
              lg='1'
            >
              <span @click="goBack" title="Go back to Recipes List" class="mt-4">
                <i class="fas fa-chevron-left text-5xl text-purple-600 cursor-pointer"></i>
              </span>   
            </v-col>

            <v-col cols='12' sm='2' lg='2'></v-col>

            <v-col
              cols='12'
              sm='6'
              lg='4'
            >
            <h1 class="text-5xl pb-10 text-purple-500">
              {{name}}
            </h1>
            </v-col>
            
            <v-col
              cols='12'
              sm='2'
              lg='1'
            >
              <span v-show="editAccess" v-if="!editMode" @click="switchIcon" title="Toggle Edit Mode"><i class="far fa-edit mr-2 text-3xl text-gray-900 cursor-pointer"></i></span>
            </v-col>

            <v-col cols='12' sm='2' lg='1'></v-col>
            
          </v-row>
        </div>
        <div class="d-flex d-sm-none">
          <v-row justify="center" class="text-5xl pb-10 text-purple-500 pl-4 pr-4">
              <span @click="goBack" title="Go back to Recipes List" class="">
                <i class="fas fa-chevron-left text-4xl text-purple-600 cursor-pointer"></i>
              </span>   
              <h1 class=" ml-11 mr-11 mt-2 text-3xl pb-10 text-purple-500">
                {{name}}
              </h1>
              <span v-show="editAccess" v-if="!editMode" @click="switchIcon" title="Toggle Edit Mode" class="-mt-1">
                  <i class="far fa-edit mr-2 text-3xl text-gray-900 cursor-pointer"></i>
              </span>
          </v-row>
        </div>
        <v-row justify="center">
          <v-col
            cols='12'
            lg='4'
            sm='6'
            xs='10'
          >
            <!-- Image -->
            <v-row>
              <v-col
                cols='12'
                sm='12'
              >
                <div>
                  <div>
                    <img 
                      :src="recipeImage" 
                      height="200" 
                      width="200"
                      class="bg-gray-400"
                    >
                  </div>
                </div>
              </v-col>
           <!-- Tags -->
              <v-col
                cols='12'
                sm='12'
              >
              <v-chip-group
                  multiple
                >
                  <v-chip
                    v-for="tag in tags"
                    :key="tag"
                  >
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            <!-- So easy meter -->
              <v-col
                cols='12'
                sm='12'
              >
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
                    <span class="pt-1 text-purple-600 text-xl">{{soEasyRating}}</span>
                  </template>
                </v-slider>
              </v-col>
           <!-- Serves -->
              <v-col
                cols='12'
                sm='12'
              >
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
                    <span class="pt-1 text-purple-600 text-xl">{{servingSize}}</span>
                  </template>
                </v-slider>
              </v-col>
           <!-- Public -->
           <!-- Favorited -->
              <v-col
                cols='12'
                sm='12'
              >
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

          <v-col
            cols='12'
            lg='1'
          >
          </v-col>

          <v-col
            cols='12'
            lg='3'
            sm='6'
            xs='10'
          >
           <!-- Ingredients -->
            <v-row>
              <v-col
                cols="12"
                sm="12"
              >
                <h3 class="text-2xl -pt-30 pb-2 text-purple-500">
                Ingredients
                </h3>
                <div v-for="(ingredient, index) of ingredients" :key="index">
                  <div>
                    {{ingredient.value}}
                  </div>
                </div>
              </v-col> 
              <!-- Instructions -->
              <v-col
                cols='12'
                sm='12'
              >
                <h3 class="text-2xl pt-10 pb-2 text-purple-500">
                Instructions
                </h3>
                  <p class="text-justify">
                    {{instructions}}
                  </p>
              </v-col>
            </v-row>
          
          </v-col>

          <v-col
            cols='12'
            lg='1'
          >
          </v-col>

          <!-- Comment Section -->
          <v-col
            cols='12'
            lg='3'
            sm='6'
            xs='10'
          >
           <!-- Ingredients -->
            <v-row>
              <v-col
                cols="12"
                sm="12"
              >
                <v-row>
                  <v-col
                    cols='12'
                    sm='9'
                  >
                  <div class="ml-2 text-purple-500 text-xl font-medium pb-4">Comments/Ratings</div>
                  </v-col>

                  <v-col
                    cols='12'
                    sm='2'
                  >
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
                      <v-col
                        cols="12"
                        sm='11'
                        class="ma-0 pa-0"
                      >
                        <div class="bg-purple-100 pl-4 pr-4 pt-2 rounded-3xl">
                          <v-rating
                            v-model="comment.rating"
                            background-color="deep-purple accent-2"
                            color="deep-purple accent-2"
                            readonly
                            small
                          ></v-rating>
                          <div class="flex flex-wrap">
                            <div class="text-md pb-2">{{comment.body}}</div>
                            <div class="text-sm"> - {{comment.commentOwnerUserName}} | {{formatDate(comment.dateCreated)}}</div>
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
        <ConfirmDeleteDialog @close-dialog="closeDialog" @delete-recipe="deleteRecipe" :open="deleteOpen" />
      </div>
      <div data-app>
        <CommentDialog @close-dialog="closeCommentDialog" @add-comment="commentDialogAdd" :open="commentDialogOpen" />
      </div>
    </div>
</template>

<script>
import AuthService from '../../../service/AuthService'
import RecipeService from '../../../service/RecipeService'
import ConfirmDeleteDialog from '../../utility/ConfirmDeleteDialog'
import CommentDialog from '../comments/CommentDialog'
import CommentService from '../../../service/CommentService'

export default {
  name: "Recipe",
  props: ['publicViewed'],
  components: {
    ConfirmDeleteDialog, CommentDialog
  },
  data() {
    return {
      recipe: {},
      comments: [],
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
      newIngredientAmount: '',
      newIngredientMeasurement: '',
      newIngredientName: '',
      newIngredient: '',
      isPublic: false,
      favorited: false,
      recipeID: null,
      recipeOwnerId: null
    };
  },
  mounted: async function() {
    if (!AuthService.getToken()) {
      AuthService.logOut()
    } 
    //get recipe data from API/DB from params
    let res = await RecipeService.getRecipeByID(this.$route.params.id)
    this.name = res.data.name
    this.recipeImage = res.data.recipeImage
    this.instructions = res.data.instructions
    this.tags = res.data.tags
    this.servingSize = res.data.servingSize
    this.soEasyRating = res.data.soEasyRating
    this.ingredients = res.data.ingredients
    this.isPublic = res.data.public
    this.favorited = res.data.favorited
    this.recipeID = res.data._id
    this.recipeOwnerId = res.data.ownerId

    // get comments attached to recipe
    let res2 = await CommentService.getCommentsToRecipe(this.$route.params.id)
    this.comments = res2.data.comments
  },
  methods: {
    updateRecipe: async function() {
      if (!this.name){
        this.$vToastify.error("Please fill out required fields before updating")
        return
      }
      const updatedRecipe = {
        name: this.name,
        ingredients: this.ingredients,
        instructions: this.instructions,
        recipeImage: this.previewImg ? JSON.stringify(this.recipeImage) : null,
        servingSize: this.numPeopleServed,
        soEasyRating: this.soEasyRating,
        tags: this.tags,
        favorited: this.favorited,
        public: this.isPublic
      }
      if (!updatedRecipe.recipeImage){
        delete updatedRecipe.recipeImage
      }
      
      const res = await RecipeService.updateRecipe(this.recipeID, updatedRecipe)
      if (res.status !== 200){
        this.$vToastify.error(`Something went wrong, try again later`)
        return
      }
      else {
        this.$vToastify.success(`${this.name} sucessfully updated`)
        this.editMode = false
      }
    },

    deleteRecipe: async function() {
      const res = await RecipeService.deleteRecipe(this.recipeID)
      console.log(this.recipeID)
      console.log(res)
      if (res.status !== 200){
        this.$vToastify.success(`Something went wrong, try again later`)
        return
      }
      else {
        this.editMode = false
        this.$vToastify.success(`${this.name} sucessfully deleted`)
        this.$router.push('/recipes')
      }
    },

    previewImage: function(event) {
      const input = event.target
      if (input.files && input.files[0]) {
          const reader = new FileReader()
          reader.onload = (e) => {
              this.previewImg = e.target.result;
              this.recipeImage = e.target.result
          }
          reader.readAsDataURL(input.files[0]);
      }
    },

    addIngredient: function(){
      if (!this.isAddIngredientBlank){
        this.ingredients.push({
          name: this.newIngredientName,
          amount: this.newIngredientAmount,
          measurement: this.newIngredientMeasurement,
          value: `${this.newIngredientAmount} ${this.newIngredientMeasurement} ${this.newIngredientName}`
        })
        this.newIngredientName = ''
        this.newIngredientAmount = ''
        this.newIngredientMeasurement = ''
      }
      else{
        this.$vToastify.warning("all ingredient fields needed before adding")
        return
      }
    },

    deleteIngredient: function(index){
      this.ingredients.splice(index, 1)
    },

    switchIcon: function(){
      this.editMode = !this.editMode
    },

    goBack: function(){
       if (this.$router.history.current.fullPath.includes('/search')) {
        this.$router.push('/search')
       }
        else if (!this.editAccess){
        this.$router.push('/public/recipes')
      }
      else this.$router.push('/recipes')
    },

    closeDialog: function() {
      this.deleteOpen = false
    },
    closeCommentDialog: function() {
      this.commentDialogOpen = false
    },
    commentDialogAdd: function(data) {
      this.comments.push({
          commentOwnerUserName: data.commentOwnerUserName,
          commentOwnerId: data.commentOwnerId,
          dateCreated: new Date(data.dateCreated).toDateString(),
          rating: data.rating,
          body: data.body,
          _id: data._id
      })
      this.commentDialogOpen = false
    },
    deleteComment: async function(commentId, index) {
      const res = await CommentService.deleteComment(commentId)
      if (res.status !== 200){
        this.$vToastify.error(`something went wrong`)
      }
      else {
        this.comments.splice(index, 1)
        this.$vToastify.success(`comment successfully deleted`)
      }
    },

    openDialog: function() {
      this.deleteOpen = true
    },
    openCommentDialog: function() {
      this.commentDialogOpen = true
    },
    formatDate: function(date) {
      return new Date(date).toDateString()
    },
    canRemoveComment(ownerCommentId) {
      // if you own the recipe OR if you own the comment inside the not-owned recipe
        return this.recipeOwnerId === this.$store.state.user.id || ownerCommentId === this.$store.state.user.id
    },
  },
  computed: {
    isAddIngredientBlank () {
      return this.newIngredientName === '' || this.newIngredientAmount === '' || this.newIngredientMeasurement === ''
    },
    editAccess() {
      return !this.$router.history.current.fullPath.includes('/public/')
    },
  }
};
</script>
