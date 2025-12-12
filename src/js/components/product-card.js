class ProductCard {
    constructor(product, options = {}) {
        this.product = product;
        this.options = {
            showCategory: true,
            showAuthor: true,
            showRating: true,
            interactive: true,
            ...options
        };

        this.cardElement = null;
        this.init();
    }

    init() {
        this.createCard();
        if (this.options.interactive) {
            this.addEventListeners();
        }
    }

    createCard() {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.category = this.product.category;
        card.dataset.id = this.product.id;

        card.innerHTML = `
            <div class="product-card__inner">
                ${this.createImage()}
                <div class="product-card__content">
                    ${this.createCategory() || ``}
                    ${this.createTitle() || ``}
                    <div class="product-card__info">
                        ${this.createPrice() || ``}
                        ${this.createAuthor() || ``}
                    </div>
                    ${this.createActions() || ``}
                </div>
            </div>
        `;

        this.cardElement = card;
    }

    createImage() {
        return `
            <div class="product-card__image">
                <img 
                    src="${this.product.image}" 
                    alt="${this.product.title}"
                    loading="lazy"
                >
            </div>
        `;
    }

    createCategory() {
        if (!this.options.showCategory) return '';
        return `
            <div class="product-card__category">
                <a href="#" class="category-link" data-category="${this.product.category}">
                    ${this.product.category}
                </a>
            </div>
        `;
    }

    createTitle() {
        return `
            <h3 class="product-card__title">
                <a href="#" class="product-link" data-id="${this.product.id}">
                    ${this.product.title}
                </a>
            </h3>
        `;
    }

    createAuthor() {
        if (!this.options.showAuthor) return '';
        return `
            <div class="product-card__author">
                <span class="author-label">|</span>
                <span class="author-name">${this.product.author}</span>
            </div>
        `;
    }

    createPrice() {
        const originalPrice = this.product.originalPrice ?
            `<span class="original-price">${this.product.originalPrice} $</span>` :
            '';

        return `
            <div class="product-card__price">
                <span class="current-price">${this.product.price} $</span>
                ${originalPrice}
            </div>
        `;
    }

    createActions() {
        // return `
        //     <div class="product-card__actions">
                
        //     </div>
        // `;
    }

    addEventListeners() {
        const titleLink = this.cardElement.querySelector('.product-link');
        titleLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.onProductClick();
        });

        const categoryLink = this.cardElement.querySelector('.category-link');
        categoryLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.onCategoryClick();
        });
    }

    onProductClick() {
        const event = new CustomEvent('productClick', {
            detail: { product: this.product },
            bubbles: true
        });
        this.cardElement.dispatchEvent(event);
    }

    onCategoryClick() {
        const event = new CustomEvent('categoryFilter', {
            detail: { category: this.product.category },
            bubbles: true
        });
        this.cardElement.dispatchEvent(event);
    }

    getElement() {
        return this.cardElement;
    }

    update(product) {
        this.product = product;
        this.cardElement.replaceWith(this.createCard().cardElement);
    }
}

export default ProductCard;