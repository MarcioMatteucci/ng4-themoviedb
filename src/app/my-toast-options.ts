import { ToastModule, ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';

export class MyToastOptions extends ToastOptions {
   animate = 'fade';
   toastLife = 4000;
   positionClass = 'toast-bottom-right';
 }
