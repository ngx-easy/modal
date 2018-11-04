import { ComponentRef, EventEmitter } from '@angular/core';
import { EasyModalComponent } from './easy-modal.component';

export class EasyModalInstanceService {

  public closeRequest: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Used to make sure there is exactly one instance of Modal
   */
  private _componentRef: ComponentRef<EasyModalComponent>;

  /**
   * Closes existing modal dialog
   */
  destroy() {
    if (this._componentRef) {
      this._componentRef.destroy();
      this._componentRef = null;
    }
  }

  /**
   * Save component ref destroy
   * @param componentRef
   */
  setComponentRef(componentRef: ComponentRef<EasyModalComponent>) {
    this._componentRef = componentRef;
  }
}
