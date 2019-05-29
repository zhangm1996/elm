function tabbarReducer(prevState=true,action={}){
 
    let {type,payload}  = action; // 解构赋值。
    switch(type){
        case "ShowMaoYanTabbar":
            return payload;
        case "HideMaoYanTabbar":
            return payload;
        
        default :
            return prevState;
    }
    // return action.payload;
}

export default tabbarReducer