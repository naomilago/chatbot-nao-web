let classContainer = document.querySelector('.chat-container')
let submit = document.querySelector('#submit')
let input = document.querySelector('#prompt')

const ws = new WebSocket('wss://127.0.0.1:5000/')

function sendPrompt() {
  //! TODO:
  //? [x] Communicate and sent the message to the frontend with the user icon
  //? [] Connect the websocket
  //? [] Save this in a temporary Python variable for the model
  //? [] Request the model already trained with some answers
  let input = document.querySelector('#prompt').value

  let inputObject = {
    inputText: input
  }

  classContainer.innerHTML += `
  <div class="message">
    <img src="static/icons/user.png">
    <p>${inputObject['inputText']}</p>
  </div>
  `
  async function sendDataToPython(data) {
    try {
        const response = await fetch('http://localhost:5000/api', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:5000/api',
                'accept': 'application/json',
            },
            body: JSON.stringify(data)
        });
  
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log('Response from the server:', jsonResponse);
        } else {
            console.error('Error communicating with the server');
        }
    } catch (error) {
        console.error('Error:', error);
    }
  }

  const dataToSend = {
    'message': inputObject['inputText']
  }

  sendDataToPython(dataToSend)

}

// ws.addEventListener('open', console.log)

input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    sendPrompt()
  }
})

submit.addEventListener('click', sendPrompt)
