import { Component, OnInit } from '@angular/core';
import { MapTo } from '@adobe/aem-angular-editable-components';
import { AEMResponsiveGridComponent } from '@adobe/aem-angular-editable-components';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent extends AEMResponsiveGridComponent {

}

MapTo('private-base-site/components/column')(ColumnComponent);
