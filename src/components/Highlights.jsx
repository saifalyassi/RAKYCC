import React, { useEffect, useState } from 'react'

export default function Highlights() {
  const visits = [
    {
      id: 1,
      title: 'رئيس الدولة يستقبل وفد من المؤسسة الاتحادية للشباب',
      date: '13 مايو 2025',
      location: 'أبوظبي',
      summary: 'لقاء رسمي بحضور كبار المسؤولين لمناقشة سُبل دعم برامج الشباب الوطنية. تميز الحدث بتبادل الخبرات وعرض مبادرات المجلس الأخيرة.',
      img: 'assets/visit-1.jpg' // placeholder — provide image and I will wire it
    },
    {
      id: 2,
      title: 'لقاء الشركاء المجتمعيين',
      date: '01 يوليو 2025',
      location: 'رأس الخيمة',
      summary: 'جلسة عمل مع منظمات المجتمع المدني لبحث التعاون المشترك.',
      img: 'assets/visit-2.jpg'
    },
    {
      id: 3,
      title: 'حملة التوعية الشبابية',
      date: '20 يونيو 2025',
      location: 'الشارقة',
      summary: 'حفل افتتاح الحملة واستقبال وفود من المدارس والجامعات.',
      img: 'assets/visit-3.jpg'
    }
  ]

  // carousel state for featured image
  const [index, setIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % visits.length), 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="cards-bg">
      <section className="cards-grid" style={{ maxWidth: 1100 }}>
        <header style={{ gridColumn: '1/-1', padding: '0 16px' }}>
          <h2 className="home-title">أبرز اللقاءات</h2>
          <p className="home-sub">أحدث الزيارات واللقاءات الرسمية للمجلس — نشرة مُصغرة بتصميم عصري.</p>
        </header>

        {/* Featured hero card */}
        <article className="card" style={{ flex: '1 1 100%', maxWidth: '100%', display: 'flex', gap: 18, alignItems: 'stretch' }}>
          <div style={{ flex: '0 0 44%', minHeight: 220, overflow: 'hidden', borderRadius: 12 }}>
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg,#e6eef8,#cfe6ff)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={visits[index].img} alt={visits[index].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e)=>{e.target.style.objectFit='contain'}} />
            </div>
          </div>

          <div className="card-body" style={{ textAlign: 'right', padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 className="card-title" style={{ margin: 0, fontSize: '1.25rem' }}>{visits[index].title}</h3>
            <div style={{ display: 'flex', gap: 12, marginTop: 8, alignItems: 'center', color: 'var(--muted)', fontWeight: 700 }}>
              <span>{visits[index].date}</span>
              <span>—</span>
              <span>{visits[index].location}</span>
            </div>
            <p style={{ marginTop: 12, color: '#2d2320', lineHeight: 1.6 }}>{visits[index].summary}</p>
            <div style={{ marginTop: 14 }}>
              <button className="btn" onClick={() => setModalOpen(true)} style={{ textDecoration: 'none' }}>اقرأ المزيد</button>
            </div>
          </div>
        </article>

        {/* Photo boxes for the other two visits */}
        {visits.slice(1).map(v => (
          <article key={v.id} className="card" style={{ flex: '1 1 320px', minWidth: 280, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: 160, overflow: 'hidden' }}>
              <img src={v.img} alt={v.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e)=>{e.target.style.objectFit='contain'}} />
            </div>
            <div className="card-body" style={{ textAlign: 'right' }}>
              <h4 style={{ margin: '8px 0' }}>{v.title}</h4>
              <small style={{ color: 'var(--muted)', fontWeight: 700 }}>{v.date} — {v.location}</small>
              <p style={{ marginTop: 8 }}>{v.summary}</p>
              <div style={{ marginTop: 8 }}>
                <a className="btn btn-light" href="#">تفاصيل</a>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Modal for full article */}
      {modalOpen && (
        <div role="dialog" aria-modal="true" className="contact-popover open" style={{ left: '50%', top: '10%', transform: 'translateX(-50%)', maxWidth: 880, width: '90%', padding: 24 }}>
          <button onClick={() => setModalOpen(false)} style={{ float: 'left', background: 'transparent', border: 'none', fontSize: 18 }}>×</button>
          <h3 style={{ marginTop: 0 }}>رئيس الدولة يستقبل وفد من المؤسسة الاتحادية للشباب</h3>
          <small style={{ color: 'var(--muted)' }}>15 مايو 2025 — أبوظبي</small>
          <div style={{ marginTop: 12, textAlign: 'right', direction: 'rtl' }}>
            <p>اطلع صاحب السمو الشيخ محمد بن زايد آل نهيان رئيس الدولة "حفظه الله" اليوم على مبادرات المؤسسة الاتحادية للشباب وبرامجها النوعية ورؤيتها تجاه تمكين الشباب وتحقيق تطلعاتهم وتعزيز مشاركتهم في تنمية المجتمع.. وذلك خلال استقبال سموه وفد المؤسسة وأعضاء مجالس الشباب المحلية ومجلس الإمارات للشباب.</p>
            <p>وأكد صاحب السمو الشيخ محمد بن زايد آل نهيان ـ خلال اللقاء الذي جرى في قصر البحر في أبوظبي ـ أن تمكين الشباب وتعزيز حضورهم في مختلف مجالات العمل الوطني يعد أولوية رئيسية في استراتيجية التنمية الشاملة للدولة.</p>
            <p>وقال سموه إن دولة الإمارات تضع الشباب في جوهر رؤيتها للمستقبل وتراهن عليهم في مواصلة تحقيق طموحاتها التنموية وتقدمها وتعزيز مكتسباتها الوطنية.</p>
            <p>حضر مجلس قصر البحر..سمو الشيخ خالد بن محمد بن زايد آل نهيان ولي عهد أبوظبي وسمو الشيخ حمدان بن زايد آل نهيان ممثل الحاكم في منطقة الظفرة وسمو الشيخ نهيان بن زايد آل نهيان رئيس مجلس أمناء مؤسسة زايد بن سلطان آل نهيان للأعمال الخيرية والإنسانية والفريق سمو الشيخ سيف بن زايد آل نهيان نائب رئيس مجلس الوزراء وزير الداخلية وسمو الشيخ حامد بن زايد آل نهيان وسمو الشيخ خالد بن زايد آل نهيان رئيس مجلس إدارة مؤسسة زايد العليا لأصحاب الهمم وسمو الشيخ حمدان بن محمد بن زايد آل نهيان نائب رئيس ديوان الرئاسة للشؤون الخاصة ومعالي الشيخ نهيان بن مبارك آل نهيان وزير التسامح والتعايش ومعالي الشيخ محمد بن حمد بن طحنون آل نهيان مستشار رئيس الدولة وعدد من الشيوخ والوزراء وكبار المسؤولين والضيوف.</p>
          </div>
        </div>
      )}
    </div>
  )
}

