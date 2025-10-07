import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
    Search, ChevronDown, Calendar, BookOpen, Cpu, Shirt, Layers, X, GripHorizontal,
    CheckCircle, Clock, PenTool, User, Zap, Star, MessageSquare, Send, CalendarCheck,
    Edit, Trash2, ChevronLeft, ChevronRight, MoreVertical, Loader2, Info
} from 'lucide-react';


const CURRENT_USER_ID = "owner_amit_varma"; 
const MOCK_USER_NAME = "Amit Varma"; 
const MOCK_USER_USERNAME = "@amit_v"; 

const CURRENT_USER = {
    id: CURRENT_USER_ID,
    name: MOCK_USER_NAME,
    username: MOCK_USER_USERNAME
};

const categories = ['All', 'Books', 'Electronics', 'Clothing', 'Sports', 'Stationery'];
const categoryIcons = {
    'All': Layers, 'Books': BookOpen, 'Electronics': Cpu, 'Clothing': Shirt, 'Sports': GripHorizontal, 'Stationery': PenTool
};

const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
};

const initialItemsData = [
    { id: 1, name: "Introduction to Algorithms", category: "Books", status: "Available", reservedUntil: null,
      images: [
        "https://placehold.co/400x250/2563EB/ffffff?text=Algorithm+Book+Front",
        "https://placehold.co/400x250/1E40AF/ffffff?text=Algorithm+Book+Back"
      ], detail: "A classic text for computer science students.",
      owner: "Jane Doe", ownerUsername: "@janedoe", condition: "Good", rating: 4.8, availableUntil: "2025-11-20", ownerId: "owner_jane_doe" },
    
    { id: 2, name: "MacBook Pro Charger", category: "Electronics", status: "Available", reservedUntil: null,
      images: [
        "https://placehold.co/400x250/059669/ffffff?text=Power+Adapter+Main"
      ], detail: "Original 87W USB-C power adapter.", 
      owner: "Alex Smith", ownerUsername: "@asmith", condition: "New", rating: 4.5, availableUntil: "2025-12-15", ownerId: "owner_alex_smith" },
      
    { id: 3, name: "High-Quality Soccer Ball", category: "Sports", status: "Unavailable", reservedUntil: "2025-10-10", 
      images: [
        "https://placehold.co/400x250/F59E0B/ffffff?text=Soccer+Ball",
        "https://placehold.co/400x250/D97706/ffffff?text=Ball+Detail"
      ], detail: "Size 5, official match ball.",
      owner: "Priya Sharma", ownerUsername: "@priya_s", condition: "Fair", rating: 4.2, availableUntil: "2025-10-05", ownerId: "owner_priya_sharma" },

    { id: 4, name: "Noise-Cancelling Headphones", category: "Electronics", status: "Reserved", reservedUntil: "2025-11-01",
      images: [
        "https://placehold.co/400x250/7C3AED/ffffff?text=Headphones+View",
        "https://placehold.co/400x250/5B21B6/ffffff?text=Headphones+Case",
        "https://placehold.co/400x250/7C3AED/ffffff?text=Headphones+Detail"
      ], detail: "Sony WH-1000XM4, for study focus.",
      owner: "Rajesh Kumar", ownerUsername: "@rajesh_k", condition: "Excellent", rating: 4.9, availableUntil: "2025-12-30", ownerId: "owner_rajesh_kumar" },

    { id: 5, name: "Tailwind CSS Handbook", category: "Books", status: "Available", reservedUntil: null,
      images: [
        "https://placehold.co/400x250/DB2777/ffffff?text=CSS+Book+Cover"
      ], detail: "A comprehensive guide to utility-first CSS.", 
      owner: MOCK_USER_NAME, ownerUsername: MOCK_USER_USERNAME, condition: "New", rating: 4.7, availableUntil: null, ownerId: CURRENT_USER_ID },

    { id: 9, name: "Wireless Mouse (Ergo)", category: "Electronics", status: "Available", reservedUntil: null,
      images: [ 
        "https://placehold.co/400x250/3B82F6/ffffff?text=Ergonomic+Mouse" 
      ], detail: "Silent click, great for late night work.", 
      owner: MOCK_USER_NAME, ownerUsername: MOCK_USER_USERNAME, condition: "Excellent", rating: 4.6, availableUntil: "2026-02-01", ownerId: CURRENT_USER_ID },

    { id: 10, name: "Yoga Mat and Straps", category: "Sports", status: "Reserved", reservedUntil: "2025-10-20",
      images: [
        "https://placehold.co/400x250/EC4899/ffffff?text=Yoga+Mat",
        "https://placehold.co/400x250/E11D48/ffffff?text=Mat+Detail",
        "https://placehold.co/400x250/BE185D/ffffff?text=Strap"
      ], detail: "Non-slip TPE material, dark pink.", 
      owner: MOCK_USER_NAME, ownerUsername: MOCK_USER_USERNAME, condition: "Good", rating: 4.3, availableUntil: "2026-03-01", ownerId: CURRENT_USER_ID },

    { id: 6, name: "Winter Jacket (Large)", category: "Clothing", status: "Available", reservedUntil: null,
      images: [
        "https://placehold.co/400x250/374151/ffffff?text=Jacket+Front",
        "https://placehold.co/400x250/374151/ffffff?text=Jacket+Back"
      ], detail: "Warm, waterproof jacket, good for travel.",
      owner: "Neha Singh", ownerUsername: "@neha_travels", condition: "Good", rating: 4.4, availableUntil: "2025-11-25", ownerId: "owner_neha_singh" },

    { id: 7, name: "Mechanical Keyboard", category: "Electronics", status: "Reserved", reservedUntil: "2025-10-25",
      images: [
        "https://placehold.co/400x250/14B8A6/ffffff?text=Keyboard+Top",
        "https://placehold.co/400x250/0D9488/ffffff?text=Keyboard+Keys"
      ], detail: "Tactile brown switches, great for coding.",
      owner: "Siddharth Jain", ownerUsername: "@sid_coder", condition: "Good", rating: 4.6, availableUntil: "2025-12-01", ownerId: "owner_siddharth_jain" },

    { id: 8, name: "Professional Drawing Pencils Set", category: "Stationery", status: "Available", reservedUntil: null,
      images: [
        "https://placehold.co/400x250/EAB308/ffffff?text=Pencils+Set",
        "https://placehold.co/400x250/EAB308/ffffff?text=Pencils+Detail"
      ], detail: "Set of 12 graphite pencils.",
      owner: "Deepa Menon", ownerUsername: "@art_deepa", condition: "New", rating: 4.1, availableUntil: "2026-01-31", ownerId: "owner_deepa_menon" },

    { id: 11, name: "Architectural Drawing Set", category: "Stationery", status: "Available", reservedUntil: null,
      images: [
        "https://placehold.co/400x250/10B981/ffffff?text=Set+View+1",
        "https://placehold.co/400x250/059669/ffffff?text=Set+View+2",
        "https://placehold.co/400x250/047857/ffffff?text=Set+View+3",
        "https://placehold.co/400x250/065F46/ffffff?text=Set+View+4",
        "https://placehold.co/400x250/022C22/ffffff?text=Set+View+5"
      ], detail: "Protractor, ruler, compass, and stencils.",
      owner: "Kriti Desai", ownerUsername: "@kriti_draws", condition: "New", rating: 5.0, availableUntil: "2026-06-01", ownerId: "owner_kriti_desai" },

    { id: 12, name: "Formal Black Trousers", category: "Clothing", status: "Available", reservedUntil: null,
      images: [
        "https://placehold.co/400x250/1F2937/ffffff?text=Trousers+Front",
        "https://placehold.co/400x250/4B5563/ffffff?text=Trousers+Fabric"
      ], detail: "Size 32, dark black, slim fit.",
      owner: "Veer Singh", ownerUsername: "@veer_style", condition: "Good", rating: 3.9, availableUntil: "2025-11-01", ownerId: "owner_veer_singh" },

    { id: 13, name: "The Alchemist (Novel)", category: "Books", status: "Reserved", reservedUntil: "2025-11-15",
      images: [
        "https://placehold.co/400x250/9D174D/ffffff?text=Alchemist+Book"
      ], detail: "Famous philosophical novel by Paulo Coelho.",
      owner: "Sanya Roy", ownerUsername: "@sanya_reader", condition: "Fair", rating: 4.5, availableUntil: "2025-12-01", ownerId: "owner_sanya_roy" },
];

