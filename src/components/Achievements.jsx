import React from 'react'

const stats = [
  { id: 1, label: 'إجتماع', value: '+ 20', icon: '🗓️' },
  { id: 2, label: 'المشاركات الدولية', value: '2', icon: '🌍' },
  { id: 3, label: 'الفعاليات', value: '+ 90', icon: '🎉' },
  { id: 4, label: 'شريك', value: '+ 35', icon: '🤝' },
  { id: 5, label: 'المستفيدون', value: '+ 3400', icon: '👥' },
  { id: 6, label: 'القوة الإعلامية', value: '+ 108K', icon: '📢' },
  { id: 7, label: 'جوائز', value: '1', icon: '🏆' },
  { id: 8, label: 'عصف ذهني', value: '1', icon: '💡' },
  { id: 9, label: 'مجتمع واتساب', value: '+ 200', icon: '💬' },
  { id: 10, label: 'اللجان الفرعية', value: '3', icon: '👨‍👩‍👧‍👦' },
  { id: 11, label: 'المجالس', value: '2', icon: '🏛️' },
  { id: 12, label: 'المشاهدات', value: '+ 500K', icon: '👀' }
]

export default function Achievements(){
  return (
    <section id="achievements" className="open-data">
      <div className="open-data-inner">
        <h2 className="open-data-title">حــصـاد مجلس رأس الخيمة للشباب</h2>
        <p className="open-data-sub">فبراير - أغسطس 2025</p>
        <div className="stats-grid">
          {stats.map(s => (
            <div key={s.id} className="stat-card">
              <div className="stat-icon" aria-hidden>
                <span style={{fontSize:'2.2rem'}}>{s.icon}</span>
              </div>
              <div className="stat-body">
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
