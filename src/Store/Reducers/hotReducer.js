function hotReducer(prevState=true,action={}){
    
    let {type,payload}  = action; // 解构赋值。
    switch(type){
        case "ShowHot":
            return payload;
        case "Hidehot":
            return payload;
        
        default :
            return prevState;
    }
    // return action.payload;
}

export default hotReducer