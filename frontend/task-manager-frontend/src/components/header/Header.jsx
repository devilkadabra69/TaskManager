import React from "react";
import { Link, NavLink } from "react-router-dom"
import homeIcon from '../../assets/home.svg';
import todoIcon from '../../assets/todo.svg';
import timeTableIcon from '../../assets/timetable.svg';
import notificationIcon from '../../assets/notification.svg';
import profileIcon from "../../assets/profile.svg";
import settingsIcon from "../../assets/settings.svg"
import lightIcon from "../../assets/lightMode.svg"



function Header() {
    return (
        <header className="h-full py-4 bg-accentColor min-w-[4%] w-[4%] shadow-lg flex flex-col items-center justify-start">
            <div className="flex flex-col my-auto items-center gap-3 justify-start flex-grow w-[40%]">
                <NavLink to={"/"} className={({ isActive }) =>
                    `${isActive ? "bg-secondPrimaryColor rounded-md" : ""}
                    p-1
                    `}>
                    <img src={homeIcon} alt="Home Icon" className="invert" />
                </NavLink>

                <NavLink to={"/todo"} className={({ isActive }) =>
                    `${isActive ? "bg-secondPrimaryColor rounded-md" : ""}
                    p-1
                    `}>
                    <img src={todoIcon} alt="Home Icon" className="invert" />
                </NavLink>

                <NavLink to={"/timetable"} className={({ isActive }) =>
                    `${isActive ? "bg-secondPrimaryColor rounded-md" : ""}
                    p-1
                    `}>
                    <img src={timeTableIcon} alt="Home Icon" className="invert" />
                </NavLink>

                <NavLink to={"/notification"} className={({ isActive }) =>
                    `${isActive ? "bg-secondPrimaryColor rounded-md" : ""}
                    p-1
                    `}>
                    <img src={notificationIcon} alt="Home Icon" className="invert" />
                </NavLink>
                <div className="border border-gray-400 my-2 w-full"></div>
            </div>
            <div className="flex flex-col my-auto items-center gap-3 justify-end w-[40%]">
                <div className="border border-gray-400 my-2 w-full"></div>
                <Link to={"/"} className="">
                    <img src={lightIcon} alt="Light Icon" className="invert" />
                </Link>
                <NavLink to={"/settings"} className={({ isActive }) =>
                    `${isActive ? "bg-secondPrimaryColor rounded-md" : ""}
                    p-1
                    `}>
                    <img src={settingsIcon} alt="Settings Icon" className="invert" />
                </NavLink>
                <NavLink to={"/profile"} className={({ isActive }) =>
                    `${isActive ? "bg-secondPrimaryColor rounded-md" : ""}
                    p-1
                    `}>
                    <img src={profileIcon} alt="Profile Icon" className="invert" />
                </NavLink>
            </div>
        </header>
    );
}
export default Header;