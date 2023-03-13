
const form = document.querySelector('form')
const submitBtn = document.querySelector('button')

form.addEventListener('submit', async (e) => {
 e.preventDefault()
 const registerUser = 'http://localhost:3000/api/v1/auth/register';

const firstName = document.querySelector('.firstname').value
const lastName = document.querySelector('.lastname').value
const positionTitle = document.querySelector('.position').value
const email = document.querySelector('.email').value
const password = document.querySelector('.password').value

 const users = {
  firstName : firstName,
  lastName : lastName,
  positionTitle : positionTitle,
  email : email,
  password : password,

 }

 const contentType = { headers: { 'Content-Type': 'application/json' }}

 const response = await axios.post(registerUser, users, contentType)
 console.log(response);
})


// const requests = async (method, url) => {
//  const register = await method(url)
//  console.log(register);
// }