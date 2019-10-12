<template>
  <section>
      <div id="loading_bar" v-if="!profileData">
          <h3>Loading...</h3>
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
          <div class="grid">
              <div>
                <img :src="profileData.segments[1].metadata.imageUrl" alt="">
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
                      <li>
                          <h4>Selected Legend</h4>
                          <p>{{profileData.metadata.activeLegendName}}</p>
                      </li>

                    <!--Apex Level -->
                      <li v-if="profileData.segments[0].stats.level">
                          <h4>Current Apex Level:</h4>
                          <p>
                            {{profileData.segments[0].stats.level.displayValue}}
                            <span>({{profileData.segments[0].stats.level.percentile}}% Percentile)</span>
                          </p>
                      </li>

                    <!--Lifetime kills with Legend-->
                      <li v-if="profileData.segments[0].stats.kills">
                          <h4>Lifetime Kills:</h4>
                          <p>
                            {{profileData.segments[0].stats.kills.displayValue}}
                            <span>({{profileData.segments[0].stats.kills.percentile}}% Percentile)</span>
                          </p>
                      </li>

                    <!--Damage done by Legend -->
                       <li v-if="profileData.segments[0].stats.damage">
                            <h4>Damage Done:</h4>
                            <p>
                                {{profileData.segments[0].stats.damage.displayValue}}
                                <span>({{profileData.segments[0].stats.damage.percentile}}% Percentile)</span>
                            </p>
                        </li>

                    <!-- Season Wins -->
                       <li v-if="profileData.segments[0].stats.seasonWins">
                          <h4>Season Wins:</h4>
                          <p>
                            {{profileData.segments[0].stats.seasonWins.displayValue}}
                            <span>({{profileData.segments[0].stats.seasonWins.percentile}}% Percentile)</span>
                          </p>
                      </li>
                      <li v-else>
                          <h4>--Season wins not found--</h4>
                      </li>

                    <!--Season 2 Wins -->
                      <li v-if="profileData.segments[0].stats.season2Wins">
                          <h4>Season 2 Wins:</h4>
                          <p>
                            {{profileData.segments[0].stats.season2Wins.displayValue}}
                            <span>({{profileData.segments[0].stats.season2Wins.percentile}}% Percentile)</span>
                          </p>
                      </li>
                      <li v-else>
                          <h4>--Season 2 wins not found--</h4>
                      </li>

                    <!--Season 3 Wins -->
                       <li v-if="profileData.segments[0].stats.season3Wins">
                          <h4>Season 3 Wins:</h4>
                          <p>
                            {{profileData.segments[0].stats.season3Wins.displayValue}}
                            <span>({{profileData.segments[0].stats.season3Wins.percentile}}% Percentile)</span>
                          </p>
                      </li>
                      <li v-else>
                          <h4>--Season 3 wins not found--</h4>
                      </li>

                      <!--Kills with currently selected Legend -->
                      <li v-if="profileData.segments[1].stats.kills">
                          <h4>Kills with {{profileData.metadata.activeLegendName}} </h4>
                          <p>
                            {{profileData.segments[1].stats.kills.displayValue}}
                            <span>({{profileData.segments[1].stats.kills.percentile}}% Percentile)</span>
                          </p>
                      </li>

                       <!--Revives with currently selected Legend -->
                      <li v-if="profileData.segments[0].stats.revives">
                          <h4>Revives with {{profileData.metadata.activeLegendName}} </h4>
                          <p>
                            {{profileData.segments[0].stats.revives.displayValue}}
                            <span>({{profileData.segments[0].stats.revives.percentile}}% Percentile)</span>
                          </p>
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
          profileData: null
      }
  },
  beforeCreate(){
    document.body.className = 'body-bg-no-image'
  },

  async created(){
    try {

        const res = await axios.get(`/api/v1/profile/${this.$route.params.platform}/${this.$route.params.gamertag}`);

        this.profileData = res.data.data;
        console.log(this.profileData);
        
    } catch (err) {
        this.loading = false;
        this.error = err.response.data.message;
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

@media (max-width: 500px) {
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
