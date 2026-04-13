const planData = {
      basic: {
        name: "VitaCare Basic",
        price: 199.00,
        description: "Cobertura essencial para sua saúde",
        diferencial: "Telemedicina Ilimitada 24h sem custo adicional. Acesso a consultas com clínicos gerais e pediatras a qualquer hora do dia.",
        exames: "Laboratoriais básicos, hemograma, urina e preventivos essenciais.",
        tags: ["Telemedicina", "Clínico Geral", "Pediatria", "Exames Básicos"],
        carencias: [
          { item: "Urgência", time: "24 horas" },
          { item: "Consultas", time: "30 dias" },
          { item: "Exames Simples", time: "60 dias" },
          { item: "Internações", time: "180 dias" }
        ]
      },
      plus: {
        name: "VitaCare Plus",
        price: 349.00,
        description: "Cobertura completa com atendimento domiciliar",
        diferencial: "Atendimento domiciliar para coletas e consultas de enfermagem. Acesso prioritário a especialistas e exames de imagem.",
        exames: "Laboratoriais completos, Raio-X, Ultrassom e exames cardiológicos.",
        tags: ["Cardiologia", "Ginecologia", "Ortopedia", "Dermatologia", "Imagem"],
        carencias: [
          { item: "Urgência", time: "24 horas" },
          { item: "Consultas", time: "30 dias" },
          { item: "Exames Imagem", time: "90 dias" },
          { item: "Cirurgias", time: "180 dias" }
        ]
      },
      premium: {
        name: "VitaCare Premium",
        price: 599.00,
        description: "Máxima cobertura com concierge de saúde",
        diferencial: "Concierge de Saúde 24h e Cobertura Internacional. Atendimento VIP com agendamento prioritário e acompanhamento personalizado.",
        exames: "Check-up Executivo, Ressonância, Tomografia e exames de alta complexidade.",
        tags: ["Concierge", "Internacional", "Check-up", "Ressonância", "Todas Especialidades"],
        carencias: [
          { item: "Urgência", time: "24 horas" },
          { item: "Consultas", time: "Imediato" },
          { item: "Exames Complexos", time: "30 dias" },
          { item: "Cirurgias", time: "120 dias" }
        ]
      }
    };

    function loadPlanDetails(planId = 'plus') {
      const plan = planData[planId];
      
      document.getElementById('planName').innerText = plan.name;
      document.getElementById('planDescription').innerText = plan.description;
      document.getElementById('planPrice').innerText = plan.price.toFixed(2);
      document.getElementById('planDiferencial').innerHTML = plan.diferencial;
      document.getElementById('planExames').innerText = plan.exames;

      // Tags
      const tagsContainer = document.getElementById('planTags');
      tagsContainer.innerHTML = plan.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

      // Carências
      const carenciasContainer = document.getElementById('planCarencias');
      carenciasContainer.innerHTML = plan.carencias.map(c => `
        <div class="carencia-card">
          <h4>${c.item}</h4>
          <p>${c.time}</p>
        </div>
      `).join('');
    }

    // Carregar plano ao iniciar (padrão: Plus)
    loadPlanDetails('plus');

    // Verificar se há plano na URL
    const urlParams = new URLSearchParams(window.location.search);
    const planParam = urlParams.get('plan');
    if (planParam && planData[planParam]) {
      loadPlanDetails(planParam);
    }
