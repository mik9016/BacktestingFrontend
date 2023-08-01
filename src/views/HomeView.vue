<template>
  <NoMenuLayout/>
  <div class="wrapper">
    <div class="top-container">
      <h1 class="main-title">Backtesting Board</h1>
      <div class="left-container">
        <div class="balance-inputs">
          <TextInput id="start-balance" type="number" label="Start Account Balance"
                     name="start-balance" />
          <TextInput id="fee" type="number" label="Fee per Trade" name="Fee" />
          <TextInput id="current-balance" type="number" label="Current Balance" name="current-balance" />
        </div>
      </div>
      <div class="right-container">
        <div class="overview-inputs">
          <TextInput id="wins" type="number" label="Wins €" name="Wins" :size="SizeType.Small"/>
          <TextInput id="losses" type="number" label="Losses €" name="Losses" :size="SizeType.Small"/>
          <TextInput id="wins-percent" type="number" label="Wins %" name="wins-percent" :size="SizeType.Small"/>
          <TextInput id="losses-percent" type="number" label="Losses %" name="losses-percent" :size="SizeType.Small"/>
          <TextInput id="trade-number" type="number" label="Number of trades" name="trade-number" :size="SizeType.Small"/>
        </div>

      </div>
    </div>
    <div class="bottom-container">
      <div class="left-container"></div>
      <div class="right-container"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from "@/stores/UserStore";
import NoMenuLayout from "@/layouts/NoMenuLayout.vue";
import TextInput, {SizeType} from "@/components/TextInput.vue";

const store = useUserStore()

</script>

<style scoped>

.top-container{
  width: 100%;
  height: 45%;
  display: flex;
}

.bottom-container{
  width: 100%;
  height: 55%;
}

.left-container{
  width: 40%;
  height: 100%;
}

.right-container{
  width: 60%;
  height: 100%;
}

.wrapper {
  margin: 0;
  padding: 0;
  width: 100%;
  height: fit-content;
  min-height: 100vh;
  background-color: var(--background-Color);
  color: var(--text-light-color);
  display: flex;
  flex-direction: column;

}

.balance-inputs{
  display: flex;
  flex-direction: column;
  margin: 2rem;
  padding-top: 3rem;
  gap: 1.5rem;
}

.overview-inputs{
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin: 5rem;
  justify-content: flex-start;

}

.main-title{
  position: absolute;
  left: 45%;
}


</style>
