class Product {
    constructor(data) {
        this.id = data.id || Date.now();
        this.title = data.title;
        this.price = data.price;
        this.image = data.image || 'assets/images/card_1.png';
        this.author = data.author;
        this.category = data.category;
        this.description = data.description || '';
    }
}