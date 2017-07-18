$( document ).ready(function() {

    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyCQPU4fcYlDQCq86eMr9C5KgTGdM0Fhp1g",
    authDomain: "gamaleads-d0573.firebaseapp.com",
    databaseURL: "https://gamaleads-d0573.firebaseio.com",
    projectId: "gamaleads-d0573",
    storageBucket: "gamaleads-d0573.appspot.com",
    messagingSenderId: "590608136333"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  var signupForm = document.getElementById('signup-form');
  var formSuccess = document.getElementById('form-success');
  var leadIP;

  axios.get('https://api.ipify.org?format=json').then(function (response) {
      leadIP = response.data.ip;
    }).catch(function(error) {
      console.log(error);
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

  var onSignupComplete = function(error) {
    if (error) {
      console.log(error);
    } else {
      $('#form-success').text('Obrigado por se cadastrar!');
    }
  };

  $('#signup-button').click(function signup() {

    var name = $('#nameForm');
    var email = $('#emailForm');
    var celular = $('#celphone');

    if (name.val().length >= 3) {
      if (is_email(email.val())) {  
          firebase.database().ref('leads/').push({
                Nome: name.val(),
                Email: email.val(),
                IP: leadIP,
                Celular: celular.val(),
                // Data: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
                // Hora: date.getHours() + ':' + date.getMinutes() + ':'+ date.getSeconds(),
                data: Date()
          },onSignupComplete);

          name.val("");
          email.val("");
          celular.val("");

        } else {
          alert("Coloque um e-mail válido!");
        }
      } else {
        alert("Coloque um nome válido!");
      }
  });

  function is_email(email){
	  er = /^[a-zA-Z0-9][a-zA-Z0-9\.-]+@([a-zA-Z0-9\.-]+\.)[a-zA-Z-0-9]{2,3}/; 
	  if( !er.exec(email) )
	  {
		  return false;
    }
    else { return true; }
  }
});