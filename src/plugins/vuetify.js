import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    // Helpers
    theme: {
        primary: colors.purple.darken1,
        secondary: colors.purple.lighten3,
        accent: colors.red.base,
        error: colors.red.base
    }
});
