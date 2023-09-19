export function getModelValues(model) {
  return Object.entries(model).reduce((acc, [key, { value }]) => {
    acc[key] = value
    return acc
  }, {})
}

export function handleSwaggerValidationErrorMessages(errors, refs) {
  errors.forEach(error => {
    const errorCopy = { ...error }
    // Remove first element of error array beacause stepname is always root
    errorCopy.trace.shift()
    // Join stepnames with a slash at the end
    let errorId = ''
    errorCopy.trace.forEach(el => {
      errorId += `${el.stepName}/`
    })
    // Remove the las slash
    errorId = errorId.slice(0, -1)
    const ref = refs[`${errorId}-input`]
    const errorRef = refs[`${errorId}-error`]
    if (ref) {
      // if there is an error, add error classes and custom error depending the case
      ref.$el.classList.add('is-invalid')
      errorRef.classList.value = 'd-flex text-danger'
      errorRef.innerText = handleErrorMessages(error)
    }
  })
  function handleErrorMessages(error) {
    let errorMsg = 'error'
    // TODO: Move messages to I18n
    function constraintsViolation() {
      switch (error.constraintName) {
        case 'minLength':
          errorMsg = `Error: minimo ${error.constraintValue} caracteres`
          break

        case 'maxLength':
          errorMsg = `Error: máximo ${error.constraintValue} caracteres`
          break

        case 'maximum':
          errorMsg = `Error: el valor máximo es ${error.constraintValue}`
          break

        case 'minimum':
          errorMsg = `Error: el valor minimo es ${error.constraintValue}`
          break

        case 'pattern':
          errorMsg = 'Error: Asegurate de ingresar un valor correcto'
          break

        default:
          errorMsg = `Error: No se encontro la validacion para el tipo ${error.constraintName}`
          break
      }
    }

    function typeMismatch() {
      errorMsg = `Error: El valor es un ${error.typeIs} y tiene que ser un ${error.typeShouldBe}`
    }

    switch (error.errorType) {
      case 'CONSTRAINTS_VIOLATION':
        constraintsViolation()
        break
      case 'TYPE_MISMATCH':
        typeMismatch()
        break

      default:
        break
    }

    return errorMsg
  }
}

export default {
  getModelValues,
  handleSwaggerValidationErrorMessages
}
