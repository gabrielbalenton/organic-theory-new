document.addEventListener('DOMContentLoaded',()=>{
 document.documentElement.classList.add('js-motion');
 const motionOff=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(!motionOff&&'IntersectionObserver'in window){
  const revealTargets=document.querySelectorAll('.section-head,.intro-split,.service-card,.treatment-card,.quote-band .wrap,.process article,.gallery-grid img,.review-card,.banner-inner,.page-hero .wrap,.about-story,.contact-layout,.shop-panel');
  const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}});},{threshold:.12,rootMargin:'0px 0px -36px 0px'});
  revealTargets.forEach((el,i)=>{el.dataset.reveal='';el.style.setProperty('--reveal-delay',`${Math.min(i%3,2)*55}ms`);revealObserver.observe(el);});
 }else{document.querySelectorAll('.section-head,.intro-split,.service-card,.treatment-card,.quote-band .wrap,.process article,.gallery-grid img,.review-card,.banner-inner,.page-hero .wrap,.about-story,.contact-layout,.shop-panel').forEach(el=>el.classList.add('is-visible'));}

 const toggle=document.querySelector('.menu-toggle'),links=document.querySelector('.links');
 if(toggle&&links){toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));}
 document.querySelectorAll('[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const msg=form.querySelector('.success,.booking-confirm');if(msg){msg.style.display='block';msg.scrollIntoView({behavior:'smooth',block:'nearest'});}form.reset();}));
 const date=document.querySelector('input[type="date"]');if(date){const now=new Date();now.setMinutes(now.getMinutes()-now.getTimezoneOffset());date.min=now.toISOString().split('T')[0];}
 const categoryFilter=document.querySelector('#service-category');
 if(categoryFilter){const cards=[...document.querySelectorAll('.treatment-card')],count=document.querySelector('#service-count'),params=new URLSearchParams(location.search);const initial=params.get('category');if(['signature','specialty'].includes(initial))categoryFilter.value=initial;const applyFilter=()=>{const choice=categoryFilter.value;let visible=0;cards.forEach(card=>{const show=choice==='all'||card.dataset.category===choice;card.hidden=!show;if(show)visible++;});if(count)count.textContent=`${visible} ${visible===1?'service':'services'}`;};categoryFilter.addEventListener('change',applyFilter);applyFilter();}
 const selected=new URLSearchParams(location.search).get('service'),service=document.querySelector('#booking-service');if(selected&&service){const option=service.querySelectorAll('option')[Number(selected)];if(option)service.value=option.value;}
});
