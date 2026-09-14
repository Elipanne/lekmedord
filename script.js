const bank = window.OPPGAVEBANK;
const els = {
  homeView: document.getElementById('homeView'), gameView: document.getElementById('gameView'),
  categoryGrid: document.getElementById('categoryGrid'), homeBtn: document.getElementById('homeBtn'),
  categoryLabel: document.getElementById('categoryLabel'), taskTitle: document.getElementById('taskTitle'),
  progress: document.getElementById('progress'), stimulusArea: document.getElementById('stimulusArea'),
  instruction: document.getElementById('instruction'), answerArea: document.getElementById('answerArea'),
  feedback: document.getElementById('feedback'), taskActions: document.getElementById('taskActions')
};

let currentCategory = null;
let roundTasks = [];
let taskIndex = 0;
let locked = false;

function shuffle(items){
  return [...items].sort(()=>Math.random()-0.5);
}

function renderHome(){
  els.homeView.classList.remove('hidden');
  els.gameView.classList.add('hidden');
  els.homeBtn.classList.add('hidden');
  els.categoryGrid.innerHTML = '';
  bank.kategorier.forEach(cat=>{
    const btn = document.createElement('button');
    btn.className='category-card';
    btn.innerHTML = `<span class="category-icon">${cat.ikon}</span><h2>${cat.tittel}</h2><p>${cat.beskrivelse}</p>`;
    btn.addEventListener('click',()=>startCategory(cat.id));
    els.categoryGrid.appendChild(btn);
  });
}

function startCategory(id){
  currentCategory = bank.kategorier.find(c=>c.id===id);
  const tasks = currentCategory.oppgaver;
  roundTasks = tasks.length > 10 ? shuffle(tasks).slice(0,10) : shuffle(tasks);
  taskIndex = 0;
  els.homeView.classList.add('hidden');
  els.gameView.classList.remove('hidden');
  els.homeBtn.classList.remove('hidden');
  renderTask();
}

function clearTask(){
  locked=false;
  els.stimulusArea.innerHTML='';
  els.answerArea.innerHTML='';
  els.feedback.textContent='';
  els.feedback.className='feedback';
  els.taskActions.innerHTML='';
}

function renderTask(){
  clearTask();
  if(taskIndex >= roundTasks.length){ return renderEnd(); }
  const task = roundTasks[taskIndex];
  els.categoryLabel.textContent=currentCategory.tittel;
  els.taskTitle.textContent=task.variant ? task.variant.charAt(0).toUpperCase()+task.variant.slice(1) : currentCategory.tittel;
  els.progress.textContent=`Oppgave ${taskIndex+1} av ${roundTasks.length}`;
  els.instruction.textContent=task.instruksjon;
  renderStimulus(task);
  renderAnswers(task);
  if(roundTasks.length===1){
    const note=document.createElement('div'); note.className='demo-note'; note.textContent='Dette er en prototype med én eksempeloppgave.';
    els.taskActions.appendChild(note);
  }
}

function renderStimulus(task){
  if(task.stimulusBilde){
    const img=document.createElement('img'); img.className='stimulus-image'; img.src=task.stimulusBilde; img.alt=task.stimulusTekst||'';
    img.addEventListener('error',()=>{img.replaceWith(missingMedia('Bildet mangler'));});
    els.stimulusArea.appendChild(img);
  }
  if(task.stimulusLyd){ els.stimulusArea.appendChild(audioButton(task.stimulusLyd, '🔊 Hør')); }
  if(task.stimulusLyder){
    const row=document.createElement('div'); row.className='phoneme-row';
    task.stimulusLyder.forEach(a=>row.appendChild(audioButton(a, a.etikett||'🔊', 'secondary phoneme-btn')));
    els.stimulusArea.appendChild(row);
  }
  if(!task.stimulusBilde && !task.stimulusLyd && !task.stimulusLyder && task.stimulusTekst){
    const p=document.createElement('div'); p.style.fontSize='2rem'; p.style.fontWeight='900'; p.textContent=task.stimulusTekst; els.stimulusArea.appendChild(p);
  }
}

function audioButton(audioSpec,label='🔊 Hør',extra=''){
  const btn=document.createElement('button'); btn.type='button'; btn.className=`audio-btn ${extra}`.trim(); btn.textContent=label;
  btn.addEventListener('click', async (e)=>{
    e.stopPropagation();
    const audio=new Audio(audioSpec.fil);
    try{ await audio.play(); }
    catch(err){
      if(audioSpec.fallbackTekst && 'speechSynthesis' in window){
        const utter=new SpeechSynthesisUtterance(audioSpec.fallbackTekst); utter.lang='nb-NO'; speechSynthesis.cancel(); speechSynthesis.speak(utter);
      } else {
        btn.textContent='Lyd mangler'; btn.classList.add('missing-audio');
      }
    }
  });
  return btn;
}

