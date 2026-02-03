// Sistema de Autenticación y Gestión de Horas - Agropaul.es

// Datos de trabajadores con horas
const usuarios = {
    admin: { pass: 'admin123', tipo: 'admin' },
    panaitepaul: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Panaite Paul', horas: 0 },
    stefanmitrea: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Stefan Mitrea', horas: 30 },
    bayojonathan: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Bayo Jonathan', horas: 31 },
    gurbiherreda: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Gurbi Herreda Rogelio', horas: 29.5 },
    constantinboghian: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Constantin Boghian', horas: 29.5 },
    iancucozma: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Iancu Cozma', horas: 22 },
    ciprianpreluca: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Ciprian Preluca', horas: 29.5 },
    sakandarrehan: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Sakandar Rehan', horas: 30.5 },
    munteanuadi: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Munteanu Adi', horas: 0 },
    nistormiha: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Nistor L Miha', horas: 0 },
    andreeaconstantin: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Andreea Constantin', horas: 0 },
    panaitemih: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Panaite Mihalache', horas: 31 },
    nicoleta1: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Nicoleta1', horas: 22 },
    cosmin2: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Cosmin2', horas: 32 },
    raquel3: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Raquel3', horas: 20 },
    alicia4: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Alicia4', horas: 26.5 },
    simona5: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Simona5', horas: 28 },
    albert6: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Albert6', horas: 29.5 },
    diego7: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Diego7', horas: 30 },
    carlos8: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Carlos8', horas: 14.5 },
    santiago9: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Santiago9', horas: 0 },
    kadire10: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Kadire10', horas: 29.5 },
    karim11: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Karim11', horas: 29.5 },
    abdel12: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Abdel12', horas: 8 },
    youseff13: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Youseff13', horas: 22 },
    abdelgani14: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Abdelgani14', horas: 22.5 },
    hall15: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Hall15', horas: 23.5 },
    amine16: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Amine16', horas: 0 }
};

let usuarioActual = null;
let registroHoras = JSON.parse(localStorage.getItem('registroHoras')) || {};

// Función auxiliar para buscar trabajador
function buscarTrabajador(entrada) {
    entrada = entrada.toLowerCase().trim();
    
    // Buscar por usuario exacto
    if (usuarios[entrada] && usuarios[entrada].tipo === 'trabajador') {
        return { key: entrada, data: usuarios[entrada] };
    }
    
    // Buscar por nombre (parcial)
    for (let key in usuarios) {
        if (usuarios[key].tipo === 'trabajador') {
            if (usuarios[key].nombre.toLowerCase().includes(entrada) || 
                entrada.includes(usuarios[key].nombre.toLowerCase())) {
                return { key: key, data: usuarios[key] };
            }
        }
    }
    
    return null;
}

// Función para abrir modal de login
function openLoginModal(tipo) {
    const modal = document.getElementById('loginModal');
    const title = document.getElementById('modal-title');
    const desc = document.getElementById('modal-desc');
    const passContainer = document.getElementById('pass-container');
    const loginUser = document.getElementById('login-user');
    
    modal.dataset.tipo = tipo;
    
    if (tipo === 'admin') {
        title.textContent = 'Panel Administrador';
        desc.textContent = 'Ingresa tus credenciales de administrador';
        passContainer.style.display = 'block';
        loginUser.placeholder = 'Usuario: admin';
        loginUser.value = '';
        loginUser.type = 'text';
        loginUser.removeAttribute('list');
    } else {
        title.textContent = 'Acceso Trabajador';
        desc.textContent = 'Ingresa tu usuario personal que recibiste del administrador';
        passContainer.style.display = 'none';
        loginUser.placeholder = 'Tu usuario personal...';
        loginUser.value = '';
        loginUser.type = 'text';
        loginUser.removeAttribute('list');
    }
    
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    loginUser.focus();
}

// Función para cerrar modal de login
function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    document.getElementById('login-user').value = '';
    document.getElementById('login-pass').value = '';
}

