import menuArray from "./data.js";





function getContent(){
        
        return menuArray.map(element => {
                return `
                    <div class="menu-item">
                            <img class="item-img" src='${element.image}'> 
                            <div class="item-details">
                                    <p class="item-name">${element.name}</p>
                                    <p class="item-incredients">${element.ingredients}</p>
                                    <p class="item-price">$${element.price}</p>
                            </div>
                            <div class="plus-circle">
                                <i class="fa-solid fa-plus"></i>
                            </div>
                    </div>        
                    `
   }).join('')

  
}

function render(){
    document.getElementById('menu').innerHTML = getContent()
}

render()