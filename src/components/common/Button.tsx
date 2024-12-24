import React from 'react'
import { CgSpinner } from 'react-icons/cg'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
  disabled?: boolean
  className?: string
  isLoading?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  isLoading = false
}) => {
  const baseStyles = `px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2`
  
  const variantStyles: Record<string, string> = {
    primary: `bg-blue-600 hover:bg-blue-700 focus:ring-blue-500`,
    secondary: `bg-gray-600 hover:bg-gray-700 focus:ring-gray-500`,
    danger: `bg-red-600 hover:bg-red-700 focus:ring-red-500`,
    success: `bg-green-600 hover:bg-green-700 focus:ring-green-500`,
  }

  const disabledStyles = `opacity-50 cursor-not-allowed`

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${
        disabled ? disabledStyles : ''
      } ${className}`}
      disabled={disabled}
    >
      {isLoading ? <CgSpinner className='animate-spin text-2xl' /> : children}
    </button>
  )
}

export default Button
