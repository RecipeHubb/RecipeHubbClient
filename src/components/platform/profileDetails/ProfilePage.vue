<template>
  <div class="h-screen">
    <section class="relative block w-screen" style="height: 500px;">
      <div
        class="absolute top-0 w-full h-full bg-center bg-cover"
        style='background-image: url("https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80");'
      >
        <span
          id="blackOverlay"
          class="w-full h-full absolute opacity-50 bg-black"
        ></span>
      </div>
      <div
        class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
        style="height: 70px;"
      >
        <svg
          class="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            class="text-white fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </section>
    <section class="relative py-16">
      <div class="container mx-auto px-4">
        <div
          class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
        >
          <div class="px-6">
            <div class="flex flex-wrap justify-center">
              <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                <div class="relative">
                  <img
                    alt="..."
                    :src="defaultImage"
                    class="shadow-xl rounded-full lg:h-auto align-middle border-none lg:absolute lg:-m-16 lg:m-0 lg:-ml-20 lg:-ml-16"
                    style="max-width: 150px;"
                  />
                </div>
              </div>
              <div
                class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"
              >
                <div class="lg:py-6 lg:px-3 sm:mt-0 flex justify-center lg:block mt-4 lg:mt-0">
                  <button
                    class="bg-purple-400 active:bg-pink-600 uppercase text-black font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                    type="button"
                    style="transition: all 0.15s ease 0s;"
                    @click="openEditDialog"
                    title="edit profile settings here"
                  >
                    Settings
                  </button>
                </div>
              </div>
              <div class="w-full lg:w-4/12 px-4 lg:order-1">
                <!-- <div class="flex justify-center py-4 lg:pt-4 pt-8"> -->
                <!-- <div class="mr-4 p-3 text-center">
                      <span
                        class="text-xl font-bold block uppercase tracking-wide text-gray-700"
                        >22</span
                      ><span class="text-sm text-gray-500">Friends</span>
                    </div> -->
                <!-- <div class="mr-4 p-3 text-center">
                      <span
                        class="text-xl font-bold block uppercase tracking-wide text-gray-700"
                        >10</span
                      ><span class="text-sm text-gray-500">Photos</span>
                    </div> -->
                <!-- <div class="lg:mr-4 p-3 text-center">
                      <span
                        class="text-xl font-bold block uppercase tracking-wide text-gray-700"
                        >89</span
                      ><span class="text-sm text-gray-500">Comments</span>
                    </div> -->
                <!-- </div> -->
              </div>
            </div>
            <div class="text-center mt-12">
              <h3
                class="text-4xl fnt-semibold leading-normal mb-2 text-gray-800 mb-2"
              >
                {{user.firstName}} {{user.lastName}}
              </h3>
              <div
                class="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase"
              >
                <i class="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>
                {{user.city}}
              </div>
            </div>
            <div class="mt-10 py-10 border-t border-gray-300 text-center">
              <div class="flex flex-wrap justify-center">
                <div class="w-full lg:w-9/12 px-4">
                  <p class="mb-4 text-lg leading-relaxed text-gray-800">
                    {{user.bio}}
                  </p>
                  <!-- <a href="" class="font-normal text-pink-500"
                      >Show more</a
                    > -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div data-app>
      <EditSettingsDialog 
        @close-dialog="closeDialog"
        @edit-complete="onEditComplete" 
        :open="editOpen" 
      />
    </div>
  </div>
</template>

<script>
import EditSettingsDialog from './EditSettingsDialog'
export default {
  name: "ProfilePage",
  components: {
    EditSettingsDialog
  },
  data() {
    return {
      user: {},
      editOpen: false,
      defaultImage: null
    };
  },
  methods: {
    closeDialog() {
      this.editOpen = false
    },
    onEditComplete(userinfo) {
      this.user = userinfo
      this.editOpen  = false
    },
    openEditDialog() {
      this.editOpen = true
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.defaultImage = this.user.profilePic || "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvectorified.com%2Fimages%2Fno-profile-picture-icon-22.jpg&f=1&nofb=1"
  },
};
</script>