const SimpleCalendar = ({ selectedDate, setSelectedDate }) => {
    const today = useMemo(() => new Date(), []);
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const firstDayOfMonth = useMemo(() => new Date(currentYear, currentMonth, 1).getDay(), [currentMonth, currentYear]);
    const daysInMonth = useMemo(() => new Date(currentYear, currentMonth + 1, 0).getDate(), [currentMonth, currentYear]);

    const handleDateClick = (date) => {
        const newDate = new Date(currentYear, currentMonth, date);
        const formattedNewDate = formatDate(newDate);
        if (selectedDate === formattedNewDate) setSelectedDate(null);
        else setSelectedDate(formattedNewDate);
    };

    const changeMonth = (delta) => {
        const newDate = new Date(currentYear, currentMonth + delta, 1);
        setCurrentMonth(newDate.getMonth());
        setCurrentYear(newDate.getFullYear());
    };

    const isDateSelected = (date) => selectedDate === formatDate(new Date(currentYear, currentMonth, date));
    const isToday = (date) => new Date(currentYear, currentMonth, date).toDateString() === today.toDateString();

    return (
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-3 text-sm font-bold text-gray-700">
                <button onClick={() => changeMonth(-1)} className="p-1 rounded hover:bg-gray-200 transition" aria-label="Previous month">
                    <ChevronLeft size={18} className="text-gray-500" />
                </button>
                <span className="text-indigo-600">
                    {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
                </span>
                <button onClick={() => changeMonth(1)} className="p-1 rounded hover:bg-gray-200 transition" aria-label="Next month">
                    <ChevronRight size={18} className="text-gray-500" />
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <span key={day} className="font-bold text-gray-500 text-sm">{day.charAt(0)}</span>)}
                {[...Array(firstDayOfMonth)].map((_, i) => <div key={`empty-${i}`} className="p-1"></div>)}
                {[...Array(daysInMonth)].map((_, i) => {
                    const date = i + 1;
                    const isSel = isDateSelected(date);
                    const isT = isToday(date);
                    return (
                        <button 
                            key={i} 
                            className={`p-1.5 rounded-xl transition-colors text-sm cursor-pointer border-2 ${
                                isSel ? 'bg-indigo-600 text-white font-extrabold border-indigo-700 shadow-md' : 
                                isT ? 'bg-indigo-100 text-indigo-700 font-bold border-indigo-200 hover:bg-indigo-200' : 
                                'text-gray-800 hover:bg-indigo-50 border-transparent'
                            }`}
                            onClick={() => handleDateClick(date)}
                            aria-pressed={isSel}
                        >
                            {date}
                        </button>
                    );
                })}
            </div>
            <div className="mt-4 text-center">
                <button onClick={() => setSelectedDate(null)} className="text-xs text-red-500 hover:text-red-700 font-medium">Clear Date</button>
            </div>
        </div>
    );
};

