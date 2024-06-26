import React from 'react'

function TodoCardSM({ title, trimmed_content = [], completeBy }) {
    return (
        <div className='w-full border border-deleteButtonColorSec hover:border-deleteButtonColorPrim transition-all duration-150 p-2 flex flex-col items-start justify-center mb-2'>
            <h1 className='text-xl font-bold'>
                {title}
            </h1>
            <ul className='px-2'>
                {trimmed_content.map(content => (
                    <li key={content + content}>{content}</li>
                ))}
            </ul>
            <p className='text-sm italic'>{completeBy}</p>
        </div>
    )
}

export default TodoCardSM;