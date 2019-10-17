<template>
    <section class="search">
        <h1> Search your Apex Legends Stats</h1>
        <form v-on:submit.prevent="onSubmit">
            <div class="form-group">
                <label for="platform">Choose Platform</label>
                <select name="platform" id="platform" v-model="platform">
                    <option value="xbl">Xbox</option>
                    <option value="psn">PlayStation</option>
                    <option value="origin">Origin</option>
                </select>
            </div>
            <div class="form-group">
                <label for="gamertag">Enter Gamertag</label>
                <input type="text" name="text" v-model="gamertag" id="gamertag"
                placeholder="Origin ID, Xbox Live gamertag, PSN ID, etc">
            </div>
            <div class="form-group">
                <input type="submit" value="Submit" class="btn">
            </div>
        </form>
    </section>
</template>

<script>

export default {
  name:'Search',
  data(){
      return{
          platform: "xbl",
          gamertag: ""
      };
  },
  beforeCreate(){
      document.body.className = "body-bg-image"
  },
  methods:{
      onSubmit(){
          if(!this.gamertag){
              let toastMessage = "Please enter a gamertag"
              this.$toasted.show(toastMessage, {
                  duration:4500,
                  icon: "exclamation-circle"
              })
          }else{
              this.$router.push(`/profile/${this.platform}/${this.gamertag}`)
          }
      }
  }
}
</script>


<style>
    /*Modify toasted message when being viewed on mobile*/
    .toasted{
        justify-content: start !important;
    }
</style>
