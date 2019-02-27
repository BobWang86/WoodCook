var attempt = 5; //Variable to count number of attempts

//Below function Executes on click of login button
function validate(){
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	if ( username == "user@gmail.com" && password == "password"){
		window.location = "woodcook-today.html"; 
		return false;
	}
	else{
		attempt --;
		// alert("You have left "+attempt+" attempt;");
		document.getElementById("warning").style.display = "flex";
		
		//Disabling fields after 5 attempts
		if( attempt == 0){
			document.getElementById("username").disabled = true;
			document.getElementById("password").disabled = true;
			document.getElementById("submit").disabled = true;
			return false;
		}
	}
}