// --- Toast Component for Notifications ---
const Toast = ({ message, type, onClose }) => {
    const icon = type === 'success' ? CheckCircle : Info;
    const color = type === 'success' ? 'bg-green-500' : 'bg-red-500';

    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed bottom-5 right-5 z-50 p-4 rounded-xl text-white shadow-xl flex items-center space-x-3 transition-opacity duration-300 ${color} animate-bounce-in`}>
            {React.createElement(icon, { size: 24 })}
            <span className="font-medium">{message}</span>
            <button onClick={onClose} className="ml-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition">
                <X size={18} />
            </button>
        </div>
    );
};

const DeleteConfirmationModal = ({ item, onClose, onDelete }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative transform transition-all duration-300 scale-100" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-red-600 mb-3 flex items-center"><Trash2 size={24} className='mr-2' /> Confirm Deletion</h3>
            <p className="text-gray-700 mb-6">Are you sure you want to permanently delete **{item.name}**?</p>
            <div className="flex justify-end space-x-3">
                <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                    Cancel
                </button>
                <button onClick={() => onDelete(item.id)} className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition shadow-lg shadow-red-300/50">
                    Yes, Delete
                </button>
            </div>
        </div>
    </div>
);

const EditItemModal = ({ item, onClose, onSave, categories }) => {
    const [formData, setFormData] = useState(item);

    const CONDITION_OPTIONS = ['New', 'Excellent', 'Good', 'Fair', 'Used', 'Worn']; 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 sm:p-8 relative transform transition-all duration-300 scale-100 mx-auto mt-10 mb-8" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center"><Edit size={24} className='mr-2 text-indigo-600' /> Edit Item: {item.name}</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Item Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-indigo-500" />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select id="category" name="category" value={formData.category} onChange={handleChange} required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 appearance-none bg-white">
                            {categories.filter(c => c !== 'All').map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="detail" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="detail" name="detail" value={formData.detail} onChange={handleChange} rows="3" required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-indigo-500" />
                    </div>

                    <div>
                        <label htmlFor="availableUntil" className="block text-sm font-medium text-gray-700">Available Until (Optional)</label>
                        <input type="date" id="availableUntil" name="availableUntil" value={formData.availableUntil || ''} onChange={handleChange}
                            className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-indigo-500" />
                    </div>
                    
                    <div>
                        <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condition</label>
                        <select id="condition" name="condition" value={formData.condition} onChange={handleChange} required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 appearance-none bg-white">
                            {CONDITION_OPTIONS.map(cond => (
                                <option key={cond} value={cond}>{cond}</option>
                            ))}
                        </select>
                    </div>

                    <p className="text-sm text-gray-500 pt-2">Note: Image management is not supported in this simple editor.</p>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-300/50">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const BorrowRequestModal = ({ item, onClose, onSubmit, currentUser }) => {
    const [reason, setReason] = useState('');
    const today = formatDate(new Date(Date.now()));
    const tomorrow = formatDate(new Date(Date.now() + 86400000)); 
    
    const defaultReturn = item.availableUntil || formatDate(new Date(Date.now() + 7 * 86400000)); 

    const [borrowDate, setBorrowDate] = useState(tomorrow);
    const [returnDate, setReturnDate] = useState(defaultReturn);
    const [mobile, setMobile] = useState('');
    const [aadhaar, setAadhaar] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!reason.trim() || !borrowDate || !returnDate || !mobile.trim() || !aadhaar.trim()) {
            setError('All fields are required.');
            return;
        }
        if (!/^\d{10}$/.test(mobile)) { 
            setError('Mobile number must be 10 digits.');
            return;
        }
        if (!/^\d{12}$/.test(aadhaar)) { 
            setError('Aadhaar number must be 12 digits.');
            return;
        }
        if (item.availableUntil && returnDate > item.availableUntil) {
            setError(`Return date cannot exceed owner's available date: ${item.availableUntil}`);
            return;
        }
        if (borrowDate < tomorrow) {
             setError(`Borrow date must be tomorrow or later.`);
            return;
        }
        if (returnDate < borrowDate) {
             setError(`Return date cannot be before the borrow date.`);
            return;
        }
        
        setIsSubmitting(true);

        setTimeout(() => {
            const requestData = {
                itemId: item.id,
                itemName: item.name,
                requester: currentUser,
                reason,
                borrowDate,
                returnDate,
                mobile: mobile.replace(/(\d{6})(\d{4})/, '$1-XXXX'), 
                aadhaar: aadhaar.replace(/(\d{8})(\d{4})/, 'XXXX-XXXX-$2'), 
                requestTime: new Date().toISOString()
            };
            console.log("Simulating Request Submission:", requestData);
            onSubmit(item.id, requestData);
            setIsSubmitting(false);
            onClose();
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start bg-black bg-opacity-60 backdrop-blur-sm overflow-y-auto p-4 sm:p-8" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 sm:p-8 relative transform transition-all duration-300 scale-100 mx-auto mt-20 mb-8" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Borrow Request:</h2>
                <h3 className="text-indigo-600 font-semibold mb-6 truncate">{item.name}</h3>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
                         <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100 flex-1">
                            <User size={20} className="text-indigo-600 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-bold text-gray-800">My Name: {currentUser.name}</p>
                                <p className="text-xs text-indigo-500">My Username: {currentUser.username}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-200 flex-1">
                            <User size={20} className="text-gray-600 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-gray-800">Owner: {item.owner}</p>
                                <p className="text-xs text-gray-500">{item.ownerUsername}</p>
                            </div>
                        </div>
                    </div>

                    {item.availableUntil && (
                        <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-xl border border-yellow-100 mb-4">
                            <CalendarCheck size={20} className="text-yellow-600 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-gray-800">Owner says item is available until:</p>
                                <p className="text-xs text-yellow-600 font-bold">{item.availableUntil}</p>
                            </div>
                        </div>
                    )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                            <MessageSquare size={16} className="inline mr-1" /> Why do you need this item?
                        </label>
                        <textarea id="reason" value={reason} onChange={(e) => setReason(e.target.value)} rows="3" required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 transition"
                            placeholder="Reason for borrowing" />
                    </div>

                    <div className='flex space-x-4'>
                        <div className='flex-1'>
                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">Mobile Number:</label>
                            <input type="tel" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)}
                                placeholder="10-digit number" maxLength={10}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 transition" />
                        </div>
                        <div className='flex-1'>
                            <label htmlFor="aadhaar" className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number:</label>
                            <input type="text" id="aadhaar" value={aadhaar} onChange={(e) => setAadhaar(e.target.value)}
                                placeholder="12-digit Aadhaar" maxLength={12}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 transition" />
                        </div>
                    </div>

                    <div className='flex space-x-4'>
                        <div className='flex-1'>
                            <label htmlFor="borrowDate" className="block text-sm font-medium text-gray-700 mb-2">Required Borrow Date:</label>
                            <input type="date" id="borrowDate" value={borrowDate} onChange={(e) => setBorrowDate(e.target.value)}
                                min={tomorrow} max={item.availableUntil || undefined}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 transition" />
                        </div>
                        <div className='flex-1'>
                            <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-2">Return Date:</label>
                            <input type="date" id="returnDate" value={returnDate} onChange={(e) => setReturnDate(e.target.value)}
                                min={borrowDate} max={item.availableUntil || undefined}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 transition" />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm mt-2 flex items-center"><Info size={16} className='mr-1' /> {error}</p>}

                    <button type="submit" disabled={isSubmitting}
                        className="w-full flex items-center justify-center py-3 bg-indigo-600 text-white font-bold rounded-xl transition-all hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed shadow-lg shadow-indigo-300/50">
                        {isSubmitting ? (
                            <>
                                <Loader2 size={20} className="animate-spin mr-2" /> Sending Request...
                            </>
                        ) : (
                            <>
                                <Send size={20} className="mr-2" /> Send Borrow Request
                            </>
                        )}
                    </button>
                </form> 
            </div>
        </div>
    );
};

