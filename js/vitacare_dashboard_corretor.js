let propostas = [
  {
    id: 'PROP-001', cliente: 'Ricardo Santos', cpf: '123.456.789-00', email: 'ricardo@email.com',
    plano: 'VitaCare Premium', dependentes: 0, valor: 599.0, status: 'aprovada', data_criacao: '2026-04-10',
    observacoes: 'Cliente premium, sem observações médicas'
  },
  {
    id: 'PROP-002', cliente: 'Mariana Oliveira', cpf: '987.654.321-00', email: 'mariana@email.com',
    plano: 'VitaCare Plus', dependentes: 1, valor: 698.0, status: 'pendente', data_criacao: '2026-04-09',
    observacoes: 'Aguardando confirmação de pagamento'
  },
  {
    id: 'PROP-003', cliente: 'Carlos Eduardo', cpf: '456.789.123-00', email: 'carlos@email.com',
    plano: 'VitaCare Basic', dependentes: 0, valor: 199.0, status: 'aprovada', data_criacao: '2026-04-08',
    observacoes: ''
  }
];

function getStatusLabel(status) {
  return status === 'aprovada' ? 'Aprovada' : 'Pendente';
}

function getStatusClass(status) {
  return status === 'aprovada' ? 'status-approved' : 'status-pending';
}

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function showSection(sectionId, element) {
  document.querySelectorAll('.dashboard-section').forEach((section) => section.classList.remove('active'));
  document.querySelectorAll('.nav-link[data-section-target]').forEach((link) => link.classList.remove('active'));
  document.getElementById(sectionId)?.classList.add('active');
  element?.classList.add('active');

  if (sectionId === 'propostas') renderTabelaPropostas();
  if (sectionId === 'acompanhar') carregarPropostasAcompanhamento();
}

function getNextProposalId() {
  const ids = propostas.map((p) => Number((p.id.match(/(\d+)$/) || [0, 0])[1]));
  const next = (Math.max(0, ...ids) + 1).toString().padStart(3, '0');
  return `PROP-${next}`;
}

function salvarPropostas() {
  localStorage.setItem('propostas_vitacare', JSON.stringify(propostas));
}

function enviarProposta(event) {
  event.preventDefault();
  const nomeCliente = document.getElementById('nomeCliente').value.trim();
  const cpfCliente = document.getElementById('cpfCliente').value.trim();
  const emailCliente = document.getElementById('emailCliente').value.trim();
  const planoSelecionado = document.getElementById('planoSelecionado').value;
  const dependentes = parseInt(document.getElementById('dependentes').value || '0', 10);
  const observacoes = document.getElementById('observacoes').value.trim();

  const tabelaPrecos = {
    'VitaCare Basic': 199,
    'VitaCare Plus': 349,
    'VitaCare Premium': 599
  };

  const base = tabelaPrecos[planoSelecionado] || 0;
  const valor = base + dependentes * (base * 0.5);
  const novaProposta = {
    id: getNextProposalId(),
    cliente: nomeCliente,
    cpf: cpfCliente,
    email: emailCliente,
    plano: planoSelecionado,
    dependentes,
    valor,
    status: 'pendente',
    data_criacao: new Date().toISOString().split('T')[0],
    observacoes
  };

  propostas.unshift(novaProposta);
  salvarPropostas();
  document.getElementById('formProposta').reset();
  atualizarContadores();
  renderTabelaPropostas();
  carregarPropostasAcompanhamento();
  appToast('success', 'Proposta enviada com sucesso!', `${novaProposta.id} registrada para ${novaProposta.cliente}.`);
}

function renderTabelaPropostas() {
  const tbody = document.getElementById('propostas-table-body');
  if (!tbody) return;
  tbody.innerHTML = propostas.map((proposta) => `
    <tr>
      <td>${proposta.id}</td>
      <td>${proposta.cliente}</td>
      <td>${proposta.plano.replace('VitaCare ', '')}</td>
      <td>${String(proposta.dependentes).padStart(2, '0')}</td>
      <td><span class="status-badge ${getStatusClass(proposta.status)}">${getStatusLabel(proposta.status)}</span></td>
      <td><a href="#" class="proposal-detail-link" data-proposta-id="${proposta.id}" style="color: var(--azul-primario); font-size: 0.8rem; cursor: pointer;">Ver Detalhes</a></td>
    </tr>
  `).join('');
}

function buscarProposta() {
  const busca = document.getElementById('buscaProposta').value.trim().toLowerCase();
  if (!busca) {
    appToast('warning', 'Campo vazio', 'Digite o número da proposta ou CPF para pesquisar.');
    return;
  }
  const resultado = propostas.find((proposta) => proposta.id.toLowerCase().includes(busca) || proposta.cpf.toLowerCase().includes(busca));
  if (!resultado) {
    appToast('error', 'Proposta não encontrada', 'Nenhum registro corresponde aos dados informados.');
    return;
  }
  showProposalDetails(resultado.id);
}

function carregarPropostasAcompanhamento() {
  const container = document.getElementById('propostas-acompanhar');
  if (!container) return;
  container.innerHTML = propostas.map((proposta) => `
    <div style="padding: 16px; border: 1px solid var(--borda); border-radius: 16px; margin-bottom: 12px; background: white;">
      <div style="display:flex; justify-content:space-between; gap:12px; margin-bottom:8px; align-items:flex-start;">
        <div>
          <p style="font-weight:800; color: var(--texto-escuro);">${proposta.id}</p>
          <p style="font-size:0.9rem;">${proposta.cliente}</p>
          <p style="font-size:0.75rem; color:#64748b;">CPF: ${proposta.cpf}</p>
        </div>
        <span class="status-badge ${getStatusClass(proposta.status)}">${getStatusLabel(proposta.status)}</span>
      </div>
      <p style="font-size:0.85rem; margin-bottom: 12px;">${proposta.plano} • ${formatCurrency(proposta.valor)}</p>
      <a href="#" class="proposal-detail-link" data-proposta-id="${proposta.id}" style="color: var(--azul-primario); font-size:0.85rem; font-weight:700;">Ver detalhes completos</a>
    </div>
  `).join('');
}

function showProposalDetails(id) {
  const proposta = propostas.find((item) => item.id === id);
  if (!proposta) return;
  const observacoes = proposta.observacoes || 'Sem observações registradas.';
  appToast('success', proposta.id, `${proposta.cliente} • ${proposta.plano} • ${formatCurrency(proposta.valor)} • ${observacoes}`);
}

function atualizarContadores() {
  const pendentes = propostas.filter((p) => p.status === 'pendente').length;
  const contador = document.getElementById('propostas-pendentes');
  if (contador) contador.innerText = String(pendentes).padStart(2, '0');
}

window.addEventListener('load', () => {
  const propostasArmazenadas = localStorage.getItem('propostas_vitacare');
  if (propostasArmazenadas) {
    propostas = JSON.parse(propostasArmazenadas);
  }
  atualizarContadores();
  renderTabelaPropostas();
  carregarPropostasAcompanhamento();

  document.getElementById('formProposta')?.addEventListener('submit', enviarProposta);
  document.getElementById('buscarPropostaBtn')?.addEventListener('click', buscarProposta);
});

document.addEventListener('click', (event) => {
  const navLink = event.target.closest('.nav-link[data-section-target]');
  if (navLink) {
    event.preventDefault();
    showSection(navLink.dataset.sectionTarget, navLink);
    return;
  }

  const detailLink = event.target.closest('.proposal-detail-link');
  if (detailLink) {
    event.preventDefault();
    showProposalDetails(detailLink.dataset.propostaId);
  }
});
