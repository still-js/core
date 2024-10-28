const local = {
    tamplate: `
    <li>
        <a href="#" onClick="return false;" class="menu-toggle">
            <i class="menu-icon ti-shopping-cart-full"></i>
            <span>E-commerce</span>
        </a>
        <ul class="ml-menu">
            <li>
                <a href="pages/ecommerce/products.html">Products</a>
            </li>
            <li>
                <a href="pages/ecommerce/product-detail.html">Product Details</a>
            </li>
            <li>
                <a href="pages/ecommerce/cart.html">Cart</a>
            </li>
            <li>
                <a href="pages/ecommerce/product-list.html">Product List</a>
            </li>
            <li>
                <a href="pages/ecommerce/invoice.html">Invoice</a>
            </li>
        </ul>
    </li>
   `
}

export default class MenuOption extends BaseComponent {
    
    template = local.template;

    constructor({ componentName, path }){
        super();
        this.setup({
            componentName, 
            path,
            imports: []
        });
    }

}