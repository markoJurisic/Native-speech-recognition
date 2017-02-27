window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Create a new instance of speech recognition
const recognition = new SpeechRecognition();

// Set interim results which allows us to see the results as we speak (as opposing to waiting to stop speaking to se the result)
recognition.interimResults = true;

// Create a paragraph for our transcript and append it to the container div. Every time we stop speaking a new paragraph will be created
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

// Listen to result event and reach for transcript which is in e.results. Converting it into an array so we can map it.
recognition.addEventListener('result', e => {
	const transcript = Array.from(e.results)
		.map(result => result[0])
		.map(result => result.transcript)
		// join since it may have words in multiple values
		.join('')

	// Display results
	p.textContent = transcript;

	// If speaking is done, create another paragraph and append it to the container div
	if (e.results[0].isFinal) {
		p = document.createElement('p');
		words.appendChild(p);
	}
})

// Re-start the recognition process when we start speaking again
recognition.addEventListener('end', recognition.start);

recognition.start();