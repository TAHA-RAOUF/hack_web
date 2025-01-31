

	const countdownDate = new Date('2025-02-03T08:00:00').getTime();

	function updateCountdown() {
		const now = new Date().getTime();
		const distance = countdownDate - now;

		const days = Math.floor(distance / (1000 * 60 * 60 * 24));
		const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((distance % (1000 * 60)) / 1000);


		document.getElementById('days').innerText = days.toString().padStart(2, '0');
		document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
		document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
		document.getElementById('Seconds').innerText = seconds.toString().padStart(2, '0');
	}

	setInterval(updateCountdown, 1000);
	updateCountdown();


	

