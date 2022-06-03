import Modal from './Modal';

const story = { component: Modal, title: 'REUSEABLE/Modal' };

export const modal = () => (
  <Modal
    close={function (): void {
      throw new Error('Function not implemented.');
    }}
  >
    <div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
    </div>
  </Modal>
);

export default story;
