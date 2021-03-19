<template lang="">
    <div class="h-full lg:p-16 py-16">
      <div class="shadow-lg rounded-lg bg-indigo-50">
        <div class="font-mono flex justify-center">
          <div class="text-center lg:m-16 m-8 lg:w-96">
            <h1 class="text-sm lg:px-4 py-4 text-gray-700">Have an account? <span class="font-bold">Sign in </span></h1>
              <h1 class="text-2xl py-2">Sign Up</h1>
              <div>
                <input type="text" placeholder="Username" class="border-2 rounded-md my-2 p-2 outline-none lg:w-9/12" />
              </div>
              <div>
                <input type="text" placeholder="Email" class="border-2 rounded-md my-2 p-2 outline-none lg:w-9/12" />
              </div>
              <div>
                <input type="password" placeholder="Password" class="border-2 rounded-md my-2 p-2 lg:w-9/12 outline-none" />
              </div>
              <div class="bg-white border-2 rounded-md cursor-pointer p-2 my-6 px-8 text-sm inline-block">Sign Up</div>
            </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    name: 'SignUp'
}
</script>
<style lang="">
    
</style>