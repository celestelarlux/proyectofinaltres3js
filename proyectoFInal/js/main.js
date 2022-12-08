//exportacion de mis productos
import { productos } from "./products.js";
//captura el elemento que contiene mi página menos el navegador
const page = document.getElementById("content");
//captura el elemento del carrito
const cart = document.getElementById("cart")
//Captura el elemento que contiene la cantidad de productos en el carrito
const quantityCart = document.getElementById("quantityCart")
//Captura el logo del carrito para acceder a mis compras
const toCart = document.getElementById("toCart")
//contenedor del carrito 
let carrito = []
//genero el localStorage carrito en mi página
if (localStorage.length === 0) {
  localStorage.setItem('carrito', JSON.stringify(carrito))
}
//buscador inicial del navegador
const search = document.getElementById("search")
const buttonSearch = document.getElementById("buttonSearch")
buttonSearch.addEventListener("click", (e) => {
  e.preventDefault()
  const searchProduct = productos.filter(p => p.nombre.includes(search.value))
  if (searchProduct.length > 0) {
    mostrarListaDeProductos(searchProduct)
  }
  else{
    mostrarListaDeProductos(productos)

  }
})
//al tocar el logo del bolso me va a llevar al apartado de compras
toCart.addEventListener("click", () => {
  pageShoppingCart()
})
//genero el apartado de compras
const pageShoppingCart = () => {
  const subTotalProductsBuy = carrito.reduce((acc, p) => acc + ( parseInt(p.quantity)  * parseInt(p.precio) ), 0)
  const shipping = subTotalProductsBuy > 52359 ? 3500 : 0
  page.innerHTML = ""
  page.innerHTML = `  <!-- Header-->
<header data-background="img/shop/header3.jpg" class="intro introhalf">
  <!-- Intro Header-->
  <div class="intro-body">
    <h1>Shop</h1>
    <h4><a href="index.html">Home</a> / Shopping cart
    </h4>
  </div>
</header>
<!-- shop-->
<section id="shop" class="section-small">
  <div class="container">
    <div class="row">
      <div class="col-lg-8">
        <h3>Shopping cart</h3>
        <p>You currently have ${carrito.length} items in your cart</p>
        <table class="table shop-cart table-hover">
          <thead>
            <tr>
              <td>Product</td>
              <td></td>
              <td>Quantity</td>
              <td class="hidden-xs">Price</td>
              <td>Total</td>
              <td></td>
            </tr>
          </thead>
          <tbody id="shoppingCartList">
          </tbody>
        </table>
        <h3 class="no-pad">You may also like</h3>
        <div class="row grid-pad text-center">
          <div class="col-sm-6 col-md-3" id="description9">
            <div class="shop-item">
              <div class="badge price">$321.99</div>
              <div class="badge price"></div><span title="Add to cart"
                  class="add-cart"></span><img src="img/shop/9.webp" alt=""
                  class="img-responsive center-block">
            </div>
              <h5></h5>Modules - Carl Jnogef</h5>
          </div>
          <div class="col-sm-6 col-md-3" id="description10">
            <div class="shop-item">
              <div class="badge price">$123.99</div>
              <div class="badge price"></div><span title="Add to cart"
                  class="add-cart"></span><img src="img/shop/10.webp" alt=""
                  class="img-responsive center-block">
            </div>
              <h5>Dock - Sean Sogerz</h5>
          </div>
          <div class="col-sm-6 col-md-3" id="description11">
            <div class="shop-item">
              <div class="badge price">$134.99</div>
              <div class="badge price"></div><span title="Add to cart"
                  class="add-cart"></span><img src="img/shop/11.webp" alt=""
                  class="img-responsive center-block">
            </div>
              <h5>Skulls - Michael Marquez</h5>
          </div>
          <div class="col-sm-6 col-md-3" id="description12">
            <div class="shop-item">
              <div class="badge price">$225.99</div>
              <div class="badge price"></div><span title="Add to cart"
                  class="add-cart"></span><img src="img/shop/12.webp" alt=""
                  class="img-responsive center-block">
            </div>
              <h5>Forest - Helena Camela</h5>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-lg-offset-1">
        <h4>Order summary</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis pulvinar vestibulum.</p>
        <div class="table-responsive">
          <table class="table">
            <tbody>
              <tr>
                <td>Subtotal</td>
                <th>${subTotalProductsBuy}</th>
              </tr>
              <tr>
                <td>Shipping</td>
                <th>${shipping}</th>
              </tr>
              <tr>
                <td>Total</td>
                <th>${subTotalProductsBuy - shipping}</th>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="button btn btn-dark">Checkout</p>
      </div>
    </div>
  </div>
</section>`
  const description9 = document.getElementById("description9")
  const description10 = document.getElementById("description10")
  const description11 = document.getElementById("description11")
  const description12 = document.getElementById("description12")
  description9.addEventListener("click", () => goToDescription("9"))
  description10.addEventListener("click", () => goToDescription("10"))
  description11.addEventListener("click", () => goToDescription("11"))
  description12.addEventListener("click", () => goToDescription("12"))
  generateShoppingCartList()
}

