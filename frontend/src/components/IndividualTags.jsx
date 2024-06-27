import React from 'react';

function IndividualTags({ tagText, classNameOut = "", classNameIn = "" }) {
    return (
        <div className={`px-4 rounded-md ${classNameOut}`}>
            <p className={`text-center font-bold ${classNameIn}`}>
                {tagText}
            </p>
        </div>
    );
}

export default IndividualTags;
