import React from 'react'

function Button({
    ref,
    text = "Untitled",
    className = "",
    props,
    children
}) {
    return (
        <button className={`bg-blue-600 text-white p-2 ${className}`} {...props} ref={ref}>
            {children} {text}
        </button>
    )
}

export default React.forwardRef(Button);