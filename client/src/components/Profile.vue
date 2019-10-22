<template>
  <section>
      <div id="loading_bar" v-if="!profileData">
          <h3>Loading Stats......</h3>
      </div>

      <div v-if="error">
          <h1>{{error}}</h1>
          <router-link to="/">Go Back</router-link>
      </div>

      <div v-if="profileData" class="container">
          <h1 class="gamertag">
            <img :src="profileData.platformInfo.avatarUrl" alt="" class="platform-avatar">
            {{profileData.platformInfo.platformUserId}}
          </h1>
          <form v-on:submit.prevent="onSubmit">
            <div class="legend_group">
                <label>Select a different Legend</label>
                <select name="platform" id="platform" class="legendList" @change="getLegendName($event)">
                    <option v-for="(value, id) in legendHistory.segments.slice(1)" :key="id" :value="value.metadata.name">{{value.metadata.name}}</option>
                </select>

                <input type="submit" value="Get Stats" class="btn">

            </div>

          </form>
          
          <div class="grid">
              <div>
                <img :src="currentActiveLegendImage">
                <div id="rank">
                    <h4>Rank:</h4>
                    <img :src="profileData.segments[0].stats.rankScore.metadata.iconUrl" id="current_rank_logo">
                    <span>
                        {{profileData.segments[0].stats.rankScore.displayValue}}
                    </span>
                    
                </div>
              </div>
              <div>
                  <ul>
                     
                    <!-- Lifetime stats: -->
                    <li>
                      <h3>Overview:</h3>
                      <br>

                      <div v-for="(value, id) in overviewStats" :key="id" class="legend_stats">
                          <h4>{{value.displayName}}:</h4>
                          <p>
                            {{value.displayValue}}
                            <span>({{value.percentile}}% Percentile)</span>
                          </p>
                      </div>

                      <!--Season 2 Wins -->
                      <div class="life_time" v-if="profileData.segments[0].stats.season2Wins">
                          <h4>Season 2 Wins:</h4>
                          <p>
                            {{profileData.segments[0].stats.season2Wins.displayValue}}
                            <span>({{profileData.segments[0].stats.season2Wins.percentile}}% Percentile)</span>
                          </p>
                      </div>
                      <div class="life_time" v-else>
                          <h4>--Season 2 wins not found--</h4>
                      </div>

                      <!--Season 3 Wins -->
                       <div class="life_time" v-if="profileData.segments[0].stats.season3Wins">
                          <h4>Season 3 Wins:</h4>
                          <p>
                            {{profileData.segments[0].stats.season3Wins.displayValue}}
                            <span>({{profileData.segments[0].stats.season3Wins.percentile}}% Percentile)</span>
                          </p>
                      </div>
                      <div class="life_time" v-else>
                          <h4>--Season 3 wins not found--</h4>
                      </div>
                      
                    </li>

                      <!-- Legend stats: -->
                      <li>

                        <div class="legend_stats">
                          <h4>Selected Legend</h4>
                          <p>{{currentActiveLegend}}</p>
                        </div>
                        <br>

                        <div v-for="(value, id) in legendStats" :key="id" class="legend_stats">
                            <h4>{{value.displayName}}:</h4>
                            <p>
                              {{value.displayValue}}
                              <span>({{value.percentile}}% Percentile)</span>
                            </p>
                        </div>

                      </li>

                  </ul>
              </div>
          </div>
          <router-link to="/">Go Back</router-link>
      </div>

  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'profile',
  data(){
      return {
          loading:false,
          error: null,
          profileData: null,
          legendStats: null,
          currentActiveLegend: null,
          currentActiveLegendImage: null,
          overviewStats: null,
          legendHistory: null,
          legendName: ""
      }
  },
  beforeCreate(){
    document.body.className = 'body-bg-no-image'
  },

  async created(){
    try {

        const res = await axios.get(`/api/v1/profile/${this.$route.params.platform}/${this.$route.params.gamertag}`);

        // Attaining reference to player data
        this.profileData = res.data.data;

        // Getting active legend name
        this.currentActiveLegend = this.profileData.metadata.activeLegendName;

        // Getting active legend image
        this.currentActiveLegendImage = this.profileData.segments[1].metadata.imageUrl;

        // Getting access to currenlty selected legend
        this.legendStats = this.profileData.segments[1].stats;

        // Getting access to all legends used by player
        this.legendHistory = this.profileData;

        // Getting access to lifetime stats
        this.overviewStats = this.profileData.segments[0].stats;

        console.log(this.profileData);
        
    } catch (err) {
        this.loading = false;
        this.error = err.response.data.message;
    }
  },
  methods:{
      onSubmit(){

        let legendData = this.profileData.segments

        for(let i = 1; i < legendData.length; i++){

          /* Upon submitting, this if statement will check if the
           user selection is equal to any of the available legend names.
           If true, it will show relevant stats of selected legend */
           
          if(legendData[i].metadata.name === this.legendName){
            this.legendStats = this.profileData.segments[i].stats;
            this.currentActiveLegendImage = this.profileData.segments[i].metadata.imageUrl;
            this.currentActiveLegend = this.profileData.segments[i].metadata.name;

          }
        }

      },
      getLegendName(event) {
        // Getting value of legend name
        this.legendName = event.target.value;
    }
  }
}
</script>

<style scoped>
.container {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  max-width: 700px;
  margin: 1rem auto;
  padding: 2rem 1.5rem;
  border-radius: 20px;
}
h1.gamertag {
  font-size: 2rem;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.3rem 0.5rem;
  text-align: center;
  border-radius: 20px;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
}
a {
  display: inline-block;
  margin-top: 2rem;
  border: #fff 2px solid;
  padding: 0.5rem 0.8rem;
}
a:hover {
  border: #ccc 2px solid;
  color: #ccc;
}
.platform-avatar {
  width: 40px;
  margin-right: 0.7rem;
}
img {
  width: 100%;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
}
li {
  background: rgba(0, 0, 0, 0.6);
  padding: 1rem;
  margin-bottom: 0.7rem;
  border-radius: 10px;
}
li p {
  font-size: 2rem;
}
li:first-child p {
  font-size: 1.5rem;
}
li span {
  font-size: 1rem;
  color: #ccc;
}

/* Drop-down: */

.legend_group{
  display: block;
  width: 35vw;
  padding: 0.4rem;
  font-size: 3vh;
}

.legendList{
  height: 8vh;
}

/* Lifetime stats: */
.life_time, .legend_stats{
  padding: 10px;
}

/* Loading Text: */
#loading_bar{
    background: #3e3636;
    border-radius: 10px;
    padding: 10px;
    font-size: 2vh;
}

/* Rank Info: */

#rank{
    font-size: 6vh;
    background: rgba(0, 0, 0, 0.6);
    padding: 0.3rem 0.5rem;
    text-align: center;
    border-radius: 20px;
    margin-bottom: 3rem;
    display: flex;
    align-items: center;
    flex-direction: column;
}

#current_rank_logo{
    width: 10vw;
}

/* Media Queries: */
@media (max-width: 500px) {
    .legend_group{
      width: 75vw;
    }
    .legendList{
      height: 9vh;
    }
    #rank{
        width: 73vw;
    }
    h1 {
        font-size: 1.5rem;
        display: block;
        text-align: center;
    }
    .grid {
        grid-template-columns: 1fr;
    }
    li p {
        font-size: 1.5rem;
    }
}
</style>
