import axios from 'axios'
function getListPromise(value){
    // console.log(callback);
    // thunk的风格 ， actionCrettor 返回的是函数， 

    return axios.get(`/restapi/shopping/v2/restaurants/search?offset=0&limit=15&keyword=${encodeURI(value)}&latitude=38.913689&longitude=121.614761&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5`).then(res=>{
        console.log(res.data.coming);
        return {
            type:"GetComingSoonList",
            payload:res.data.inside[0].restaurant_with_foods,
        } 
    })
}

export  {getListPromise};