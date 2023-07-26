<script lang="ts">
import {PropType, defineEmits} from 'vue';

export default {
  props: {
    id: {
      type: String as PropType<string>,
      required: true,
    },
    name: {
      type: String as PropType<string>,
      required: true,
    },
    label: {
      type: String as PropType<string>,
      required: true,
    },
    type: {
      type: String as PropType<string>,
      required: true,
    },
    showError: {
      type: Boolean as PropType<boolean>,
      required: false,
    },
    errorMsg: {
      type: String as PropType<string>,
      required: false
    }

  },
  setup(props, {emit}) {
    const emitValue = (e) => {
      emit("typed", e.target.value)
    }

    return {
      emitValue,
    };
  },
};
</script>

<template>
  <div class="input-wrapper ">
    <label :for="id">{{ label }}</label>
    <input :type="type" :id="id" :name="name" @input="emitValue"/>
    <p v-if="showError" class="error">{{ errorMsg}}</p>
  </div>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

label {
  font-size: 16px;
}

.error{
  color: var(--error-color);
  margin-bottom: 0;
}

input {
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  color: var(--text-light-color);
  font-family: 'Poppins', sans-serif;
  background-color: var(--card-background);
  border: 1px solid var(--input-border-color);
  height: 42px;
  padding-left: 1rem;
  width: 17rem;

}


</style>
