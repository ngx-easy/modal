
import { NgModule, ModuleWithProviders, InjectionToken, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EasyModalComponent } from './easy-modal.component';
import { EasyModalService } from './easy-modal.service';
import { EasyModalInstanceService } from './easy-modal-instance.service';

/**
 * Guard to make sure we have single initialization of forRoot
 */
export const MODAL_DIALOG_FORROOT_GUARD = new InjectionToken<EasyModalModule>('MODAL_DIALOG_FORROOT_GUARD');

@NgModule({
    imports: [CommonModule],
    declarations: [EasyModalComponent],
    entryComponents: [EasyModalComponent],
    exports: [EasyModalComponent],
    providers: [EasyModalService],
})
export class EasyModalModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: EasyModalModule,
            providers: [
                {
                    provide: MODAL_DIALOG_FORROOT_GUARD,
                    useFactory: provideForRootGuard,
                    deps: [[EasyModalModule, new Optional(), new SkipSelf()]]
                },
                EasyModalInstanceService
            ]
        };
    }
}

export function provideForRootGuard(dialogModule: EasyModalModule): string {
    if (dialogModule) {
        throw new Error(
            `You should only import EasyModalModule.forRoot() once.`);
    }
    return 'provideForRootGuard';
}
