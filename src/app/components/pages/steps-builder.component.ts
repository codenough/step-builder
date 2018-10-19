import { TemplateConfigService, IStepDto } from '../../services/template-config.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { DragulaService, DragulaOptions } from 'ng2-dragula';
import { Subject } from 'rxjs';
import { map, takeUntil, flatMap } from 'rxjs/operators';
import uuid4 from 'uuid4';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { IStep } from '../../services/template-config.service';
import { SettingsDialogComponent, IDialogData } from '../../shared/components/settings-dialog.component';



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'steps-builder',
  templateUrl: 'steps-builder.component.html',
  styleUrls: ['steps-builder.component.scss']
})

export class StepsBuilderComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();
  draggerContainerName = 'STEPS';
  templatesContainerId = uuid4();
  stepsContainerId = uuid4();
  code: string;
  dragAndDropOptions: DragulaOptions;

  steps: IStep[] = [];
  availableTemplates: IStepDto[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        takeUntil(this.ngUnsubscribe),
        map((data) => data.templates)
      )
      .subscribe((templates: IStepDto[]) => this.availableTemplates = templates);

    this.setDragulaOptions();
  }

  private setDragulaOptions(): void {
    this.dragAndDropOptions = {
      copy: (_el, source) => {
        return source.id === this.templatesContainerId;
      },
      copyItem: (item) => _.cloneDeep(item),
      accepts: (_el, target) => {
        return target.id !== this.templatesContainerId;
      }
    };
  }
}
