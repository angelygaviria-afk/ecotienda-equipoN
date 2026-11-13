// =============================================================
// Voltnergia: el catalogo y el carrito, con JavaScript
// Cada linea tiene un comentario: QUE hace y PARA QUE.
// =============================================================

// --- CONSTANTES: valores que no cambian. Se declaran con const ---
// Se escriben en MAYUSCULAS para que se note que son fijas
const TARIFA = 950;            // lo que cuesta 1 kWh, en pesos (COP). Tarifa de ejemplo
const DIAS_MES = 30;           // dias de un mes: para pasar el ahorro de un dia al de un mes

// --- ARREGLO DE OBJETOS LITERALES: la lista de productos ---
// [ ] = un ARREGLO: una lista de elementos, separados por comas
// { } = un OBJETO: un grupo de datos con nombre (propiedad: valor)
// Cada producto es un objeto. Sus datos se leen con un punto: producto.precio
// wattsAntes   = cuanto gasta el equipo VIEJO que se reemplaza (en vatios, W)
// wattsDespues = cuanto gasta el equipo NUEVO (0 si no gasta energia de la red)
// horasDia     = cuantas horas al dia se usa
const productos = [
    { id: 1, nombre: "Bombillo LED 10 W", categoria: "iluminacion", precio: 9500,
      wattsAntes: 75, wattsDespues: 10, horasDia: 6 },
    { id: 2, nombre: "Tubo LED T8 18 W", categoria: "iluminacion", precio: 22000,
      wattsAntes: 40, wattsDespues: 18, horasDia: 10 },
    { id: 3, nombre: "Reflector LED 30 W con sensor", categoria: "iluminacion", precio: 79000,
      wattsAntes: 150, wattsDespues: 30, horasDia: 8 },
    { id: 4, nombre: "Ventilador de techo DC", categoria: "climatizacion", precio: 459000,
      wattsAntes: 75, wattsDespues: 30, horasDia: 8 },
    { id: 5, nombre: "Aire acondicionado inverter 12.000 BTU", categoria: "climatizacion", precio: 2290000,
      wattsAntes: 1400, wattsDespues: 850, horasDia: 6 },
    { id: 6, nombre: "Nevera inverter 300 L", categoria: "cocina", precio: 2150000,
      wattsAntes: 90, wattsDespues: 38, horasDia: 24 },
    { id: 7, nombre: "Olla eléctrica multifunción", categoria: "cocina", precio: 329000,
      wattsAntes: 1500, wattsDespues: 900, horasDia: 1 },
    { id: 8, nombre: "Regleta con apagado automático", categoria: "cocina", precio: 65000,
      wattsAntes: 15, wattsDespues: 0, horasDia: 20 },
    { id: 9, nombre: "Kit de panel solar 550 W", categoria: "solar", precio: 2490000,
      wattsAntes: 550, wattsDespues: 0, horasDia: 4.5 },
    { id: 10, nombre: "Calentador solar de agua 150 L", categoria: "solar", precio: 1390000,
      wattsAntes: 3000, wattsDespues: 0, horasDia: 0.7 }
];

// --- VARIABLE: el carrito. Se declara con let porque SI cambia ---
// Empieza vacio: [] es un arreglo sin elementos.
// Cada vez que se oprime "Agregar al carrito", se le agrega un producto
let carrito = [];

// --- FUNCIONES ---
// Una funcion es un bloque de codigo con nombre.
// Recibe datos (PARAMETROS, entre parentesis) y devuelve un resultado con return.
// Se escribe una vez y se usa muchas veces: ahorroKwhMes(producto)

// ahorroKwhMes: cuantos kWh ahorra un producto en un mes.
// Recibe un producto (uno de los objetos del arreglo).
// Ejemplo con el bombillo: (60 - 9) x 5 x 30 / 1000 = 7.65 kWh
function ahorroKwhMes(producto) {
    // producto.wattsAntes - producto.wattsDespues = los vatios que se dejan de gastar (60 - 9 = 51 W)
    // * producto.horasDia = por las horas de uso al dia (51 x 5 = 255 Wh al dia)
    // * DIAS_MES          = por los 30 dias del mes (255 x 30 = 7650 Wh al mes)
    // / 1000              = de Wh a kWh, que es como cobra la empresa de energia (7650 / 1000 = 7.65 kWh)
    // return devuelve ese numero a quien llamo la funcion
    return (producto.wattsAntes - producto.wattsDespues) * producto.horasDia * DIAS_MES / 1000;
}

// ahorroPesosMes: cuantos pesos ahorra un producto en un mes.
// Ejemplo con el bombillo: 7.65 kWh x 950 = 7267.5 pesos
function ahorroPesosMes(producto) {
    // Llama la funcion anterior para saber los kWh (7.65)
    // y los multiplica por lo que cuesta cada kWh (TARIFA = 950)
    return ahorroKwhMes(producto) * TARIFA;
}

