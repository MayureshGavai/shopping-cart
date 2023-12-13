

const label = document.querySelector('.label')
const shopping_cart = document.querySelector('.shopping-cart')

let basket = JSON.parse(localStorage.getItem('items')) || []


const calculation = function () {
    document.querySelector('.cart-count').innerHTML = basket.map((x) => x = x.item).reduce((x, y) => x + y, 0)
    // console.log()
}

calculation()

let generateCartItem = () => {
    if (basket.length !== 0) {
        return (shopping_cart.innerHTML = basket.map((x) => {
            const { id, item } = x
            const search = shopItemsData.find((y) => y.id === id) || []
            const {img,name,price} = search
            return `
            <div class="cart-item">
            <img width="100" src=${img} alt="" />
    
            <div class="details">
            
              <div class="title-price-x">
                <h4 class="title-price">
                  <p>${name}</p>
                  <p class="cart-item-price">$ ${price}</p>
                </h4>
                <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
              </div>
    
              <div class="cart-buttons">
                <div class="items-buttons">
                  <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                  <div id=${id} class="quantity">${item}</div>
                  <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
              </div>
    
              <h3>$ ${item * price}</h3>
            
            </div>
          </div>
          `;
          })
          .join(""))
          
    } else {
        shopping_cart.innerHTML=``
        label.innerHTML = `
            <h2>Cart is Empty<h2>
            <a href='index.html'>
                <button class='home-btn'>Return to Home Page</button>
            </a>
        `
    }
}

generateCartItem()

const increment = function(id){
    const selectedItem = id
    const search = basket.find((x)=>x.id === selectedItem.id)

    if(search === undefined){
        basket.push({
            id:selectedItem.id,
            item:1
        })
    }else{
        search.item++
    }
    
    // console.log(basket)
generateCartItem()
    update(selectedItem.id)
    localStorage.setItem('items',JSON.stringify(basket))

}

const decrement = function(id){
    const selectedItem = id
    const search = basket.find((x)=>x.id === selectedItem.id)

    if(search === undefined){
        return
    }else if(search.item === 0){
        return;
    }else{
        search.item--
    }
    
    update(selectedItem.id)
    basket = basket.filter((x)=> x.item !== 0)
    generateCartItem()
    totalAmount()
    localStorage.setItem('items',JSON.stringify(basket))
}

const update = function(id){
    const search = basket.find((x)=>x.id === id)
    document.getElementById(id).innerHTML = search.item
    totalAmount()
    calculation()
}

const removeItem = (id) =>{
    let selectedItem = id;
    basket = basket.filter((x)=> x.id !== selectedItem.id)
    calculation()
    generateCartItem()
    totalAmount()
    localStorage.setItem('items',JSON.stringify(basket))
}

const totalAmount = () =>{
    if(basket.length!==0){
        const amount = basket.map((x)=>{
            let{item, id} = x
            const search = shopItemsData.find((y)=> y.id === id) || []
            return (search.price*item)  
        }).reduce((x,y)=>x+y,0)
        return (
            label.innerHTML =  `
                <h2>Total Price : $ ${amount}<h2>
                <button class="checkout">Checkout</button>
                <button onclick="clearCart()" class="removeAll">Clear Cart</button>
            `
        )
    }else return
}

totalAmount()

const clearCart = () => {
    basket = []
    calculation()
    generateCartItem()
    totalAmount()
    localStorage.setItem('items',JSON.stringify(basket))
}
