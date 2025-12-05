import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const Dashboard = () => {
  const [data, setData] = useState({ total: 0, overdue: 0 });
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/borrowings')
      .then(response => {
        const borrowingsData = response.data;
        setBorrowings(borrowingsData);
        setData({
          total: borrowingsData.length,
          overdue: borrowingsData.filter(b => !b.returnDate).length
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Dashboard API Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={loadingStyle}>Loading dashboard...</div>;
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', marginBottom: '30px', textAlign: 'center' }}>📊 Library Analytics Dashboard</h1>
      
      <div style={metricsGrid}>
        <MetricCard title="Total Borrowings" value={data.total} color="#4CAF50" icon="📚" />
        <MetricCard title="Overdue Books" value={data.overdue} color="#f44336" icon="⚠️" />
        <MetricCard title="On Time" value={data.total - data.overdue} color="#2196F3" icon="✅" />
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2 style={sectionTitle}>Recent Activity</h2>
        <RecentTable borrowings={borrowings.slice(-10).reverse()} />
      </div>
    </div>
  );
};

// Helper components (all inside same file)
const MetricCard = ({ title, value, color, icon }) => (
  <div style={{
    background: `linear-gradient(135deg, ${color}20, ${color}10)`,
    padding: '30px', borderRadius: '20px', textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: `2px solid ${color}20`
  }}>
    <div style={{ fontSize: '48px', marginBottom: '10px' }}>{icon}</div>
    <div style={{ fontSize: '36px', fontWeight: 'bold', color }}>{value}</div>
    <div style={{ color: '#666', fontSize: '16px', marginTop: '5px' }}>{title}</div>
  </div>
);

const RecentTable = ({ borrowings }) => (
  <div style={{ background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <th style={tableHeader}>Student</th><th style={tableHeader}>Book</th><th style={tableHeader}>Date</th><th style={tableHeader}>Status</th>
        </tr>
      </thead>
      <tbody>
        {borrowings.map(b => (
          <tr key={b.id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={tableCell}><strong>#{b.studentId}</strong></td>
            <td style={tableCell}>{b.bookTitle}</td>
            <td style={tableCell}>{b.borrowDate}</td>
            <td style={tableCellStatus(b.returnDate)}>
              {b.returnDate ? '✅ On Track' : '⚠️ Overdue'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Styles
const loadingStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', fontSize: '24px', color: '#666' };
const metricsGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '40px' };
const sectionTitle = { color: '#333', marginBottom: '20px', fontSize: '28px' };
const tableHeader = { padding: '20px 15px', textAlign: 'left', fontWeight: '600' };
const tableCell = { padding: '20px 15px' };
const tableCellStatus = (returnDate) => ({ padding: '20px 15px', fontWeight: 'bold', color: returnDate ? '#4CAF50' : '#f44336' });

export default Dashboard;  // ← THIS FIXES THE ERROR
