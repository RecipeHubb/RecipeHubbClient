<template lang="">
<div class=" p-16 flex justify-center ">
  <div class="shadow-lg rounded-lg bg-indigo-50 w-3/4">
    <div class="font-mono flex justify-center">
      <div class="relative w-1/2 hidden lg:block ">
        <img class="object-fill h-full w-full inset-0 m-0 p-0" src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80" />
      </div>
      <div class="lg:w-1/2 text-center">
        <h1 class="text-right text-sm px-4 py-4 text-gray-700">Don't have an account? <span class="font-bold">Sign up </span></h1>
        <div class="my-16">
          <h1 class="text-2xl py-2"> Sign in </h1>
            <div>
              <input type="text" placeholder="Username" class="border-2  rounded-md my-2 p-2 outline-none w-7/12" />
            </div>
            <div>
              <input type="password" placeholder="Password" class="border-2  rounded-md my-2 p-2 w-7/12  outline-none" />
            </div>
  
               <div class="bg-white border-2 rounded-md cursor-pointer  p-2 my-6 px-8  text-sm inline-block"> Login </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
    name: 'SignIn'
}
</script>
<style lang="">
    
</style>