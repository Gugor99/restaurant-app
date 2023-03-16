import{menuArray} from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
let ordersArray = []
const foodContainer = document.getElementById('food-container')
const orderTab = document.getElementById('order-tab')
const paymentBtn = document.getElementById('payment-btn')


paymentBtn.addEventListener('click', function(){
   document.getElementById('modal-inner').classList.add('hidden')
   const consentFormData = new FormData(document.getElementById('modal-inner'))
    const fullName = consentFormData.get('fullName')
    const thankfullMessage = `<h1 class="thank-msg"> Thanks, ${fullName}! Your order is on its way!`
    orderTab.innerHTML = thankfullMessage
    document.querySelector('input[type="number"]').value = ''
    document.querySelector('input[type="tel"]').value = ''
    document.querySelector('input[type="name"]').value = ''
})

function completeOrder(){
    document.getElementById('modal-inner').classList.remove('hidden')
}

foodContainer.addEventListener('click', function(e){
    if (e.target.id){
       addItemToList(e.target.id)
    }
})

orderTab.addEventListener('click', function(e){
    if (e.target.id === 'complete-btn'){
        completeOrder()
    } else if (e.target.dataset.btn){
    removeItemFromList(e.target.id)        
    }
})

function removeItemFromList(targetItem){
    const targetItemObj = ordersArray.filter(function(product){
        return product.id === targetItem
    })[0]
    const indexSection = ordersArray.indexOf(targetItemObj)
    ordersArray.splice(indexSection, 1)
    render()
}

function addItemToList(targetItem){
    const targetItemObj = menuArray.filter(function(product){
        return product.name === targetItem
    })[0]
       let newItem = {
                    name: `${targetItemObj.name}`,
                    price: `${targetItemObj.price}`,
                    id: uuidv4()
                    }
    ordersArray.push(newItem)
    render()
}

function orderHtml(){
    let displayOrder = ``
    let itemSpan = ``
    let totalPrice = ''
    ordersArray.forEach(function(item){
            itemSpan += `<div class="flex">
                        <h1>${item.name}</h1>
                        <button class="remove-btn" data-btn="yes" id="${item.id}">remove</button>
                        <h2 class="product-price">$${item.price}</h2>
                    </div>`
                
            totalPrice = +totalPrice + +item.price
        })
        if(itemSpan){
           displayOrder += `<h3 class="your-order">Your order</h3>
                            <div id="selected-food">
                                ${itemSpan}
                            </div>
                            <div class="total flex">
                                <h1>Total Price</h2>
                                <p class="total-price">$${totalPrice}</p>
                            </div>
                            <button id="complete-btn">Complete order</button>` 
        }
    
    return displayOrder
}

function productHtml(){
    let displayProduct = ``
    menuArray.forEach(function(product){        
        displayProduct += `<div class="product-section flex">
                                <h5>${product.emoji}</h5>
                                <div class="product-details">
                                    <h3>${product.name}</h3>
                                    <h4>${product.ingredients}</h4>
                                    <h2>$${product.price}</h2>
                                </div>
                                <button id="${product.name}" class="product-button">+</button>
                            </div>`
    })
    return displayProduct
}

function render(){
    foodContainer.innerHTML = productHtml()
    orderTab.innerHTML = orderHtml()
}

render()