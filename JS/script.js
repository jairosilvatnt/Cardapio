const dataSpan = document.getElementById('data-span')
const menu = document.getElementById('menu')
const cartBtn = document.getElementById('cart-btn')
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const checkoutBtn = document.getElementById('checkout-btn')
const closeModalBtn = document.getElementById('close-modal-btn')
const cartCounter = document.getElementById('cart-count')
const addressInput = document.getElementById('address')
const addressWarn = document.getElementById('address-warn')


let cart = []

//Acessando o modal 
cartBtn.addEventListener("click", function() {
  cartModal.style.display = "flex"
});

//Fechando o modal
cartModal.addEventListener('click', function(event) {
  if(event.target === cartModal){
    cartModal.style.display = "none"
  }
})

closeModalBtn.addEventListener('click', function(event) {
  if(event.target === closeModalBtn){
    cartModal.style.display = "none"
  }
})

menu.addEventListener('click', function(event) {
  let parentButton = event.target.closest('.add-to-cart-btn')

  if(parentButton){
    const name = parentButton.getAttribute('data-name')
    const price = parseFloat(parentButton.getAttribute('data-price')).toFixed(2)

    addToCart(name, price)
  }
})

function addToCart(name, price) {

  const existItem = cart.find(item => item.name === name)

  if(existItem){
    existItem.quantity += 1
  }

  cart.push({
    name,
    price,
    quantity: 1
  })
}