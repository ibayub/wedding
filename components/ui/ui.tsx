import React, { ReactNode } from 'react';

// Button Component
export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
  return (
    <button 
      {...props} 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {children}
    </button>
  );
};

// Input Component
export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <input 
      {...props} 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  );
};

// Label Component
export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ children, ...props }) => {
  return (
    <label {...props} className="block text-gray-700 text-sm font-bold mb-2">
      {children}
    </label>
  );
};

// Card Component (with Header, Content, Footer)
export const Card: React.FC<React.HTMLAttributes<HTMLDivElement> & { children: ReactNode }> = ({ children, className, ...props }) => {
  return <div className={`rounded overflow-hidden shadow-lg bg-white p-6 ${className}`} {...props}>{children}</div>;
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement> & { children: ReactNode }> = ({ children, className, ...props }) => {
  return <div className={`font-bold text-xl mb-4 ${className}`} {...props}>{children}</div>;
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLDivElement> & { children: ReactNode }> = ({ children, className, ...props }) => {
  return <h2 className={`text-2xl font-bold mb-4 ${className}`} {...props}>{children}</h2>;
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement> & { children: ReactNode }> = ({ children, className, ...props }) => {
  return <div className={`text-gray-700 text-base ${className}`} {...props}>{children}</div>;
};

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement> & { children: ReactNode }> = ({ children, className, ...props }) => {
  return <div className={`mt-4 ${className}`} {...props}>{children}</div>;
};

// Separator Component
export const Separator: React.FC = () => {
  return <hr className="my-4 border-gray-300" />;
};

// Dialog Component (with Header, Title, Content, and Description)
export const Dialog: React.FC<{ isOpen: boolean; onClose: () => void; children: ReactNode }> = ({ isOpen, onClose, children }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black
