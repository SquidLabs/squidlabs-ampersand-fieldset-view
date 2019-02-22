var View = require('ampersand-view');
var InputView = require('ampersand-input-view');
var FormView = require('ampersand-form-view');
var some = require('lodash/some');
var concat = require('lodash/concat');
var set = require('lodash/set');

module.exports = View.extend({
    initialize: function (opts) {
        FormView.prototype.initialize.apply(this, arguments);
        if (opts.value) this.setValue(opts.value);
    },
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
        el: 'element',
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
            fn: function () {
                return !some(concat(this._fieldViewsArray , this), function (fieldView) {
                    return fieldView.runTests();
                });
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
    getField: FormView.prototype.getField,
    setValue: function (data) {
        for (var name in data) {
            if (data.hasOwnProperty(name)) {
                FormView.prototype.setValue.call(this, name, data[name]);
            }
        }
    },
    setValues: FormView.prototype.setValues,
    checkValid: FormView.prototype.checkValid,
    beforeSubmit: FormView.prototype.beforeSubmit,
    update: function () {
        if (this.parent) this.parent.update(this);
    },
    remove: FormView.prototype.remove,
    handleSubmit: FormView.prototype.handleSubmit,
    reset: FormView.prototype.reset,
    clear: FormView.prototype.clear,
    clean: FormView.prototype.clean,
    getErrorMessage: InputView.prototype.getErrorMessage,
    runTests: InputView.prototype.runTests,
    render: function () {
        this.renderWithTemplate(this);

        if (this.autoAppend) {
            this.fieldContainerEl = this.query(this.fieldContainerEl || '[datahook~=field-container') || this.el;
        }
        this._fieldViewsArray.forEach(function renderEachField(fV) {
            this.renderField(fV, true);
        }, this);
    },
    renderField: FormView.prototype.renderField,
    getValue: FormView.prototype.getValue,
    getData: FormView.prototype.getData,

});

