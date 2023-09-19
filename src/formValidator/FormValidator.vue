<template>
  <div>
    <b-form @submit.prevent="handleSubmit()">
      <slot />
    </b-form>
  </div>
</template>

<script>
import { handleSwaggerValidationErrorMessages } from '@/helpers'
import { validateForm } from '../formValidations'

export default {
  props: {
    model: {
      type: Object,
      default: () => {},
    },
    spec: {
      type: String,
      default: () => '',
    },
    refs: {
      type: Object,
      default: () => {},
    },
    ifValid: {
      type: Function,
      default: () => {},
    },
    validate: {
      type: Boolean,
      default: () => false,
    },
    insideComponent: {
      type: Boolean,
      default: () => false,
    },
  },
  watch: {
    validate() {
      this.handleSubmit()
    },
  },
  methods: {
    handleSubmit() {
      let refsKeys = null
      let refs = null
      // remove previous validation classes and errors
      if (this.insideComponent) {
        refsKeys = Object.keys(this.$children[0].$refs)
        refs = this.$children[0].$refs
      } else {
        refsKeys = Object.keys(this.$slots.default[0].context.$refs)
        refs = this.$slots.default[0].context.$refs
      }
      refsKeys
        .filter(x => x.endsWith('-input'))
        .forEach(ref => {
          refs[`${ref}`].$el.classList.remove('is-invalid')
        })
      refsKeys
        .filter(x => x.endsWith('-error'))
        .forEach(ref => {
          refs[`${ref}`].classList.remove('d-flex')
          refs[`${ref}`].classList.add('d-none')
        })

      // validate form with swagger spects
      validateForm({ model: this.model, spec: this.spec })
        .then(() => {
          this.ifValid()
        })
        .catch(errors => {
          handleSwaggerValidationErrorMessages(errors, refs)
        })
    },
  },
}
</script>
