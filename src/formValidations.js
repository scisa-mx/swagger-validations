const swaggerValidator = require('swagger-object-validator')
/* swaggerValidator.Handler(####) can be a URL (swagger.json/yml) */
// This code fetches a Swagger file from the SigloNet API and stores it in sessionStorage.
// It is used to validate requests to the SigloNet API.
const config = {
  allowAdditionalProperties: true,
}

let validator;

// eslint-disable-next-line consistent-return
const fetchSigloSwagger = (axiosInstance, url) => {
  return new Promise((resolve, reject) => {
    let sigloSwagger = window.sessionStorage.getItem('sigloSwagger')
    if (sigloSwagger) {
      resolve(JSON.parse(sigloSwagger))
    }
    axiosInstance
      .get(url)
      .then(response => {
        window.sessionStorage.setItem('sigloSwagger', JSON.stringify(response.data))
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}

export const initializeValidations = (axiosInstance, url) => {
  fetchSigloSwagger(axiosInstance, url).then(sigloSwagger => {
    validator = new swaggerValidator.Handler(sigloSwagger, config)
  })
}

const validateForm = (model, spec) => {
  return new Promise((resolve, reject) => {
    /* eslint-disable-next-line */
    const specRef = validator.swaggerSpec['_rejectionHandler0'].components.schemas[spec]
    validator.validateModel(model, specRef, (err, result) => {
      if (result.errors.length > 0) {
        reject(result.errors)
      } else {
        resolve()
      }
    })
  })
}

export default validateForm
