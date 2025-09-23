import React from "react";
import { PiUserCircle } from "react-icons/pi";

const Avatar = ({ name, imageUrl, width, height }) => {
    let avatarName = "";
    if (name) {
        const splitName = name?.split(" ");
        if (splitName.length > 1) {
            avatarName = splitName[0][0] + splitName[1][0];
        } else {
            avatarName = splitName[0][0];
        }
    }

    const bgColor = [
        "bg-red-700 text-white",
        "bg-orange-700 text-white",
        "bg-amber-700 text-white",
        "bg-yellow-700 text-white",
        "bg-lime-700 text-white",
        "bg-green-700 text-white",
        "bg-cyan-700 text-white",
        "bg-sky-700 text-white",
        "bg-blue-700 text-white",
        "bg-indigo-700 text-white",
        "bg-violet-700 text-white",
        "bg-purple-700 text-white",
        "bg-fuchsia-700 text-white",
        "bg-pink-700 text-white",
        "bg-teal-700 text-white",
        "bg-slate-700 text-white"
    ];
    const randomNumber = Math.floor(Math.random() * 15);

    return (
        <div
            className={`text-slate-800 overflow-hidden rounded-full shadow border text-xl font-bold flex justify-center items-center mb-2`}
            style={{ width: width + "px", height: height + "px" }}
        >
            {imageUrl ? (
                <img
                    src={typeof (imageUrl) === "string" ? `http://localhost:5000/api/images/${imageUrl}` : URL.createObjectURL(imageUrl)}
                    width={width}
                    height={height}
                    alt={name}
                    style={{ objectFit: "cover" }}
                    className="overflow-hidden rounded-full w-full h-full"
                />
            ) : name ? (
                <div
                    style={{ width: width + "px", height: height + "px" }}
                    className={`overflow-hidden rounded-full flex justify-center items-center ${bgColor[randomNumber]}`}
                >
                    {avatarName}
                </div>
            ) : (
                <PiUserCircle size={width} />
            )}
        </div>
    );
};

export default Avatar;