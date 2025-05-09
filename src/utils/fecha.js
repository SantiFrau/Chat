export function formatearFechaChat(fechaString) {
    const fechaMensaje = new Date(fechaString);
    const ahora = new Date();
    const diferenciaMs = ahora - fechaMensaje;
    const diferenciaHoras = diferenciaMs / (1000 * 60 * 60);
    const diferenciaDias = diferenciaMs / (1000 * 60 * 60 * 24);

    if (diferenciaHoras < 24) {
      return fechaMensaje.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diferenciaDias < 7) {
      return fechaMensaje.toLocaleDateString('es-ES', { weekday: 'short' });
    } else {
      return fechaMensaje.toLocaleDateString('es-ES');
    }
  }