class CartDto {
    constructor(cart) {
      this.id = cart._id;
      this.products = cart.products.map(item => ({
        product: item.product._id,
        title: item.product.title,
        quantity: item.quantity,
        price: item.product.price,
      }));
    }
  }
  
  export default CartDto;