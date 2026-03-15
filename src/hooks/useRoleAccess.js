// src/hooks/useRoleAccess.js
import { useAuth } from '../context/AuthContext';

export function useRoleAccess(requiredRole) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return { hasAccess: false, reason: 'Not authenticated' };
  }

  if (!user) {
    return { hasAccess: false, reason: 'User not loaded' };
  }

  if (user.role !== requiredRole) {
    return { hasAccess: false, reason: 'Insufficient permissions' };
  }

  return { hasAccess: true };
}