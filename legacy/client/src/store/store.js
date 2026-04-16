import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

export const useProjectStore = create((set) => ({
  activeProject: null,
  projects: [],
  setProjects: (projects) => set({ projects }),
  setActiveProject: (project) => set({ activeProject: project }),
}));
