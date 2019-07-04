Fliplet.FormBuilder.field('input', {
  name: 'Text input',
  category: 'Text inputs',
  props: {
    placeholder: {
      type: String
    }
  },
  validations: {
    value: {
      minLength: window.validators.minLength(5),
      required: window.validators.required
    }
  }
});
