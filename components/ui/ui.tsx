import React, { forwardRef } from 'react';

// Button Component
export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
  return (
    <button 
      {...props} 
      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {children}
    </button>
  );
};

// Input Component with forwardRef to handle ref
export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    );
  }
);

Input.displayName = 'Input'; // Setting a display name for debugging

// Label Component
export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ children, ...props }) => {
  return (
    <label {...props} className="block text-gray-700 text-sm font-bold mb-2">
      {children}
    </label>
  );
};

// Card Component (with Header, Content, Footer)
export const Card: React.FC<{ children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return <div className={`rounded overflow-hidden shadow-lg bg-white p-6 ${className}`} {...props}>{children}</div>;
};

export const CardHeader: React.FC<{ children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return <div className={`font-bold text-xl mb-4 ${className}`} {...props}>{children}</div>;
};

export const CardTitle: React.FC<{ children: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className, ...props }) => {
  return <h2 className={`text-2xl font-bold mb-4 ${className}`} {...props}>{children}</h2>;
};

export const CardContent: React.FC<{ children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return <div className={`text-gray-700 text-base ${className}`} {...props}>{children}</div>;
};

export const CardFooter: React.FC<{ children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return <div className={`mt-4 ${className}`} {...props}>{children}</div>;
};

// Separator Component
export const Separator: React.FC = () => {
  return <hr className="my-4 border-gray-300" />;
};

// Dialog Component (with Header, Title, Content, and Description)
export const Dialog: React.FC<{ isOpen: boolean, onClose: () => void, children: React.ReactNode }> = ({ isOpen, onClose, children }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        <div className="bg-white p-6 rounded-lg shadow-lg z-10">{children}</div>
      </div>
    )
  );
};

export const DialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="text-lg font-bold mb-4">{children}</div>;
};

export const DialogTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h3 className="text-2xl font-bold mb-4">{children}</h3>;
};

export const DialogContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="text-base mb-4">{children}</div>;
};

export const DialogDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p className="text-gray-600 mb-4">{children}</p>;
};
