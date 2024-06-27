import React from 'react';

const Button = React.forwardRef(({ text = "Untitled", className = "", innerClassExtension = "", children, ...props }, ref) => {
    return (
        <button className={`p-2 ${className}`} {...props} ref={ref}>
            <div className={`flex justify-center items-center space-x-2 ${innerClassExtension}`}>
                {children && <div className='flex-shrink-0'>{children}</div>}
                <p className='text-base font-medium'>{text}</p>
            </div>
        </button>
    );
});

export default Button;
