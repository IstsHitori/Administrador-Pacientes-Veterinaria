
const ROLES = Object.freeze({
    ADMIN_ROL :"ADMIN_ROL",
    VETERINARIO_ROL:"VETERINARIO_ROL",
    AUXILIAR_ROL:"AUXILIAR_ROL"
});

const Trabajadores = (data) => {
    const t_auxilares = data.filter(i => i.rol.nombre === ROLES.AUXILIAR_ROL);
    const t_veterinarios = data.filter(i => i.rol.nombre === ROLES.VETERINARIO_ROL);
    return {
        AUXILIARES: {
            auxiliares: t_auxilares, cantidad: t_auxilares.length
        },
        VETERINARIOS: {
            veterinarios: t_veterinarios, cantidad: t_veterinarios.length
        }
    }
}

export{
    ROLES,Trabajadores
}