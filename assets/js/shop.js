let app = new Vue({
    el: "#app",
    data: {
        item_data: [],
        item_url:[]
    },
    methods: {
            addItemToCart(){
                let selected_index = event.srcElement.id;
                let c = 0;
                
                
                cook = document.cookie;
                cook = cook.slice(cook.indexOf("{"))

                let cartCookies = []
                let jsonCartCookies = []

                if(cook != ''){
                    cartCookies = JSON.parse(cook.slice(cook.indexOf("{")))
                    
                    for(i of cartCookies['data']){
                        if(i['_id'] == this.item_data[selected_index]['_id']){
                            i['quantity'] += 1
                            c = 1;
                            break;
                        }
                    }
                }

                if(c == 0) {
                    let t = this.item_data[selected_index]
                    t['url'] = this.item_url[selected_index]
                    t['quantity'] = 1

                    if(cartCookies.length == 0){
                        cartCookies.push(t);
                        jsonCartCookies = {"data" : cartCookies}
                    }
                    else{
                        cartCookies['data'].push(t);
                        jsonCartCookies = {"data" : cartCookies['data']}
                    }
                    
                        
                }
                else{
                    jsonCartCookies = {"data" : cartCookies['data']}
                }


                document.cookie = 'cart=' + JSON.stringify(jsonCartCookies) + ';max-age=31536000;';
                alert("ITEM ADDED TO THE CART");
            },
    },
    async beforeMount()
    {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          await fetch("https://webenggshopcart.herokuapp.com/", requestOptions)
            .then(response => response.json())
            .then(result => {
                for(i of result['data']['data']){
                    this.item_data.push(i);
                }
            })
            .catch(error => console.log('error', error));

            for (i of this.item_data){
                this.item_url.push(i['url'])
            }
    }
})