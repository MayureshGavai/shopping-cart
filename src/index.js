const shop = document.querySelector('.container')



let basket = JSON.parse(localStorage.getItem('items'))||[]

const generateShop = function(){
    
    return (shop.innerHTML = shopItemsData.map((item)=>{
        const {id,name,price,desc,img} = item
        let search = basket.find((x)=> x.id === id) || []
        return `
        <div id=product-id-${id} class="item">
            <img src="${img}" alt="">
            <div class="details">
                <h2>${name}</h2>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i id="decrement" onClick=decrement(${id}) class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">
                            ${search.item === undefined? 0 : search.item}
                        </div>
                        <i id="increment" onClick=increment(${id}) class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
    `
    }).join(""))
}

// const decrementBtn = document.querySelector("#decrement")
// const incrementBtn = document.querySelector("#increment")



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
    localStorage.setItem('items',JSON.stringify(basket))
}

const update = function(id){
    const search = basket.find((x)=>x.id === id)
    document.getElementById(id).innerHTML = search.item
    calculation()
}

const calculation = function(){
    document.querySelector('.cart-count').innerHTML = basket.map((x)=>x=x.item).reduce((x,y)=>x+y,0)
    // console.log()
}


generateShop()  
calculation()