const form = document.querySelector(".login-form");
const submitBtn = document.querySelector("button");
const errorMessage = document.querySelector(".error");
const success = document.querySelector(".success");

  errorMessage.textContent = '';
  success.textContent = '';

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const registerUser = "http://localhost:3000/api/v1/auth/login";

  const email = document.querySelector(".email").value;
  const password = document.querySelector(".password").value;
  errorMessage.textContent = '';
  success.textContent = '';

  const users = {
    email: email,
    password: password,
  };
  const response = await axios
    .post(registerUser, users)
    .then((res) => {
     success.textContent = `${res.data.msg} \n page redirecting`
      window.setTimeout(() =>{
       window.location.href = 'verify.html'
      }, 3000);
    })
    .catch((error) => {
     errorMessage.textContent = error.response.data;
      console.log(error.response.data);
    });
});

