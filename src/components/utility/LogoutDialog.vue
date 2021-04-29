<template>
  <v-row justify="center">
    <v-dialog

      v-model="open"
      persistent
      max-width="500"
      @click:outside="closeDialog"
    >
      <v-card>
        <v-card-title class="headline text-purple-500 text-xl">
          Logout?
        </v-card-title>
        <v-card-text class="text-lg">This will take you back to the home page. Continue?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            class="bg-red-500 mr-2"
            text
            @click="closeDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            class="bg-green-500 mr-2"
            @click="confirmLogout"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
    name: 'LogoutDialog',
    props: ['open'],
    methods: {
        closeDialog: function() {
            this.$emit('close-dialog')
        },
        confirmLogout: function() {
            this.$emit('log-out')
        }
    }
}
</script>
