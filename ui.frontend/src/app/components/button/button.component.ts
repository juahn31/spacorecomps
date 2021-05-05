import { MapTo } from '@adobe/aem-angular-editable-components';
import {
  ButtonV1Component,
  ButtonV1IsEmptyFn
} from '@adobe/aem-core-components-angular-base/authoring/button/v1';

const ButtonEditConfig = {
  emptyLabel: 'Button',
  isEmpty: ButtonV1IsEmptyFn,
};

MapTo('private-base-site/components/button')(ButtonV1Component, ButtonEditConfig);

