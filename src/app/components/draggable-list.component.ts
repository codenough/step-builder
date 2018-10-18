import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { DragulaService } from 'ng2-dragula';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import uuid4 from 'uuid4';

import { IStep } from '../services/template-config.service';



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'draggable-list',
  templateUrl: 'draggable-list.component.html',
  styleUrls: ['draggable-list.component.scss']
})

export class DraggableListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  draggerContainerName = 'STEPS';

  newConfig: IStep[] = [];

  steps: IStep[] = [];

  constructor(private dragulaService: DragulaService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        takeUntil(this.ngUnsubscribe),
        map((data) => data.configTemplates))
      .subscribe((config) => this.steps = config);

    this.dragulaService.createGroup(this.draggerContainerName, {
      copy: (_el, source) => {
        return source.id === 'right';
      },
      copyItem: (item) => _.cloneDeep(item),
      accepts: (_el, target, _source, _sibling) => {
        // To avoid dragging from right to left container
        return target.id !== 'right';
      }
    });

    this.dragulaService.dropModel(this.draggerContainerName)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((args) => {
        const { targetModel, source, target, targetIndex, item, sourceIndex, sourceModel } = args;
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
        }
        this.updateChildren(previouseTargetItem, item.id);
        this.updateParentId(followingTargetItem, item.id);
        this.updateChildren(item, followingTargetItem && followingTargetItem.id);
        this.updateParentId(item, previouseTargetItem && previouseTargetItem.id);
      });
  }

  trackByItemIdFn(index: number, item: IStep): string {
    return item.id;
  }

  trackByItemTypeIdFn(index: number, item: IStep): string {
    return item.typeId;
  }

  addRandomStep(index: number): void {
    const randomIndex = _.random(0, this.steps.length - 1);
    const randomStep = this.steps[randomIndex];
    randomStep.id = uuid4();
    const previouseTargetItem = this.newConfig[index - 1];
    const followingTargetItem = this.newConfig[index + 1];
    this.updateChildren(previouseTargetItem, randomStep.id);
    this.updateParentId(followingTargetItem, randomStep.id);
    this.updateChildren(randomStep, followingTargetItem && followingTargetItem.id);
    this.updateParentId(randomStep, previouseTargetItem && previouseTargetItem.id);
    this.newConfig.splice(index + 1, 0, randomStep);
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

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    if (!_.isUndefined(this.dragulaService.find(this.draggerContainerName))) {
      this.dragulaService.destroy(this.draggerContainerName);
    }
  }
}
