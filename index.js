var signupForm = document.getElementById('signup-form');
var leadIP;

$.getJSON('https://freegeoip.net/json/?callback=?', function(data) {
  leadIP = data;
  console.log(leadIP);
});

var SPMaskBehavior = function (val) {
  return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
},
spOptions = {
  onKeyPress: function(val, e, field, options) {
      field.mask(SPMaskBehavior.apply({}, arguments), options);
    }
};

$('#celphone').mask(SPMaskBehavior, spOptions);

function signup(formObj) {

    var date = new Date();

    // Referencia "tabela" existente ou cria uma nova
    var firebaseTable = new Firebase("https://gamaleads-d0573.firebaseio.com/signups");

    firebaseTable.push({
      Nome: formObj.name.value,
      Email: formObj.email.value,
      IP: leadIP.ip,
      Local: leadIP.city + '/' + leadIP.region_code,
      Celular: formObj.celphone.value,
      Data: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
      Hora: date.getHours() + ':' + date.getMinutes() + ':'+ date.getSeconds()
    });

    return false;
}
