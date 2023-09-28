<template>
  <b-form-group :label="label">
    <num-input
      :ref="`${inputRef}-input`"
      v-model="localModel[modelKey].value"
    />
    <small
      :ref="`${inputRef}-error`"
      class="d-none"
    > ERROR </small>
  </b-form-group>
</template>

<script>
import NumInput from './NumInput.vue'

export default {
  components: {
    NumInput,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    inputRef: {
      type: String,
      required: true,
    },
    model: {
      type: Object,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    modelKey: {
      type: String,
      required: true,
    },
  },
  computed: {
    localModel: {
      get() {
        return this.model
      },
      set(value) {
        this.$emit('update:model', value)
      },
    },
  },
}
</script>
