const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregaralcarrito (nombre, precio, imagen) {
  // Verificar si el producto ya existe en el carrito
  const productoExistente = carrito.find((producto) => producto.nombre === nombre);

  if (productoExistente) {
    // Si el producto ya existe, aumentar su cantidad en 1
    productoExistente.cantidad++;
  } else {
    // Si el producto no existe, agregarlo al carrito con cantidad 1
    const producto = {
      nombre,
      precio,
      imagen,
      cantidad: 1
    };
    carrito.push(producto);
  }

  // Guardar el carrito actualizado en el localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));
  console.log(carrito);
  // Actualizar la visualización del carrito
  crearcarrito();
}

function crearcarrito () {
  const precioTotal = calcularPrecioTotal();
  const cuerpodelcarrito = document.getElementById("cuerpodelcarrito");
  cuerpodelcarrito.innerHTML = ""; // Limpia el contenido anterior del carrito
  carrito.forEach((producto, index) => {
    // Crear un elemento div para mostrar la información del producto
    const infoproducto = document.createElement("div");
    infoproducto.innerHTML = `
        <div class="border border-black rounded p-4 shadow-md">
            <h3 class="text-lg font-semibold">${producto.nombre}</h3>
            <p class="text-gray-700">Precio: ${producto.precio}</p>
            <p class="text-gray-700">${producto.cantidad}</p>
        <div class="mt-3">
            <img src="https://picsum.photos/200/200" alt="${producto.nombre}" class="w-24 h-24 object-cover">
        </div>
        <div class="mt-4 flex space-x-2">
            <button class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300" onclick="eliminarDelCarrito(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
          </svg></button>
            <button class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300" onclick="aumentarCantidad(${index})">+</button>
            <div class="w-10 h-10 bg-white flex justify-center items-center border border-radius">
                <p class="text-gray-700">${producto.cantidad}</p>  
            </div>
            <button class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300" onclick="disminuirCantidad(${index})">-</button>
        </div>
            <p class="">Total de la compra: $${precioTotal}</p>
        </div>
        <br>
        `;

    cuerpodelcarrito.appendChild(infoproducto);
  });

  console.log(cuerpodelcarrito);
}

function calcularPrecioTotal () {
  let precioTotal = 0;
  carrito.forEach((producto) => {
    // Calcular el precio total del producto según su cantidad
    const precioProducto = producto.precio * producto.cantidad;
    precioTotal += precioProducto;
  });
  return precioTotal.toFixed(2);
}

function eliminarDelCarrito (index) {
  // Eliminar el producto del carrito por su índice
  carrito.splice(index, 1);
  // Guardar el carrito actualizado en el localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));
  // Actualizar la visualización del carrito
  crearcarrito();
}

function aumentarCantidad (index) {
  carrito[index].cantidad++; // Incrementar la cantidad del producto en 1
  // Guardar el carrito actualizado en el localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));
  // Actualizar la visualización del carrito
  crearcarrito();
}

function disminuirCantidad (index) {
  if (carrito[index].cantidad > 1) {
    carrito[index].cantidad--; // Disminuir la cantidad del producto en 1 (siempre y cuando sea mayor a 1)
    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    // Actualizar la visualización del carrito
    crearcarrito();
  }
}

function enviarCarritoAlServidor () {
  const carritoData = {
    items: carrito, // Esto asume que tu arreglo de carrito se llama "carrito"
    precioTotal: precioTotal() // Calcula el precio total como lo haces en tu código
  };

  fetch("/api/enviarCarrito", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(carritoData)
  })
    .then(response => response.json())
    .then(data => {
      console.log("Carrito enviado al servidor y guardado en MongoDB:", data);
    })
    .catch(error => {
      console.error("Error al enviar el carrito:", error);
    });
}
// Llamamos a la función para que se ejecute
crearcarrito();
