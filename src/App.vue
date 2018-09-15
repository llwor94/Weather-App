<script>
import HelloWorld from './components/HelloWorld.vue';
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'app',
  components: {
    HelloWorld,
  },
  data() {
    return {
      temp: '',
      city: '',
      summary: '',
      icon: '',
      forecast: [],
    };
  },
  mounted() {
    navigator.geolocation.getCurrentPosition(position => {
      let { latitude, longitude } = position.coords;
      console.log(position.coords);
      axios({
        method: 'post',
        url: `http://weather-proxy-db.herokuapp.com`,
        data: { latitude, longitude },
      }).then(response => {
        this.temp = Math.round(response.data.weather.temperature);
        this.summary = response.data.weather.summary;
        this.forecast = response.data.forecast.data;
        this.city = `${response.data.city}, ${response.data.state}`;
        this.icon = response.data.weather.icon;
        // console.log(
        //   moment(response.data.forecast.data[0].sunriseTime * 1000, 'x').format(
        //     'MMMM Do YYYY, h:mm:ss a',
        //   ),
        //   Date.now(),
        //   moment(response.data.forecast.data[0].sunsetTime * 1000, 'x').format(
        //     'MMMM Do YYYY, h:mm:ss a',
        //   ),
        //);
      });
    });
  },
};
</script>

<template>
  <div class="app-wrapper">
    <HelloWorld v-bind:temp="temp" v-bind:city='city' v-bind:summary='summary'/>
    <skycon v-bind:condition='icon' color='white'/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
}

body {
  background-image: url(./assets/day.png);
  background-repeat: no-repeat;
  background-size: cover;
}

.app-wrapper {
  margin: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
