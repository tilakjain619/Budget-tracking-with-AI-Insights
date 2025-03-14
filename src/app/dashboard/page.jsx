"use client";
import useAuthStore from "@/store/authStore";

import React from 'react'

const Dashboard = () => {
    const { user, logout } = useAuthStore();

    return (
      <div>
        {user ? (
          <div>
            <h1>Welcome, {user.name}</h1>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <p>Please login</p>
        )}
      </div>
    );
}

export default Dashboard;

