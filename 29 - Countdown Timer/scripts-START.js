let countDown ;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);

	countDown = setInterval( function () {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		if (secondsLeft <= 0) {
			clearInterval(countDown);
		}
		displayTimeLeft(secondsLeft);
	}, 1000);

	function displayTimeLeft(seconds) {
		const secondsRemainder = seconds % 60;
		const minutes = (seconds - secondsRemainder) / 60;
		const display = `${minutes < 10 ? '0' : ''}${minutes}:${secondsRemainder < 10 ? '0' : '' }${secondsRemainder}`;
		timerDisplay.textContent = display;
		document.title = display;
	}

	function displayEndTime(timestamp) {
		const end = new Date(timestamp);
		let hour = end.getHours();
		hour = hour > 12 ? hour - 12 : hour;
		const minutes = end.getMinutes();
		endTime.textContent = `Be back at ${hour < 10 ? '0' : ''}${hour}:${minutes < 10 ? '0' : '' }${minutes}`;		
	}
}

function startTimer() {
	clearInterval(countDown);
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
	e.preventDefault();
	const mins = this.minutes.value;
	timer(mins * 60);
	this.reset();
});