//genero la lista de compras
const generateShoppingCartList = () => {
  const shoppingCartList = document.getElementById("shoppingCartList")
  shoppingCartList.innerHTML = ""
  carrito.forEach(p => {
    if (p.quantity > 0) {
      let totalProduct =  parseInt(p.quantity)  *  parseInt(p.precio) 
      let tr = document.createElement("tr")
      tr.innerHTML = `
    <td class="hidden-xs"><img src=${p.img} alt=""></td>
    <td>${p.nombre}</td> 
    <td>
      <div class="form-group">
        <label for="number"></label>
        <input id="number${p.id}" type="number" value="${p.quantity}" max="50" min="1" class="form-control">
      </div>
    </td>
    <td class="hidden-xs">
      <h4>${p.precio}</h4>
    </td>
    <td>
      <h4>${totalProduct}</h4>
    </td>
    <td><i id="removeItemShop${p.id}"class="fa fa-times-circle-o fa-lg"></i></td>
    `
      shoppingCartList.appendChild(tr)
      let remove = document.getElementById(`removeItemShop${p.id}`)
      remove.addEventListener("click", () => {
        deleteItem(p.id)
        listCart()
        pageShoppingCart()
      })
      const inputQuantity = document.getElementById(`number${p.id}`)
      inputQuantity.addEventListener("click", () => {
        p.quantity = parseInt(inputQuantity.value)
        totalProduct = p.quantity * p.precio
        localStorage.setItem("carrito", JSON.stringify(carrito))
        listCart()
        pageShoppingCart()
      })
    }
  })
}


