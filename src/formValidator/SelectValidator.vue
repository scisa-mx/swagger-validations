<template>
  <b-form-group :label="label">
    <b-form-select
      :ref="`${inputRef}-input`"
      v-model="localModel[modelKey].value"
      :options="options"
    />
    <small
      :ref="`${inputRef}-error`"
      class="d-none"
    > ERROR </small>
  </b-form-group>
</template>

<script>
export default {
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
      type: [Number, String],
      required: true,
    },
    modelKey: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
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