// pesos: escribe un numero como plata colombiana.
// Ejemplos: pesos(8900) -> "$8.900"   pesos(7267.5) -> "$7.268"
function pesos(valor) {
    // Math.round(valor)       = redondea sin decimales: 7267.5 -> 7268
    // .toLocaleString("es-CO") = lo escribe como en Colombia, con punto de miles: 7268 -> "7.268"
    // "$"                     = solo TEXTO: el signo de pesos, entre comillas
    // +                       = PEGA los dos textos: "$" + "7.268" -> "$7.268"
    // (Este "$" NO es el de ${ }: el de ${ } se usa dentro de comillas invertidas, mas abajo)
    return "$" + Math.round(valor).toLocaleString("es-CO");
}

// nombreCategoria: el nombre de la categoria para mostrar, con tilde y mayuscula.
// En los datos se guarda sin tildes ("iluminacion") y en la pagina se muestra bonito ("Iluminación")
function nombreCategoria(categoria) {
    // CONDICIONAL: if = "si"; else if = "si no, si"; else = "si no"
    // === compara si son EXACTAMENTE iguales (mismo texto, mismas minusculas)
    // Si la categoria es "iluminacion"...
    if (categoria === "iluminacion") {
        // ...devuelve el nombre bonito y la funcion termina aqui
        return "Iluminación";
    // Si no, si es "climatizacion"...
    } else if (categoria === "climatizacion") {
        return "Climatización";
    // Si no, si es "cocina"...
    } else if (categoria === "cocina") {
        return "Cocina y hogar";
    // Si no es ninguna de las dos anteriores...
    } else {
        // ...solo queda "solar"
        return "Energía solar";
    }
}
// Funcion para que nos de el porcentaje de la energia que menos gasta el quipo nuevo
function porcentajeAhorro(producto) {
    return Math.round((producto.wattsAntes - producto.wattsDespues) / producto.wattsAntes * 100);
}

// Función para saber cuanto dinero se ahorraría un producto en un año
function ahorroPesosAnio(producto) {
    return ahorroPesosMes(producto) * 12;
}

// funcion si Lo que buscamos coincidde con el nombre del producto
function coincideBusqueda(producto, texto) {
    return producto.nombre.toLowerCase().includes(texto.toLowerCase());
}

// Funcion para saber en cuántos meses el ahorro paga la compra
function mesesRetorno(total, ahorroMes) {
    return Math.ceil(total / ahorroMes);
}

// --- DOM: escribir en la pagina las tarjetas de los productos ---
// DOM = la pagina vista desde JavaScript: cada etiqueta del HTML es un objeto
// que JavaScript puede buscar, leer y cambiar
// mostrarProductos: escribe en la pagina una tarjeta por cada producto.
// categoria = "todas" o el nombre de una categoria, segun el boton de filtro que se oprimio
function mostrarProductos(categoria) {
    const contenedor = document.querySelector("#productos");
    const texto = document.querySelector("#buscador").value.toLowerCase();
    contenedor.innerHTML = "";

    for (const producto of productos) {
        if (categoria !== "todas" && producto.categoria !== categoria) {
            continue;
        }
        // Si el nombre no contiene lo que se escribió en el buscador, no se muestra
        if (!coincideBusqueda(producto, texto)) {
            continue;
        }
        contenedor.innerHTML += `
            <article class="tarjeta">
                <span class="categoria">${nombreCategoria(producto.categoria)}</span>
                <h3>${producto.nombre}</h3>
                <p>Reemplaza un equipo de ${producto.wattsAntes} W.
                   Ahorra <span class="ahorro">${ahorroKwhMes(producto).toFixed(1)} kWh</span> al mes.</p>
                <p class="precio">${pesos(producto.precio)}</p>
                <p>Ahorro al mes: <span class="ahorro">${pesos(ahorroPesosMes(producto))}</span></p>
                <p>Gasta ${porcentajeAhorro(producto)} % menos energía. Ahorro al año: <span class="ahorro">${pesos(ahorroPesosAnio(producto))}</span></p>
                <button class="btn btn-primary btn-sm" data-id="${producto.id}">Agregar al carrito</button>
            </article>`;
    }
}
document.querySelector("#buscador").addEventListener("input", function () {
    const activo = document.querySelector(".filtro.activo");
    mostrarProductos(activo.dataset.categoria);
});

// --- El carrito ---

// agregarAlCarrito: agrega al carrito el producto que tiene ese id.
// Ejemplo: agregarAlCarrito(1) agrega el bombillo
function agregarAlCarrito(id) {
    // Recorre todos los productos, uno por uno...
    for (const producto of productos) {
        // ...y cuando encuentra el que tiene ese id (=== compara: 1 === 1)...
        if (producto.id === id) {
            // ...lo agrega al final del arreglo carrito. push = "empujar al final"
            carrito.push(producto);
        }
    }
    // Vuelve a dibujar el carrito, ya con el producto nuevo
    mostrarCarrito();
}

