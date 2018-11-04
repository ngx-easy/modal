import {
  Injectable, ComponentFactoryResolver, ApplicationRef, Inject,
  Injector, EmbeddedViewRef, TemplateRef, ComponentRef, OnDestroy, EventEmitter
} from '@angular/core';
import { EasyModalComponent } from './easy-modal.component';
import { EasyModalInstanceService } from './easy-modal-instance.service';
import { Subscription } from 'rxjs';

@Injectable()
export class EasyModalService implements OnDestroy {

  public closeRequest: EventEmitter<void>;

  constructor(
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    @Inject(EasyModalInstanceService) private easyModalInstanceService: EasyModalInstanceService
  ) {
    this.closeRequest = this.easyModalInstanceService.closeRequest;
  }

  ngOnDestroy() {
    this.easyModalInstanceService.destroy();
  }

  open(template: TemplateRef<any>) {
    this.easyModalInstanceService.destroy();

    const componentRef: ComponentRef<EasyModalComponent> =
      this.cfr
        .resolveComponentFactory(EasyModalComponent)
        .create(this.injector);

    this.easyModalInstanceService.setComponentRef(componentRef);

    const instance: EasyModalComponent = componentRef.instance as EasyModalComponent;
    instance.template = template;

    this.appRef.attachView(componentRef.hostView);

    const hostRef = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(hostRef);
  }

  close() {
    this.easyModalInstanceService.destroy();
  }
}
