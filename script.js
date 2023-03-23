const passwordInput = document.getElementById('password');
const passwordStrengthIndicator = document.querySelector('.password-strength-indicator');
const lengthIndicator = document.getElementById('indicator-length');
const uppercaseIndicator = document.getElementById('indicator-uppercase');
const lowercaseIndicator = document.getElementById('indicator-lowercase');
const numberIndicator = document.getElementById('indicator-number');
const symbolIndicator = document.getElementById('indicator-symbol');
const togglePasswordButton = document.querySelector('.toggle-password');

// Función para actualizar el indicador de fortaleza de la contraseña
function updatePasswordStrength() {
    const password = passwordInput.value;
    let valido = true;
    // Comprobar la longitud de la contraseña
    if (password.length >= 12) {
        lengthIndicator.classList.add('success');
    } else {
        lengthIndicator.classList.remove('success');
        valido = false;
    }

    // Comprobar si la contraseña contiene mayúsculas
    if (/[A-Z]/.test(password)) {
        uppercaseIndicator.classList.add('success');
    } else {
        uppercaseIndicator.classList.remove('success');
        valido = false;
    }

    // Comprobar si la contraseña contiene minúsculas
    if (/[a-z]/.test(password)) {
        lowercaseIndicator.classList.add('success');
    } else {
        lowercaseIndicator.classList.remove('success');
        valido = false;
    }

    // Comprobar si la contraseña contiene números
    if (/\d/.test(password)) {
        numberIndicator.classList.add('success');
    } else {
        numberIndicator.classList.remove('success');
        valido = false;
    }

    // Comprobar si la contraseña contiene símbolos
    if (/[\W_]/.test(password)) {
        symbolIndicator.classList.add('success');
    } else {
        symbolIndicator.classList.remove('success');
        valido = false;
    }

    return valido
}

// Evento para actualizar el indicador de fortaleza de la contraseña cada vez que se cambia la contraseña
passwordInput.addEventListener('input', updatePasswordStrength);

// Evento para mostrar/ocultar la contraseña al hacer clic en el botón correspondiente
togglePasswordButton.addEventListener('click', function () {
    const passwordVisible = passwordInput.getAttribute('type') === 'text';

    if (passwordVisible) {
        passwordInput.setAttribute('type', 'password');
    } else {
        passwordInput.setAttribute('type', 'text');
    }

    togglePasswordButton.querySelector('i').classList.toggle('fa-eye');
    togglePasswordButton.querySelector('i').classList.toggle('fa-eye-slash');
});

//=======================================================================================================================================
//INSERTAR NUEVO USUARIO
//=======================================================================================================================================
var users = [];
var tablaUsuarios = document.querySelector('#tabla-usuarios tbody');

// Función para crear la tabla de usuarios
function crearTablaUsuarios() {
    // Limpiar la tabla de usuarios
    tablaUsuarios.innerHTML = '';

    // Recorrer el arreglo de usuarios y agregarlos a la tabla
    for (var i = 0; i < users.length; i++) {
        var usuario = users[i];
        var fila = document.createElement('tr');
        fila.innerHTML = '<td>' + usuario.id + '</td>' +
            '<td>' + usuario.usuario + '</td>' +
            '<td>' + usuario.password + '</td>';
        tablaUsuarios.appendChild(fila);
    }
}

document.querySelector('.registrar').addEventListener('click', function (event) {
    event.preventDefault();

    if (updatePasswordStrength()) {
        // Obtener los valores de los inputs de usuario y contraseña
        var usuarioInput = document.querySelector('#username');
        var passwordInput = document.querySelector('#password');
        //Encriptar password
        var nuevoUsuario = {
            id: users.length + 1, // asignar un nuevo id
            usuario: usuarioInput.value,
            password: CryptoJS.SHA256(passwordInput.value).toString()
        };
        // Agregar el nuevo usuario al arreglo de usuarios
        users.push(nuevoUsuario);
        // Crear la tabla de usuarios
        crearTablaUsuarios();

        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'El usuario ha sido registrado correctamente.',
        })

        usuarioInput.value = ""
        passwordInput.value = ""
        lengthIndicator.classList.remove('success');
        uppercaseIndicator.classList.remove('success');
        lowercaseIndicator.classList.remove('success');
        numberIndicator.classList.remove('success');
        symbolIndicator.classList.remove('success');
    } else {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'No cumple con los requisitos solicitados.',
        })
    }

});