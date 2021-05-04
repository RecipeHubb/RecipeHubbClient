
<template lang="">
    <div>
      <v-dialog
        v-model="open"
        transition="dialog-bottom-transition"
        width="900"
        height="1000"
        class="pt-20"
        @click:outside="closeDialog"
      >
      <v-card>
        <v-card-title>
          <button  @click="closeDialog" title="return to profile page">
            <i class="fas fa-chevron-left text-2xl text-purple-600 mr-2 ml-1 text-center"></i>
          </button>
          <span class="headline text-2xl text-purple-600 pl-2">Profile Settings</span>
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
                        v-model="firstName"
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
                        v-model="lastName"
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
                        v-model="email"
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
                        v-model="userName"
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
                        v-model="city"
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
                        v-model="bio"
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
                        @change="changeProfilePic"
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
            @click="updateProfile"
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
  import UserService from '../../service/UserService'
  import AuthService from '../../service/AuthService'

  export default {
  name: "EditSettingsDialog",
  props: ['open'],
  data() {
    return {
      firstName: null,
      lastName: null,
      profilePic: null,
      city: null,
      email: null,
      userName: null,
      bio: null,
      oldEmail: null,
      oldUserName: null,
      previewImg: null
    };
  },
  methods: {
    updateProfile: async function() {
        if (!this.firstName || !this.lastName || !this.email || !this.userName) {
        this.$vToastify.error("Please fill out required fields before submitting")
        return
        }
        let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        userName: this.userName,
        email: this.email,
        profilePic: this.profilePic ? JSON.stringify(this.profilePic) : null,
        city: this.city,
        bio: this.bio,
        oldEmail: this.oldEmail,
        oldUserName: this.oldUserName,
        newUserName: this.userName,
        newEmail: this.email,
        }
        let userRes
        // if email or username changed, update Auth information
        if (this.email !== this.oldEmail || this.userName !== this.oldUserName){
            userRes = await AuthService.updateUser(data)
            if (userRes.status !== 200){
                this.$vToastify.error(`${this.newUserName} already exists, choose a different username`)
                return
            }
        }
        let profileRes = await UserService.updateProfile(data)
        if (profileRes.status === 200){
            delete profileRes.data.oldEmail
            delete profileRes.data.oldUserName
            delete profileRes.data.newEmail
            delete profileRes.data.newUserName
            this.$vToastify.success(`profile sucessfully updated`)
            localStorage.setItem('user', JSON.stringify(profileRes.data))
            
            this.$emit('close-dialog')
            this.$router.go()
        }
        else {
            this.$vToastify.error(`Error updating profile, try again later.`) 
            return
        }
      
    },
    closeDialog: function(){ // clear state and close dialod
      let u = localStorage.getItem('user')
      this.firstName = u.firstName,
      this.lastName = u.lastName,
      this.profilePic = u.profilePic,
      this.city = u.city,
      this.email = u.email,
      this.userName = u.userName,
      this.bio = u.bio,
      this.numRecipes = u.numRecipes,
      this.$emit('close-dialog')
    },
    changeProfilePic: function(event) {
        const input = event.target
        if (input.files && input.files[0]) {
            const reader = new FileReader()
            reader.onload = (e) => {
                this.profilePic = e.target.result
                this.previewImg = e.target.result
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
  },
  mounted() {
      let u = JSON.parse(localStorage.getItem('user'))
      this.firstName = u.firstName
      this.lastName = u.lastName
      this.previewImg = u.profilePic ? JSON.parse(u.profilePic) : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvectorified.com%2Fimages%2Fno-profile-picture-icon-22.jpg&f=1&nofb=1"
      this.city = u.city
      this.email = u.email
      this.oldEmail = u.email
      this.userName = u.userName
      this.oldUserName = u.userName
      this.bio = u.bio
      this.numRecipes = u.numRecipes
  }

}
</script>
