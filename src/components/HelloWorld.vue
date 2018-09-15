<script>
export default {
  name: 'HelloWorld',
  props: {
    temp: Number,
    city: String,
    summary: String,
  },
};
</script>


<template>
  <div class="hello">
    <h1>{{city}}</h1>
    <h1>{{ temp }}&deg;</h1>
    <h1>{{summary }}</h1>
  </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  text-align: center;
  font-family: 'Mukta Malar', sans-serif;
  color: white;
  font-size: 50px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
