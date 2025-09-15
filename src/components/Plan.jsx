import React, { useEffect } from 'react'
import Icon from './Icon'

const themes = [
  { id: 'empowerment', title: 'تمكين الشباب', icon: 'education', desc: 'برامج تمكين وفرص تدريبية وتوجيه مهني لرفع جاهزية الشباب للمستقبل.' },
  { id: 'innovation', title: 'الابتكار', icon: 'innovation', desc: 'حاضنات أفكار، دعم المشاريع الصغيرة والابتكارات الشبابية.' },
  { id: 'sustainability', title: 'الاستدامة', icon: 'sustainability', desc: 'مشاريع بيئية وممارسات مستدامة تؤسس لمستقبل أخضر.' },
  { id: 'community', title: 'مبادرات المجتمع', icon: 'community', desc: 'مبادرات مجتمعية وتطوعية لتعزيز الترابط المحلي.' }
]

const goals = [
  { icon: 'education', text: 'توسيع فرص التمكين والتعليم للشباب.' },
  { icon: 'innovation', text: 'دعم ريادة الأعمال والابتكار.' },
  { icon: 'sustainability', text: 'تعزيز المشاركة المجتمعية والمشاريع المستدامة.' },
  { icon: 'community', text: 'بناء شراكات محلية وإقليمية لتعظيم الأثر.' }
]

function useScrollReveal(selector = '.reveal'){
  useEffect(()=>{
    if (typeof window === 'undefined') return
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if (e.isIntersecting) e.target.classList.add('in-view')
      })
    },{threshold:0.12})
    document.querySelectorAll(selector).forEach(el=>obs.observe(el))
    return ()=>obs.disconnect()
  },[selector])
}

export default function Plan(){
  useScrollReveal('.plan-page .reveal')
  return (
    <section id="strategic-plan" className="home-hero plan-page">
      <div className="home-inner">
        <h2 className="home-title reveal">الخطة الاستراتيجية 2025 – 2027</h2>
        <p className="home-sub reveal">خطة طموحة لتمكين الشباب، دعم الابتكار، وبناء مجتمع مستدام ومشارك.</p>

        <div className="plan-content">
          <div className="plan-cards reveal">
            <div className="card vision">
              <div className="card-icon"><Icon name="eye" size={40} /></div>
              <h3>الرؤية</h3>
              <p>مجتمع شبابي متمكّن، مبتكر، ومستدام يقود مستقبل رأس الخيمة.</p>
            </div>
            <div className="card mission">
              <div className="card-icon"><Icon name="target" size={40} /></div>
              <h3>الرسالة</h3>
              <p>نمكّن ونربط الشباب بفرص النمو المهني، الابتكار، والمسؤولية المجتمعية لتحقيق تنمية شاملة.</p>
            </div>
          </div>

          <div className="plan-values reveal">
            <h2>القيم الأساسية</h2>
            <div className="values-grid">
              <span className="value v-emp">التمكين</span>
              <span className="value v-inn">الابتكار</span>
              <span className="value v-trans">الشفافية</span>
              <span className="value v-collab">التعاون المجتمعي</span>
              <span className="value v-sust">الاستدامة</span>
            </div>
          </div>

          <div className="plan-goals reveal">
            <h2>الأهداف الاستراتيجية</h2>
            <div className="timeline">
              {goals.map((g,idx)=> (
                <div key={idx} className="timeline-item">
                  <div className="timeline-index">{idx+1}</div>
                  <div className="timeline-body"><div className="goal-icon"><Icon name={g.icon} size={20} /></div>{g.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="plan-themes reveal">
            <h2>البرامج والمبادرات الرئيسية</h2>
            <div className="plan-grid">
              {themes.map(t=> (
                <div key={t.id} className="plan-card interactive">
                  <div className="plan-icon" aria-hidden><Icon name={t.icon} size={28} /></div>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                  <a className="learn-more" href="#contact">تعرّف أكثر</a>
                </div>
              ))}
            </div>
          </div>

          <div className="plan-callout reveal">
            <h2>كيف نقيس النجاح</h2>
            <p>مؤشرات رئيسية: عدد البرامج المنفذة، فرص العمل المتولدة، مستوى مشاركة المتطوعين، وانعكاس المبادرات على الاستدامة المحلية.</p>
          </div>

          <div className="plan-footer-cta reveal">
            <h2>شباب رأس الخيمة… شركاء في صناعة المستقبل</h2>
            <p>انضم إلينا في رحلتنا لبناء مستقبل أفضل — هناك مكان لكل صوت وفكرة.</p>
            <div style={{marginTop:12}}>
              <a className="cta-btn" href="#contact">انضم إلينا</a>
              <a className="cta-btn secondary" href="#contact" style={{marginLeft:12}}>تواصل معنا</a>
            </div>
          </div>

        </div>{/* .plan-content */}
      </div>{/* .home-inner */}
    </section>
  )
}
