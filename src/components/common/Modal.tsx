"use client"
import React, { ReactNode } from 'react';
import { CgClose } from 'react-icons/cg';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
      onClick={handleClose}
    >
      <div className="bg-white rounded-lg shadow-lg w-2/6 p-6">
        <button
          onClick={onClose}
          className="text-gray-600 text-2xl"
        >
          <CgClose/>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
