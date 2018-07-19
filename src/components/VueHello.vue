<template>
  <p>Hello {{name}}</p>
</template>

<script lang="ts">
 import Vue from 'vue'

 export default Vue.extend({
   name: 'VueHello',
   props: ['name'],
 })
</script>
