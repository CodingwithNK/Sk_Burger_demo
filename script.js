let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.addEventListener("click", function() {
  navbar.classList.toggle("active");
});

window.onscroll = () => {
    navbar.classList.remove("active");
};





let add = document.querySelector("#cart-icon");
let clck = document.querySelector(".add-item");

add.addEventListener("click", function() {
        //clck.classList.toggle('active');
        
        if(clck.style.display === "none"){
          clck.style.display = "block";
        }else{
          clck.style.display = "none"
        }
 });


 let cart = document.querySelector("#cart");

 cart.addEventListener("click", function() {
  //clck.classList.toggle('active');
  
  if(clck.style.display === "none"){
    clck.style.display = "block";
  }else{
    clck.style.display = "none"
  } 
 });


// buy button par click karte hi div box open ho jayega.

let buttn = document.querySelectorAll(".buyBtn");
buttn.forEach((btn)=>{
  btn.addEventListener('click',singleItemPurchase);
});


let buyItem = document.querySelector(".single-item");

function singleItemPurchase() {
  
  if(buyItem.style.display === "none"){
    buyItem.style.display = "block";
  }else{
   buyItem.style.display = "none"
 } 
};



// close button on the cart.
let closeBtn = document.querySelector("#close");
let item = document.querySelector(".add-item");

closeBtn.addEventListener("click", function(){
  item.style.display = 'none';
});


// close button on the single item buy.
let closeButn = document.querySelector(".close-btn");
let singleItem = document.querySelector(".single-item");

closeButn.addEventListener("click", function(){
  singleItem.style.display = 'none';
});




//let btn = document.querySelectorAll('.btn'); // also use for add item in cart.



// isko remove karte hi bilkul bhi kam nahi karega code.
document.addEventListener('DOMContentLoaded',loadCartFood);
document.addEventListener('DOMContentLoaded',loadBuyFood);

// refresh button par click karte hi pura content refresh ho jayega.
let refrs = document.querySelector('#refresh');
    refrs.addEventListener('click', function(){
             return loadCartFood();
    });
 

function loadCartFood(){
      loadContent();
    };
  


// single item buy vale box me ye code kam aayega.   
let refreshBtn = document.querySelector('.refresh-btn');
        refreshBtn.addEventListener('click',function(){
                 return loadBuyFood();
        });


function loadBuyFood(){
    loadBuyContent()
  };



// items delete button in cart.

function loadContent(){
   //Remove Food Items  From Cart
   let btnRemove=document.querySelectorAll('.cart-remove');
   btnRemove.forEach((btn)=>{
     btn.addEventListener('click',removeItem);
   });
 
   // input Change Event
   let qtyElements=document.querySelectorAll('.cart-quantity');
   qtyElements.forEach((input)=>{
     input.addEventListener('change',changeQty);
   });
 
   //Product Cart
   let cartBtns=document.querySelectorAll('.btn');
   cartBtns.forEach((btn)=>{
     btn.addEventListener('click',addCart);
   });

   // call the function.    
   updateTotal();    
}

//Remove Items from cart
function removeItem(){
  if(confirm('Are You Sure to Remove')){
  let title=this.parentElement.querySelector('.cart-food-title').innerHTML;
  itemList=itemList.filter(el=>el.title!=title);
  
  let rmv = document.querySelector('.cart-box');
  
  rmv.parentElement.remove();
  
  //singleItemQtyMinus();
  smallScreenMinus();
  bigScreenMinus();
  loadContent();
}
}

// cart se item remove karte hi counting minus ho jayegi.
function smallScreenMinus(){  
  let cartDec = itemList.length;
  const decrease = document.querySelector('.cartCounting');
   decrease.innerHTML = cartDec;

};
function bigScreenMinus(){
let cartDec = itemList.length;
const decrease = document.querySelector('.cartAmount');
decrease.innerHTML = cartDec;
};


// cart items quantity change by default value is = 1.
function changeQty(){

  if(isNaN(this.value) || this.value<1){
    return this.value=1;
  }
  
  loadContent();
};









// single item buy code start here ------------
function loadBuyContent(){
  //Remove Food Items  From buy box
  let btnRemove=document.querySelectorAll('.buy-remove');
  btnRemove.forEach((btn)=>{
    btn.addEventListener('click',removeItemBuyBox);
  });

  // input Change Event
  let qtyElements=document.querySelectorAll('.buy-quantity');
  qtyElements.forEach((input)=>{
    input.addEventListener('change',buyQtyChange);
  });

 //  single item buy add in buy box
  let buyBtn = document.querySelectorAll('.buyBtn');
      buyBtn.forEach((bttn)=>{
         bttn.addEventListener('click', singleItemBuy);
      });

  // call the function.    
  updateSingleItemPrice();
    
}


