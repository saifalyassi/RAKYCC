import React from 'react'
import { formatArabicDate, fixTrailingPunctuation } from '../utils/text'

const EVENTS = [
  {
    title: 'المناظرة الشبابية: هل تساهم السياحة التراثية في تعزيز الهوية الوطنية أم تسليعها؟',
    date: '14 أبريل 2025',
    notes: 'مناظرة لتعزيز الحوار بين الشباب.',
    image: 'assets/event 1.jpg'
  },
  {
    title: 'التمشية مع المصورين',
    date: '18 أبريل 2025',
    notes: 'نشاط ميداني للتصوير وتبادل الخبرات.',
    image: 'assets/event 2.jpg'
  },
  {
    title: 'رواد الصناعة',
    date: '5 مايو 2025',
    partners: 'مجلس شباب رواد الصناعة والتكنولوجيا',
    notes: 'فعالية لتمكين الشباب في مجالات الصناعة والتقنية.',
    image: 'assets/event 3.jpg'
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
            <article className="event-card" key={idx} style={{position:'relative'}}>
              <div className="event-media" aria-hidden>
                {e.image ? (
                  <img src={e.image} alt={e.title} className="event-image" style={{objectFit:'cover',width:'100%',height:'100%',borderRadius:'12px'}} />
                ) : (
                  <div className="event-image-placeholder">صورة</div>
                )}
              </div>
              <div className="event-body">
                <h3 className="event-title">{e.title}</h3>
                {e.partners && <div className="event-partners">🤝 {e.partners}</div>}
                <p className="event-notes">🎯 {fixTrailingPunctuation(e.notes)}</p>
                <div className="event-meta" style={{display:'flex',justifyContent:'flex-end',position:'absolute',bottom:'8px',right:'24px',width:'auto'}}>
                  <span className="event-date" style={{fontSize:'0.95em',color:'#7c6a56',fontWeight:'bold',marginLeft:'8px',direction:'rtl'}}>{
                    (() => {
                      const d = formatArabicDate(e.date)
                      if (typeof d === 'object') return `${d.day} ${d.month} ${d.year}`
                      return e.date
                    })()
                  }</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
