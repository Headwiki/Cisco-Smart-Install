<template>
  <div id="app">
    <Switches/>
  </div>
</template>

<script>
import Switches from './components/Switches.vue'

export default {
  name: 'app',
  components: {
    Switches
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
