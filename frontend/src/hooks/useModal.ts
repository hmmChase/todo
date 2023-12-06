import { useState } from 'react';

// not used

const useModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  return [isModalOpen, toggleModal];
};

export default useModal;
