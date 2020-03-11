import { action } from '@storybook/addon-actions';
import { Form } from 'antd';
import allCombos from '../../../.storybook/allCombos';
import TextArea from './TextArea';

export default { title: 'Atoms/TextArea', component: TextArea };

const data1 = {
  name: 'mock name',
  placeholder: [null, 'mock placeholder'],
  type: 'text',
  value: [null, 'mock value']
};

const actions = {
  onChange: action('onChange')
};

export const textArea = () => allCombos(TextArea, data1, actions);

// TextArea adds bottom margin when used in a form

const data2 = {
  name: 'mock name',
  placeholder: 'mock placeholder',
  type: 'text',
  value: 'mock value'
};

export const antForm = () => (
  <Form>
    <TextArea {...data2}></TextArea>
  </Form>
);
