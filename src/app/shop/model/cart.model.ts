export interface Cart {
  cartItems: CartItem[];
  cartTotals: {
    subtotal_price: number;
    total: string;
    total_tax: number;
    quantity: number;
  };
}

export interface CartItem {
  item_key: string;
  title: string;
  featured_image: string;
  permalink: string;
  totals: {
    total: string;
    tax: string;
    subtotal: number;
    subtotal_tax: number;
  };
  quantity: {
    value: number;
  };
}
