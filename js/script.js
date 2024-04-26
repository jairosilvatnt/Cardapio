const menu = document.getElementById('menu')


// FOOTER
const cartCountItems = document.getElementById('cart-count-items')
const cartTotal = document.getElementById('cart-total')
const cartBtn = document.getElementById('cart-btn')
// FIM FOOTER


// CART MODAL
const cartModal = document.getElementById('cart-modal')
const cartItems = document.getElementById('cart-items')
const closeModalBtn = document.getElementById('close-modal-btn')
const checkoutBtn = document.getElementById('checkout-btn')
const addressInput = document.getElementById('address')
const addressWarn = document.getElementById('address-warn')
// FIM CART MODAL

let cart = []


// Abrir o Modal do carrinho
cartBtn.addEventListener('click', function() {
  updataCartModal()
  cartModal.style.display = "flex"
})

// Fechar o Modal "clicar fora"
cartModal.addEventListener('click', function(event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none"
  }
})

// Fechar o Modal "click no botão fechar"
closeModalBtn.addEventListener('click', function() {
  cartModal.style.display = 'none'
})

// Adicionar produto dentro do Modal
menu.addEventListener('click', function(event) {
  let parentButton = event.target.closest('.add-to-cart-btn')

  if(parentButton){
    const name = parentButton.getAttribute('data-name')
    const price = parseFloat(parentButton.getAttribute('data-price'))
    addToCart(name, price)
  }
})

// Adicionar no Modal
function addToCart(name, price) {
  const existItems = cart.find(item => item.name === name)

  if (existItems) {
    existItems.quantity += 1
    return
  }else{
    cart.push({
      name,
      price,
      quantity: 1,
    })
  }
  updataCartModal()
}

// Atualiza o Modal
function updataCartModal(){
  cartItems.innerHTML = ''
  let total = 0

  cart.forEach(item => {
    const cartItemElement = document.createElement('div')

  cartItemElement.innerHTML = `
    <div class = "flex flex-col border-b-2">      
      <div class = "flex justify-around">
        <p>${item.name}</p>
        <p>${item.quantity}x</p>
        <p>${total}</p>        
      </div>
      <div class = "flex items-r">
        <button ><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>
  `

  cartItems.appendChild(cartItemElement)
  })
}