import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { Product } from '../product';
import { tap, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems$: Observable<Product[]>;
  cartTotal$: Observable<number>;
  checkoutForm: FormGroup;
  quantitiesForm: FormGroup;
  productQuantities: number[] = [];
  totalPrice: number = 0;

  constructor(private http: HttpClient, private cartService: CartService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.cartItems$ = this.cartService.cartItems$;
    this.cartTotal$ = this.cartService.getCartTotal().pipe(
      tap(value => console.log('Cart total:', value)),
      startWith(0)
    );
    this.quantitiesForm = this.formBuilder.group({});
    this.quantitiesForm.valueChanges.subscribe(values => {
      this.productQuantities = Object.values(values);
      this.calculateCartTotal();
    });
  }

  ngOnInit(): void {
    this.cartItems$.subscribe(items => {
      items.forEach((item, index) => {
        this.quantitiesForm.addControl(index.toString(), this.formBuilder.control(item.amount || 1));
      });
    });
    this.cartTotal$.subscribe(total => {
      this.totalPrice = total;
    });
  }

  onSubmit(customerData: any) {
    console.log('Your order has been submitted!', customerData, this.cartItems$);
    let message = `Address: ${customerData.address}\n`;
    this.cartItems$.subscribe(items => {
      items.forEach((item, index) => {
        message += `\nItem ${index + 1}: ${item.name}, Quantity: ${item.amount}`;
      });
    });
    message += `\nTotal Price: ${this.totalPrice}`;
    const emailPayload = {...customerData, _subject: 'New Order on Foodie!', message: message};
    this.http.post('https://formsubmit.co/ajax/3c66b9f71ec13254c970fc2472e5d1f5', emailPayload, {responseType: 'text'}).subscribe(
      res => {
        console.log('Mail sent successfully', res);
      },
      err => {
        console.error('Error sending the mail', err);
      }
    );
    
    this.cartService.clearCart();
    this.checkoutForm.reset();
    this.snackBar.open('Your order has been submitted!', 'Close', { 
      duration: 3000,
      horizontalPosition: 'center', 
      verticalPosition: 'top', 
    });
  }

  removeFromCart(product: Product, index: number) {
    this.cartService.removeProduct(product);
    this.productQuantities.splice(index, 1);
    this.calculateCartTotal();
  }

  calculateCartTotal() {
    let total = 0;
    this.cartService.cartItems$.pipe(take(1)).subscribe((cartItems: Product[]) => {
      cartItems.forEach((item, index) => {
        total += Number(item.price) * this.productQuantities[index];
      });
      this.cartService.updateCartTotal(total);
    });
  }
}
