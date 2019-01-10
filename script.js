$(document).ready(() => {

  if (localStorage.getItem("storage")) {
    var storedItem = localStorage.getItem("storage");
    var items = JSON.parse(storedItem);
    items.forEach(item => {
      var singleItem = $(`
       <div class="col-lg-3 col-md-4  passwordBox">
        <div class="storedPassword">
            <p>${item.website}</p>
            <h5>${item.username}</h5>
            <h5>${item.password}</h5>
        </div>
      </div>
      `);
      $("#know").append(singleItem);
    });
  } else {
    var arr = [];
    var arrStore = JSON.stringify(arr);
    localStorage.setItem("storage", arrStore);
  }

  if(localStorage.getItem('credentials')){
    $(".1st").addClass("hide");
    $("#lockscreen").removeClass("hide");
  }
});

$("#submit").click(e => {
  e.preventDefault();
  var username = $("#username").val();
  var password = $("#password").val();
  var website = $("#site").val();
  var storedItems = localStorage.getItem("storage");
  var modifyItems = JSON.parse(storedItems);
  var combo = {
    id: modifyItems.length + 1,
    username: username,
    password: password,
    website: website
  };
  modifyItems.push(combo);
  var storeCombo = JSON.stringify(modifyItems);
  localStorage.setItem("storage", storeCombo);
  $("#username").val("");
  $("#password").val("");
  $("#site").val("");
  var singleItem = $(`
       <div class="col-lg-3 col-md-4  passwordBox">
        <div class="storedPassword">
            <p>${combo.website}</p>
            <h5>${combo.username}</h5>
            <h5>${combo.password}</h5>
        </div>
      </div>
      `);
  $("#know").append(singleItem);
});

$("#getPasswords").click(() => {
  $("#addPasswordContainer").toggleClass("hide");
  $("#showPasswordContainer").toggleClass("hide");
  $("#clearPasswords").toggleClass("hide");
  $("#getPasswords").toggleClass("hide");
  $("#addPassword").toggleClass("hide");
});

$("#addPassword").click(() => {
  var storedItem = localStorage.getItem("storage");
  console.log(JSON.parse(storedItem));
  $("#addPasswordContainer").toggleClass("hide");
  $("#showPasswordContainer").toggleClass("hide");
  $("#clearPasswords").toggleClass("hide");
  $("#getPasswords").toggleClass("hide");
  $("#addPassword").toggleClass("hide");
});

$("#clearPasswords").click(() => {
  localStorage.removeItem('storage');
  window.location.reload();
});

$("#lock").click(() => {
  if (localStorage.getItem("credentials")) {
    $(".1st").addClass("hide");
    $("#lockscreen").removeClass("hide");
  } else {
    $(".1st").addClass("hide");
    $('#lockinfo').removeClass('hide');
    $('#unlockinfo').addClass('hide');
    $("#credentials").removeClass("hide");
  }
});

$("#sitesubmit").click(e => {
  e.preventDefault();
  if (!localStorage.getItem("credentials")) {
    var siteUsername = $("#siteusername").val();
    var sitePassword = $("#sitepassword").val();
    var credentials = {
      username: siteUsername,
      password: sitePassword
    };
    var storeCredentials = JSON.stringify(credentials);
    localStorage.setItem("credentials", storeCredentials);
    $('#credentials').addClass('hide');
    $('#lockscreen').removeClass("hide");
  } else {
      var credentials = localStorage.getItem('credentials');
      var check = JSON.parse(credentials);
      if(check.username == $('#siteusername').val() && check.password == $('#sitepassword').val()){
        $(".1st").removeClass("hide");
        $("#credentials").addClass('hide');
        $('#addPasswordContainer').addClass('hide');
        $('#siteusername').val('');
        $('#sitepassword').val('');
      } else{
          swal('Incorrect Login Details!');
      }
  }
});


$('#unlock').click(()=>{
    $('#lockscreen').addClass('hide');
    $('#credentials').removeClass('hide');
});
