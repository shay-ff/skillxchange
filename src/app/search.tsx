import { Search } from 'lucide-react';
import { useState } from 'react';

export default function search(){
    const [expanded, setExpanded] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    interface FormEvent {
        preventDefault: () => void;
    }

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        console.log(searchValue);
    }
    return(
        <div className="flex items-center justify-end">
      <form 
        onSubmit={handleSubmit}
        className={`flex items-center bg-white rounded-full border text-black  overflow-hidden transition-all duration-300 ease-in-out ${
          expanded ? 'w-64' : 'w-10'
        }`}
      >
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="p-2 hover:bg-gray-100 transition-colors"
        >
          <Search size={20} className="text-black" />
        </button>
        
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          className={`w-full px-2 py-1 outline-none transition-all duration-300 ${
            expanded ? 'w-full opacity-100' : 'w-0 opacity-0'
          }`}
        />
      </form>
    </div>
    )
}