const doctors = [
  { id: 1, name: 'Dr. Roberto Carlos', specialty: 'Cardiologia', rating: 4.9, reviews: 156, avatar: '❤️', availability: [
    { date: '2026-04-14', times: ['09:00', '10:30', '14:00', '15:30'] },
    { date: '2026-04-15', times: ['08:00', '11:00', '16:00'] },
    { date: '2026-04-16', times: ['09:30', '13:00', '17:00', '18:30'] }
  ]},
  { id: 2, name: 'Dra. Ana Paula', specialty: 'Dermatologia', rating: 4.8, reviews: 142, avatar: '🩺', availability: [
    { date: '2026-04-14', times: ['10:00', '14:30', '16:00'] },
    { date: '2026-04-15', times: ['09:00', '13:00', '15:30', '17:00'] },
    { date: '2026-04-17', times: ['08:30', '11:00', '14:00'] }
  ]},
  { id: 3, name: 'Dr. Fernando Silva', specialty: 'Clínica Geral', rating: 4.7, reviews: 198, avatar: '👨‍⚕️', availability: [
    { date: '2026-04-14', times: ['08:00', '09:30', '13:00', '14:30', '16:00'] },
    { date: '2026-04-15', times: ['10:00', '11:30', '15:00', '17:30'] },
    { date: '2026-04-16', times: ['08:30', '10:00', '13:30', '15:00'] }
  ]},
  { id: 4, name: 'Dra. Mariana Costa', specialty: 'Pediatria', rating: 4.9, reviews: 174, avatar: '👶', availability: [
    { date: '2026-04-14', times: ['09:00', '10:30', '14:00'] },
    { date: '2026-04-15', times: ['08:30', '11:00', '13:30', '16:00'] },
    { date: '2026-04-17', times: ['09:00', '10:30', '14:30', '16:00'] }
  ]},
  { id: 5, name: 'Dr. Lucas Oliveira', specialty: 'Ortopedia', rating: 4.8, reviews: 128, avatar: '🦴', availability: [
    { date: '2026-04-14', times: ['10:00', '11:30', '15:00', '16:30'] },
    { date: '2026-04-16', times: ['09:00', '10:30', '13:00', '14:30', '17:00'] },
    { date: '2026-04-17', times: ['08:00', '11:00', '15:30'] }
  ]},
  { id: 6, name: 'Dra. Juliana Mendes', specialty: 'Clínica Geral', rating: 4.6, reviews: 165, avatar: '👩‍⚕️', availability: [
    { date: '2026-04-15', times: ['09:00', '10:30', '14:00', '15:30'] },
    { date: '2026-04-16', times: ['08:00', '11:00', '13:30', '16:00'] },
    { date: '2026-04-17', times: ['10:00', '12:00', '14:30', '17:00'] }
  ]}
];

let selectedAppointment = null;

function matchesPeriod(time, period) {
  const hour = Number(time.split(':')[0]);
  if (!period) return true;
  if (period === 'morning') return hour >= 8 && hour < 12;
  if (period === 'afternoon') return hour >= 13 && hour < 18;
  if (period === 'evening') return hour >= 18 && hour <= 21;
  return true;
}

function getFilteredAvailability(doctor, selectedDate, selectedPeriod) {
  return doctor.availability
    .filter((slot) => !selectedDate || slot.date === selectedDate)
    .map((slot) => ({ ...slot, times: slot.times.filter((time) => matchesPeriod(time, selectedPeriod)) }))
    .filter((slot) => slot.times.length > 0);
}

function renderDoctors(filteredDoctors = doctors) {
  const selectedDate = document.getElementById('dateFilter')?.value || '';
  const selectedPeriod = document.getElementById('periodFilter')?.value || '';
  const container = document.getElementById('doctorsContainer');
  container.innerHTML = filteredDoctors.map((doctor) => {
    const availability = getFilteredAvailability(doctor, selectedDate, selectedPeriod);
    const firstAvailability = availability[0];
    const timeSlots = firstAvailability?.times.slice(0, 4) || [];

    return `
      <div class="doctor-card">
        <div class="doctor-header">
          <div class="doctor-avatar">${doctor.avatar}</div>
          <div class="doctor-info">
            <h3>${doctor.name}</h3>
            <p>${doctor.specialty}</p>
          </div>
        </div>
        <div class="rating"><i class="fa-solid fa-star"></i> ${doctor.rating} (${doctor.reviews} avaliações)</div>
        <span class="doctor-specialty">${doctor.specialty}</span>
        <div class="availability-title">Próximos Horários Disponíveis:</div>
        <div class="time-slots">
          ${timeSlots.length ? timeSlots.map((time) => `
            <div class="time-slot ${selectedAppointment?.doctorId === doctor.id && selectedAppointment?.time === time ? 'selected' : ''}"
                 data-doctor-id="${doctor.id}" data-doctor-name="${doctor.name}" data-specialty="${doctor.specialty}" data-time="${time}">${time}</div>
          `).join('') : '<p style="font-size:0.85rem; color:#64748b;">Nenhum horário com os filtros selecionados.</p>'}
        </div>
        <button class="schedule-btn" type="button" data-schedule-doctor="${doctor.id}">Agendar Consulta</button>
      </div>
    `;
  }).join('');
}

function filterDoctors() {
  const specialtyFilter = document.getElementById('specialtyFilter')?.value.toLowerCase() || '';
  const dateFilter = document.getElementById('dateFilter')?.value || '';
  const periodFilter = document.getElementById('periodFilter')?.value || '';

  const filtered = doctors.filter((doctor) => {
    const specialtySlug = doctor.specialty.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
    if (specialtyFilter && specialtySlug !== specialtyFilter) return false;
    const availability = getFilteredAvailability(doctor, dateFilter, periodFilter);
    return availability.length > 0;
  });

  renderDoctors(filtered);
}

function scheduleAppointment(doctorId) {
  const doctor = doctors.find((item) => item.id === doctorId);
  if (!selectedAppointment || selectedAppointment.doctorId !== doctorId) {
    appToast('warning', 'Selecione um horário', 'Escolha um horário disponível antes de agendar.');
    return;
  }
  appToast('success', 'Consulta agendada com sucesso!', `${doctor.name} • ${doctor.specialty} • ${selectedAppointment.time}`);
  setTimeout(() => window.history.back(), 900);
}

document.addEventListener('change', (event) => {
  if (event.target.matches('#specialtyFilter, #dateFilter, #periodFilter')) {
    filterDoctors();
  }
});

document.addEventListener('click', (event) => {
  const timeSlot = event.target.closest('.time-slot[data-doctor-id]');
  if (timeSlot) {
    document.querySelectorAll('.time-slot.selected').forEach((slot) => slot.classList.remove('selected'));
    timeSlot.classList.add('selected');
    selectedAppointment = {
      doctorId: Number(timeSlot.dataset.doctorId),
      doctorName: timeSlot.dataset.doctorName,
      specialty: timeSlot.dataset.specialty,
      time: timeSlot.dataset.time
    };
    return;
  }

  const scheduleButton = event.target.closest('[data-schedule-doctor]');
  if (scheduleButton) {
    scheduleAppointment(Number(scheduleButton.dataset.scheduleDoctor));
  }
});

renderDoctors();
