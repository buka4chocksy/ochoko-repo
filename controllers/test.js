var hash = (string,max)=>{
    var hash = 0
    for(var i = 0; i< string.lenght; i++){
        hash+= string.charCodeAt(i)
    }
    return hash % max
}