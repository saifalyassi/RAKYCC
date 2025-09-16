import React from 'react'

const EVENTS = [
  {
    title: 'المناظرة الشبابية: هل تساهم السياحة التراثية في تعزيز الهوية الوطنية أم تسليعها؟',
    date: '14 أبريل 2025',
    attendees: '50 مشارك',
    notes: 'مناظرة لتعزيز الحوار بين الشباب.'
  },
  {
    title: 'التمشية مع المصورين',
    date: '18 أبريل 2025',
    attendees: '15 مشارك',
    notes: 'نشاط ميداني للتصوير وتبادل الخبرات.'
  },
  {
    title: 'رواد الصناعة',
    date: '5 مايو 2025',
    partners: 'مجلس شباب رواد الصناعة والتكنولوجيا',
    attendees: 'أكثر من 100 مشارك',
    notes: 'فعالية لتمكين الشباب في مجالات الصناعة والتقنية.'
  },
  {
    title: 'المخيم الصيفي',
    date: 'يوليو 2025 (الشهر كامل)',
    attendees: 'أكثر من 800 مستفيد',
    notes: 'يضم معظم الورش والأنشطة الشبابية (بوكيه الورد، الذكاء الاصطناعي، الفنون وغيرها).'
  },
  {
    title: 'في الميدان',
    date: '9 أغسطس 2025',
    partners: 'هيئة إذاعة رأس الخيمة، مؤسسة سعود بن صقر، الدفاع المدني، الاتحاد للكهرباء والماء، شرطة رأس الخيمة، الآثار والمتاحف',
    attendees: 'أكثر من 300 مشارك',
    notes: 'برنامج ميداني توعوي يربط الشباب بالواقع العملي'
  }
]

export default function Events(){
  return (
    <section id="events" className="open-data">
      <div className="open-data-inner">
        <h2 className="open-data-title">الفعاليات الرئيسية</h2>
        <p className="open-data-sub">ملخص الفعاليات المنعقدة والمنظمة من قبل مجلس رأس الخيمة للشباب — يمكنك إضافة الصور لاحقاً</p>

        <div className="event-list">
          {EVENTS.map((e, idx) => (
            <article className="event-card" key={idx}>
              <div className="event-media" aria-hidden>
                <div className="event-image-placeholder">صورة</div>
              </div>
              <div className="event-body">
                <h3 className="event-title">{e.title}</h3>
                <div className="event-meta">
                  <span className="event-date">📅 {e.date}</span>
                  <span className="event-attendees">👥 {e.attendees}</span>
                </div>
                {e.partners && <div className="event-partners">🤝 {e.partners}</div>}
                <p className="event-notes">🎯 {e.notes}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
