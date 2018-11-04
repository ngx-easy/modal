import { Component, TemplateRef, ViewEncapsulation, OnDestroy } from '@angular/core';
import { EasyModalInstanceService } from './easy-modal-instance.service';

@Component({
  selector: 'ez-modal',
  templateUrl: './easy-modal.component.html',
  styleUrls: ['./easy-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EasyModalComponent {

  public template: TemplateRef<any>;

  constructor(
    private easyModalInstanceService: EasyModalInstanceService
  ) { }

  overlayClicked() {
    this.easyModalInstanceService.closeRequest.emit();
  }
}
