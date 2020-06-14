import { action } from '@storybook/addon-actions';
import allCombos from '../../../.storybook/allCombos';
import PopupModal from './PopupModal';

export default { title: 'Components|Atoms/Popup Modal', component: PopupModal };

const children = <div>Children</div>;
const footer = <div>Footer</div>;

const actions = {
  onCancel: action('click'),
};

const data1 = {
  children: children,
  footer: null,
  title: '',
  visible: true,
  width: '20rem',
};

export const base = () => allCombos(PopupModal, data1, actions);

const data2 = {
  children: children,
  footer: footer,
  title: 'title',
  visible: true,
  width: '20rem',
};

export const full = () => allCombos(PopupModal, data2, actions);

const data3 = {
  children: children,
  title: 'title',
  visible: true,
  width: '20rem',
};

export const defaultFooter = () => allCombos(PopupModal, data3, actions);

const data4 = {
  children: children,
  title: 'title',
  visible: true,
};

export const defaultWidth = () => allCombos(PopupModal, data4, actions);

const data5 = {
  children: children,
  title: 'title',
  visible: false,
};

export const notVisable = () => allCombos(PopupModal, data5, actions);
