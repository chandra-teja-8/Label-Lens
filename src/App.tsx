import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ProductProvider } from './context/ProductContext';
import { InspectionProvider } from './context/InspectionContext';
import { NotificationProvider } from './context/NotificationContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { NewInspection } from './pages/NewInspection';
import { ScanPackage } from './pages/ScanPackage';
import { AIAnalysis } from './pages/AIAnalysis';
import { ProductDetails } from './pages/ProductDetails';
import { ComplianceRules } from './pages/ComplianceRules';
import { InspectionHistory } from './pages/InspectionHistory';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

export const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('dashboard');

  return (
    <div className="app-container">
      {/* Sidebar with 9 Primary Destinations */}
      <Sidebar currentPage={currentPage} onNavigate={(p) => setCurrentPage(p)} />

      {/* Main Content Area */}
      <div className="main-content">
        <Header currentPage={currentPage} onNavigate={(p) => setCurrentPage(p)} />

        <main className="page-wrapper">
          {currentPage === 'dashboard' && <Dashboard onNavigate={(p) => setCurrentPage(p)} />}
          {currentPage === 'new-inspection' && <NewInspection />}
          {currentPage === 'scan-package' && <ScanPackage onNavigate={(p) => setCurrentPage(p)} />}
          {currentPage === 'ai-analysis' && <AIAnalysis />}
          {currentPage === 'product-details' && <ProductDetails />}
          {currentPage === 'compliance-rules' && <ComplianceRules />}
          {currentPage === 'inspection-history' && (
            <InspectionHistory onNavigate={(p) => setCurrentPage(p)} />
          )}
          {currentPage === 'reports' && <Reports />}
          {currentPage === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ProductProvider>
        <InspectionProvider>
          <NotificationProvider>
            <AppContent />
          </NotificationProvider>
        </InspectionProvider>
      </ProductProvider>
    </ThemeProvider>
  );
};

export default App;