// single buy item change quantity by default value is = 1.
function buyQtyChange(){

  if(isNaN(this.value) || this.value<1){
    return this.value=1;
  }
  
  loadBuyContent();
};


//Remove Items from buy box
function removeItemBuyBox(){
  if(confirm('Are You Sure to Remove')){
  let title=this.parentElement.querySelector('.buy-food-title').innerHTML;
  singleItemList=singleItemList.filter(el=>el.title!=title);
  
  let rmv = document.querySelector('.buy-box');
  
  rmv.parentElement.remove();
  
  singleItemQtyMinus();
  loadBuyContent();
  //singleItemBuy();
}
}

// single item remove from the buy box then item quantity is 0
function singleItemQtyMinus(){
    let buyValue = document.querySelector('#single-item-qty');  
    buyValue.innerText=0;
  }





// add items in cart.

let itemList = [];

function addCart() {
   
   let food = this.parentElement.parentElement;
   let title = food.querySelector('.food-title').innerHTML;
   let price = food.querySelector('.food-price').innerHTML;
   let imgSrc = food.querySelector('.food-img').src;
    
   //console.log(title,price,imgSrc)

    let newProduct ={title,price,imgSrc}
    
    if(itemList.find((el)=>el.title==newProduct.title)){
        alert("Product Already added in Cart");
        return;
    }else{
      itemList.push(newProduct);

      // function call for cart counting.
      cartCount();
    }

    
  let newProductElement = createCartProduct(title,price,imgSrc);
   
    let element = document.createElement('div');
        element.innerHTML=newProductElement;
   
  element.style.position = "relative";
  element.style.height = "100px";
  element.style.display = "flex";
  element.style.flexDirection = "row";
  element.style.alignItems = "center";
  element.style.justifyContent = "space-between";
  element.style.background = "#feeee7";
  element.style.borderRadius = "0.5rem";
  element.style.width = "100%";
  element.style.marginTop = "10px";
  
  let cartBasket = document.querySelector('.add-cart');
  cartBasket.append(element);


  //removeCartItems();
  emptyHeading();
 // showHeading();
};



// -------------------- Single item buy ----------------- //

let singleItemList = [];

function singleItemBuy() {
   
   let food = this.parentElement.parentElement;
   let title = food.querySelector('.food-title').innerHTML;
   let price = food.querySelector('.food-price').innerHTML;
   let imgSrc = food.querySelector('.food-img').src;
    
   //console.log(title,price,imgSrc)

    let newProductList ={title,price,imgSrc}
    
    if(singleItemList.find((el)=>el.title==newProductList.title)){
        //alert("Product Add in Buy-Box Sucessfully!");
        return;
    }else{
      singleItemList.push(newProductList);

      // function call for cart counting.
      //cartCount();
    }

    
  let newProductElementList = createBuyItem(title,price,imgSrc);
   
    let element = document.createElement('div');
        element.innerHTML=newProductElementList;
   
  element.style.position = "relative";
  element.style.height = "100px";
  element.style.display = "flex";
  element.style.flexDirection = "row";
  element.style.alignItems = "center";
  element.style.justifyContent = "space-between";
  element.style.background = "#feeee7";
  element.style.borderRadius = "0.5rem";
  element.style.width = "100%";
  element.style.marginTop = "10px";
  
  let cartBasket = document.querySelector('.buy-item');
  cartBasket.append(element);


    removeFirstItem();
};

// buy button par click karte hi agar dusra item cart me hai to vo remove 
// ho jayega or new vala add ho jayega.
function removeFirstItem(){
   let length = singleItemList.length;
   if(length>1){
    let remov = document.querySelector('.buy-box');    
    remov.parentElement.remove();
   }
}

// function removeCartItems(){
//     let lenthOfCart = itemList.length; // length of carts items
//     let lenthOfBuy = singleItemList.length; // length of buy box item

//     if(lenthOfBuy==1 && lenthOfCart==0){
//        return lenthOfBuy;
//     }else if(lenthOfCart==1 && lenthOfBuy==0){
//         return lenthOfCart;
//     }else{

//     }

// }

