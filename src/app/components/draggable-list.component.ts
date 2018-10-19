import {
  Component,
  Input,
  OnDestroy,
  OnInit
  } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as _ from 'lodash';
import { DragulaOptions, DragulaService } from 'ng2-dragula';
import { Subject } from 'rxjs';
import { flatMap, map, takeUntil } from 'rxjs/operators';
import uuid4 from 'uuid4';

import { IStep, TemplateConfigService } from '../services/template-config.service';
import { IDialogData, SettingsDialogComponent } from '../shared/components/settings-dialog.component';
import { BaseStepsList } from './base-steps-list';

@Component({
  selector: 'draggable-list',
  templateUrl: 'draggable-list.component.html',
  styleUrls: ['draggable-list.component.scss']
})

export class DraggableListComponent extends BaseStepsList<IStep> implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  @Input() options: DragulaOptions;

  constructor(private dragulaService: DragulaService,
              private templateConfigService: TemplateConfigService,
              private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.dragulaService.createGroup(this.containerName, this.options);
    this.dragulaService.dropModel(this.containerName)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((args) => {
        const { targetModel, source, target, targetIndex, item, sourceIndex } = args;
        item.id = uuid4();
        const previouseTargetItem = targetModel[targetIndex - 1];
        const followingTargetItem = targetModel[targetIndex + 1];
        if (source.id === target.id ) {
          let previouseSourceItem;
          let followingSourceItem;
          if (targetIndex < sourceIndex) {
            previouseSourceItem = targetModel[sourceIndex];
            followingSourceItem = targetModel[sourceIndex + 1];
          } else {
            previouseSourceItem = targetModel[sourceIndex - 1];
            followingSourceItem = targetModel[sourceIndex];
          }
          this.updateChildren(previouseSourceItem, followingSourceItem && followingSourceItem.id);
          this.updateParentId(followingSourceItem, previouseSourceItem && previouseSourceItem.id);
        } else {
          item.parentId = '0';
          item.children = new Set<string>();
        }
        this.updateChildren(previouseTargetItem, item.id);
        this.updateParentId(followingTargetItem, item.id);
        this.updateChildren(item, followingTargetItem && followingTargetItem.id);
        this.updateParentId(item, previouseTargetItem && previouseTargetItem.id);
      });
  }

  addRandomStep(index: number): void {
    this.templateConfigService.getRandomTemlate()
      .pipe(
        map((template) => ({
          ...template,
          id: uuid4(),
          children: new Set<string>(),
          parentId: '0'
        }))
      )
      .subscribe((step) => {
        const previouseTargetItem = this.templates[index - 1];
        const followingTargetItem = this.templates[index + 1];
        this.updateChildren(previouseTargetItem, step.id);
        this.updateParentId(followingTargetItem, step.id);
        this.updateChildren(step, followingTargetItem && followingTargetItem.id);
        this.updateParentId(step, previouseTargetItem && previouseTargetItem.id);
        this.templates.splice(index + 1, 0, step);
      });
  }

  openSettings(id: string): void {
    this.templateConfigService.getYamlConfig(id)
      .pipe(
        flatMap((config) => {
          const data: IDialogData<string> = {
            value: config.yamlConfig,
            header: 'Yaml Settings',
            cancelButton: 'Close'
          };
          return this.dialog.open(SettingsDialogComponent, { width: '628px', data }).afterClosed();
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    if (!_.isUndefined(this.dragulaService.find(this.containerName))) {
      this.dragulaService.destroy(this.containerName);
    }
  }

  trackByFn(index: number, item: IStep): string {
    return item.typeId;
  }

  private updateParentId(item?: IStep, parentId?: string): void {
    if (item) {
      item.parentId = parentId || '0';
    }
  }

  private updateChildren(item?: IStep, childrenId?: string): void {
    if (item) {
      item.children.clear();
      if (childrenId) {
        item.children.add(childrenId);
      }
    }
  }
}
