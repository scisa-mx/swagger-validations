<template>
  <b-form-input
    ref="inputRef"
    :size="size"
    placeholder="0.00"
    type="text"
    @focus="$event.target.select()"
  />
</template>

<script>
import { watch } from '@vue/composition-api'
import { useCurrencyInput } from 'vue-currency-input'

export default {
  name: 'CurrencyInput',
  props: {
    value: {
      type: Number,
      default() {
        return 0
      },
    },
    select: {
      type: Boolean,
      default() {
        return false
      },
    },
    options: {
      type: Object,
      default() {
        return {
          locale: 'en-US',
          currency: 'USD',
          currencyDisplay: 'hidden',
          precision: 2,
          hideCurrencySymbolOnFocus: false,
          hideGroupingSeparatorOnFocus: false,
          hideNegligibleDecimalDigitsOnFocus: false,
          autoDecimalDigits: false,
          autoSign: true,
          useGrouping: true,
          accountingSign: false,
        }
      },
    },
    precision: {
      type: Number,
      default() {
        return 2
      },
    },
    size: {
      type: String,
      default() {
        return ''
      },
    },
  },
  setup(props) {
    const { inputRef, setValue } = useCurrencyInput({
      ...props.options,
      precision: props.precision,
    })

    watch(
      () => props.value,
      value => {
        setValue(value)
      },
    )

    watch(
      () => props.select,
      value => {
        if (value) {
          inputRef.value.$el.focus()
          inputRef.value.$el.select()
        }
      },
    )

    return { inputRef }
  },
}
</script>
