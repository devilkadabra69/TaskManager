import React, { useState } from 'react';
import { Image, IndividualTags, Button } from "../index.js";
import TodoCardImage from "../../assets/todoImage.png";
import DeleteLogoImage from "../../assets/deleteLogo.svg";
import EditLogoImage from "../../assets/editLogo.svg";
import ShareLogoImage from "../../assets/shareLogo.svg";
import PreviousLogoImage from "../../assets/previousLogo.svg";
import NextLogoImage from "../../assets/nextLogo.svg";

function TodoCardXL({ title = "Untitled", content = "", tags = [], className = "" }) {

    return (
        <section className={`shadow-lg px-4 py-2 ${className}`}>
            <div className='flex items-start justify-start h-full py-2 gap-4'>
                <div className='min-w-[10%] w-[10%] flex items-center justify-center h-full'>
                    <Image src={TodoCardImage} alt='This is image in todo tab' className='w-[60%] h-auto p-2' />
                </div>
                <div className='flex flex-col justify-start items-start min-w-[70%] w-[70%] px-2 gap-2'>
                    <h1 className='font-bold text-2xl'>{title}</h1>
                    <p>{content}</p>
                    <div className='w-full flex flex-wrap items-center justify-start gap-2'>
                        {tags?.map((tag, index) => (
                            <IndividualTags
                                key={`${tag.name}-${index}`}
                                tagText={tag.name}
                                classNameOut={`bg-${tag.color}-200 border border-${tag.color}-600`}
                                classNameIn={`text-${tag.color}-600`}
                            />
                        ))}
                    </div>
                </div>
                <div className='flex flex-col items-center justify-between gap-2 h-full w-[20%]'>
                    <div className='flex items-center justify-center w-full gap-2'>
                        <Button
                            text='Delete'
                            className='w-1/2 font-bold text-lg border border-deleteButtonColorSec bg-deleteButtonColorPrim text-deleteButtonColorSec p-2'
                            children={<Image src={DeleteLogoImage} className="w-4 h-4" />}
                        />
                        <Button
                            text='Edit'
                            className='w-1/2 font-bold text-lg border border-editButtonColorSec bg-editButtonColorPrim text-editButtonColorSec p-2'
                            children={<Image src={EditLogoImage} className="w-4 h-4" />}
                        />
                    </div>
                    <Button
                        text='Share With Others'
                        className='w-full font-bold text-xl border border-black p-2'
                        children={<Image src={ShareLogoImage} className='w-4 h-4' />}
                    />
                    <div className='flex items-center justify-center w-full gap-2'>
                        <Button
                            text='Previous Task'
                            className='w-1/2 font-bold text-xl border border-black p-2'
                            children={<Image src={PreviousLogoImage} className='w-4 h-4' />}
                        />
                        <Button
                            text='Next Task'
                            className='w-1/2 font-bold text-xl border border-black p-2'
                            children={<Image src={NextLogoImage} className='w-4 h-4' />}
                            innerClassExtension='flex-row-reverse justify-evenly'
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TodoCardXL;
