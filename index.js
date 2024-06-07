import menuArray from "./data.js";
const billSection = document.getElementById('bill')
const userDetailsElement = document.getElementById('details-element')
const orderArray = []

document.getElementById('details-form').addEventListener('submit',(e) => {
        e.preventDefault()
        clearForm();
})

function clearForm() {
        document.getElementById('u-name').value = '';
        document.getElementById('u-card-number').value = '';
        document.getElementById('u-cvv-number').value = '';
    }


document.addEventListener('click',(e) => {

        if(e.target.dataset.add){
        
               showBill(+e.target.dataset.add)
        }

        if(e.target.dataset.remove){
                removeItems(+e.target.dataset.remove)
        }

        if(e.target.id === 'order-btn'){
                payBill()
        }

        if(e.target.id === 'pay-btn'){
                submitDetails()
        }
        


})


function showBill(foodId){
        document.getElementById('msg').innerHTML = ''
        billSection.classList.remove('hidden')

        
        
        const item = menuArray.find((item) => {
                
                return item.id === foodId
        })

        
        orderArray.push(item)

        updateMenulist(orderArray)
       
        updateTotalPrice(orderArray)
       


}



        function updateTotalPrice(orderArray){
                
                const totalPrice = orderArray.reduce((total,current)=> {

                        return total + current.price
                },0)
         
                
              const priceElement = document.getElementById('priceEle')
              priceElement.textContent = totalPrice
        }



        function removeItems(itemToBeRemoved){
              
                const itemPosition =  orderArray.findIndex((element)=> {
                   return element.id === itemToBeRemoved
                })
                
                orderArray.splice(itemPosition,1)
                
                updateMenulist(orderArray)
                updateTotalPrice(orderArray)
                
        }



        function updateMenulist(newOrderArray){

                const orderedItemList = document.getElementById('order-list')
                if(newOrderArray.length === 0){
                       
                        billSection.classList.add('hidden')
                }
               
                        orderedItemList.innerHTML = ''
                
                newOrderArray.forEach((item) => {

                        const itemNamePara = document.createElement('p');
                        const itemPriceEle = document.createElement('span')
                        const removeEle = document.createElement('span')
                        
                        removeEle.dataset.remove = item.id;
                        removeEle.textContent = 'remove'
                        itemNamePara.textContent = item.name
                        itemPriceEle.textContent = `$${item.price}`
        
                        
                        
                        itemPriceEle.classList.add('align-end')
                        itemPriceEle.classList.add('item-price')
                        itemNamePara.classList.add('item-name')
                        removeEle.classList.add('remove-btn')
        
                        itemNamePara.appendChild(itemPriceEle)
                        itemNamePara.appendChild(removeEle)
        

                        orderedItemList.appendChild(itemNamePara)
        
               })

               
        }

        function payBill(){
               while(orderArray.length > 0){
                orderArray.pop()
               }
                userDetailsElement.classList.remove('hidden')
        }

        function submitDetails(){
                billSection.classList.add('hidden')
                userDetailsElement.classList.add('hidden')

                

                createSuccessMessage()
        
        }

        function createSuccessMessage(){
                const messageDiv = document.createElement('div')
                messageDiv.classList.add('msg')
                const messagePara = document.createElement('p')
                messagePara.classList.add('msg-para')
                messagePara.textContent = 'Thanks James! your order is on its way!'
                messageDiv.appendChild(messagePara)
                document.getElementById('msg').appendChild(messageDiv)
        }





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
                            <button class="plus-circle" data-add='${element.id}'>
                                <i class="fa-solid fa-plus" data-add='${element.id}'></i>
                            </button>
                    </div>        
                    `
   }).join('')

  
}

function render(){
    document.getElementById('menu').innerHTML = getContent()
}

render()