<script lang="ts">
import {PropType} from 'vue';

export enum SizeType {
  Big = 'Big',
  Small = 'Small'
}

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
    },
    autofocus: {
      type: Boolean as PropType<boolean>,
      required: false
    },
    size: {
      type: String as PropType<SizeType>,
      required: false,
      default: SizeType.Big
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false
    },

  },
  setup(props, {emit}) {
    const emitValue = (e: any): void => {
      emit("typed", e?.target?.value)
    }

    const setSize = () => {
      return props.size === SizeType.Big ? 'input-size-big' : 'input-size-small'
    }

    return {
      emitValue,
      setSize
    };
  },
};
</script>

<template>
  <div class="input-wrapper ">
    <label :for="id">{{ label }}</label>
    <input :class="`${setSize()}`" :type="type" :id="id" :name="name" @input="emitValue"
           :autofocus="autofocus" :disabled="disabled"/>
    <p v-if="showError" class="error">{{ errorMsg }}</p>
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

.error {
  color: var(--error-color);
  margin-bottom: 0;
}

input {
  border: 1px solid var(--btn-border-color);
  border-radius: 4px;
  font-size: 16px;
  color: var(--text-light-color);
  font-family: 'Poppins', sans-serif;
  background-color: var(--card-background);
  height: 42px;
  padding-left: 1rem;

}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

.input-size-big {
  width: 17rem;
}

.input-size-small {
  width: 9rem;
}


</style>
