import React from 'react';
import NotificationItem from './NotificationItem';

const notificationsData = [
  {
    id: 1,
    type: 'accepted',
    title: 'Request Accepted!',
    message: 'Sarah accepted your request for Programming Textbook',
    time: '2 hours ago',
    isNew: true,
  },
  {
    id: 2,
    type: 'reminder',
    title: 'Return Reminder',
    message: 'Please return HDMI Cable to Mike by tomorrow',
    time: '5 hours ago',
    isNew: true,
  },
  {
    id: 3,
    type: 'new',
    title: 'New Request',
    message: 'Emma wants to borrow your Scientific Calculator',
    time: '1 day ago',
    isNew: false,
  },
  {
    id: 4,
    type: 'returned',
    title: 'Item Returned',
    message: 'David returned your Tennis Racket. Rate your experience!',
    time: '2 days ago',
    isNew: false,
  },
  {
    id: 5,
    type: 'canceled',
    title: 'Request Canceled',
    message: 'John canceled his request for the Drawing Board',
    time: '3 days ago',
    isNew: false,
  },
];

const Notification = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent 
    bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
    tracking-wide drop-shadow-md">
  Your Notifications
</h2>


        <div className="space-y-4">
          {notificationsData.map((notification) => (
            <NotificationItem key={notification.id} data={notification} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
