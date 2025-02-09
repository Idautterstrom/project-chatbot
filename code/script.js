//DOM selectors stored as short variables
const chat = document.getElementById('chat') 
const form = document.getElementById('name-form') //The form
const inputValue = document.getElementById('name-input') //Input field
const inputWrapper = document.getElementById('input-wrapper')
const sendBtn = document.getElementById('submit')

//Global variables
let userName = ''

//Functions

//This function will add a chat bubble in the correct place based on who the sender is
const showMessage = (message, sender) => {
  if (sender === 'user') {
    
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/user.png" alt="User" />  
      </section>
    `
  } else if (sender === 'bot') {
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/bot.png" alt="Bot" />
        <div class="bubble bot-bubble">
          <p>${message}</p>
        </div>
      </section>
    `
  }

//Makes chat scroll to the last message
  chat.scrollTop = chat.scrollHeight
}


//All questions and answers from bot

//1st
const greeting = () => {
  showMessage(`Hello there, What's your name?`, 'bot')
}

//2nd
const handleFoodInput = () => { 
  setTimeout(() => showMessage(`Hi ${userName}, what would you like to order?`, 'bot'), 1000) 

  inputWrapper.innerHTML = `
  <button id="Pizza">Pizza</button>
  <button id="Pasta">Pasta</button>
  <button id="Hamburger">Hamburger</button>
 `

 inputWrapper.addEventListener('click', handleRequest)
 
}

//3rd
const handleRequest = () => { 
  setTimeout(() => showMessage (`Good choice, ${userName}! Would you like a drink with that?`, 'bot'), 1000)

  inputWrapper.innerHTML = `
  <button id="Yes">Yes</button>
  <button id="No">No</button>
  `
  //To get different replies from bot depending on answer:
document.getElementById('Yes').addEventListener('click', () => drinkOrder ('Yes'))
document.getElementById('No').addEventListener('click', () => drinkOrder ('No'))
}

//4th
const drinkOrder = (type) => { //depending on answer, different messages will occur!
  
  //To stop messages from appearing again:
  inputWrapper.removeEventListener('click', handleRequest)

  if (type === 'Yes') { 
    setTimeout(() => showMessage(`Thanks, food and drinks are coming your way!`, 'bot'), 1000)
  } else if (type === 'No') {
    showMessage(`Ok, no drink for you! See you soon!`, 'bot') 
  }

  inputWrapper.innerHTML=''
}


//Function that shows the name of the user in first interaction
const handleNameInput = (event) => { 
  event.preventDefault()

  userName = inputValue.value

  showMessage(`Hey, my name is ${userName}!`, 'user')
  inputValue.value = '' //this is to take away the name from the form and call on another function

  setTimeout(handleFoodInput, 1000) //
}
  
//The button on the form, envoked every time we submit the form
form.addEventListener('submit', handleNameInput)


//When website loaded, chatbot asks first question with a 1sec delay:
setTimeout(greeting, 1000)