//genero Lista De Productos comprados en el navegador del carrito
const listCart = () => {
  //vacia elemeto del carrito
  cart.innerHTML = ""
  //traigo todos los productos guardados del localstorage
  const localStorageCart = JSON.parse(localStorage.getItem("carrito"))
  //genera lista de carrito en el navegador
  localStorageCart.forEach(p => {
    if (p.quantity > 0) {

      let li = document.createElement("li")
      li.className = "shop-nav"
      li.innerHTML = `<div class="shop-cart"><img src=${p.img} alt=" ">
    <div class="btn-border btn btn-xs">${p.precio}</div><i id="removeItem${p.id}"class="fa fa-times float-right"></i><br>${p.nombre}
  </div> `
      cart.appendChild(li)
      let remove = document.getElementById(`removeItem${p.id}`)
      remove.addEventListener("click", () => {
        deleteItem(p.id)
      })
    }
  })
  quantityCart.innerHTML = `${localStorageCart.reduce((acc, num) => acc + (parseInt(num.quantity)), 0)}`
}
listCart()
//genero la descripcion del producto
const goToDescription = (id) => {
  let productDescription = productos.find(p => p.id === id)
  page.innerHTML = `
  <!-- Header-->
  <header data-background="img/shop/header4.jpg" class="intro introhalf">
    <!-- Intro Header-->
    <div class="intro-body">
      <h1>Shop</h1>
      <h4><a href="index.html">Home</a>/${productDescription?.nombre}
      </h4>s
    </div>
  </header>
  <!-- shop-->
  <section class="section-small">
    <div class="container">
      <div class="row">
        <!-- shop carousel-->
        <div id="carousel-shop" class="carousel slide">
          <div class="col-lg-6 carousel-outer">
            <!-- Wrapper for slides-->
            <div class="carousel-inner">
              <div class="item active"><img src=${productDescription?.img} alt=""></div>
            </div>
          </div>
          <div class="col-lg-6 slide">
            <h4 class="color">${productDescription?.nombre}</h4>
            <p class="small">REF. 9583301-234</p>
            <p>Lorem ipsum dolor sit amet, consectetur elit. Nulla convallis pulvinar vestibulum. Donec eleifend, sem
              sed dictum mattis, turpis purus.</p>
            <!-- Indicators-->
            <ol class="carousel-indicators mCustomScrollbar">
              <li data-target="#carousel-shop" data-slide-to="0" class="active"><img src=${productDescription?.img} alt="">
              </li>
            </ol>
            <hr>
            <p>Lorem ipsum dolor sit amet, consectetur elit. Nulla convallis pulvinar vestibulum. Donec eleifend, sem
              sed dictum mattis, turpis purus placerat eros. Lorem ipsum dolor sit amet, consectetur elit. Nulla
              convallis pulvinar vestibulum. Donec eleifend, sem sed dictum mattis.</p>
            <form class="form-inline">
              <div class="form-group">
                <h2 class="no-pad">${productDescription?.precio}</h2>
              </div>
              <div class="form-group">
                <label for="number"></label>
                <input id="number" type="number" value="1" max="50" min="1" class="form-control">
              </div>
              <button id="buy"type="submit" class="btn btn-dark">Add to Cart</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="section-small bg-white">
    <div class="container">
      <h3>Related product</h3>
      <div class="row grid-pad text-center">
        <div class="col-sm-6 col-md-3">
          <div class="shop-item">
            <div class="badge price">$321.99</div>
            <div class="badge price new">New</div><a href="shop-cart.html"><span title="Add to cart"
                class="add-cart"></span></a><a href="shop-single.html"><img src="img/shop/9.webp" alt=""
                class="img-responsive center-block"></a>
          </div><a href="shop-single.html">
            <h5>Modules - Carl Jnogef</h5>
          </a>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="shop-item">
            <div class="badge price">$123.99</div>
            <div class="badge price sale">Sale</div><a href="shop-cart.html"><span title="Add to cart"
                class="add-cart"></span></a><a href="shop-single.html"><img src="img/shop/10.webp" alt=""
                class="img-responsive center-block"></a>
          </div>
            <h5>Dock - Sean Sogerz
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="shop-item">
            <div class="badge price">$134.99</div>
            <div class="badge price"></div><a href="shop-cart.html"><span title="Add to cart"
                class="add-cart"></span></a><a href="shop-single.html"><img src="img/shop/11.webp" alt=""
                class="img-responsive center-block"></a>
          </div><a href="shop-single.html">
            <h5>Skulls - Michael Marquez</h5>
          </a>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="shop-item">
            <div class="badge price">$225.99</div>
            <div class="badge price trend">Trend</div><a href="shop-cart.html"><span title="Add to cart"
                class="add-cart"></span></a><a href="shop-single.html"><img src="img/shop/12.webp" alt=""
                class="img-responsive center-block"></a>
          </div><a href="shop-single.html">
            <h5>Forest - Helena Camela</h5>
          </a>
        </div>
      </div>
    </div>
  </section>
`
  let buy = document.getElementById("buy")
  const quantityBuy = document.getElementById("number")
  buy.addEventListener("click", (e) => {
    e.preventDefault()
    addItemCart(productDescription, quantityBuy)

  })
}

//funcion para agregar productos al carrito
const addItemCart = (product, quantity) => {
  if (carrito.lenght === 0) {
    autoSaveCart()
  }
  const equalProduct = carrito.find(p => p.id === product.id)
  if (equalProduct) {
    equalProduct.quantity = parseInt(equalProduct.quantity) + parseInt(quantity.value)
  }
  else {
    carrito.push({ ...product, quantity: quantity.value })
  }
  localStorage.setItem("carrito", JSON.stringify(carrito))
  listCart()
  Toastify({
    text: `${product.nombre} Se ha añadido el producto en el carrito`,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} // Callback after click
  }).showToast();


}




//funcion para eliminar un producto del carrito
const deleteItem = (id) => {
  let findItem = carrito.find(p => p.id == id)
  findItem.quantity = 0
  carrito = carrito.filter(p => p.id !== id)
  localStorage.setItem("carrito", JSON.stringify(carrito))
  listCart()
  Toastify({
    text: `${findItem.nombre}  Se ha eliminado el producto en el carrito    `,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} // Callback after click
  }).showToast();

}

//me mantiene en el carrito lo que tengo guardado desde el localStorage
const autoSaveCart = () => {
  let recuperarCarrito = JSON.parse(localStorage.getItem('carrito'))
  if (recuperarCarrito) {
    for (const elemento of recuperarCarrito) {
      carrito.push(elemento)
    }
  }
}
autoSaveCart()

