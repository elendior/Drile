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
        discount:0,
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

let Cart = function () {
    this.items = {}
    this.addItem = function (id, img, product, price) {
        this.items [id] = {
            id:id,
            img: img,
            product:product,
            price:price,
            // discount:discount,
            count:1
        }
    }
    this.drawItems = function (item){
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
                 <td>
                    <div class="modal_count_wrapper">
                      <span class="minus" data-id = "${this.items[item].id}">&#9668;</span>
                      <span class="count">${this.items[item].count}</span>
                      <span class="plus" data-id = "${this.items[item].id}">&#9658;</span>
                    </div>
                 </td>
                 <td>$ ${this.items[item].price }</td>
                 // <td>${this.items[item].discount}</td>
                 <td><span class="remove" data-id = "${this.items[item].id}">&#10006;</span></td>
             </tr>
            `
            cartHtml += html
        }
        tbody.innerHTML = cartHtml
        console.log(cartHtml)
    }
    this.init = function () {
        let _self = this;
        addToCart.forEach(function (btnToCart) {
            btnToCart.addEventListener('click', function (event) {
                let target = event.target;
                let id = target.getAttribute ('data-id');
                let item = product.find(function (item){
                    if (item.id === id) {
                        return item
                    }
                })
                _self.addItem(item.id,item.img, item.product, item.price, item.discount)
                console.log(_self.items)
            })
        })
        document.querySelector('.order_cart').addEventListener('click', function () {
            _self.drawItems(_self.items)
        })
    }
}


let myCart = new Cart;
myCart.init()

