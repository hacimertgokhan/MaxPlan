let method = Math.floor((Math.random() * 9999999999999));

export const CreateID = () => {
    let str = String(method);
    let newstr = "";
    for(let i=0;i<str.length;i++) {
        newstr += str[i];
        if ((i + 1) % 4 === 0 && i !== str.length - 1) {
            newstr += "-";
        }
    }
    return newstr;
}

