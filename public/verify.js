const errorMessage = document.querySelector(".error");
const success = document.querySelector(".success");
const verification = document.querySelector(".verification");

verification.addEventListener("submit", async (e) => {
 e.preventDefault();
 const registerUser = "http://localhost:3000/api/v1/auth/verify";

 const verify = document.querySelector(".verify").value;
 const access = {accessCode: verify}

 const response = await axios
   .post(registerUser, access)
   .then((res) => {
    success.textContent = `${res.data.msg} Your account has been verified.`

    success.textContent = `${res.data.msg} \n page redirecting`
      window.setTimeout(() =>{
       window.location.href = 'dashboard.html'
      }, 2000);
    console.log(res.data);
   })
   .catch((error) => {
    errorMessage.textContent = error.response.data

    window.setTimeout(() => {
      errorMessage.textContent = '';

    }, 2000)

     console.log(error.response.data);
   });
});
