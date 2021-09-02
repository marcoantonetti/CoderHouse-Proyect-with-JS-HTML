// Entrega final de proyecto 

// Hago clear al princpio. En la linea 118 agrego items al local. 
localStorage.clear()
let nuevaBebida;
class Drinks {
    constructor(name, size, price, type, ID) {
        this.name = name;
        this.size = size;
        this.price = parseInt(price);
        this.type = type;
        this.ID = ID;
        this.stock = 0;
    }

    agregarStock() {
        let isNew = true;
        // Recorre el array para ver si existe el producto (mismo ID)
        for (let drink of drinksArray) {

            // Si existe, agrega una unidad al stock
            if (drink.ID == this.ID) {

                // Actualizo stock en el array
                drink.stock += 1

                // Actualizo stock en el storage
                let storageDrink = JSON.parse(localStorage.getItem(drink.name))
                storageDrink.stock += 1;
                localStorage.setItem(drink.name, JSON.stringify(storageDrink))

                let li = document.getElementById(`${drink.name}`);
                if (li == 'undefined') {
                    li = document.createElement('li');
                    li.setAttribute('class', 'item')
                    li.setAttribute('id', `${drink.name}`)
                }
                li.textContent = `${drink.name} $${drink.price} Stock = ${storageDrink.stock}`
                isNew = false;
            }
        }
        // Si el producto es nuevo lo agrega al array
        if (isNew) {

            nuevaBebida.stock += 1;
            drinksArray.push(nuevaBebida);
            localStorage.setItem(`${nuevaBebida.name}`, JSON.stringify(nuevaBebida))


            let li = document.createElement('li');
            li.setAttribute('id', `${nuevaBebida.name}`);
            li.setAttribute('class', 'item')
            li.textContent = `${nuevaBebida.name} $${nuevaBebida.price} Stock = ${nuevaBebida.stock}`
            document.getElementById('lista').appendChild(li)
        }



    }

}


// Objetos
// *-- El stock de estos productos se van a modificar por eso los declaro con let
let FernetBranca = {
    name: 'fernet branca',
    size: '750',
    price: 650,
    type: 'fernet',
    ID: '012',
    dateOfPurchase: null,
    stock: 5
}

let Fernet1882 = {
    name: 'fernet 1882',
    size: '750',
    price: 450,
    type: 'fernet',
    ID: '022',
    dateOfPurchase: null,
    stock: 5
}

let GinBeefeater = {
    name: 'gin beefeater',
    size: '750',
    price: 2150,
    type: 'gin',
    ID: '122',
    dateOfPurchase: null,
    stock: 5
}

let GinBombai = {
    name: 'gin bombai',
    size: '750',
    price: 1900,
    type: 'gin',
    ID: '132',
    dateOfPurchase: null,
    stock: 5
}

let SmirnoffVodka = {
    name: 'smirnoff vodka',
    size: '750',
    price: 700,
    type: 'vodka',
    ID: '202',
    dateOfPurchase: null,
    stock: 5
}

// Array de bebidas:
let drinksArray = [GinBeefeater, GinBombai, Fernet1882, FernetBranca, SmirnoffVodka];

// LocalStorage: 
for (let drink of drinksArray) {
    localStorage.setItem(`${drink.name}`, JSON.stringify(drink));
}

// Para ver los IDs de las bebidas en la consola
for (let drink of drinksArray) {
    console.log(drink.name + ' ID: ' + drink.ID);
}

// Funciones

// Agrega productos al stock, si el producto ya existe se incrementa el stock existente
// agregarStock() lo agrega al array y agregar producto lo agregar al local Storage
function agregarProducto() {
    nuevaBebida = new Drinks(
        $('#agregarNombre').val(),
        $('#agregarTamano').val(),
        $('#agregarPrecio').val(),
        $('#agregarTipo').val(),
        $('#agregarID').val()
    );

    nuevaBebida.agregarStock();
}

// Resta stock cada vez que se agrega algo al carrito
function restaStock(bebida) {

    let drink = JSON.parse(localStorage.getItem(bebida))
    drink.stock -= 1;
    console.log('drink stock restaStock' + drink.stock)

    let nodo = document.getElementById(`${drink.name}`);
    nodo.textContent = `${drink.name} $${drink.price} Stock = ${drink.stock}`
    localStorage.setItem(drink.name, JSON.stringify(drink))
}

// Si no hay stock, modificarlo en el DOM y alert

function outOfStock() {
    let drink = JSON.parse(localStorage.getItem($('#bebida').val()))

    alert('No hay mas stock de esta bebida')
    let li = document.getElementById(`${drink.name}`);
    li.textContent = `${drink.name} $${drink.price} Stock = out of stock`
}

