<template>
    <header>
        <img id="logo" :src="image">
    </header>
</template>

<script>

export default {
  name:'Header',
  data(){
      return{
          image: require('@/assets/logo.png')
      };
  }
}
</script>

<style scoped>
    #logo{
        width:300px;
    }

    @media (max-width: 700px){
        #logo{
            width: 33vw;
        }
    }
</style>
