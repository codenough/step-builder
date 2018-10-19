import { Component, Input } from '@angular/core';

import { IStep, IStepDto } from '../services/template-config.service';

@Component({
  selector: 'template-list',
  templateUrl: 'template-list.component.html',
  styleUrls: ['template-list.component.scss']
})

export class TemplateListComponent {
  @Input() templates: IStepDto[];
  @Input() containerName: string;
  @Input() containerId: string;

  trackByItemTypeIdFn(index: number, item: IStep): string {
    return item.typeId;
  }
}
