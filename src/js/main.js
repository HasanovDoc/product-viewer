import ProductCard from './components/product-card.js';

class ProductGrid {
    constructor(containerSelector, products) {
        this.container = document.querySelector(containerSelector);
        this.products = products;
        this.filteredProducts = [...products];
        this.currentCategory = 'all';
        this.init();
    }

    init() {
        this.render();
        this.setupFiltering();
    }

    render() {
        this.container.innerHTML = '';

        this.filteredProducts.forEach(productData => {
            const product = new Product(productData);
            const card = new ProductCard(product, {
                showCategory: true,
                showAuthor: true,
                interactive: true
            });

            card.getElement().addEventListener('categoryFilter', (e) => {
                this.filterByCategory(e.detail.category);
            });

            this.container.appendChild(card.getElement());
        });
    }

    setupFiltering() {
        const categories = [...new Set(this.products.map(p => p.category))];
        const categoryCount = this.products.reduce((acc, item) => { // Сделать получение количества категорий в product-card
            acc[item.category] = (acc[item.category] || 0) + 1;
            return acc;
        }, {});

        const filterContainer = document.querySelector('.categories__list');
        if (filterContainer) {
            filterContainer.innerHTML = `
                <a class="filter__btn filter__btn--active" data-category="all">
                    <div class="filter__btn-inner">
                        All
                        <span class="filter__btn-counter">${this.products.length}</span>
                    </div>
                </a>
                ${categories.map(cat =>
                `<a class="filter__btn" data-category="${cat}">
                        <div class="filter__btn-inner">
                            ${cat}
                            <span class="filter__btn-counter">${categoryCount[cat] || 0}</span>
                        </div>
                    </a>`
            ).join('')}
            `;

            filterContainer.addEventListener('click', (e) => {
                const btn = e.target.closest('.filter__btn');
                if (!btn) return;

                const category = btn.dataset.category;
                this.filterByCategory(category);

                filterContainer.querySelectorAll('.filter__btn').forEach(b => {
                    b.classList.remove('filter__btn--active');
                });

                btn.classList.add('filter__btn--active');
            });
        }
    }

    filterByCategory(category) {
        this.currentCategory = category;

        if (category === 'all') {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(
                product => product.category === category
            );
        }

        this.render();
    }
}

const sampleProducts = [
    {
        id: 1,
        title: "The Ultimate Google Ads Training Course",
        price: 100,
        image: "assets/images/card_1.png",
        author: "by Jerome Bell",
        category: "Marketing",
    },
    {
        id: 2,
        title: "Prduct Management Fundamentals",
        price: 480,
        image: "assets/images/card_2.png",
        author: "by Marvin McKinney",
        category: "Management",
    },
    {
        id: 3,
        title: "HR  Management and Analytics",
        price: 200,
        image: "assets/images/card_3.png",
        author: "by Leslie Alexander Li",
        category: "HR & Recruting",
    },
    {
        id: 4,
        title: "Brand Management & PR Communications",
        price: 530,
        image: "assets/images/card_4.png",
        author: "by Kristin Watson",
        category: "Marketing",
    },
    {
        id: 5,
        title: "Graphic Design Basic",
        price: 500,
        image: "assets/images/card_5.png",
        author: "by Guy Hawkins",
        category: "Design",
    },
    {
        id: 6,
        title: "Business Development Management",
        price: 400,
        image: "assets/images/card_6.png",
        author: "by Dianne Russell",
        category: "Management",
    },
    {
        id: 7,
        title: "Highload Software Architecture",
        price: 600,
        image: "assets/images/card_7.png",
        author: "by Brooklyn Simmons",
        category: "Development",
    },
    {
        id: 8,
        title: "Human Resources – Selection and Recruitment",
        price: 150,
        image: "assets/images/card_8.png",
        author: "by Kathryn Murphy",
        category: "HR & Recruting",
    },
    {
        id: 9,
        title: "User Experience. Human-centered Design",
        price: 240,
        image: "assets/images/card_9.png",
        author: "by Cody Fisher",
        category: "Design",
    }

];

document.addEventListener('DOMContentLoaded', () => {
    const productGrid = new ProductGrid('#products-grid', sampleProducts);
});