const ItemCard = ({ item, itemRequests, setItemRequests, currentUser, canBorrow, handleCancelRequest, setItemToEdit, setItemToDelete }) => { 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const isRequested = !!itemRequests[item.id];
    const isUnavailable = item.status === 'Unavailable';
    const isReserved = item.status === 'Reserved';
    const isOwner = currentUser.id === item.ownerId;
    const totalImages = item.images.length;

    const showNavigation = totalImages > 1; 

    let statusClass = 'text-green-600 bg-green-100', buttonText = 'Borrow Now', buttonClass = 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-300/50', statusIcon = CheckCircle;
    let cardOverlay = '', isDisabled = isUnavailable || isReserved || !canBorrow;
    let currentStatusText = item.status;

    if (isUnavailable) { statusClass = 'text-red-600 bg-red-100'; buttonText = 'Unavailable'; buttonClass = 'bg-gray-400 cursor-not-allowed shadow-none'; statusIcon = X; cardOverlay = 'opacity-50 grayscale'; }
    else if (isReserved) { statusClass = 'text-yellow-600 bg-yellow-100'; buttonText = 'Reserved'; buttonClass = 'bg-yellow-500 cursor-not-allowed shadow-none'; statusIcon = Clock; }
    else if (isRequested) { currentStatusText = 'Requested'; statusClass = 'text-blue-600 bg-blue-100'; buttonText = 'Cancel Request'; buttonClass = 'bg-red-600 hover:bg-red-700 shadow-red-300/50'; statusIcon = Clock; isDisabled = false; }
    else if (isOwner) { currentStatusText = item.status; buttonText = 'Manage Item'; buttonClass = 'bg-gray-600 hover:bg-gray-700 shadow-gray-300/50'; statusIcon = Layers; isDisabled = false; }


    const handleBorrowClick = () => {
        if (isOwner) {
            setItemToEdit(item);
            return;
        }

        if (isRequested) {
            handleCancelRequest(item.id);
        } else if (canBorrow && !isRequested && !isUnavailable && !isReserved) {
            setIsModalOpen(true);
        } else {
            console.log("Cannot borrow: Item status or user not logged in.");
        }
    };

    const handleRequestSubmit = useCallback((itemId, requestData) => {
        setItemRequests(prev => ({ ...prev, [itemId]: requestData }));
    }, [setItemRequests]);
    
    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    };
    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        setItemToEdit(item);
        setIsMenuOpen(false);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        setItemToDelete(item);
        setIsMenuOpen(false);
    };

    const handleCancelMenuClick = (e) => {
        e.stopPropagation();
        setIsMenuOpen(false); 
    };

    const IconComponent = statusIcon;

    return (
        <>
          
            <div className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.03] border border-gray-100 hover:border-indigo-300 relative flex flex-col h-full`}>
                
                <div className={`h-56 relative ${cardOverlay}`}>
                    <img src={item.images[currentImageIndex]} alt={item.name} className="w-full h-full object-cover" 
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x250/E0E7FF/4F46E5?text=Image+Error"; }} />
                    
                    {showNavigation && (
                        <>
                            <button onClick={prevImage} className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 p-1.5 rounded-full text-white hover:bg-opacity-70 transition z-10'>
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={nextImage} className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 p-1.5 rounded-full text-white hover:bg-opacity-70 transition z-10'>
                                <ChevronRight size={20} />
                            </button>
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
                                {item.images.map((_, index) => (
                                    <div key={index} className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === index ? 'bg-white scale-110' : 'bg-gray-400 bg-opacity-70'}`}></div>
                                ))}
                            </div>
                        </>
                    )}

                    {isOwner && (
                        <>
                            <div className="absolute top-3 left-3 z-10 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                Your Item
                            </div>

                            <div className="absolute top-3 right-3 z-10" onClick={(e) => e.stopPropagation()}>
                                <button onClick={() => setIsMenuOpen(prev => !prev)} className="p-1 bg-white rounded-full shadow-lg hover:bg-gray-100 transition">
                                    <MoreVertical size={20} className='text-gray-700' />
                                </button>
                                {isMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 z-20 transform scale-95 origin-top-right animate-fade-in-down">
                                        <div className="py-1">
                                            <button onClick={handleEditClick} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition rounded-t-xl">
                                                <Edit size={16} className="mr-2" /> Edit
                                            </button>
                                            <button onClick={handleDeleteClick} className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 hover:text-red-700 transition">
                                                <Trash2 size={16} className="mr-2" /> Delete
                                            </button>
                                            <div className='border-t border-gray-100 my-1'></div>
                                            <button onClick={handleCancelMenuClick} className="flex items-center w-full px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 transition rounded-b-xl">
                                                <X size={16} className="mr-2" /> Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div> 

                <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 truncate mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-3">{item.detail}</p> 
                    <div className="flex items-center justify-between text-sm mb-4">
                        <span className={`flex items-center text-sm font-semibold px-3 py-1.5 rounded-full ${statusClass}`}>
                            <IconComponent size={16} className="mr-1.5" /> {currentStatusText}
                        </span>
                        <span className="flex items-center text-gray-600 font-medium">
                            <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" /> {item.rating}
                        </span>
                    </div>

                    <div className="text-sm text-gray-600 space-y-2 mb-4">
                        <p className="flex items-center"><User size={14} className="mr-2 text-indigo-500" /> Owner: <span className='font-medium ml-1'>{item.owner}</span></p>
                        <p className="flex items-center"><PenTool size={14} className="mr-2 text-indigo-500" /> Condition: <span className='font-medium ml-1'>{item.condition}</span></p>
                        {item.reservedUntil && (
                            <p className="flex items-center text-yellow-700"><Calendar size={14} className="mr-2" /> Reserved Until: <span className='font-medium ml-1'>{item.reservedUntil}</span></p>
                        )}
                    </div>
                    
                    <div className='mt-auto pt-2'>
                        <button 
                            onClick={handleBorrowClick}
                            disabled={isDisabled} 
                            className={`w-full py-3 text-white font-bold rounded-xl transition-all transform hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed ${buttonClass} shadow-md`}>
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
            
            {isModalOpen && (
                <BorrowRequestModal 
                    item={item} 
                    onClose={() => setIsModalOpen(false)} 
                    onSubmit={handleRequestSubmit} 
                    currentUser={CURRENT_USER} 
                />
            )}
        </>
    );
};

export default function App() {
    const [items, setItems] = useState(initialItemsData);
    const [itemRequests, setItemRequests] = useState({}); 

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showMyItems, setShowMyItems] = useState(false);

    const [itemToEdit, setItemToEdit] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [showToast, setShowToast] = useState(null);


    const fireToast = (message, type = 'success') => {
        setShowToast({ message, type });
        setTimeout(() => setShowToast(null), 3000);
    };

    const handleSaveEdit = (updatedItem) => {
        setItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
        setItemToEdit(null);
        fireToast(`Item '${updatedItem.name}' updated successfully!`);
    };

    const handleDeleteItem = (itemId) => {
        setItems(prev => prev.filter(item => item.id !== itemId));
        setItemToDelete(null);
        fireToast('Item deleted successfully.', 'error');
    };

    const handleCancelRequest = (itemId) => {
        setItemRequests(prev => {
            const newRequests = { ...prev };
            delete newRequests[itemId];
            fireToast('Borrow request cancelled.', 'success');
            return newRequests;
        });
    };

    const filteredItems = useMemo(() => {
        let list = items;

        if (showMyItems) {
            list = list.filter(item => item.ownerId === CURRENT_USER_ID);
        }

        if (selectedCategory !== 'All') {
            list = list.filter(item => item.category === selectedCategory);
        }

        if (searchTerm.trim()) {
            const lowerCaseSearch = searchTerm.toLowerCase().trim();
            list = list.filter(item => 
                item.name.toLowerCase().includes(lowerCaseSearch) ||
                item.detail.toLowerCase().includes(lowerCaseSearch) ||
                item.owner.toLowerCase().includes(lowerCaseSearch)
            );
        }

        return list;
    }, [items, searchTerm, selectedCategory, showMyItems]);

    const totalItemsCount = useMemo(() => items.length, [items]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <style jsx global>{`
                .animate-fade-in-down {
                    animation: fadeInDown 0.3s ease-out;
                }
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-bounce-in {
                    animation: bounceIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                @keyframes bounceIn {
                    from { transform: scale(0.5); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                /* Unique style for the centered text */
                .unique-header-text {
                    /* Subtle Gradient Text */
                    background-image: linear-gradient(45deg, #1E3A8A, #4F46E5); /* dark blue to indigo */
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    /* Text Shadow for a slight lift */
                    text-shadow: 0 4px 6px rgba(79, 70, 229, 0.2);
                    /* Optional: Add a subtle hover effect if interaction was needed */
                    transition: all 0.3s ease-in-out;
                }
            `}</style>
            
            <header className="bg-white shadow-lg sticky top-0 z-40">
               
                <div className="w-full mx-auto px-0 py-4 flex flex-col sm:flex-row justify-between items-center">
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-2 sm:mb-0 flex items-center">
                    </h1>
                </div>
            </header>

           
            <main className="w-full mx-auto px-4 py-8">
                
                <h2 className="text-3xl font-extrabold text-center mb-10 unique-header-text tracking-tight">
                    Explore Shared Resources
                </h2>
                
                <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg mb-8 border border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
                        <div className="relative flex-grow">
                            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, description, or owner..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-3 pl-12 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 transition"
                            />
                        </div>

                        <div className="relative w-full md:w-56">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full p-3 pr-10 border border-gray-300 rounded-xl appearance-none bg-white focus:border-indigo-500 focus:ring-indigo-500 transition"
                            >
                                {categories.map(cat => {
                                    const CatIcon = categoryIcons[cat];
                                    return (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    );
                                })}
                            </select>
                            <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>

                        <button
                            onClick={() => setShowMyItems(prev => !prev)}
                            className={`flex items-center justify-center p-3 font-semibold rounded-xl transition-colors w-full md:w-48 ${
                                showMyItems 
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-300/50 hover:bg-indigo-700'
                                    : 'bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                            }`}
                        >
                            {showMyItems ? <X size={20} className='mr-2' /> : <User size={20} className='mr-2' />}
                            {showMyItems ? 'Show All Items' : 'Show My Items'}
                        </button>
                    </div>
                </div>

                {filteredItems.length === 0 ? (
                    <div className="text-center p-12 bg-white rounded-2xl shadow-lg border border-gray-100">
                        <Info size={40} className="mx-auto text-indigo-400 mb-4" />
                        <p className="text-xl font-medium text-gray-700">No items match your criteria.</p>
                        <p className="text-gray-500">Try adjusting your search term or filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"> {/* gap-6 से gap-4 किया गया है */}
                        {filteredItems.map(item => (
                            <ItemCard
                                key={item.id}
                                item={item}
                                itemRequests={itemRequests}
                                setItemRequests={setItemRequests}
                                currentUser={CURRENT_USER}
                                canBorrow={CURRENT_USER_ID !== item.ownerId}
                                handleCancelRequest={handleCancelRequest}
                                setItemToEdit={setItemToEdit}
                                setItemToDelete={setItemToDelete}
                            />
                        ))}
                    </div>
                )}
            </main>

            {itemToEdit && (
                <EditItemModal
                    item={itemToEdit}
                    onClose={() => setItemToEdit(null)}
                    onSave={handleSaveEdit}
                    categories={categories}
                />
            )}

            {itemToDelete && (
                <DeleteConfirmationModal
                    item={itemToDelete}
                    onClose={() => setItemToDelete(null)}
                    onDelete={handleDeleteItem}
                />
            )}

            {showToast && (
                <Toast 
                    message={showToast.message} 
                    type={showToast.type} 
                    onClose={() => setShowToast(null)} 
                />
            )}
        </div>
    );
}
