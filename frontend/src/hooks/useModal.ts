import { useState } from 'react';

const useModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  return [isModalOpen, toggleModal];
};

export default useModal;
