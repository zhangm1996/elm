function listReducer(prevState=[],action={}){
    let {type,payload}  = action; // 解构赋值。
    switch(type){
        case "GetComingSoonList":
            console.log(payload);
            // prevState.push(payload)
            // return prevState; // setState
            return payload; //不能直接修改presvState 要深复制
        // case "HideMaoYanTabbar":
        //     return payload;
        
        default :
            return prevState;
    }
    // return action.payload;
}

export default listReducer



