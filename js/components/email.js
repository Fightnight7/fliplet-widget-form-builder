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
      email: window.validators.email,
      required: window.validators.required
    }
  }
});