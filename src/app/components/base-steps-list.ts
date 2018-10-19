import { Input } from '@angular/core';

export abstract class BaseStepsList<TItem> {
  @Input() templates: TItem[];
  @Input() containerName: string;
  @Input() containerId: string;

  abstract trackByFn(index: number, item: TItem);
}
