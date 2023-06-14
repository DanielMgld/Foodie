import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartItems = new BehaviorSubject<Product[]>(this.getInitialCart());
  cartItems$ = this._cartItems.asObservable();
  _cartTotal = new BehaviorSubject<number>(0);
  cartTotal$ = this._cartTotal.asObservable();

  addToCart(product: Product) {
    const currentCart = this._cartItems.value;
    const index = currentCart.findIndex(item => item.name === product.name && item.q === product.q);

    if(index > -1) {
      currentCart[index].amount = (currentCart[index].amount || 0) + 1;
    } else {
      currentCart.push({ ...product, amount: 1 });
    }

    this._cartItems.next(currentCart);
    this.saveCartToLocalStorage(currentCart);
  }

  getCartTotal(): Observable<number> {
    return this.cartTotal$;
  }

  updateCartTotal(total: number) {
    this._cartTotal.next(total);
  }

  removeProduct(product: Product) {
    let currentCart = this._cartItems.value;
    currentCart = currentCart.filter(item => !(item.name === product.name && item.q === product.q));

    this._cartItems.next(currentCart);
    this.saveCartToLocalStorage(currentCart);
  }

  clearCart() {
    this._cartItems.next([]);
    this.saveCartToLocalStorage([]);
    this._cartTotal.next(0);
  }

  private getInitialCart(): Product[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  private saveCartToLocalStorage(cartItems: Product[]) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }
}
