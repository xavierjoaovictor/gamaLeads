var signupForm = document.getElementById('signup-form');
var signupSuccess = document.getElementById('signup-success');
var signupError = document.getElementById('signup-error');
var signupBtn = document.getElementById('signup-button');
var leadIP;
var apiKey = "test_2a6e5cb862c01534ff3c38c6f4fd1bf8d6bc0f837ea8150932a768315f37d276"

$.getJSON('https://freegeoip.net/json/?callback=?', function(data) {
  leadIP = data;
  // console.log(leadIP);
});



var onSignupComplete = function(error) {
  signupBtn.disabled = false;
  if (error) {
    signupError.innerHTML = 'Sorry. Could not signup.';
  } else {
    signupSuccess.innerHTML = 'Thanks for signing up!';
    // hide the form
    signupForm.style.display = 'none';
  }
};

function signup(formObj) {

    // Referencia "tabela" existente ou cria uma nova
    var firebaseTable = new Firebase("https://gamaleads-d0573.firebaseio.com/signups");

    console.log(formObj.celphone.value)

    firebaseTable.push({
      Nome: formObj.name.value,
      Email: formObj.email.value,
      IP: leadIP.ip,
      Local: leadIP.city + '/' + leadIP.region_code,
      Celular: formObj.celphone.value
    }, onSignupComplete);

    signupBtn.disabled = true;
    return false;
}
