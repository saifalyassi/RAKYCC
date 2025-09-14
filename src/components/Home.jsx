import React from 'react'

export default function Home(){
  return (
    <section id="home" className="home-hero">
      <div className="home-inner">
        <h2 className="home-title">مرحبا بكم في مجلس رأس الخيمة للشباب</h2>
        <p className="home-sub">نفتخر بمبادراتنا وشبابنا المؤثر. استكشف الأعضاء، اطلع على بياناتنا المفتوحة، أو تواصل معنا.</p>
        {/* Inline hero photo — will not be zoomed or cropped */}
        <div className="home-photo-wrap">
          <img className="home-photo" src="assets/Members.jpg" alt="RAKYC group photo" />
        </div>
        <div className="home-cta">
          <a className="btn" href="#members">عرض الأعضاء</a>
          <a className="btn btn-light" href="#achievements">عرض الإنجازات</a>
        </div>
        <p className="home-note">هذا موقع توعوي وتجميعي لأعمال المجلس — تم تصميمه لأغراض العرض.</p>
      </div>
    </section>
  )
}
