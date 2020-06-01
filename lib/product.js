class Product {
    constructor(id, name, price, stock, image) {
        this.id = id,
        this.name = name,
        this.price = price,
        this.stock = stock,
        this.image = image
    }
}


function defineProductArray(data, use) {
    let productArray = [];
    for (let i = 0; i < data.length; i++) {
        let productEntry =  new Product(data[i].ID, data[i].name, data[i].price, data[i].stock, data[i].image);
        productArray.push(productEntry);
    }

    if (use === "render") {
        const hbsObject = {
            product: productArray
        };
        return hbsObject;
    }

    return productArray;
}

module.exports = defineProductArray;