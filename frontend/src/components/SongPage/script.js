// document.addEventListener('DOMContentLoaded', (e) => {
// 	const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// 	const analyser = audioCtx.createAnalyser();
// 	// console.log(analyser);

// 	if (window.location.href.includes('songs')) {
// 		const source = document.getElementById('audio');
// 		source.connect(analyser);

// 		analyser.fftSize = 2048;
// 		var bufferLength = analyser.frequencyBinCount;
// 		var dataArray = new Uint8Array(bufferLength);

// 		console.log(dataArray);
// 	}
// });
