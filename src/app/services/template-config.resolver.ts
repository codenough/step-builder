import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { IStepDto, TemplateConfigService } from './template-config.service';


@Injectable()
export class TemplateConfigResolver implements Resolve<IStepDto[]> {
  constructor(private templateConfigService: TemplateConfigService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStepDto[]> {
    return this.templateConfigService.getProfileTemlates();
  }
}
