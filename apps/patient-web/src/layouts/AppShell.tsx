import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { ToastContainer } from '../components/ui/ToastContainer';

export const AppShell: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      <ToastContainer />

      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs md:hidden"
        />
      )}

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'md:ml-18' : 'md:ml-64'}`}
      >
        <Header onToggleSidebarMobile={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

        <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        <footer className="py-3 px-6 border-t border-slate-200 bg-white text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Nabha Telemedicine Hub</span>
            <span className="text-slate-300">•</span>
            <span>Civil Hospital Nabha, Punjab</span>
          </div>
          <div className="text-[11px] text-slate-400">
            National Health Mission & Rural Digital Health Initiative | Patient Portal v1.0
          </div>
        </footer>
      </div>
    </div>
  );
};
