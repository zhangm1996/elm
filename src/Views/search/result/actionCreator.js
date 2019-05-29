function hidehot(){
    return {
        type:"Hidehot",
        payload:false
    }
}

function showhot(){
    return {
        type:"ShowHot",
        payload:true
    }
}

export {hidehot,showhot}