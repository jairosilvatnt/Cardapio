const menu = document.getElementById('menu')
const footerCartTotal = document.getElementById('footer-cart-total')
const dateLogo = document.getElementById('date-logo')
const dateSpan = document.getElementById('date-span')
const footerStyle = document.getElementById('footer-style')


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
    cartItemElement.classList.add('flex', 'justify-between','mb-4', 'flex-col', 'h-full' , 'border-b-2')

  cartItemElement.innerHTML = `
    <div class = "flex w-full items-center justify-between pb-1">      
      <div class = "flex w-full justify-between ">
        <div>
          <p class = "font-bold">${item.name}</p>
        </div>
        <div>
          <p class = "font-bold">Qtd: ${item.quantity}x</p>
        </div>
        <div>
          <p class = "font-medium">R$ ${item.price.toFixed(2)}</p>        
        </div>

        <button class= " bg-red-500 text-white px-5 items-center rounded-full remove-btn" data-name="${item.name}">
        <i class="fa-solid fa-xmark"></i>
      </button>
      </div>      
    </div>
    `
    total += item.price * item.quantity

  cartItems.appendChild(cartItemElement)
  })

  cartTotal.innerText = total.toLocaleString('pt-BR', {
    style: "currency",
    currency: "BRL"
  } )

  cartCountItems.innerHTML = cart.length
  footerCartTotal.innerText = total.toFixed(2)
}

// Função para remover itens no Modal
cartItems.addEventListener('click', function(event) {
  if (event.target.classList.contains('remove-btn')) {
    const name = event.target.getAttribute('data-name')
    removeItemCart(name)
  }
})

//Função para remover item do carrinho
function removeItemCart(name) {
  const index = cart.findIndex(item => item.name === name)
  if(index !== -1) {
    const item = cart[index]

    if (item.quantity > 1) {
      item.quantity -= 1
      updataCartModal()
      return
    }
    cart.splice(index, 1)
    updataCartModal()
  }
}

// Adicionar o endereço para entrega
addressInput.addEventListener('input', function(event) {
  let inputValue = event.target.inputValue
  if (inputValue !== '') {
    addressWarn.classList.add('hidden')
    addressInput.classList.remove('border-red-500')
  }
})


// Finalizar o pedido 
checkoutBtn.addEventListener('click', function() {
  if(cart.length === 0) {
    return
  }
  if(addressInput.value === ''){
    addressWarn.classList.remove('hidden')
    addressInput.classList.add('border-red-500')
    return
  }  
})


//Verificar o horario disponivel 
function checkTimeOpen() {
  const data = new Date()
  const hora = data.getHours()
  return hora >= 21 && hora < 23
}

// Manipulando classes de horarios 
const isOpen = checkTimeOpen()
if (isOpen) {
  dateLogo.classList.remove('border-red-800')
  dateLogo.classList.add('border-green-800')
  dateSpan.classList.remove('bg-red-500')
  dateSpan.classList.add('bg-green-500')
  dateSpan.classList.remove('border-red-800')
  dateSpan.classList.add('border-green-800')
  cartBtn.classList.remove('bg-red-500')
  cartBtn.classList.add('bg-green-500')
  footerStyle.classList.remove('bg-red-500')
  footerStyle.classList.add('bg-green-500')
}else{
  dateLogo.classList.remove('border-green-800')
  dateLogo.classList.add('border-red-800')
  dateSpan.classList.remove('bg-green-500')
  dateSpan.classList.add('bg-red-500')
  dateSpan.classList.remove('border-green-800')
  dateSpan.classList.add('border-red-800')
  cartBtn.classList.remove('bg-green-500')
  cartBtn.classList.add('bg-red-500')
  footerStyle.classList.remove('bg-green-500')
  footerStyle.classList.add('bg-red-500')
}