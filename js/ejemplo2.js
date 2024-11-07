// Obteniendo la referencia de los elementos
// por medio de arreglos asociativos
const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// OBTENIENDO LA REFERENCIA DEL CUERPO DEL MODAL
// PARA IMPRIMIR EL RESULTADO
const bodyModal = document.getElementById("idBodyModal");

// Validar campos vacíos
const validarCamposVacios = () => {
    let elementos = formulario.elements;
    for (let elemento of elementos) {
        if (
            elemento.type !== "submit" &&
            elemento.type !== "button" &&
            elemento.type !== "file" &&
            elemento.value.trim() === ""
        ) {
            alert(`El campo "${elemento.name}" no puede estar vacío.`);
            return false;
        }
    }
    return true;
};

// Validar fecha de nacimiento
const validarFechaNacimiento = () => {
    const fechaNacimiento = formulario["idFechaNac"].value;
    const fechaActual = new Date().toISOString().split("T")[0];
    if (fechaNacimiento > fechaActual) {
        alert("La fecha de nacimiento no puede ser mayor que la fecha actual.");
        return false;
    }
    return true;
};

// Validar el formato del correo electrónico
const validarCorreoElectronico = () => {
    const email = formulario["idCorreo"].value;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        alert("El correo electrónico no tiene un formato válido.");
        return false;
    }
    return true;
};

// Validar contraseñas
const validarContrasenas = () => {
    const password = formulario["idPassword"].value;
    const repetirPassword = formulario["idPasswordRepetir"].value;
    if (password !== repetirPassword) {
        alert("Las contraseñas no coinciden.");
        return false;
    }
    return true;
};

// Validar checkbox
const validarCheckbox = () => {
    const checkboxes = formulario.querySelectorAll('input[type="checkbox"]');
    for (let checkbox of checkboxes) {
        if (checkbox.checked) return true;
    }
    alert("Debe seleccionar al menos una opción en 'Seleccione algunos intereses'.");
    return false;
};

// Validar que seleccione una carrera
const validarCarrera = () => {
    const radios = formulario.querySelectorAll('input[name="idRdCarrera"]');
    for (let radio of radios) {
        if (radio.checked) return true;
    }
    alert("Debe seleccionar una carrera.");
    return false;
};

// Validar que seleccione un país
const validarPais = () => {
    const pais = formulario["idCmPais"].value;
    if (pais === "Seleccione una opcion") {
        alert("Debe seleccionar un país de origen.");
        return false;
    }
    return true;
};

// Mostrar datos en el modal
const mostrarDatosEnModal = () => {
    const tabla = document.createElement("table");
    tabla.className = "table table-striped";

    const cabecera = document.createElement("thead");
    cabecera.innerHTML = `
        <tr>
            <th>Campo</th>
            <th>Valor</th>
        </tr>
    `;
    tabla.appendChild(cabecera);

    const cuerpo = document.createElement("tbody");

    const elementos = formulario.elements;
    for (let elemento of elementos) {
        if (elemento.type !== "submit" && elemento.type !== "button") {
            const fila = document.createElement("tr");

            const celdaCampo = document.createElement("td");
            celdaCampo.textContent = elemento.previousElementSibling
                ? elemento.previousElementSibling.textContent.trim() || elemento.name
                : elemento.name;

            const celdaValor = document.createElement("td");
            if (elemento.type === "checkbox") {
                if (elemento.checked) {
                    celdaValor.textContent = elemento.nextElementSibling.textContent.trim();
                    fila.appendChild(celdaCampo);
                    fila.appendChild(celdaValor);
                    cuerpo.appendChild(fila);
                }
                continue;
            } else if (elemento.type === "radio") {
                if (elemento.checked) {
                    celdaValor.textContent = elemento.nextElementSibling.textContent.trim();
                    fila.appendChild(celdaCampo);
                    fila.appendChild(celdaValor);
                    cuerpo.appendChild(fila);
                }
                continue;
            } else if (elemento.nodeName === "SELECT") {
                celdaValor.textContent = elemento.options[elemento.selectedIndex].text.trim();
            } else if (elemento.type === "file" && elemento.value) {
                celdaValor.textContent = elemento.value.split("\\").pop(); 
            } else {
                celdaValor.textContent = elemento.value.trim();
            }

            fila.appendChild(celdaCampo);
            fila.appendChild(celdaValor);
            cuerpo.appendChild(fila);
        }
    }
    tabla.appendChild(cuerpo);

    while (bodyModal.firstChild) {
        bodyModal.removeChild(bodyModal.firstChild);
    }
    bodyModal.appendChild(tabla);
    modal.show();
};

// Validar formulario
const validarFormulario = () => {
    if (
        validarCamposVacios() &&
        validarFechaNacimiento() &&
        validarCorreoElectronico() &&
        validarContrasenas() &&
        validarCheckbox() &&
        validarCarrera() &&
        validarPais()
    ) {
        mostrarDatosEnModal();
    }
};

// Agregando eventos al boton
button.onclick = (e) => {
    e.preventDefault();
    validarFormulario();
};
