import { FormGeneratorValidator } from "./formValidator/FormGeneratorValidator.vue";

export const swaggerValidations = {
    install(Vue) {
        Vue.component("swagger-validations", FormGeneratorValidator);
    }
};

export default swaggerValidations