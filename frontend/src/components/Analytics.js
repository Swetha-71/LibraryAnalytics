import React, { useState, useEffect } from 'react';

const Analytics = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const data = [/* your 30 records */];
    const bookCounts = {};
    const overdueByBook = {};

    data.forEach(b => {
      bookCounts[b.bookId] = (bookCounts[b.bookId] || 0) + 1;
      if (!b.returnDate) overdueByBook[b.bookTitle] = (overdueByBook[b.bookTitle] || 0) + 1;
    });

    setStats({ bookCounts, overdueByBook, totalOverdue: Object.keys(overdueByBook).length });
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px' }}>
      <h1>📊 Advanced Analytics</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Top Borrowed Books */}
        <div>
          <h3>📖 Most Borrowed Books</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {Object.entries(stats.bookCounts || {}).sort((a,b) => b[1]-a[1]).slice(0,5).map(([bookId, count]) => (
              <li key={bookId} style={{ padding: '10px', background: '#f8f9fa', margin: '5px 0', borderRadius: '6px' }}>
                Book #{bookId}: <strong>{count}</strong> times
              </li>
            ))}
          </ul>
        </div>

        {/* Overdue Analysis */}
        <div>
          <h3>⚠️ Overdue Analysis</h3>
          <div style={{ background: '#fee', padding: '15px', borderRadius: '8px' }}>
            <strong>{stats.totalOverdue || 0}</strong> unique books overdue
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {Object.entries(stats.overdueByBook || {}).slice(0,5).map(([title, count]) => (
              <li key={title} style={{ padding: '8px', fontSize: '14px' }}>
                {title}: <span style={{ color: 'red', fontWeight: 'bold' }}>{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
