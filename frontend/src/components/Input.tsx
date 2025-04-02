import React, { forwardRef } from 'react'

interface InputProps {
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

const Input = React.memo(
  forwardRef<HTMLInputElement, InputProps>(
    ({ type = 'text', placeholder, value, onChange, className = '', style, onClick }, ref) => {
      console.log('Input render')
      return (
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onClick={onClick}
          style={style}
          className={`border border-gray-300 outline-none ${className}`}
        />
      )
    }
  )
)

export default Input
