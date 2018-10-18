import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { IStep, TemplateConfigService } from './template-config.service';

@Injectable()
export class TemplateConfigResolver implements Resolve<IStep[]> {
  constructor(private templateConfigService: TemplateConfigService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStep[]> {
    return this.templateConfigService.getProfileTemlates().pipe(delay(500));
  }
}
