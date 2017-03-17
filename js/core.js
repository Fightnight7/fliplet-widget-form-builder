Fliplet.FormBuilder = (function () {
  var fields = [];
  var components = {};

  function name(component) {
    return 'fl' + component.charAt(0).toUpperCase() + component.slice(1);
  }

  return {
    field: function (componentName, component) {
      component.template = Fliplet.Widget.Templates['templates.components.field']({
        template: Fliplet.Widget.Templates['templates.components.' + componentName]()
      });

      componentName = name(componentName);
      components[componentName] = component;

      _.extend(component.props, {
        name: {
          type: String,
          required: true
        },
        label: {
          type: String,
          default: component.name || 'Label text'
        }
      });

      Vue.component(componentName, component);
    },
    fields: function () {
      return Object.keys(components);
    },
    configuration: function (componentName, configurationComponent) {
      component.template = Fliplet.Widget.Templates['templates.configurations.' + componentName];
      componentName = name(componentName);

      Vue.component(componentName + 'Config', _.assign({}, _.pick(components[componentName], [
        'props'
      ]), configurationComponent));
    }
  };
})();