import React, { useState, createContext, useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import ReservationModal from './ReservationModal';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

export const ReservationContext = createContext({
  openReservation: (preselectedSuite = '') => {},
});

export const useReservation = () => useContext(ReservationContext);

function LayoutContent({ children }) {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSuite, setSelectedSuite] = useState('');

  const openReservation = (suiteName = '') => {
    setSelectedSuite(typeof suiteName === 'string' ? suiteName : '');
    setIsModalOpen(true);
  };

  return (
    <ReservationContext.Provider value={{ openReservation }}>
      <div className={`min-h-screen w-full transition-colors duration-500 flex flex-col justify-between selection:bg-[#c5a880] selection:text-[#090a0b] ${
        theme === 'light'
          ? 'bg-[#f7f5f0] text-[#1c1917]'
          : 'bg-[#090a0b] text-[#f5f2eb]'
      }`}>
        {/* Persistent Floating Luxury Header */}
        <Header onOpenReservation={() => openReservation()} />

        {/* Dynamic Page Content */}
        <main className="flex-grow w-full">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Global Reservation / Stay Inquiry Modal */}
        <ReservationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          preselectedSuite={selectedSuite}
        />
      </div>
    </ReservationContext.Provider>
  );
}

export default function Layout({ children }) {
  return (
    <ThemeProvider>
      <LayoutContent>{children}</LayoutContent>
    </ThemeProvider>
  );
}

