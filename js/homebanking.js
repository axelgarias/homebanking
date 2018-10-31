//Variables
var nombreUsuario = "Axel";
var saldoCuenta = 7500;
var limiteExtraccion = 2000;
var intentosDeLogeo = 0;
var codigoDeSeguridad = 1421;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML
window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
    iniciarSesion();
}


//Funciones
function sumarDinero(dinero){
	saldoCuenta += dinero; 
        
}

function restarDinero(dinero){
    saldoCuenta -= dinero;
}

	
function cambiarLimiteDeExtraccion() {
	var nuevoLimite = parseInt(prompt('Nuevo limite de extraccion'));
	var viejoLimite=limiteExtraccion;
	if (esNumeroValido(nuevoLimite)) {
		alert("Debe ingresar un numero valido.");
	}else{
		limiteExtraccion = nuevoLimite;
		alert("Tu nuevo limite de extraccion es: $" + nuevoLimite + '\n'+
			  "Viejo limite de extraccion: $" + viejoLimite);
		actualizarLimiteEnPantalla();
	}
}

function esNumeroValido(retiro) {
	return isNaN(retiro) || retiro <= 0;
}

function billetesDe100(retiro) {
	return retiro % 100 != 0;
}

function mayorAlLimite(retiro) {
	return retiro > limiteExtraccion;
}

function mayorAlSaldo(retiro) {
	return retiro > saldoCuenta;
}



function extraerDinero() {
	var retiro = parseInt(prompt('Dinero a retirar'));
	var saldoAnterior = saldoCuenta;
	
	if (esNumeroValido(retiro)) {
		alert("Debe ingresar un numero valido.");
	} else if (billetesDe100(retiro)){
    	alert("No puedes retirar billetes que no sean de 100");
    } else if (mayorAlLimite(retiro)) {
    	alert("La cantidad de dinero que deseas extraer es mayor a tu limite de extraccion.");
   	} else if (mayorAlSaldo(retiro)) {
    	alert("No posees suficiente dinero.");
   	} else {
		restarDinero(retiro);
		actualizarSaldoEnPantalla();
		alert('Retiro: $'+ retiro + '\n'+
              'Su saldo anterior es: $'+ saldoAnterior + '\n'+
              'Su nuevo saldo es: $' + saldoCuenta);
	}
}


function depositarDinero() {
	var deposito = parseInt(prompt('Dinero a depositar'));
	var saldoAnterior=saldoCuenta;
	if (esNumeroValido(deposito)) {
		alert("Debe ingresar un numero valido.");
	}else{
		sumarDinero(deposito);
		actualizarSaldoEnPantalla();
		alert('Deposito: $'+ deposito + '\n'+
              'Su saldo anterior es: $'+ saldoAnterior + '\n'+
              'Su nuevo saldo es: $' + saldoCuenta);
	}
}

function pagarServicio() {
	var Agua = 350;
	var Luz = 210;
	var Telefono = 425;
	var Internet = 570;
	var servicios = prompt('Que servicio queres pagar?:'+ '\n' + 1+'-'+'Agua'+ '\n' + 2+'-'+'Telefono'+'\n'+ 3+'-'+'Luz'+'\n'+4+'-'+'Internet');
	switch(servicios){
        case "1":
            if(Agua > saldoCuenta){
                alert("El saldo no es suficiente para pagar el servicio.");
            }
            else {
                saldoCuenta -= Agua;
                alert('El servicio de Agua se pago correctamente');
            }
                break;
        case '2':
            if(Luz > saldoCuenta){
                alert("El saldo no es suficiente para pagar el servicio.");
            }
            else {
                saldoCuenta -= Luz;
                alert('El servicio de Luz se pago correctamente');
            }
                break;
        case '3':
            if(Telefono > saldoCuenta){
                alert("El saldo no es suficiente para pagar el servicio.");
            }
            else {
               	saldoCuenta -= Telefono;
                alert('El servicio de Luz se pago correctamente');
            }
                break;
        case '4':
            if(Internet > saldoCuenta){
                alert("El saldo no es suficiente para pagar el servicio.");
            }
            else {
                saldoCuenta -= Internet;
                alert('El servicio de Internet se pago correctamente');
            }
                break;
                default:
            alert('El servicio no fue encontrado, por favor revise si el numero que ingreso es correcto.');
    }
            actualizarSaldoEnPantalla();
}

function transferirDinero() {
	var Monica = 1234567;
	var Gustavo = 7654321;
    var transferencia = prompt('A que cuenta desea transferir dinero?');
    if (parseInt(transferencia) === Monica || parseInt(transferencia) === Gustavo){
    	saldoParaTransferir = prompt('Cuanto dinero desea transferir?')
	transaccion();
        
    }else if(parseInt(transferencia) !== Monica ||parseInt(transferencia) !== Gustavo){
    	alert('Solo puede transferirse dinero a una cuenta amiga.');
    }
}	


function transaccion() {
	if(saldoParaTransferir > saldoCuenta){
		alert('Su saldo no es suficiente para realizar esta operacion');
	}else{
		saldoCuenta = saldoCuenta - saldoParaTransferir;
			alert('La transferencia se realizo con exito');
		actualizarSaldoEnPantalla();
    }
}	

function iniciarSesion() {
	if (intentosDeLogeo > 5) {
		return bloqueoPorIntentos();
	}

	var codigoDeSeguridad = prompt('Ingrese su codigo de seguridad')
	
	if (codigoDeSeguridad == 1421) {
		return alert("Bienvenido devuelta " + nombreUsuario);
	} else if (codigoDeSeguridad != 1421) {
		intentosDeLogeo++;
		alert("El codigo que ingreso no es el correcto.")
		return iniciarSesion();
	}		
}

function bloqueoPorIntentos() {
	saldoCuenta = 0;
	actualizarSaldoEnPantalla();
	return alert("Tu cuenta ha sido bloqueada y tu saldo ha sido retenido.");
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}
