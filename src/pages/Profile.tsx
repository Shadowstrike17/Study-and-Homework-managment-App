import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">User Profile</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{user.username}</h2>
            <p className="text-gray-600">Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Subscription Plan</h3>
          <p className="text-lg">Current Plan: <span className="font-semibold text-primary">Basic</span></p>
          <button className="btn-primary">Upgrade to Pro</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;