// Función para procesar el login
function procesarLogin() {
    const usuario = document.getElementById('login-user').value.trim().toLowerCase();
    const password = document.getElementById('login-pass').value;
    const tipo = document.getElementById('loginModal').dataset.tipo;
    
    if (!usuario) {
        alert('Por favor ingresa un usuario');
        return;
    }
    
    if (tipo === 'admin') {
        // Login de admin
        if (usuario === 'admin' && password === 'admin123') {
            usuarioActual = { user: 'admin', tipo: 'admin' };
            mostrarPanelAdmin();
            closeLoginModal();
        } else {
            alert('Credenciales incorrectas');
        }
    } else {
        // Login de trabajador - buscar por usuario o por nombre
        let trabajadorEncontrado = buscarTrabajador(usuario);
        
        if (trabajadorEncontrado) {
            usuarioActual = { 
                user: trabajadorEncontrado.key, 
                nombre: trabajadorEncontrado.data.nombre, 
                tipo: 'trabajador' 
            };
            mostrarPanelTrabajador();
            closeLoginModal();
        } else {
            alert('Usuario no encontrado. Verifica el nombre de usuario.');
        }
    }
}

// Función para mostrar panel de admin
function mostrarPanelAdmin() {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    
    // Ocultar menú de navegación
    const mainNav = document.getElementById('mainNav');
    const menuToggle = document.getElementById('menuToggle');
    if (mainNav) {
        mainNav.classList.add('hidden-panel');
        mainNav.classList.remove('active');
    }
    if (menuToggle) {
        menuToggle.style.display = 'none';
    }
    
    cargarTrabajadores();
    actualizarResumen();
    actualizarTablaEmpleados();
    actualizarEstadisticas();
}

// Función para mostrar panel de trabajador
function mostrarPanelTrabajador() {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('worker-panel').style.display = 'block';
    
    // Ocultar menú de navegación
    const mainNav = document.getElementById('mainNav');
    const menuToggle = document.getElementById('menuToggle');
    if (mainNav) {
        mainNav.classList.add('hidden-panel');
        mainNav.classList.remove('active');
    }
    if (menuToggle) {
        menuToggle.style.display = 'none';
    }
    
    document.getElementById('nombre-trabajador-view').textContent = usuarioActual.nombre;
    actualizarHorasTrabajador();
}

// Cargar lista de trabajadores en el select
function cargarTrabajadores() {
    const select = document.getElementById('select-trabajador');
    select.innerHTML = '<option value="">Selecciona un trabajador</option>';
    
    Object.keys(usuarios).forEach(user => {
        if (usuarios[user].tipo === 'trabajador') {
            const option = document.createElement('option');
            option.value = user;
            option.textContent = usuarios[user].nombre;
            select.appendChild(option);
        }
    });
}

// Guardar horas trabajadas
function guardarHoras() {
    const trabajador = document.getElementById('select-trabajador').value;
    const horas = parseFloat(document.getElementById('input-horas').value);
    
    if (!trabajador) {
        alert('Selecciona un trabajador');
        return;
    }
    
    if (isNaN(horas) || horas <= 0) {
        alert('Por favor ingresa un número válido de horas');
        return;
    }
    
    if (!registroHoras[trabajador]) {
        registroHoras[trabajador] = [];
    }
    
    registroHoras[trabajador].push({
        fecha: new Date().toLocaleDateString('es-ES'),
        hora: new Date().toLocaleTimeString('es-ES'),
        horas: horas,
        timestamp: Date.now()
    });
    
    localStorage.setItem('registroHoras', JSON.stringify(registroHoras));
    
    // Notificación visual y actualización inmediata
    const nombreTrabajador = usuarios[trabajador].nombre;
    alert(`✓ Se registraron ${horas} horas para ${nombreTrabajador}`);
    
    // Limpiar campos
    document.getElementById('input-horas').value = '8';
    document.getElementById('select-trabajador').value = '';
    
    // Actualizar tabla y estadísticas
    actualizarTablaEmpleados();
    actualizarEstadisticas();
    actualizarResumen();
}

// Actualizar resumen general
function actualizarResumen() {
    const lista = document.getElementById('lista-resumen');
    lista.innerHTML = '';
    
    let totalHoras = 0;
    
    Object.keys(usuarios).forEach(user => {
        if (usuarios[user].tipo === 'trabajador') {
            const horasRegistradas = registroHoras[user]?.reduce((sum, reg) => sum + reg.horas, 0) || 0;
            const horasIniciales = usuarios[user].horas || 0;
            const totalTrabajador = horasIniciales + horasRegistradas;
            totalHoras += totalTrabajador;
            
            const item = document.createElement('div');
            item.style.cssText = 'padding: 12px; border-bottom: 1px solid #eee; text-align: left;';
            item.innerHTML = `
                <strong>${usuarios[user].nombre}</strong><br>
                <small>${totalTrabajador} horas totales</small>
            `;
            lista.appendChild(item);
        }
    });
    
    const total = document.createElement('div');
    total.style.cssText = 'padding: 12px; font-weight: bold; color: #2e7d32; font-size: 1.2rem;';
    total.textContent = `Total General: ${totalHoras} horas`;
    lista.appendChild(total);
}

