import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import HotelManager from './components/HotelManager';
import SalesEntry from './components/SalesEntry';
import Billing from './components/Billing';
import Insights from './components/Insights';
import { ViewState, Hotel, DailySale, Payment } from './types';
import * as Storage from './services/storage';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [sales, setSales] = useState<DailySale[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  // Initial Load
  useEffect(() => {
    const loadedHotels = Storage.getHotels();
    const loadedSales = Storage.getSales();
    const loadedPayments = Storage.getPayments();
    setHotels(loadedHotels);
    setSales(loadedSales);
    setPayments(loadedPayments);
    setLoading(false);
  }, []);

  // Persistence Wrappers
  const updateHotels = (newHotels: Hotel[]) => {
    setHotels(newHotels);
    Storage.saveHotels(newHotels);
  };

  const updateSales = (newSales: DailySale[]) => {
    setSales(newSales);
    Storage.saveSales(newSales);
  };

  const updatePayments = (newPayments: Payment[]) => {
    setPayments(newPayments);
    Storage.savePayments(newPayments);
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-brand-50">
        <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 bg-brand-200 rounded-full mb-4"></div>
            <div className="h-4 w-32 bg-brand-200 rounded"></div>
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard hotels={hotels} sales={sales} />;
      case 'hotels':
        return <HotelManager hotels={hotels} onUpdate={updateHotels} />;
      case 'sales':
        return <SalesEntry hotels={hotels} sales={sales} onUpdateSales={updateSales} />;
      case 'billing':
        return <Billing hotels={hotels} sales={sales} payments={payments} onUpdatePayments={updatePayments} />;
      case 'insights':
        return <Insights hotels={hotels} sales={sales} />;
      default:
        return <Dashboard hotels={hotels} sales={sales} />;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

export default App;