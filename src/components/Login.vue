<template>
  <div class="main">
    <Add @onAdd="onAdd"/>
    <Search/>
    <Dashboard ref="dash"/>
  </div>
</template>

<script>
import Add from '../components/Add';
import Search from './Search';
import Dashboard from './Dashboard';

export default {
  name: 'Index',
    components: {
    Add,
    Search,
    Dashboard
  },
  mounted() {

  },
  methods: {
      onAdd() {
        this.$refs.dash.load();
      }
  },
  data() {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>