import { useState } from 'react';
import { Bell } from 'lucide-react'

export default function Notifications() {
    const [dropDown, setdropDown] = useState(false);
    const makeTab = () => {
        setdropDown(!dropDown);
    }
    return (
        <div className="notifications">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative" onClick={() => makeTab()}>
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    3
                </span>
            </button>
            { 
                dropDown && (
                
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                        <a href="./notifications" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            Notifications
                        </a>
                        <a href="./notifications" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            Notifications
                        </a>
                        <a href="./notifications" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            Notifications
                        </a>
                    </div>

            )
                

            }
        </div>
    )
}