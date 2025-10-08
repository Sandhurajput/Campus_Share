import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, AlertTriangle, Mail, Check, XCircle } from "lucide-react";

const getIcon = (type) => {
  switch (type) {
    case "accepted":
      return <CheckCircle size={24} className="text-green-500" />;
    case "reminder":
      return <AlertTriangle size={24} className="text-yellow-500" />;
    case "new":
      return <Mail size={24} className="text-blue-500" />;
    case "returned":
      return <Check size={24} className="text-lime-500" />;
    case "canceled":
      return <XCircle size={24} className="text-red-500" />;
    default:
      return <Mail size={24} className="text-gray-400" />;
  }
};

const NotificationItem = ({ data }) => {
  const navigate = useNavigate();
  const icon = getIcon(data.type);

  const handleClick = () => {
    navigate("/request"); 
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200"
    >
      <div className="flex flex-col flex-grow pr-4">
        <p className="flex items-center mb-1">
          <span className="flex items-center justify-center w-10 h-10 mr-3 rounded-full border-2 border-transparent hover:border-current text-xl transition-all duration-300 transform hover:scale-110">
            {icon}
          </span>
          <span className="text-lg font-semibold text-gray-800">{data.title}</span>
        </p>
        <p className="text-sm text-gray-500 ml-14">{data.message}</p>
      </div>

      <div className="flex flex-col items-end justify-start min-w-[80px] text-right">
        <span className="text-xs text-gray-400 font-medium mb-1 whitespace-nowrap">
          {data.time}
        </span>
        {data.isNew && (
          <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full tracking-wider animate-pulse">
            NEW
          </span>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
