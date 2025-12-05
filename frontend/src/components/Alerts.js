import React, { useState, useEffect } from 'react';

const Alerts = () => {
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Your actual data - 13 overdue books
    const allBorrowings = [ /* paste your full 30 records JSON here */ ];
    const overdue = allBorrowings.filter(b => !b.returnDate);
    
    setOverdueBooks(overdue);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading alerts...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px' }}>
      <h2>🚨 Overdue Book Alerts ({overdueBooks.length})</h2>
      
      {overdueBooks.length === 0 ? (
        <div style={{ color: 'green', fontSize: '18px' }}>✅ No overdue books!</div>
      ) : (
        <div style={{ background: '#fee', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <strong>⚠️ Action Required:</strong> {overdueBooks.length} books overdue. Contact students immediately.
        </div>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr style={{ background: '#d32f2f', color: 'white' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Student</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Book</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Borrowed</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Days Overdue</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {overdueBooks.slice(0, 15).map((book, index) => {
            const daysOverdue = Math.floor(Math.random() * 30) + 1; // Simulate days
            return (
              <tr key={book.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '12px' }}><strong>#{book.studentId}</strong></td>
                <td style={{ padding: '12px' }}>{book.bookTitle}</td>
                <td style={{ padding: '12px' }}>{book.borrowDate}</td>
                <td style={{ 
                  padding: '12px', 
                  color: daysOverdue > 14 ? 'red' : 'orange',
                  fontWeight: 'bold'
                }}>
                  {daysOverdue} days
                </td>
                <td style={{ padding: '12px' }}>
                  <button style={{
                    background: '#d32f2f', color: 'white', 
                    border: 'none', padding: '6px 12px', 
                    borderRadius: '4px', cursor: 'pointer'
                  }}>
                    📧 Send Reminder
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Alerts;
