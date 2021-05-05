<template lang="">
   <div class='sticky mt-36 bg-purple-300 w-full text-center border-t border-grey p-4 sticky inset-x-0 bottom-0 h-16  '>
        Copyright &copy; {{currentYear}} RecipeHubb
    </div>
</template>

<script>

export default ({
    data: function() {
        return {
            currentYear: new Date().getFullYear()
        }
    }
})
</script>
