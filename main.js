window.onload = () => {
	'use strict';
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/jetherson_sw.js');
	}
}