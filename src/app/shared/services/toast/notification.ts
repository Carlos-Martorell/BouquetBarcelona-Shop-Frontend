
import { Injectable } from '@angular/core';
import { toast } from 'ngx-sonner'; 

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  showSuccess(message: string) {

    toast.success(message);
  }

  showError(message: string) {

    toast.error(message);
  }

  showInfo(message: string) {

    toast.info(message);
  }

}
