/* @flow */
import { ButtonGroup } from '../../../../../../library/Button';
import { FormField } from '../../../../../../library/Form';
import DemoForm from '../../components/DemoForm';

export default {
  id: 'form-field',
  title: 'FormField',
  description: `Use a [FormField](/components/form-field) to provide an accessible label
and other features as well as a more streamlined API.`,
  scope: { DemoForm, FormField, ButtonGroup },
  source: `
    <DemoForm>
      <FormField
        input={ButtonGroup}
        label="What is your preferred contact method?"
        caption="We promise not to spam you."
        name="contact"
        defaultChecked="none"
        required
        data={[
          { label: 'Email', value: 'email' },
          { label: 'Telephone', value: 'telephone' },
          { label: 'Text message', value: 'text' },
          { label: 'None', value: 'none' }
        ]} />
    </DemoForm>
  `
};