//pagina inicial 
const mostrarListaDeProductos = (array) => {

  page.innerHTML = ""
  page.innerHTML = `
  <header data-background="img/shop/header2.jpg" class="intro introhalf">
  <!-- Intro Header-->
  <div class="intro-body">
    <h1>Shop</h1>
    <h4>YOUR ART STORE</h4>
  </div>
</header>
<!-- shop Block-->
<section id="shop" class="section-small">
  <div class="container">
    <select id="select" class="input-lg sorting pull-left">
      <option>DEFAULT SORTING</option>
      <option>PRICE: LOW TO HIGH</option>
      <option>PRICE: HIGH TO LOW</option>
    </select>
    <div class="clearfix"></div>
    <div class="row">
      <div class="col-md-12">
        <div class="row grid-pad">
          <div class="col-md-8 text-center">
            <div id="products" class="row">
            </div>
          </div>
          <div class="col-md-3 col-md-offset-1">
            <h4>search</h4>
            <form class="form-inline subscribe-form">
              <div class="input-group input-group-lg">
                <input id="search2" type="search" name="search" placeholder="Search..." class="form-control"><span
                  class="input-group-btn">
                  <button id="buttonSearch2" name="search" class="btn btn-dark"><i
                      class="fa fa-search fa-lg"></i></button></span>
              </div>
            </form>
            <h4>categories</h4>
            <ul class="list-unstyled">
              <li id="realism">Realism</li>
              <li id="surealism">Surealism</li>
              <li id="animation">Animation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</div>
`
  //captura el elemento que va a contener mi lista de productos
  const productsList = document.getElementById("products")
  //borro lo que hay dentro del elemento para refrescar mi lista de productos
  productsList.innerHTML = ""
  //genero la lista de productos
  array.forEach(p => {
    //creo una variable que contiene un div
    let div = document.createElement("div")
    //le agrego una clase al elemento generado
    div.className = "col-sm-6 shop-item"
    //añado el contenido del elemento
    div.innerHTML = `<div id="description${p.id}">
  <div class="badge price">${p.precio}</div>
  <div class="badge price"></div><span title="Add to cart" class="add-cart"></span><img src=${p.img} alt="" class="img-responsive center-block">
</div>
  <h5>${p.nombre}</h5>
</div>`
    //guardo cada fragmento del div en el elemento id "products"
    productsList.appendChild(div)
    //evento para ir al apartado de descripcion del producto
    const description = document.getElementById(`description${p.id}`)
    description.addEventListener('click', () => {
      goToDescription(p.id)
    }
    )
  }
  )
  //filtro por categorias
  const Category1 = document.getElementById("realism")
  const Category2 = document.getElementById("surealism")
  const Category3 = document.getElementById("animation")
  Category1.addEventListener("click", () => {
    const category = productos.filter(p => p.categoria == "realismo")
    mostrarListaDeProductos(category)
  })
  Category2.addEventListener("click", () => {
    const category = productos.filter(p => p.categoria == "surrealismo")
    mostrarListaDeProductos(category)
  })
  Category3.addEventListener("click", () => {
    const category = productos.filter(p => p.categoria == "animacion")
    mostrarListaDeProductos(category)
  })

  //filtro por mayor o menor precio
  const select = document.getElementById("select")
  const ar = [...array]
  select.addEventListener("change", () => {
    switch (select.value) {
      case "DEFAULT SORTING": mostrarListaDeProductos(productos);
        break;
      case "PRICE: LOW TO HIGH": const lowPrice = ar.sort((a, b) => a.precio - b.precio);
        mostrarListaDeProductos(lowPrice);
        break;
      case "PRICE: HIGH TO LOW": const highPrice = ar.sort((a, b) => b.precio - a.precio);
        mostrarListaDeProductos(highPrice);
        break;
    }
  })

  //buscador2
  const search2 = document.getElementById("search2")
  const buttonSearch2 = document.getElementById("buttonSearch2")
  buttonSearch2.addEventListener("click", (e) => {
    e.preventDefault()
    const searchProduct = productos.filter(p => p.nombre.includes(search2.value))
    if (searchProduct.length > 0) {
      mostrarListaDeProductos(searchProduct)
    }
    else{
      mostrarListaDeProductos(productos)
    }
  })
}
//ejecuta la primer pagina
mostrarListaDeProductos(productos)





