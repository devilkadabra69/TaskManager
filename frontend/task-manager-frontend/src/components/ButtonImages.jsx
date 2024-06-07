import React from 'react'

function ButtonImages({
    src = "../assets/react.svg",
    alt = "this is an image",
    className = "",
    props
}) {
    return (
        <img src={src} alt={alt} className={`w-full h-full ${className}`} {...props} />
    )
}

export default ButtonImages