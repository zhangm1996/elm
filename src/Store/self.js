const store = {
    datalist:[],

    subscribe(callback){
        this.datalist.push(callback);
    },

    publish(data){
        for(var i in this.datalist){
            this.datalist[i](data);
        }
    }
}


export default store;