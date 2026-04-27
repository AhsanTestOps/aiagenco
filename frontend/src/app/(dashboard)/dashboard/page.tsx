'use client';

import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import BlogManagement from '@/components/dashboard/BlogManagement';

export default function DashboardPage() {
  const { user, isSuperAdmin } = useAuth();

  return (
    <ProtectedRoute>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="mb-2">Welcome, {user?.username}!</p>
        <p className="mb-4">Role: {user?.role}</p>
        
        {isSuperAdmin && (
          <div className="bg-blue-100 p-4 rounded mb-8">
            <p className="font-bold">⭐ Superadmin Access Enabled</p>
            <p>You have access to admin features</p>
          </div>
        )}

        {/* Blog Management Section */}
        <BlogManagement />
      </div>
    </ProtectedRoute>
  );
}
