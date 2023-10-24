<template>
  <div>
    <b-form @submit.prevent="handleSubmit()">
      <b-row class="m-1 rounded mx-0">
        <b-col
          v-for="(value, key) in filteredModel"
          :key="key"
          sm="6"
        >
          <input-validator
            v-if="value.type === 'input'"
            :model="model"
            :model-key="key"
            :input-ref="key"
            :label="$t(`${value.label}`)"
            :value="model[key].value"
            @input="model[key].value = $event"
          />
          <num-input-validator
            v-if="value.type === 'numInput'"
            :model="model"
            :model-key="key"
            :input-ref="key"
            :label="$t(`${value.label}`)"
            :value="model[key].value"
            @input="model[key].value = $event"
          />
          <checkbox-validator
            v-else-if="value.type === 'checkbox'"
            :model="model"
            :model-key="key"
            :input-ref="key"
            :label="$t(`${value.label}`)"
            :value="model[key].value"
            @input="model[key].value = $event"
          />
        </b-col>
        <b-col
          class="d-flex justify-content-end"
          sm="12"
        >
          <b-button
            variant="primary"
            type="submit"
          >
            {{ $t('save') }}
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import InputValidator from './InputValidator.vue'
import CheckboxValidator from './CheckboxValidator.vue'
import NumInputValidator from './NumInputValidator.vue'
import { getModelValues, handleSwaggerValidationErrorMessages } from '@/helpers'
import { validateForm } from '../formValidations'

export default {
  name: 'FormGeneratorValidator',
  components: {
    InputValidator,
    CheckboxValidator,
    NumInputValidator,
  },
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
  },
  computed: {
    filteredModel: {
      get() {
        return Object.entries(this.model)
        .filter(([_, value]) => value.display)
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});
      },
    }
  },
  watch: {
    validate() {
      this.handleSubmit()
    },
  },
  methods: {
    handleSubmit() {
      // remove previous validation classes and errors
      let refs = {}
      for (const children in this.$children) {
        refs = { ...refs, ...this.$children[children].$refs }
      }
      for (const refKey in refs) {
        if (refKey.endsWith('-input')) {
          refs[refKey].$el.classList.remove('is-invalid')
        }
        if (refKey.endsWith('-error')) {
          refs[`${refKey}`].classList.remove('d-flex')
          refs[`${refKey}`].classList.add('d-none')
        }
      }
      // validate form with swagger spects
      validateForm({ model: getModelValues(this.model), spec: this.spec })
        .then(() => {
          this.ifValid()
        })
        .catch(errors => {
          debugger
          console.log(errors)
          handleSwaggerValidationErrorMessages(errors, refs)
        })
    },
  },
}
</script>
