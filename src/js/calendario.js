/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', function () {
	const calendarEl = document.getElementById('calendar')
	const calendar = new FullCalendar.Calendar(calendarEl, {
		initialView: 'dayGridMonth',
		locale: 'pt-br',
		initialDate: Date.now(),
		headerToolbar: {
			left: 'prev',
			center: 'title',
			right: 'next'
		},
		buttonIcons: true,
		buttonText: {
		prev: 'Anterior',
		next: 'Próximo',
		today: 'Hoje',
		month: 'Mês',
		week: 'Semana',
		day: 'Dia',
		list: 'Lista'
		},
		weekNumbers: false,
		navLinks: false,
		editable: true,
		dayMaxEvents: true
	})
	calendar.render()
})