// cart empty hai tab ye btane ke liye ki your cart is empty.

function emptyHeading(){
   const cartEmpty=document.querySelector('.cart-empty');
   let count=itemList.length;
      
   if(count==0){
     cartEmpty.style.display='block';
   }else{
     cartEmpty.style.display='none';
   }
};

// show text message in empty cart.

// function showHeading(){
//   const cartEmpty=document.querySelector('.cart-empty');
//   let count=itemList.length;

//   const cartValue = document.querySelector('.cartCounting').innerHTML;

//   if(count==cartValue){
//     cartEmpty.style.display='none';
//   }else{
//     cartEmpty.style.display='none';
//   }
  
// };


// this code for add to cart items.
function createCartProduct(title,price,imgSrc){
    
    return `     
  <div class="cart-box">
    <img src="${imgSrc}" class="cart-img">
    <div class="detail-box">
      <div class="cart-food-title">${title}</div>
      <div class="price-box">
        <div class="cart-price">${price}</div> 
        <div class="cart-amt">${price}</div>
     </div>
      <input type="number" value="1" class="cart-quantity">
    </div>
    <button name="btn" class="cart-remove">Remove</button>
 </div>

    `;
}

//  this code for single buy item.
function createBuyItem(title,price,imgSrc){
    
  return `     
<div class="buy-box">
  <img src="${imgSrc}" class="buy-img">
  <div class="buy-detail-box">
    <div class="buy-food-title">${title}</div>
    <div class="buy-price-box">
      <div class="buy-price">${price}</div> 
      <div class="buy-amt">${price}</div>
   </div>
    <input type="number" value="1" class="buy-quantity">
  </div>
  <button name="btn" class="buy-remove">Remove</button>
</div>

  `;
}




// Buy Single item price and quantity.
function updateSingleItemPrice(){
  const cartItems=document.querySelectorAll('.buy-box');
  const totalValue=document.querySelector('#single-item-price');
 

  let total=0;

   cartItems.forEach(product=>{
    let priceElement=product.querySelector('.buy-price');
    let price=parseFloat(priceElement.innerHTML.replace("₹ "," "));
    let qty=product.querySelector('.buy-quantity').value;
        
    
    total += price * qty ;
    

    product.querySelector('.buy-amt').innerText="₹"+(price*qty);
    
    let totalItemCount = document.querySelector('#single-item-qty');
    totalItemCount.innerText=qty;

  });
  
  totalValue.innerHTML='Rs. '+(total-10);
  
};


 
// count cart itmes price and quantity.
function updateTotal(){
  const cartItems=document.querySelectorAll('.cart-box');
  const totalValue=document.querySelector('.total-price');
 

  let total=0;
  

   cartItems.forEach(product=>{
    let priceElement=product.querySelector('.cart-price');
    let price=parseFloat(priceElement.innerHTML.replace("₹ "," "));
    let qty=product.querySelector('.cart-quantity').value;
    
    
    total += price * qty ;
    
    product.querySelector('.cart-amt').innerText="₹"+(price*qty);

    // let totalQty = document.querySelector('.total-qty');
    //     totalQty.innerText=qty;
  });
  
  totalValue.innerHTML='Rs. '+total;
  
  countQty();

};


// count total quantity.

function countQty(){

  const cartBox = document.querySelectorAll('.cart-box');
  const totalQty = document.querySelector('.total-qty');

  let total = 0;
 
  cartBox.forEach(qty=>{
    let qtyOfItems = qty.querySelector('.cart-quantity').value;
    
    for(let i = 0; i < cartBox; i++){
     
      qtyOfItems[i];
     
    total = qtyOfItems;
    }

         totalQty.innerHTML = total;
  });

};




    // Add Product Count in Cart Icon
function cartCount(){
      const cartCount=document.querySelector('.cartAmount');
      let count=itemList.length;
      cartCount.innerHTML=count;

      if(count==0){
        cartCount.style.display='none';
      }else{
        cartCount.style.display='block';
      }

      // this code use for small screen. 
      const crtCnt = document.querySelector('.cartCounting');
      crtCnt.innerHTML = count;
       
      if(count==0){
       cartCount.style.display='none';
     }else{
       cartCount.style.display='block';
     }
 };


// code for click on top button then go to top section.
document.body.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.querySelector("#myButton").style.display = "block";
  } else {
    document.querySelector("#myButton").style.display = "none";
  }
}

document.querySelector("#myButton").addEventListener("click", function() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
});