// Agrega bebidas al carrito 
let carrit0 = [];
let i = 0;

function carrito(bebida) {

    let item = JSON.parse(localStorage.getItem(bebida))
        // Agrego objeto bebida al carrito
    carrit0.push(item);

    // Agrego bebida al DOM
    let li = document.createElement('li');
    li.textContent = `${carrit0[i].name} $${carrit0[i].price}`
    li.setAttribute('class', 'itemCarrito')
    li.setAttribute('style', "position:relative; left:80px; top:2px")
    document.getElementById('carritoOL').appendChild(li)
    i++;
}

// Muestra monto total a pagar
function checkout() {
    let precio = 0;
    for (let i of carrit0) {
        precio += i.price;
    }
    $('#total').text(`Monto a Pagar $${precio}`)
}

// Ejecuta x cantidad de veces carrito().
// De modo que puedas comprar varias bebidas iguales con un click
function cantidadBebida(cantidad) {
    while (cantidad > 0) {
        let drink = JSON.parse(localStorage.getItem($('#bebida').val()))

        // Si no hay stock, ejecuta out of stock
        if (drink.stock <= 0) {
            console.log('drink.stock' + drink.stock)
            outOfStock()
            return
        }
        // Cada recorrido resta un stock y agrega item al carrito
        carrito($('#bebida').val());
        restaStock($('#bebida').val())
        cantidad -= 1;
    }
}

// Ordena por tipo, nombre alfabetico o precio. 
function ordenar(a) {
    switch (a) {
        case ('tipo'):
            return drinksArray.sort((a, b) => a.type.localeCompare(b.type));
        case ('nombre'):
            return drinksArray.sort((a, b) => a.name.localeCompare(b.name));
        case ('precio'):
            return drinksArray.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }
}
// El usuario ingresa si ordenar por tipo, usuario o precio. El value es pasado como parametro de ordenar()
// Los elementos bebidas se ordenan en base a eso
function ordenarHTML() {
    let arrayOrdenado = ordenar(document.getElementById('textoOrdenar').value)
    for (var x of arrayOrdenado) {
        let li = document.getElementById(`${x.name}`)
        document.getElementById('lista').appendChild(li)
    }
}

// Muestra los elementos que se les pasen Hay un kwargs** en JS equivalente al the python?
function mostrar(element1, element2 = null, ) {
    element1.fadeIn(3000)
    if (element2) { element2.fadeIn(3000) }
}

// Ocultan los elementos que se le pase a la funcion. Hay un kwargs** en JS equivalente al the python?
function ocultar(element1, element2 = null, element3 = null, ele4 = null, ele5 = null) {
    element1.hide()
    if (element2) { element2.slideUp(500) }
    if (element3) { element3.slideUp(500) }
    if (ele4) { ele4.slideUp(500) }
    if (ele5) { ele5.slideUp(500) }
}


// Traigo varios elementos por sus IDs
let divcarrito = $('#divCarrito');;
let divAdmin = $('#divAdmin');
let padmin = $('#padmin');
let pcliente = $('#pcliente');
let back = $('#btnBack')
let p = $('#p');
let adminbtn = $('#adminbtn');

// Ejecuto funciones asociadas a clicks

adminbtn.click(function() {
    mostrar(divAdmin, padmin);
    ocultar(clientebtn, adminbtn, p);
})

let clientebtn = $('#clientebtn');

clientebtn.click(function() {
    mostrar(divcarrito, pcliente);
    ocultar(adminbtn, clientebtn, p);
})

back.click(function() {
    mostrar(adminbtn, clientebtn)
    ocultar(padmin, pcliente, divcarrito, p, divAdmin)
})


$('#ordenarbtn').click(function(e) {
    e.preventDefault();
    ordenarHTML()
});

$('#agregarProductobtn').click(function(e) {
    e.preventDefault();
    agregarProducto();
})
$('#btncarrito').click(function(e) {
    e.preventDefault();
    cantidadBebida($('#cantidad').val())
})
$('#checkout').click(function(e) {
    e.preventDefault();
    checkout();
})


// API dolar

const URLGET = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales'

$.get(URLGET, function(res, state) {
    if (state === 'success') {
        sessionStorage.setItem('dolar', res[1].casa.venta)
        let p = document.createElement('p')
        p.textContent = `Valor del Dolar actual: ${sessionStorage.getItem('dolar')}`
        document.getElementById('body').appendChild(p)
    }
})


// Animaciones y css
$('#h1').css('color', 'crimson')
    .slideUp(2000)
    .delay(500)
    .slideDown(2000)