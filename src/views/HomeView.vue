<template>
  <div class="wrapper">
    <h1>HOME VIEW</h1>

  </div>
</template>

<script setup lang="ts">
import {useUserStore} from "@/stores/UserStore";
const store = useUserStore()

</script>

<style scoped>
.wrapper{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--background-Color);
  color: var(--text-light-color);
}
</style>