// Actualizar horas del trabajador
function actualizarHorasTrabajador() {
    const horasRegistradas = registroHoras[usuarioActual.user]?.reduce((sum, reg) => sum + reg.horas, 0) || 0;
    const horasIniciales = usuarios[usuarioActual.user]?.horas || 0;
    const totalHoras = horasIniciales + horasRegistradas;
    document.getElementById('total-horas-worker').textContent = totalHoras;
}

// Cerrar sesión
function logout() {
    usuarioActual = null;
    document.getElementById('admin-panel').style.display = 'none';
    document.getElementById('worker-panel').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    
    // Mostrar menú de navegación nuevamente
    const mainNav = document.getElementById('mainNav');
    const menuToggle = document.getElementById('menuToggle');
    if (mainNav) {
        mainNav.classList.remove('hidden-panel');
        mainNav.classList.remove('active');
    }
    if (menuToggle) {
        menuToggle.style.display = 'block';
    }
    
    alert('Sesión cerrada correctamente');
}

// Actualizar tabla de empleados con estadísticas
function actualizarTablaEmpleados() {
    const tabla = document.getElementById('tabla-empleados');
    tabla.innerHTML = '';
    
    let contador = 1;
    const empleados = Object.keys(usuarios)
        .filter(user => usuarios[user].tipo === 'trabajador')
        .map(user => ({
            key: user,
            nombre: usuarios[user].nombre,
            horas: usuarios[user].horas || 0,
            horasRegistradas: registroHoras[user]?.reduce((sum, reg) => sum + reg.horas, 0) || 0
        }))
        .sort((a, b) => a.nombre.localeCompare(b.nombre));
    
    empleados.forEach(emp => {
        const totalHoras = emp.horas + emp.horasRegistradas;
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${contador}</td>
            <td>${emp.nombre}</td>
            <td id="horas-${emp.key}">${totalHoras.toFixed(1)} h</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action btn-add" onclick="abrirAgregarHoras('${emp.key}', '${emp.nombre}')">+Agregar</button>
                    <button class="btn-action btn-reset" onclick="resetearHoras('${emp.key}')">Reiniciar</button>
                </div>
            </td>
        `;
        tabla.appendChild(fila);
        contador++;
    });
}

// Agregar horas a un empleado específico
function abrirAgregarHoras(key, nombre) {
    const horas = prompt(`¿Cuántas horas trabajó ${nombre} hoy?`, '8');
    
    if (horas !== null && horas.trim() !== '') {
        const horasNum = parseFloat(horas);
        
        if (isNaN(horasNum) || horasNum <= 0) {
            alert('Por favor ingresa un número válido de horas');
            return;
        }
        
        if (!registroHoras[key]) {
            registroHoras[key] = [];
        }
        
        registroHoras[key].push({
            fecha: new Date().toLocaleDateString('es-ES'),
            hora: new Date().toLocaleTimeString('es-ES'),
            horas: horasNum,
            timestamp: Date.now()
        });
        
        localStorage.setItem('registroHoras', JSON.stringify(registroHoras));
        
        // Actualizar la tabla visualmente
        const totalActual = (usuarios[key].horas || 0) + 
                           registroHoras[key].reduce((sum, reg) => sum + reg.horas, 0);
        document.getElementById(`horas-${key}`).textContent = totalActual.toFixed(1) + ' h';
        
        actualizarEstadisticas();
        
        // Notificación visual
        alert(`✓ Se agregaron ${horasNum} horas a ${nombre}`);
    }
}

// Reiniciar horas de un empleado
function resetearHoras(key) {
    if (confirm(`¿Estás seguro de que deseas reiniciar las horas registradas para ${usuarios[key].nombre}? Las horas iniciales se mantendrán.`)) {
        registroHoras[key] = [];
        localStorage.setItem('registroHoras', JSON.stringify(registroHoras));
        actualizarTablaEmpleados();
        actualizarEstadisticas();
        alert(`✓ Horas reiniciadas para ${usuarios[key].nombre}`);
    }
}

// Actualizar estadísticas generales
function actualizarEstadisticas() {
    let totalGeneral = 0;
    let cantidadEmpleados = 0;
    
    Object.keys(usuarios).forEach(user => {
        if (usuarios[user].tipo === 'trabajador') {
            cantidadEmpleados++;
            const horasRegistradas = registroHoras[user]?.reduce((sum, reg) => sum + reg.horas, 0) || 0;
            const horasIniciales = usuarios[user].horas || 0;
            const totalTrabajador = horasIniciales + horasRegistradas;
            totalGeneral += totalTrabajador;
        }
    });
    
    // Actualizar elementos del DOM
    document.getElementById('total-general').textContent = totalGeneral.toFixed(1);
    document.getElementById('total-empleados').textContent = cantidadEmpleados;
    
    const promedio = cantidadEmpleados > 0 ? (totalGeneral / cantidadEmpleados).toFixed(1) : '0';
    document.getElementById('promedio-horas').textContent = promedio;
}

// Cerrar modal al hacer clic fuera
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('loginModal');
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const contactForm = document.getElementById('contact-form');
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeLoginModal();
        }
    });
    
    // Permitir enviar formulario con Enter
    document.getElementById('login-user').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') procesarLogin();
    });
    
    document.getElementById('login-pass').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') procesarLogin();
    });
    
    // Menú hamburguesa (tres rayitas)
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
        });
    });

    // Manejar envío del formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir el comportamiento por defecto

            // Crear FormData con los datos del formulario
            const formData = new FormData(contactForm);

            // Mostrar indicador de carga
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            // Enviar el formulario usando fetch
            fetch('https://formsubmit.co/agropaul29@gmail.com', {
                method: 'POST',
                body: formData,
                timeout: 10000 // timeout de 10 segundos
            })
            .then(response => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                if (response.ok || response.status === 200) {
                    // Mostrar mensaje de éxito
                    mostrarMensajeExito();
                    
                    // Limpiar formulario
                    contactForm.reset();
                } else {
                    mostrarMensajeError('Hubo un error al enviar tu correo. Por favor, intenta nuevamente.');
                }
            })
            .catch(error => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                console.error('Error:', error);
                mostrarMensajeError('No se pudo enviar tu correo. Verifica tu conexión a internet e intenta de nuevo.');
            });
        });
    }
});

// Función para mostrar mensaje de éxito
function mostrarMensajeExito() {
    const form = document.getElementById('contact-form');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> ¡Correo enviado exitosamente! Te responderemos lo antes posible.';
    
    // Insertar mensaje antes del formulario
    form.parentNode.insertBefore(successMessage, form);
    
    // Desplazar hacia el mensaje
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remover mensaje después de 5 segundos
    setTimeout(() => {
        successMessage.style.animation = 'slideDown 0.5s ease-in-out reverse';
        setTimeout(() => {
            successMessage.remove();
        }, 500);
    }, 5000);
}

// Función para mostrar mensaje de error
function mostrarMensajeError(mensaje) {
    const form = document.getElementById('contact-form');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.style.cssText = 'background: #f44336; color: white; padding: 20px; border-radius: 20px; margin-bottom: 20px; text-align: center; font-weight: 600; animation: slideDown 0.5s ease-in-out; box-shadow: 0 5px 15px rgba(244, 67, 54, 0.3);';
    errorMessage.innerHTML = '<i class="fas fa-exclamation-circle" style="margin-right: 10px; font-size: 1.3rem;"></i>' + mensaje;
    
    // Insertar mensaje antes del formulario
    form.parentNode.insertBefore(errorMessage, form);
    
    // Desplazar hacia el mensaje
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remover mensaje después de 5 segundos
    setTimeout(() => {
        errorMessage.style.animation = 'slideDown 0.5s ease-in-out reverse';
        setTimeout(() => {
            errorMessage.remove();
        }, 500);
    }, 5000);
}

// Función para abrir modal de contacto/inscripción a cursos
function openContactModal(curso) {
    const contactForm = document.getElementById('contact-form');
    const nameInput = contactForm.querySelector('input[name="name"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const selectInput = contactForm.querySelector('select[name="motivo"]');
    const textareaInput = contactForm.querySelector('textarea[name="mensaje"]');
    
    // Establecer el motivo como inscripción a curso
    selectInput.value = 'Inscripción a Curso';
    
    // Pre-llenar el mensaje con el nombre del curso
    textareaInput.value = `Deseo inscribirme al: ${curso}\n\nPor favor, enviadme más información sobre horarios, fechas y precio.`;
    
    // Desplazar al formulario de contacto
    const contactSection = document.getElementById('contacto');
    contactSection.scrollIntoView({ behavior: 'smooth' });
    
    // Enfocar en el campo de nombre para empezar a escribir
    setTimeout(() => {
        nameInput.focus();
    }, 500);
}
