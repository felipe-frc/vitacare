const planData = {
  basic: {
    name: 'VitaCare Basic', price: 199.0,
    diferencial: '<strong>Diferencial Basic:</strong> Telemedicina Ilimitada 24h sem custo adicional.',
    exames: 'Laboratoriais básicos, hemograma, urina e preventivos essenciais.',
    tags: ['Telemedicina', 'Clínico Geral', 'Pediatria', 'Exames Básicos'],
    carencias: [
      { item: 'Urgência', time: '24 horas' }, { item: 'Consultas', time: '30 dias' }, { item: 'Exames Simples', time: '60 dias' }, { item: 'Internações', time: '180 dias' }
    ]
  },
  plus: {
    name: 'VitaCare Plus', price: 349.0,
    diferencial: '<strong>Diferencial Plus:</strong> Atendimento domiciliar para coletas e consultas de enfermagem.',
    exames: 'Laboratoriais completos, Raio-X, Ultrassom e exames cardiológicos.',
    tags: ['Cardiologia', 'Ginecologia', 'Ortopedia', 'Dermatologia', 'Imagem'],
    carencias: [
      { item: 'Urgência', time: '24 horas' }, { item: 'Consultas', time: '30 dias' }, { item: 'Exames Imagem', time: '90 dias' }, { item: 'Cirurgias', time: '180 dias' }
    ]
  },
  premium: {
    name: 'VitaCare Premium', price: 599.0,
    diferencial: '<strong>Diferencial Premium:</strong> Concierge de Saúde 24h e Cobertura Internacional.',
    exames: 'Check-up Executivo, Ressonância, Tomografia e exames de alta complexidade.',
    tags: ['Concierge', 'Internacional', 'Check-up', 'Ressonância', 'Todas Especialidades'],
    carencias: [
      { item: 'Urgência', time: '24 horas' }, { item: 'Consultas', time: 'Imediato' }, { item: 'Exames Complexos', time: '30 dias' }, { item: 'Cirurgias', time: '120 dias' }
    ]
  }
};

let currentPlan = 'plus';
let dependentSequence = 0;

function getDependents() {
  return Array.from(document.querySelectorAll('.dependent-card'));
}

function switchPlan(planId) {
  currentPlan = planId;
  const data = planData[planId];
  document.getElementById('display-plan-name').innerText = data.name;
  document.getElementById('display-plan-price').innerHTML = `R$ ${data.price.toFixed(2)} <span style="font-size: 0.8rem; color: var(--texto-corpo); font-weight: 500;">/mês por pessoa</span>`;
  document.getElementById('display-exames').innerText = data.exames;
  document.getElementById('display-diferencial').innerHTML = data.diferencial;
  document.getElementById('display-tags').innerHTML = data.tags.map((tag) => `<span class="tag">${tag}</span>`).join('');
  document.getElementById('display-carencias').innerHTML = data.carencias.map((item) => `
    <div class="detail-item"><span>${item.item}</span><span>${item.time}</span></div>
  `).join('');
  updateSummary();
}

function nextStep(step) {
  document.querySelectorAll('.form-section').forEach((section) => section.classList.remove('active'));
  document.querySelectorAll('.step').forEach((dot) => dot.classList.remove('active'));
  document.getElementById(`section-${step}`)?.classList.add('active');
  for (let index = 1; index <= step; index += 1) {
    document.getElementById(`step-dot-${index}`)?.classList.add('active');
  }
  if (step === 3) updateSummary();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function addDependent() {
  dependentSequence += 1;
  const container = document.getElementById('dependents-container');
  const div = document.createElement('div');
  div.className = 'dependent-card';
  div.id = `dep-${dependentSequence}`;
  div.innerHTML = `
    <span class="remove-dep" data-remove-dependent="${dependentSequence}"><i class="fa-solid fa-trash"></i> Remover</span>
    <div class="form-grid">
      <div class="form-group"><label>Nome</label><input type="text"></div>
      <div class="form-group"><label>Parentesco</label><select><option>Cônjuge</option><option>Filho(a)</option></select></div>
      <div class="form-group"><label>CPF</label><input type="text"></div>
      <div class="form-group"><label>Nascimento</label><input type="date"></div>
    </div>
  `;
  container.appendChild(div);
  updateSummary();
}

function removeDependent(id) {
  document.getElementById(`dep-${id}`)?.remove();
  updateSummary();
}

function updateSummary() {
  const data = planData[currentPlan];
  const dependents = getDependents();
  document.getElementById('summary-titular-label').innerText = `Mensalidade Titular (${data.name})`;
  document.getElementById('summary-titular-price').innerText = `R$ ${data.price.toFixed(2)}`;
  document.getElementById('summary-dependents').innerHTML = dependents.map((_, index) => `
    <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.9rem; opacity:0.8;">
      <span>Dependente ${index + 1}</span><span>R$ ${data.price.toFixed(2)}</span>
    </div>
  `).join('');
  const total = data.price * (1 + dependents.length);
  document.getElementById('total-price').innerText = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


document.addEventListener('change', (event) => {
  if (event.target.matches('[data-plan-selector="true"]')) {
    switchPlan(event.target.value);
  }
});

document.addEventListener('click', (event) => {
  const planTrigger = event.target.closest('[data-plan]');
  if (planTrigger) {
    event.preventDefault();
    switchPlan(planTrigger.dataset.plan);
    return;
  }

  const stepTrigger = event.target.closest('[data-step]');
  if (stepTrigger) {
    event.preventDefault();
    nextStep(Number(stepTrigger.dataset.step));
    return;
  }

  const addDependentTrigger = event.target.closest('#addDependentBtn');
  if (addDependentTrigger) {
    addDependent();
    return;
  }

  const removeDependentTrigger = event.target.closest('[data-remove-dependent]');
  if (removeDependentTrigger) {
    removeDependent(removeDependentTrigger.dataset.removeDependent);
  }
});

switchPlan('plus');
