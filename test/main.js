var test = require('tape');
var suite = require('tape-suite');
var viewConventions = require('ampersand-view-conventions');
var FieldsetView = require('../ampersand-fieldset-view');
var InputView = require('ampersand-input-view');

test('Fieldset tests', function (t) {
    var fieldOptions = {
        template: '<div><form data-hook="field-container"></form></div>',
        autoAppend: true,
        name: 'textField',
        fields: function () {
            return [
                new InputView({ name: 'input', autoRender: true })
            ];
        }
    };

    var testFieldset = FieldsetView.extend({
        initialize: function (opts) {
            FieldsetView.prototype.initialize.apply(this, arguments);
            this.getField('input').parent = this;
        }
    })
    /*t.test('a set of some tests', function (t) {
        t.equal(true, true);
        t.end();
    });

    t.end();*/

    viewConventions.view(suite.tape, testFieldset, fieldOptions);
    viewConventions.formField(suite.tape, testFieldset, fieldOptions, { input: 'one' });
});




