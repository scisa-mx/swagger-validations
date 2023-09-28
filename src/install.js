import { FormGeneratorValidator } from "./formValidator/FormGeneratorValidator.vue";

const FormGeneratorValidator1 = {
    install(Vue, options) {
     Vue.component("hello-world", FormGeneratorValidator);
    }
   };

export default FormGeneratorValidator1