function renderAnswers(task){
  if(task.svarformat==='bygg_ord') return renderBuilder(task);
  (task.alternativer||[]).forEach((alt,index)=>{
    const value = typeof alt==='string' ? alt : alt.tekst;
    const btn=document.createElement('button'); btn.type='button'; btn.className='choice';
    if(typeof alt==='object' && alt.bilde){
      btn.classList.add('image-choice');
      const img=document.createElement('img'); img.src=alt.bilde; img.alt=value;
      img.addEventListener('error',()=>img.replaceWith(missingMedia('Bildet mangler')));
      btn.appendChild(img);
      const label=document.createElement('span'); label.className='label'; label.textContent=value; btn.appendChild(label);
      if(alt.lyd){ const ab=audioButton(alt.lyd,'🔊','secondary inline-audio'); btn.appendChild(ab); }
    } else { btn.textContent=value; }
    btn.addEventListener('click',()=>checkChoice(task,value,btn));
    els.answerArea.appendChild(btn);
  });
}

function checkChoice(task,value,btn){
  if(locked) return;
  if(String(value).toLowerCase()===String(task.riktigSvar).toLowerCase()){
    locked=true; btn.classList.add('correct');
    els.feedback.textContent='Ja!'; els.feedback.className='feedback ok';
    if(task.riktigLyd){ setTimeout(()=>audioButton(task.riktigLyd).click(),150); }
    showNextButton();
  } else {
    btn.classList.add('wrong');
    els.feedback.textContent='Prøv igjen'; els.feedback.className='feedback no';
    setTimeout(()=>btn.classList.remove('wrong'),650);
  }
}

function renderBuilder(task){
  els.answerArea.innerHTML='';
  const wrap=document.createElement('div'); wrap.className='builder';
  const slots=document.createElement('div'); slots.className='answer-slots';
  const chosen=Array(task.antallSvarfelt).fill(null);
  const tiles=[];
  function refresh(){
    [...slots.children].forEach((slot,i)=>slot.textContent=chosen[i]?.letter||'');
    tiles.forEach((tile,i)=>tile.disabled=chosen.some(x=>x?.index===i));
    if(chosen.every(Boolean)){
      const word=chosen.map(x=>x.letter).join('');
      if(word===task.riktigSvar){ locked=true; els.feedback.textContent='Ja!'; els.feedback.className='feedback ok'; showNextButton(); }
      else { els.feedback.textContent='Prøv igjen'; els.feedback.className='feedback no'; }
    } else { els.feedback.textContent=''; els.feedback.className='feedback'; }
  }
  for(let i=0;i<task.antallSvarfelt;i++){
    const slot=document.createElement('button'); slot.type='button'; slot.className='answer-slot'; slot.addEventListener('click',()=>{ if(chosen[i]){chosen[i]=null;locked=false;refresh();}}); slots.appendChild(slot);
  }
  const bankEl=document.createElement('div'); bankEl.className='letter-bank';
  task.bokstavbrikker.forEach((letter,index)=>{
    const tile=document.createElement('button'); tile.type='button'; tile.className='letter-tile'; tile.textContent=letter;
    tile.addEventListener('click',()=>{ if(locked)return; const empty=chosen.findIndex(x=>!x); if(empty>-1){chosen[empty]={letter,index};refresh();} });
    tiles.push(tile); bankEl.appendChild(tile);
  });
  wrap.append(slots,bankEl); els.answerArea.appendChild(wrap); refresh();
}

function showNextButton(){
  els.taskActions.innerHTML='';
  const next=document.createElement('button'); next.type='button'; next.className='primary-btn';
  next.textContent = taskIndex===roundTasks.length-1 ? 'Ferdig' : 'Neste';
  next.addEventListener('click',()=>{taskIndex++;renderTask();});
  els.taskActions.appendChild(next);
}

function renderEnd(){
  clearTask();
  els.categoryLabel.textContent=currentCategory.tittel;
  els.taskTitle.textContent='Ferdig!';
  els.progress.textContent='';
  els.instruction.textContent='';
  els.stimulusArea.innerHTML='<div class="end-card"><h3>Bra jobbet!</h3><p>Du er ferdig med denne runden.</p></div>';
  const again=document.createElement('button'); again.className='primary-btn'; again.textContent='Spill igjen'; again.addEventListener('click',()=>startCategory(currentCategory.id));
  const home=document.createElement('button'); home.className='ghost-btn'; home.textContent='Til forsiden'; home.addEventListener('click',renderHome);
  els.taskActions.append(again,home);
}

function missingMedia(text){ const el=document.createElement('div'); el.className='image-error'; el.textContent=text; return el; }

els.homeBtn.addEventListener('click',renderHome);
renderHome();
