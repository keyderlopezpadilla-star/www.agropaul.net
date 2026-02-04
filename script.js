// DEPURACIÓN: Forzar render de calendario al cargar la página

// Mostrar todos los calendarios de los trabajadores en el panel admin
function mostrarCalendariosAdmin() {
    const contenedor = document.getElementById('admin-calendars');
    if (!contenedor) return;
    contenedor.innerHTML = '';
    const hoy = new Date();
    Object.keys(usuarios).forEach(user => {
        if (usuarios[user].tipo === 'trabajador') {
            const nombre = usuarios[user].nombre;
            const calendarId = `admin-calendar-${user}`;
            const infoId = `admin-hours-info-${user}`;
            const card = document.createElement('div');
            card.className = 'admin-calendar-card';
            card.style = `background: #fff; border-radius: 18px; box-shadow: 0 4px 24px rgba(46,125,50,0.10); padding: 28px 18px 22px 18px; display: flex; flex-direction: column; align-items: center; min-width: 340px; max-width: 370px; margin: 0 8px; transition: box-shadow 0.2s; border: 1.5px solid #e8f5e9;`;
            card.onmouseover = () => card.style.boxShadow = '0 8px 32px rgba(46,125,50,0.18)';
            card.onmouseout = () => card.style.boxShadow = '0 4px 24px rgba(46,125,50,0.10)';
            card.innerHTML = `
                <h4 style='text-align:center;color:#2e7d32;font-size:1.18rem;margin-bottom:16px;font-weight:700;letter-spacing:0.5px;'>${nombre}</h4>
                <div id="${calendarId}" style="width:100%;"></div>
                <div id="${infoId}" style="margin-top:16px;text-align:center;"></div>
            `;
            contenedor.appendChild(card);
            generarCalendarioUsuario(hoy.getMonth(), hoy.getFullYear(), user, calendarId, infoId, true);
        }
    });
}
// Sistema de Autenticación y Gestión de Horas - Agropaul.es

// Datos de trabajadores con horas
const usuarios = {
    admin: { pass: 'admin123', tipo: 'admin' },
    panaitepaul: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Panaite Paul', horas: 0 },
    stefanmitrea: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Stefan Mitrea', horas: 0 },
    bayojonathan: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Bayo Jonathan', horas: 0 },
    gurbiherreda: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Gurbi Herreda Rogelio', horas: 0 },
    constantinboghian: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Constantin Boghian', horas: 0 },
    iancucozma: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Iancu Cozma', horas: 0 },
    ciprianpreluca: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Ciprian Preluca', horas: 0 },
    sakandarrehan: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Sakandar Rehan', horas: 0 },
    munteanuadi: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Munteanu Adi', horas: 0 },
    nistormiha: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Nistor L Miha', horas: 0 },
    andreeaconstantin: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Andreea Constantin', horas: 0 },
    panaitemih: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Panaite Mihalache', horas: 0 },
    nicoleta1: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Nicoleta1', horas: 0 },
    cosmin2: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Cosmin2', horas: 0 },
    raquel3: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Raquel3', horas: 0 },
    alicia4: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Alicia4', horas: 0 },
    simona5: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Simona5', horas: 0 },
    albert6: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Albert6', horas: 0 },
    diego7: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Diego7', horas: 0 },
    carlos8: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Carlos8', horas: 0 },
    santiago9: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Santiago9', horas: 0 },
    kadire10: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Kadire10', horas: 0 },
    karim11: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Karim11', horas: 0 },
    abdel12: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Abdel12', horas: 0 },
    youseff13: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Youseff13', horas: 0 },
    abdelgani14: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Abdelgani14', horas: 0 },
    hall15: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Hall15', horas: 0 },
    amine16: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Amine16', horas: 0 },
    keyder117: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Keyder 117', horas: 0 },
    franklin17: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Franklin 17', horas: 0 },
    geoge18: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Geoge 18', horas: 0 },
    breyne19: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Breyne 19', horas: 0 },
    sergio20: { pass: 'trabajo123', tipo: 'trabajador', nombre: 'Sergio 20', horas: 0 },
};

