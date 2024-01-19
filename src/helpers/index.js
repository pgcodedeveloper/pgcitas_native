export const formatearFecha = fecha =>{
    const f = new Date(fecha);
    const op = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    return f?.toLocaleDateString('es-ES',op);
}