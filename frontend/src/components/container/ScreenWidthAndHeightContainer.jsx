import React from "react";

function ScreenWidthAndHeightContainer({ children }) {
    return <section className="h-[90%] mx-auto bg-green-500 flex">
        {children}
    </section>
}
export default ScreenWidthAndHeightContainer;