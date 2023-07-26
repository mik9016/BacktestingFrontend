<script lang="ts">
import { PropType} from 'vue';

export default {
  props: {
    text: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {


    return {
      // You can also return any other reactive variables or functions here
    };
  },
};
</script>

<template>
<button class="button">{{text}}</button>
</template>

<style scoped>
.button{
  height: 44px;
  padding: 0 8rem;
  background-color: var(--link-color);
  color: var(--text-light-color);
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid var(--text-light-color);
}
button:hover{
  background-color: var(--btn-hover-color);
}

</style>
