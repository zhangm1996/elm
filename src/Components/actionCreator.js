function hidetabbar(){
    return {
        type:"HideMaoYanTabbar",
        payload:false
    }
}

function showTabbar(){
    return {
        type:"ShowMaoYanTabbar",
        payload:true
    }
}

export {hidetabbar,showTabbar}