let usuarioActual = null;
let registroHoras = JSON.parse(localStorage.getItem('registroHoras')) || {};

// Función auxiliar para buscar trabajador
// --- CALENDARIO DE HORAS TRABAJADAS ---

// Estructura: { usuario: { 'YYYY-MM-DD': horas, ... }, ... }
let horasPorDia = JSON.parse(localStorage.getItem('horasPorDia')) || {};


// Genera un calendario para un usuario específico
function generarCalendarioUsuario(mes, anio, usuario, calendarDivId, infoDivId, editable = false) {
    const calendarDiv = document.getElementById(calendarDivId);
    if (!calendarDiv) {
        console.warn('No se encontró el contenedor del calendario:', calendarDivId);
        return;
    }
    // Estilo elegante y limpio para el calendario
    calendarDiv.style.background = 'transparent';
    calendarDiv.style.border = 'none';
    calendarDiv.style.boxShadow = 'none';
    calendarDiv.innerHTML = '';
    console.log('Generando calendario para', usuario, 'en', calendarDivId);
    const fecha = new Date(anio, mes, 1);
    const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    let tabla = '<table class="calendar-table"><thead><tr>';
    diasSemana.forEach(dia => { tabla += `<th>${dia}</th>`; });
    tabla += '</tr></thead><tbody><tr>';
    let primerDia = fecha.getDay();
    for (let i = 0; i < primerDia; i++) { tabla += '<td></td>'; }
    let dia = 1;
    while (dia <= new Date(anio, mes + 1, 0).getDate()) {
        if ((primerDia + dia - 1) % 7 === 0 && dia !== 1) tabla += '</tr><tr>';
        const fechaStr = `${anio}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        const horas = (horasPorDia[usuario] && horasPorDia[usuario][fechaStr]) ? horasPorDia[usuario][fechaStr] : 0;
        if (editable) {
            tabla += `<td class="calendar-day editable" data-fecha="${fechaStr}" data-usuario="${usuario}">${dia}<br><span style='font-size:0.9em;color:#2d3a4a;cursor:pointer;'>${horas > 0 ? horas + 'h' : '<span style=\'color:#bbb\'>-</span>'}</span></td>`;
        } else {
            tabla += `<td class="calendar-day" data-fecha="${fechaStr}">${dia}<br><span style='font-size:0.9em;color:#2d3a4a;'>${horas > 0 ? horas + 'h' : ''}</span></td>`;
        }
        dia++;
    }
    let resto = (primerDia + dia - 1) % 7;
    if (resto !== 0) for (let i = resto; i < 7; i++) tabla += '<td></td>';
    tabla += '</tr></tbody></table>';
    calendarDiv.innerHTML = tabla;
    // Eventos para mostrar horas o editar
    calendarDiv.querySelectorAll('.calendar-day').forEach(td => {
        td.addEventListener('click', function() {
            if (editable) {
                editarHorasAdmin(this.dataset.usuario, this.dataset.fecha, calendarDivId, infoDivId);
            } else {
                mostrarHorasDiaUsuario(this.dataset.fecha, usuario, infoDivId);
            }
        });
    });
}

// Permitir al admin editar horas de cualquier trabajador
function editarHorasAdmin(usuario, fecha, calendarDivId, infoDivId) {
    const horasActuales = (horasPorDia[usuario] && horasPorDia[usuario][fecha]) ? horasPorDia[usuario][fecha] : '';
    const nuevaHora = prompt(`Editar horas para ${usuario} el ${fecha}:`, horasActuales);
    if (nuevaHora === null) return;
    const horasNum = parseFloat(nuevaHora);
    if (isNaN(horasNum) || horasNum < 0) {
        alert('Por favor, introduce un número válido de horas.');
        return;
    }
    if (!horasPorDia[usuario]) horasPorDia[usuario] = {};
    horasPorDia[usuario][fecha] = horasNum;
    localStorage.setItem('horasPorDia', JSON.stringify(horasPorDia));
    generarCalendarioUsuario(new Date(fecha).getMonth(), new Date(fecha).getFullYear(), usuario, calendarDivId, infoDivId, true);
    mostrarHorasDiaUsuario(fecha, usuario, infoDivId);
}

function mostrarHorasDiaUsuario(fecha, usuario, infoDivId) {
    const infoDiv = document.getElementById(infoDivId);
    const horas = (horasPorDia[usuario] && horasPorDia[usuario][fecha]) ? horasPorDia[usuario][fecha] : 0;
    infoDiv.innerHTML = `<strong>${fecha}:</strong> ${horas} horas trabajadas`;
}

// Mostrar el calendario en el panel del trabajador
function mostrarCalendarioTrabajador() {
    const panel = document.getElementById('worker-panel');
    if (panel && usuarioActual && usuarioActual.user) {
        panel.style.display = 'block';
        document.getElementById('nombre-trabajador-view').textContent = usuarioActual.nombre;
        // Oculta el calendario del modal si está visible
        const modalCalendar = document.getElementById('calendar-container');
        if (modalCalendar) modalCalendar.style.display = 'none';
        // Asegura que el objeto de horas existe para el usuario
        if (!horasPorDia[usuarioActual.user]) horasPorDia[usuarioActual.user] = {};
        const hoy = new Date();
        generarCalendarioUsuario(hoy.getMonth(), hoy.getFullYear(), usuarioActual.user, 'worker-calendar', 'worker-hours-info');
    }
}

// --- FIN CALENDARIO ---
function buscarTrabajador(entrada) {
// Función para restablecer las horas de todos los trabajadores a 0
function resetearHorasTrabajadores() {
    if (confirm('¿Estás seguro de que quieres restablecer las horas de todos los trabajadores a 0?')) {
        for (const usuario in usuarios) {
            if (usuarios[usuario].tipo === 'trabajador') {
                usuarios[usuario].horas = 0;
            }
        }
        localStorage.setItem('registroHoras', JSON.stringify({}));
        // Reiniciar registroHoras a vacío para todos los trabajadores
        localStorage.setItem('registroHoras', '{}');
        let registroHoras = {};
        alert('Las horas de todos los trabajadores han sido restablecidas.');
    }
}
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
            mostrarCalendarioTrabajador();
            // No cerramos el modal para que vea el calendario
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
    setTimeout(mostrarCalendariosAdmin, 50);
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
    setTimeout(function() {
        if (usuarioActual && usuarioActual.user) {
            const calendarDiv = document.getElementById('worker-calendar');
            if (calendarDiv) {
                calendarDiv.style.background = '#b2e4ff';
                calendarDiv.style.border = '2px solid #0077ff';
                console.log('Intentando generar calendario para', usuarioActual.user);
            } else {
                console.warn('No se encontró el div worker-calendar');
            }
            generarCalendarioUsuario(
                new Date().getMonth(),
                new Date().getFullYear(),
                usuarioActual.user,
                'worker-calendar',
                'worker-hours-info'
            );
        } else {
            console.warn('usuarioActual o usuarioActual.user no definido');
        }
    }, 100);
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

// Restablecer horas automáticamente el 1 de cada mes con confirmación
(function resetHorasCadaMes() {
    const hoy = new Date();
    if (hoy.getDate() === 1) {
        if (confirm('¿Deseas restablecer las horas de todos los trabajadores a 0 para el nuevo mes?')) {
            localStorage.setItem('registroHoras', '{}');
            localStorage.setItem('horasPorDia', '{}');
            alert('Las horas de todos los trabajadores han sido restablecidas.');
        }
    }
})();

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
    
    // Permitir enviar formulario with Enter
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
