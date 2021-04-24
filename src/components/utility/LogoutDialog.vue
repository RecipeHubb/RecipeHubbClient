<template>
  <v-row justify="center">
    <v-dialog

      v-model="open"
      persistent
      max-width="290"
      @click:outside="closeDialog"
    >
      <v-card>
        <v-card-title class="headline">
          Logout?
        </v-card-title>
        <v-card-text>We can do more with this later</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="closeDialog"
          >
            No Dawg
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="confirmLogout"
          >
            Yea
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
