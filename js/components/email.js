Fliplet.FormBuilder.field('email', {
  name: 'Email input',
  category: 'Text inputs',
  props: {
    placeholder: {
      type: String
    }
  },
  validations: {
    value: {
      required: window.validators.required,
      email: window.validators.email
    }
  },
});