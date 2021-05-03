
<template lang="">
    <div>
      <v-dialog
        v-model="open"
        transition="dialog-bottom-transition"
        width="600"
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
                sm="6"
                md="8"
              >
                <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                      <v-text-field
                        outlined
                        dense
                        label="First Name*"
                        color="deep-purple accent-2"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                        xs='10'
                    >
                        <v-text-field
                        outlined
                        dense
                        label="Last Name*"
                        color="deep-purple accent-2"
                        ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                      <v-text-field
                        outlined
                        dense
                        label="Email*"
                        color="deep-purple accent-2"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                        xs='10'
                    >
                        <v-text-field
                        outlined
                        dense
                        label="Username*"
                        color="deep-purple accent-2"
                        ></v-text-field>
                    </v-col>
              
                    <v-col
                      cols="12"
                      sm="6"
                    >
                     <v-text-field
                        outlined
                        dense
                        label="City"
                        color="deep-purple accent-2"
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-textarea
                        outlined
                        name="input-7-4"
                        label="Bio"
                        placeholder="Enter any cool profile information here..."
                        v-model="text"
                        color="deep-purple accent-2"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-col>
              <v-col
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
              </v-col> 

            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black darken-1"
            text
            class="bg-red-500 pr-5"
            @click="closeDialog"
            title="cancel and return to profile page"
          >
            Cancel
          </v-btn>
          
          <v-btn
            color="black darken-1"
            text
            class="bg-green-500 ml-3"
            @click="saveComment"
            title="Save and update your profile"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
  </div>
</template>

<script>

  export default {
  name: "NewCommentDialog",
  props: ['open'],
  data() {
    return {
      rating: null,
      text: null,
      previewImg: null,
      commentPic: null
    };
  },
  methods: {
    closeDialog: function(){ // clear state and close dialod
      this.rating = null,
      this.text = null,

      this.$emit('close-dialog')
    },
    changeCommentPic: function(event) {
        const input = event.target
        if (input.files && input.files[0]) {
            const reader = new FileReader()
            reader.onload = (e) => {
                this.commentPic = e.target.result
                this.previewImg = e.target.result
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
  },

}
</script>
