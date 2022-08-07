let app = new Vue({
    el: "#app",
    data: {
        item_data: [],
        subtotal: 0,
        shipping: 0,
        total: 0,
        items_available: true,
        checkout: false
    },
    methods: {
            updateCart(){
                for(i in this.item_data){
                    this.item_data[i]['quantity'] = document.getElementById(this.item_data[i]['_id']).value
                    if(this.item_data[i]['quantity'] == 0)
                        this.item_data.splice(i, 1);
                }
                jsonCartCookies = {"data" : this.item_data}
                document.cookie = 'cart=' + JSON.stringify(jsonCartCookies) + ';max-age=31536000;';
                this.displayCart();
            },

            displayCart(){
                cook = document.cookie;
                cook = cook.slice(cook.indexOf("{"))

                if(cook != ''){
                    this.item_data = JSON.parse(cook.slice(cook.indexOf("{")))['data'];
                    
                    if(this.item_data.length == 0)
                        this.items_available = false;   
                }
                else{
                    this.items_available = false;   
                }

                this.calculatePrice();
            },
            calculatePrice(){
                this.subtotal = 0;
                this.shipping = 0;
                this.total = 0;

                for (i of this.item_data){
                    this.subtotal += i['price'] * i['quantity']
                    this.shipping += Math.round((i['price'] * i['quantity']) * (15 / 100))
                }

                this.total = this.subtotal + this.shipping
            },
            checkoutProducts() {
                this.checkout = true;
                
                document.cookie = 'cart=' + JSON.stringify({'data' : []}) + ';max-age=0;';
                
                this.displayCart();
            }
    },
    beforeMount()
    {
        this.displayCart();    
    }
})