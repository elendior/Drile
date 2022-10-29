const open = document.querySelector('.modal_btn_open');
const close = document.querySelector('.modal_btn_close');
const modal = document.querySelector('#modal');

open.addEventListener('click', ()=>modal.classList.add('active'))
close.addEventListener('click', ()=>modal.classList.remove('active'))


let product = [
    {
        id:'01',
        img: "img/main/seller/seller_product1.png",
        product:'Metal Vintage Pendant',
        price:79.00,
        discount:5,
    },
    {
        id:'02',
        img: "img/main/seller/seller_product2.png",
        product:'Klosh Table Clock',
        price:99.00,
        discount: 0,
    },
    {
        id:'03',
        img: "img/main/seller/seller_product3.png",
        product:'Arne Dining Chair',
        price:350.00,
        discount:0,
    },
    {
        id:'04',
        img: "img/main/seller/seller_product4.png",
        product:'Klosh Wall Clock',
        price:99.00,
        discount:0,
    },
    {
        id:'05',
        img: "img/main/seller/seller_product5.png",
        product:'Modern Outdoor Chair',
        price:79.00,
        discount:20,
    },
    {
        id:'06',
        img: "img/main/seller/seller_product6.png",
        product:'Vipp Wool Pillow',
        price:99.00,
        discount:0,
    },
    {
        id:'07',
        img: "img/main/seller/seller_product7.png",
        product:'Modern Bedroom Storage',
        price:499.00,
        discount:17,
    },
    {
        id:'08',
        img: "img/main/trending/trending_product1.png",
        product:'Vasagle Vanity Table',
        price:1200.00,
        discount:0,
    },
    {
        id:'09',
        img: "img/main/trending/trending_product2.png",
        product:'Adkins Dressing Table',
        price:899.00,
        discount:0,
    },
    {
        id:'10',
        img: "img/main/trending/trending_product3..png",
        product:'Hironpal Dressing Tablet',
        price:350.00,
        discount:0,
    },
    {
        id:'11',
        img: "img/main/trending/trending_product4..png",
        product:'Deco Dressing Table',
        price:800.00,
        discount:0,
    }]
let items = document.querySelectorAll('.item');
let addToCart = document.querySelectorAll('.add_to_cart');
let tbody = document.querySelector('tbody');
let orderPrice = document.querySelector('.order_price_container')

let Cart = function () {
    this.items = {}
    this.addItem = function (id, img, product, price, discount) {
        this.items [id] = {
            id:id,
            img: img,
            product:product,
            price:price,
            discount:discount,
            count:1
        }
    }
    this.drawItems = function (items){
        let cartHtml = ''
        for (let item in items){
            const html = `
             <tr>
                 <td>
                    <div class="table_img">
                        <img src="${this.items[item].img}" alt="product">
                    </div>
                 </td>
                 <td>${this.items[item].product}</td>
                 <td>$ ${this.items[item].price}</td>
                 <td></td>
                 <td>
                    <div class="modal_count_wrapper">
                      <span id="minus"  data-id = "${this.items[item].id}">&#9668;</span>
                      <span class="count">${this.items[item].count}</span>
                      <span id="plus" data-id = "${this.items[item].id}">&#9658;</span>
                    </div>
                 </td>
                 <td class="total_price">$ ${this.items[item].price  * this.items[item].count} </td>
                 <td><span class="remove" data-id = "${this.items[item].id}">&#10006;</span></td>
             </tr>
            `
            const htmlDiscount = `
             <tr>
                 <td>
                    <div class="table_img">
                        <img src="${this.items[item].img}" alt="product">
                    </div>
                 </td>
                 <td>${this.items[item].product}</td>
                 <td>$ ${this.items[item].price}</td>
                 <td>- ${this.items[item].discount} %</td>
                 <td>
                    <div class="modal_count_wrapper">
                      <span id="minus"  data-id = "${this.items[item].id}">&#9668;</span>
                      <span class="count">${this.items[item].count}</span>
                      <span id="plus" data-id = "${this.items[item].id}">&#9658;</span>
                    </div>
                 </td>
                 <td class="total_price">$ ${(this.items[item].price  - this.items[item].price  / 100 * this.items[item].discount) * this.items[item].count} </td>
                 <td><span class="remove" data-id = "${this.items[item].id}">&#10006;</span></td>
             </tr>
            `
            if(this.items[item].discount === 0){
                cartHtml += html
            }else {
                cartHtml += htmlDiscount
            }
        }
        tbody.innerHTML = cartHtml
    }
    this.drawOrder = function (){
        let order = 0;
        let orderHtml
        if (Object.entries(this.items).length===0){
            orderHtml =`
                <div class="wrapper_order_price">
                    <h3></h3>
                    <span class="order_price">Cart is empty</span>
                </div>
        `
            orderPrice.innerHTML = orderHtml
        } else {
            for (let item in this.items){
                order += (this.items[item].price  - this.items[item].price  / 100 * this.items[item].discount) * this.items[item].count
            }
            orderHtml =`
                <div class="wrapper_order_price">
                    <h3>Order price</h3>
                    <span class="order_price">${order}</span>
                </div>
        `
            orderPrice.innerHTML = orderHtml
        }
    }
    this.init = function () {
        let _self = this;
        addToCart.forEach(function (btnToCart) {
            btnToCart.addEventListener('click', function (event) {
                event.preventDefault()
                let target = event.target;
                let id = target.getAttribute ('data-id');
                let item = product.find(function (item){
                    if (item.id === id) {
                        return item
                    }
                })
                _self.addItem(item.id,item.img, item.product, item.price, item.discount)
            })
        })
        document.querySelector('.order_cart').addEventListener('click', function () {
            _self.drawItems(_self.items)
            _self.drawOrder()
        })
        tbody.addEventListener('click', function (event){
            let target = event.target;
            console.log(target)
            let id = target.getAttribute ('data-id');

            if (target.classList.contains('#plus')) {
                _self.items[id].count++
                console.log(_self.items[id].count)
                _self.drawItems(_self.items)
                _self.drawOrder()

            if (target.classList.contains('#minus') && _self.items[id].count > 1){
                _self.items[id].count--
                _self.drawItems(_self.items)
                _self.drawOrder()
            }
            if (target.classList.contains('remove')){
                document.querySelectorAll('.remove').forEach(function (btn){
                    btn.addEventListener('click', function (event){
                        let target = event.target;
                        let id = target.getAttribute ('data-id');
                        delete _self.items[id]
                        _self.drawItems(_self.items)
                        _self.drawOrder()
                    })
                })
            }

            }
        })
    }
}


let myCart = new Cart;
myCart.init()

