# swagger-validations v1.0
Npm package for vue 2.0 for validating forms via swagger 3.0

## Getting Started

This package has mainly two uses.
1. Generate the form via swagger and use the validations inside
2. Provide the form that will be validated within the swagger validation

## Dependencies
1. Axios
2. "swagger-object-validator": "^1.4.5"

## Usage
Start by initializing the swagger file that will be used for the validations
This must be run before using any form validator
Right now it only works by getting a swagger file from an url, it does not support a local swagger file
```
## App.vue
import { initializeValidations } from 'swagger-validations'

export default {
    initializeValidations(axiosInstance, `https://localhost:5001/swagger/v1/swagger.json`)
}
```

After init you can use either validations

### Form Generator Validator
The model is the object that will be validated
The spec is the name inside the swagger which the object will be validated against
if-valid is the function that will be submited (Callback)
the update is needed to update the model when changes occur when the user inputs
```
<template>
    <form-generator-validator
        :model="band"
        spec="SpidClasifTransTypeDTO_V2"
        :if-valid="onSubmit"
        @update:value="value = $event"
    />
</template>

<script>
import FormGeneratorValidator from 'swagger-validations'
export default {
  components: {
    FormGeneratorValidator,
  },
}
</script>
```

### Form Validator
TODO: Missing docs
The spec is the name of the object in swagger which the model will be validated against
if-valid is the callback function that will be called after submitting the form
Model is the object that will be validated
```
<template>

    <form-validator
        :spec="'AddressDTO_V2'"
        :if-valid="saveAddress"
        :model="dataToValidate"
        :validate="validate"
        :inside-component="false"
    >

        <b-button
            size="sm"
            variant="primary"
            @click="submitForm"
        >
            Submit
        </b-button>
    </form-validator>
</template>
<script>

import { FormValidator } from 'swagger-validations'
export default {
  components: {
    FormValidator,
  },
}

</script>
```

## Local usage
1. Generate the package with `npm pack`
2. Use this file in the other project package-json `swagger-validations: "file:./swagger-validations-0.1.1.tgz"`

## Usando el paquete
1. Antes de usar cualquier validacion se tiene que llamar el initializeValidations de formValidations.js
