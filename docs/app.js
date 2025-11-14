// Flor de Abril - lógica de interfaz y datos
(function(){
  const costumes = [
    { id:1, name:"Traje Típico Mestizaje", description:"Vestido tradicional con bordados florales coloridos, ideal para presentaciones folclóricas.", image:"https://images.unsplash.com/photo-1698509812263-562c759affcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", price:"C$ 500", sizes:["S","M","L","XL"], category:"Mujer", region:"Pacífico", colors:[{name:"Rojo y Blanco",hex:"#DC2626"},{name:"Azul y Blanco",hex:"#2563EB"}]},
    { id:2, name:"Traje de Güegüense", description:"Vestuario tradicional del famoso baile del Güegüense, patrimonio cultural.", image:"https://images.unsplash.com/photo-1761299146752-9b375efd4eaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", price:"C$ 700", sizes:["M","L","XL"], category:"Hombre", region:"Pacífico", colors:[{name:"Multicolor",hex:"#EA580C"}]},
    { id:3, name:"Vestido de Indita", description:"Hermoso vestido de colores vibrantes con encajes y cintas.", image:"https://images.unsplash.com/photo-1625989744655-9bff7a23dac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", price:"C$ 550", sizes:["XS","S","M","L"], category:"Mujer", region:"Central", colors:[{name:"Rosa y Blanco",hex:"#EC4899"}]},
    { id:4, name:"Traje de Palo de Mayo", description:"Conjunto festivo de la costa caribeña nicaragüense.", image:"https://images.unsplash.com/photo-1594590778587-2edc9457689e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", price:"C$ 600", sizes:["S","M","L"], category:"Mujer", region:"Atlántico Norte", colors:[{name:"Verde Tropical",hex:"#10B981"}]},
    { id:5, name:"Traje de Campesino", description:"Vestimenta tradicional del campesino nicaragüense.", image:"https://images.unsplash.com/photo-1698509812263-562c759affcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", price:"C$ 450", sizes:["M","L","XL"], category:"Hombre", region:"Central", colors:[{name:"Blanco Natural",hex:"#F9FAFB"}]},
    { id:6, name:"Traje Típico Infantil", description:"Versión infantil perfecta para actos escolares.", image:"https://images.unsplash.com/photo-1625989744655-9bff7a23dac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", price:"C$ 350", sizes:["4","6","8","10","12"], category:"Niños", region:"Pacífico", colors:[{name:"Rojo y Blanco",hex:"#DC2626"}]}
  ];
  const regions = ["Todas","Pacífico","Central","Atlántico Norte","Atlántico Sur"];

  const trajes = [
    {id:1,name:"Traje Típico Mestizaje",image:costumes[0].image,region:"Pacífico",historia:"El traje de Mestizaje representa la fusión cultural.",baile:"El Mestizaje",caracteristicas:["Vestido largo","Bordados florales"]},
    {id:2,name:"Traje del Güegüense",image:costumes[1].image,region:"Pacífico",historia:"Obra teatral folclórica declarada Patrimonio.",baile:"La Danza del Güegüense",caracteristicas:["Colores brillantes","Máscara de madera"]},
    {id:3,name:"Vestido de Indita",image:costumes[2].image,region:"Central",historia:"Representa a la mujer campesina de la región central.",baile:"La Indita",caracteristicas:["Blusa y falda","Encajes blancos"]},
    {id:4,name:"Traje de Palo de Mayo",image:costumes[3].image,region:"Atlántico Norte",historia:"Festividad afrocaribeña con colores vivos.",baile:"Palo de Mayo",caracteristicas:["Vestidos cortos","Telas ligeras"]}
  ];

  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  // Navegación suave
  document.querySelectorAll('[data-scroll]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const id = btn.getAttribute('data-scroll');
      const el = document.getElementById(id);
      el && el.scrollIntoView({behavior:'smooth'});
      $('#mobileNav')?.classList.add('hidden');
    });
  });

  // Menú móvil
  $('#menuToggle')?.addEventListener('click',()=>{
    $('#mobileNav')?.classList.toggle('hidden');
  });

  // Filtros región
  let selectedRegion = 'Todas';
  function renderRegions(){
    const container = $('#regionButtons'); if(!container) return;
    container.innerHTML='';
    regions.forEach(r=>{
      const b=document.createElement('button');
      b.className='btn outline';
      b.textContent=r;
      if(r===selectedRegion){b.classList.add('primary-active');}
      b.addEventListener('click',()=>{selectedRegion=r; renderRegions(); renderCostumes();});
      container.appendChild(b);
    });
  }

  // Catálogo
  function renderCostumes(){
    const grid = $('#costumeGrid'); if(!grid) return;
    const filtered = selectedRegion==='Todas'?costumes:costumes.filter(c=>c.region===selectedRegion);
    grid.innerHTML = filtered.map(c=>`
      <article class="costume-card fade-in" aria-label="${c.name}">
        <div class="card-media"><img src="${c.image}" alt="${c.name}"></div>
        <div class="card-body">
          <div class="badges"><span class="badge">${c.category}</span><span style="margin-left:auto;font-size:12px;color:#2563eb">${c.region}</span></div>
          <h3>${c.name}</h3>
          <p style="flex:1;font-size:14px;color:#374151">${c.description}</p>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:4px">
            <div><div style="font-size:12px;color:#6b7280">Precio por día</div><div class="price">${c.price}</div></div>
            <button class="btn primary" data-open="${c.id}">Ver Detalles</button>
          </div>
        </div>
      </article>`).join('');
    $$('button[data-open]').forEach(b=> b.addEventListener('click',()=> openModal(parseInt(b.getAttribute('data-open')))) );
  }

  // Modal
  const modal = $('#modal');
  const modalBody = $('#modalBody');
  $('#modalClose')?.addEventListener('click',closeModal);
  modal?.addEventListener('click',e=>{ if(e.target===modal) closeModal(); });

  function openModal(id){
    const c = costumes.find(x=>x.id===id); if(!c) return;
    modalBody.innerHTML = getModalHTML(c);
    modal.classList.remove('hidden');
    setupModalEvents(c);
    modal.setAttribute('aria-hidden','false');
  }
  function closeModal(){ modal.classList.add('hidden'); modal.setAttribute('aria-hidden','true'); }

  function getModalHTML(c){
    return `<h2 style="margin-bottom:12px">${c.name}</h2>
      <p style="margin-bottom:16px">${c.description}</p>
      <div style="display:flex;flex-wrap:wrap;gap:24px">
        <div style="flex:1;min-width:280px"><img src="${c.image}" alt="${c.name}" style="width:100%;border-radius:18px" /></div>
        <div style="flex:1;min-width:260px">
          <p><strong>Región:</strong> ${c.region}</p>
          <p><strong>Precio:</strong> ${c.price}</p>
          <div style="margin-top:14px"><strong>Colores:</strong><div id="colorOptions" style="display:flex;gap:10px;margin-top:6px"></div></div>
          <div style="margin-top:14px"><strong>Tallas:</strong><div id="sizeOptions" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:6px"></div></div>
          <div style="margin-top:14px"><strong>Cantidad:</strong><div style="display:flex;align-items:center;gap:10px;margin-top:6px"><button id="decQty" class="btn outline">-</button><div id="qty" style="min-width:40px;text-align:center">1</div><button id="incQty" class="btn outline">+</button></div></div>
          <div style="margin-top:14px"><label style="font-size:14px">Fecha del Evento</label><input id="eventDate" type="date" style="width:100%;padding:10px;margin-top:6px;border:1px solid #d1d5db;border-radius:10px" /></div>
          <button id="reserveBtn" class="btn accent" style="margin-top:20px;width:100%">Reservar por WhatsApp</button>
        </div>
      </div>`;
  }

  function setupModalEvents(c){
    const colorWrap = $('#colorOptions');
    const sizeWrap = $('#sizeOptions');
    let qty = 1;
    if(colorWrap) colorWrap.innerHTML = c.colors.map(col=>`<button class="color-dot" title="${col.name}" style="background:${col.hex}"></button>`).join('');
    if(sizeWrap) sizeWrap.innerHTML = c.sizes.map(s=>`<button class="size-btn">${s}</button>`).join('');
    $$('.size-btn').forEach(b=> b.addEventListener('click',()=>{ $$('.size-btn').forEach(x=>x.classList.remove('active')); b.classList.add('active'); }));
    $$('.color-dot').forEach(d=> d.addEventListener('click',()=>{ $$('.color-dot').forEach(x=>x.classList.remove('active')); d.classList.add('active'); }));
    $('#incQty')?.addEventListener('click',()=>{ qty++; $('#qty').textContent=qty; });
    $('#decQty')?.addEventListener('click',()=>{ if(qty>1){ qty--; $('#qty').textContent=qty; } });
    $('#reserveBtn')?.addEventListener('click',()=>{
      const size = $$('.size-btn').find(b=>b.classList.contains('active'))?.textContent||'';
      const color = $$('.color-dot').find(b=>b.classList.contains('active'))?.getAttribute('title')||'';
      const date = $('#eventDate').value;
      if(!size||!color||!date){ alert('Completa talla, color y fecha'); return; }
      const total = parseFloat(c.price.replace('C$','').trim())*qty;
      const msg = `Hola! Quiero reservar:\nTraje: ${c.name}\nTalla: ${size}\nColor: ${color}\nCantidad: ${qty}\nFecha: ${date}\nPrecio día: ${c.price}\nTotal: C$ ${total}`;
      window.open(`https://wa.me/50558192798?text=${encodeURIComponent(msg)}`,'_blank');
      closeModal();
    });
  }

  // Galería
  function renderGallery(){
    const grid = $('#galleryGrid'); if(!grid) return;
    grid.innerHTML = trajes.map(t=>`
      <div class="card gallery-card fade-in" data-id="${t.id}">
        <div style="height:240px;background:#f3f4f6;overflow:hidden;border-radius:16px"><img src="${t.image}" alt="${t.name}" style="width:100%;height:100%;object-fit:cover;transition:transform 1.2s"/></div>
        <h3 style="margin:12px 0 4px">${t.name}</h3>
        <p style="font-size:13px;color:#6b7280">${t.baile}</p>
        <button class="btn outline" data-hist="${t.id}">Ver Historia</button>
      </div>`).join('');
    $$('button[data-hist]').forEach(b=> b.addEventListener('click',()=> showDetalle(parseInt(b.getAttribute('data-hist')))) );
  }

  function showDetalle(id){
    const t = trajes.find(x=>x.id===id); if(!t) return;
    const detail = $('#galleryDetail');
    detail.classList.remove('hidden');
    detail.innerHTML = `<div class="detail-card"><h3>${t.name}</h3><p><strong>Región:</strong> ${t.region}</p><p>${t.historia}</p><h4 style="margin-top:16px">Características</h4><ul>${t.caracteristicas.map(c=>`<li>${c}</li>`).join('')}</ul><div style="text-align:right;margin-top:20px"><button class="btn outline" id="closeDetail">Cerrar</button></div></div>`;
    $('#closeDetail')?.addEventListener('click',()=> detail.classList.add('hidden'));
  }

  // Inicialización
  renderRegions();
  renderCostumes();
  renderGallery();

})();

// Accesibilidad mínima para foco teclado en elementos creados dinámicamente
window.addEventListener('keydown',e=>{
  if(e.key==='Escape'){ const modal=document.getElementById('modal'); if(modal && !modal.classList.contains('hidden')) modal.classList.add('hidden'); }
});