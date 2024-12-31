"use client"
import React, { ReactNode } from 'react';
import { CgClose } from 'react-icons/cg';
import Card from './Card';

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
      className="fixed inset-0 bg-zinc-800 bg-opacity-80 flex justify-center items-center"
      onClick={handleClose}
    >
      <Card>
        <button
          onClick={onClose}
          className=" text-2xl"
        >
          <CgClose/>
        </button>
        {children}
      </Card>
    </div>
  );
};

export default Modal;
