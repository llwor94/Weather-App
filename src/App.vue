<script>
import HelloWorld from './components/HelloWorld.vue';
import axios from 'axios';
// import moment from 'moment';
import DotLoader from 'vue-spinner/src/DotLoader';

export default {
  name: 'app',
  components: {
    HelloWorld,
    DotLoader,
  },
  data() {
    return {
      temp: '',
      city: '',
      summary: '',
      icon: '',
      forecast: [],
      loaded: false,
      isDay: false,
    };
  },
  mounted() {
    navigator.geolocation.getCurrentPosition(position => {
      let { latitude, longitude } = position.coords;
      // console.log(position.coords);
      axios({
        method: 'post',
        url: `https://weather-proxy-db.herokuapp.com/location`,
        data: { latitude, longitude },
      }).then(response => {
        this.temp = Math.round(response.data.weather.temperature);
        this.summary = response.data.weather.summary;
        this.forecast = response.data.forecast.data;
        this.city = `${response.data.city}, ${response.data.state}`;
        this.icon = response.data.weather.icon;
        this.loaded = true;
        if (
          Date.now() > response.data.forecast.data[0].sunriseTime * 1000 &&
          Date.now() < response.data.forecast.data[0].sunsetTime * 1000
        ) {
          this.isDay = true;
        }
      });
    });
  },
};
</script>

<template>
  <div class="app-wrapper" v-bind:class="{day: isDay}">
    <div class="background" >
    <dot-loader v-if="!loaded" color="white"/>
    <HelloWorld v-else v-bind:temp="temp" v-bind:city='city' v-bind:summary='summary'/>
    <skycon v-bind:condition='icon' color='white'/>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app,
html,
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
}

.app-wrapper {
  background-image: url(./assets/night.png);
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
}

.background {
  margin: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.day {
  background-image: url(./assets/day.png);
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
