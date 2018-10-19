import { Component, Input } from '@angular/core';

import { IStep, IStepDto } from '../services/template-config.service';
import { BaseStepsList } from './base-steps-list';


@Component({
  selector: 'template-list',
  templateUrl: 'template-list.component.html',
  styleUrls: ['template-list.component.scss']
})

export class TemplateListComponent extends BaseStepsList<IStepDto> {
  trackByFn(index: number, item: IStep): string {
    return item.typeId;
  }
}
