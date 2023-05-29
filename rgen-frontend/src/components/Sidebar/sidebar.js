import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

function Sidebar() {
    return (
        <div className="flex flex-row justify-center items-center px-24 absolute w-1/4 left-0 top-16 bottom-0 bg-stone-300 shadow-md">
            <p className="">Sidebar</p>
        </div>
    );
}

export default Sidebar;