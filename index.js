var signupForm = document.getElementById('signup-form');
var leadIP;
var apiKey = "test_2a6e5cb862c01534ff3c38c6f4fd1bf8d6bc0f837ea8150932a768315f37d276"

$.getJSON('https://freegeoip.net/json/?callback=?', function(data) {
  leadIP = data;
  // console.log(leadIP);
});

var onSignupComplete = function(error) {
  if (error) {
    console.log(error)
  } 
};

function signup(formObj) {

    // Referencia "tabela" existente ou cria uma nova
    var firebaseTable = new Firebase("https://gamaleads-d0573.firebaseio.com/signups");

    firebaseTable.push({
      Nome: formObj.name.value,
      Email: formObj.email.value,
      IP: leadIP.ip,
      Local: leadIP.city + '/' + leadIP.region_code,
      Celular: formObj.celphone.value
    }, onSignupComplete);

    return false;
}