// mostrarCarrito: dibuja el carrito: la lista, el total y el ahorro.
// Se llama cada vez que el carrito cambia (al agregar o al vaciar)
function mostrarCarrito() {
    // Busca la lista <ul id="lista-carrito"> del carrito
    const lista = document.querySelector("#lista-carrito");
    // La vacia, para escribirla de nuevo completa (si no, los productos se repetirian)
    lista.innerHTML = "";
    // ACUMULADORES: variables que empiezan en 0 y van sumando en el bucle.
    // let, porque su valor cambia en cada vuelta
    let total = 0;
    let ahorroMes = 0;

    // Recorre los productos que hay en el carrito
    for (const producto of carrito) {
        // Agrega a la lista una linea <li> con el nombre y el precio.
        // Ejemplo: <li>Bombillo LED 9 W: $8.900</li>
        lista.innerHTML += `<li>${producto.nombre}: ${pesos(producto.precio)}</li>`;
        // Suma el precio al total. total += precio es lo mismo que total = total + precio
        // Ejemplo: 0 + 1200000 = 1200000; luego 1200000 + 8900 = 1208900...
        total += producto.precio;
        // Suma lo que ahorra este producto al mes
        ahorroMes += ahorroPesosMes(producto);
    }

    // Escribe el total en el parrafo <p id="total">.
    // textContent = el texto que se ve dentro del elemento. Ejemplo: "Total: $1.217.800"
    document.querySelector("#total").textContent = "Total: " + pesos(total);

    // .length = cuantos elementos tiene el arreglo. Si es 0, el carrito esta vacio
    if (carrito.length === 0) {
        // Carrito vacio: un mensaje en el parrafo <p id="ahorro">
        document.querySelector("#ahorro").textContent = "El carrito está vacío.";
    } else {
        // En cuantos meses el ahorro paga la compra: el total dividido el ahorro de cada mes.
        // Ejemplo: 1217800 / 64410 = 18.9 meses
        // Math.ceil redondea HACIA ARRIBA: 18.9 -> 19 (con 18 meses todavia no alcanza)
        const meses = mesesRetorno(total, ahorroMes);
        // Escribe el ahorro y los meses en <p id="ahorro">, con un template string.
        // Ejemplo: "Ahorra $64.410 al mes: la compra se paga sola en 19 meses."
        document.querySelector("#ahorro").textContent =
            `Ahorra ${pesos(ahorroMes)} al mes: la compra se paga sola en ${meses} meses.`;
    }
}

// --- EVENTOS: el programa reacciona a lo que hace el usuario ---

// querySelectorAll busca TODOS los elementos con la clase .filtro (los 4 botones de filtro)
// y los guarda en botonesFiltro (una lista)
const botonesFiltro = document.querySelectorAll(".filtro");
// Recorre los 4 botones...
for (const boton of botonesFiltro) {
    // ...y a cada uno le pone a ESCUCHAR el evento "click".
    // addEventListener("click", funcion) = cuando le hagan clic, ejecuta esta funcion
    boton.addEventListener("click", function () {
        // Recorre otra vez los 4 botones...
        for (const otro of botonesFiltro) {
            // ...y les quita la clase "activo" a todos (classList = las clases del elemento)
            otro.classList.remove("activo");
        }
        // Le pone la clase "activo" solo al boton que se oprimio: el CSS lo pinta de verde
        boton.classList.add("activo");
        // Vuelve a dibujar los productos, solo los de la categoria del boton.
        // dataset.categoria lee el atributo data-categoria del HTML.
        // Ejemplo: <button data-categoria="solar"> -> "solar"
        mostrarProductos(boton.dataset.categoria);
    });
}

// Clic en un boton "Agregar al carrito".
// Se escucha en el CONTENEDOR #productos y no en cada boton, porque los botones
// los crea JavaScript y se borran y se vuelven a crear cada vez que se filtra
document.querySelector("#productos").addEventListener("click", function (evento) {
    // evento = la informacion del clic. evento.target = el elemento exacto donde se hizo clic
    // (puede ser un boton, un titulo, un precio...).
    // Si tiene data-id, es un boton "Agregar al carrito"; si no, se hizo clic en otra parte
    if (evento.target.dataset.id) {
        // dataset.id es TEXTO ("1"). Number lo convierte en numero (1),
        // para que producto.id === id funcione (1 === "1" daria false)
        agregarAlCarrito(Number(evento.target.dataset.id));
    }
});

// Clic en el boton "Vaciar carrito" (<button id="vaciar">)
document.querySelector("#vaciar").addEventListener("click", function () {
    // El carrito vuelve a ser un arreglo vacio
    carrito = [];
    // Y se vuelve a dibujar: sale "El carrito está vacío."
    mostrarCarrito();
});

// --- Al cargar la pagina ---
// Llama las funciones apenas se abre la pagina:
// muestra todos los productos ("todas") y el carrito vacio
mostrarProductos("todas");
mostrarCarrito();
