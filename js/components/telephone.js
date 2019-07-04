Fliplet.FormBuilder.field('telephone', {
  name: 'Telephone input',
  category: 'Text inputs',
  props: {
    placeholder: {
      type: String
    }
  },
  validations: {
    value: {
      required: window.validators.required
    }
  }
});
