var View = require('ampersand-view');
var FormView = require('ampersand-form-view');

module.exports = View.extend({
    template: [
      '<fieldset>',
        '<legend data-hook="legend"></legend>',        
        '<div data-hook="message-container" class="message message-below message-error">',
          '<p data-hook="message-text"></p>',
        '</div>',        
      '</fieldset>'
    ].join(''),
    bindings: {
        'name': {
            type: 'attribute',
            selector: 'fieldset',
            name: 'name'
        },
        'tabindex': {
            type: 'attribute',
            selector: 'input, textarea',
            name: 'tabindex'
        },
        'legend': [
            {
                hook: 'legend'
            },
            {
                type: 'toggle',
                hook: 'legend'
            }
        ],
        'message': {
            type: 'text',
            hook: 'message-text'
        },
        'showMessage': {
            type: 'toggle',
            hook: 'message-container'
        },

        'autofocus': {
            type: 'booleanAttribute',
            name: 'autofocus',
            selector: 'input, textarea'
        }
    },
    props: {
        name: 'string',
        placeholder: ['string', true, ''],
        legend: ['string', true, ''],
        required: ['boolean', true, true],
        readonly: ['boolean', true, false],
        shouldValidate: ['boolean', true, false],
        message: ['string', true, ''],
        requiredMessage: ['string', true, 'All of the below fields are required.'],
        validClass: ['string', true, 'fieldset-valid'],
        invalidClass: ['string', true, 'fieldset-invalid'],
        validityClassSelector: ['string', true, 'fieldset'],
        tabindex: ['number', true, 0]
    },
    derived: {
        valid: {
            cache: false,
            deps: ['inputValue'],
            fn: function () {
                return !this.runTests();
                for (var key in this._fieldViews) {
                   
                }
                return this.clean(res);
            }
},
        value: {
            fn: function () {
                var res = {};
                for (var key in this._fieldViews) {
                    if (this._fieldViews.hasOwnProperty(key)) {
                        // If field name ends with '[]', don't interpret
                        // as verbose form field...
                        if (key.match(/\[\]$/)) {
                            res[key] = this._fieldViews[key].value;
                        } else {
                            set(res, key, this._fieldViews[key].value);
                        }
                    }
                }
                return this.clean(res);
            },
            cache: false
        }
    },
    addField: FormView.prototype.addField,
    removeField: FormView.prototype.removeField,
    getField: FormView.prototype.removeField,
    setValue: FormView.prototype.setValues,
    setValues: FormView.prototype.setValues,
    checkValid: FormView.prototype.checkValid,
    beforeSubmit: FormView.prototype.beforeSubmit,
    update: FormView.prototype.beforeSubmit,
    remove: FormView.prototype.remove,
    handleSubmit: FormView.prototype.handleSubmit,
    reset: FormView.prototype.reset,
    clear: FormView.prototype.clear,
    render: FormView.prototype.render,
    renderField: FormView.prototype.renderField,
    getValue: FormView.prototype.getValue,
    setValue: FormView.prototype.setValue,
    getData: FormView.prototype.getData,
});

