
<template lang="">
    <div>
      <v-dialog
        v-model="open"
        transition="dialog-bottom-transition"
        width="500"
        @click:outside="closeDialog"
      >
      <v-card>
        <v-card-title>
          <button  @click="closeDialog" title="return to recipe page">
            <i class="fas fa-chevron-left text-2xl text-purple-600 mr-2 ml-1 text-center"></i>
          </button>
          <span class="headline text-2xl text-purple-600 pl-2">New Comment</span>
        </v-card-title>
        <v-card-text>

          <v-container>
            <!-- 1st row -->
            <v-row>
              <v-col
                cols="12"
                sm="8"
                md="9"
              >
                <v-row>
              
                    <v-col
                      cols="12"
                      sm="12"
                    >
                      <v-rating
                        v-model="rating"
                        background-color="deep-purple accent-2"
                        color="deep-purple accent-2"
                        large
                      ></v-rating>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="12"
                    >
                      <v-textarea
                        outlined
                        name="input-7-4"
                        label="Comment"
                        placeholder="Enter additional comments on this recipe..."
                        v-model="body"
                        color="deep-purple accent-2"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-col>
              <!-- <v-col
                cols="12"
                sm="4"
              >
                <div>
                    <div>
                        <img 
                        :src="previewImg" 
                        height="200" 
                        width="200"
                        class="bg-gray-400"
                        >
                    </div>
                    <input
                        class="mt-2"
                        type="file"
                        accept="image/*"
                        @change="changeCommentPic"
                    >
                </div>
              </v-col>  -->

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black darken-1"
            text
            class="bg-red-500"
            @click="closeDialog"
            title="cancel and return to recipe page"
          >
            Cancel
          </v-btn>
          
          <v-btn
            color="black darken-1"
            text
            class="bg-green-500 ml-3"
            @click="saveComment"
            title="Save this comment"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
  </div>
</template>

<script>
  import CommentService from '../../../../service/CommentService'

  export default {
  name: "NewCommentDialog",
  props: ['open', 'isNewComment'],
  data() {
    return {
      rating: null,
      body: null,
      previewImg: null,
      commentPic: null
    };
  },
  methods: {
    closeDialog: function(){ // clear state and close dialod
      this.rating = null,
      this.body = null,

      this.$emit('close-dialog')
    },
    saveComment: async function() {
      if (!this.rating || !this.body) {
        this.$vToastify.error('rating and comment text required')
        return
      }
      let data = {
        recipeId: this.$route.params.id,
        commentOwnerId: this.$store.state.user.id,
        commentOwnerUserName: this.$store.state.user.userName,
        rating: this.rating,
        body: this.body,
      }
      const res = await CommentService.createComment(data)
      if (res.status !== 200){
        this.$vToastify.error(`something went wrong`)
        return
      }
      this.$vToastify.success(`comment successfully added`)
      this.$emit('add-comment', res.data)
      this.rating = null
      this.body = null
    }
    // changeCommentPic: function(event) {
    //     const input = event.target
    //     if (input.files && input.files[0]) {
    //         const reader = new FileReader()
    //         reader.onload = (e) => {
    //             this.commentPic = e.target.result
    //             this.previewImg = e.target.result
    //         }
    //         reader.readAsDataURL(input.files[0]);
    //     }
    // }
  },

}
</script>
