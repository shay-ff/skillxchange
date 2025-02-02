import { Bell } from 'lucide-react'

export default function Notifications() {
    return (
        <div className="notifications">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    3
                </span>
            </button>
        </div>
    )
}