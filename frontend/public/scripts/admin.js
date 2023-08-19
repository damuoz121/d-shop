function mostrarProductos () {
  const tablaProductos = document.getElementById("tablaProductos");
  tablaProductos.innerHTML = "";

  productos.forEach((producto, index) => {
    const filaTabla = document.createElement("tr");
    filaTabla.innerHTML = `
            <td>${producto.referencia}</td>
            <td>${producto.nombre}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.stock}</td>
            <td>${producto.precio}</td>
            <td>${producto.habilitado ? "Sí" : "No"}</td>
            <td>
                <button class="btn-accion" onclick="editarProducto(${index})">Editar</button>
                <button class="btn-delete" onclick="eliminarProducto(${index})">Eliminar</button>
            </td>
        `;
    tablaProductos.appendChild(filaTabla);
  });
}

// Llamar a la función para mostrar todos los productos al cargar la página
mostrarProductos();
