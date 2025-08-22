import React from 'react';
import TopBar from './TopBar';
import Header from './Header';
import Footer from './Footer';
import Chatbot from '../common/Chatbot';
import GDPRBottomBar from '../common/GDPRBottomBar';
import ScrollToTop from '../common/ScrollToTop';
import ScrollTopButton from '../common/ScrollTopButton';
import SearchModal from '../common/SearchModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header onSearchOpen={() => setIsSearchModalOpen(true)} />
      
      <main>
        <ScrollToTop />
        <ScrollTopButton />
        {children}
      </main>

      <Footer />
      <Chatbot />
      
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />

      <GDPRBottomBar />
    </div>
  );
};

export default Layout;