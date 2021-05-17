import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ModelManager} from '@adobe/aem-spa-page-model-manager';

import {AEMContainerComponent,AEMContainerComponentProperties, AEMResponsiveGridComponent,
  AEMResponsiveGridComponentProperties, LazyMapTo, MappedComponentProperties, MapTo} from '@adobe/aem-angular-editable-components';

import {isPlatformBrowser} from '@angular/common';

import {TabsV1Component} from '@adobe/aem-core-components-angular-spa/containers/tabs/v1';

import {TitleV2Component, TitleV2IsEmptyFn, TitleV2Model} from '@adobe/aem-core-components-angular-base/authoring/title/v2';
import {BreadCrumbV2IsEmptyFn} from '@adobe/aem-core-components-angular-base/layout/breadcrumb/v2';
import {TextV2Component, TextV2IsEmptyFn, TextV2Model} from '@adobe/aem-core-components-angular-base/authoring/text/v2';
import {NavigationV1Component, NavigationV1IsEmptyFn} from '@adobe/aem-core-components-angular-base/layout/navigation/v1';
import { ButtonV1IsEmptyFn} from '@adobe/aem-core-components-angular-base/authoring/button/v1';
import {ImageV2IsEmptyFn} from '@adobe/aem-core-components-angular-base/authoring/image/v2';

import {TeaserV1Component, TeaserV1IsEmptyFn} from '@adobe/aem-core-components-angular-base/authoring/teaser/v1';
import {DownloadV1IsEmptyFn} from '@adobe/aem-core-components-angular-base/authoring/download/v1';

import {ListV2IsEmptyFn} from '@adobe/aem-core-components-angular-base/authoring/list/v2';
import {SeparatorV1Component} from '@adobe/aem-core-components-angular-base/authoring/separator/v1';
import {ContainerV1Component} from '@adobe/aem-core-components-angular-spa/containers/container/v1';
import {AccordionV1Properties} from '@adobe/aem-core-components-angular-spa/containers/accordion/v1';
import {CarouselV1Properties} from '@adobe/aem-core-components-angular-spa/containers/carousel/v1';

@Component({
  selector: '#spa-root', // tslint:disable-line
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(@Inject(PLATFORM_ID) private _platformId: object) {

    if(isPlatformBrowser(_platformId)){

      // @ts-ignore
      if(window.initialModel){
        // @ts-ignore
        ModelManager.initialize({model:window.initialModel});
      }else{
        ModelManager.initialize();
      }

      ModelManager.initialize();

    }
  }

  ngOnInit(): void {

    // always need these components

    // strongly typed MapTo example with generics
    MapTo<AEMContainerComponentProperties>('private-base-site/components/demo/component')(AEMContainerComponent);
    MapTo<AEMContainerComponentProperties>('private-base-site/components/page/angular-spacomponents-page')(AEMContainerComponent);
    MapTo<AEMContainerComponentProperties>('private-base-site/components/tabs')(TabsV1Component);
    MapTo<AEMContainerComponentProperties>('private-base-site/components/container')(ContainerV1Component);
    MapTo<AEMResponsiveGridComponentProperties>('wcm/foundation/components/responsivegrid')(AEMResponsiveGridComponent);

    // loosely types MapTo without generic (editConfig type is `any`)
    MapTo('private-base-site/components/navigation')(NavigationV1Component, {isEmpty: NavigationV1IsEmptyFn});
    MapTo('private-base-site/components/teaser')(TeaserV1Component, {isEmpty: TeaserV1IsEmptyFn});
    MapTo('private-base-site/components/title')(TitleV2Component, {isEmpty: TitleV2IsEmptyFn});
    MapTo('private-base-site/components/text')(TextV2Component, {isEmpty: TextV2IsEmptyFn});
    MapTo('private-base-site/components/experience-fragment')(AEMContainerComponent, {isEmpty: (props) => !props.configured });
    MapTo('private-base-site/components/separator')(SeparatorV1Component);

    // lazy component mapping (loosely typed)
    LazyMapTo('private-base-site/components/download')
      (()=>import('@adobe/aem-core-components-angular-base/authoring/download/v1').then((m) => m.DownloadV1Component),
      {isEmpty: DownloadV1IsEmptyFn});

    LazyMapTo('private-base-site/components/languagenavigation')
      (()=>import('@adobe/aem-core-components-angular-base/layout/language-navigation/v1').then((m) => m.LanguageNavigationV1Component));

    LazyMapTo('private-base-site/components/list')(
      ()=>import('@adobe/aem-core-components-angular-base/authoring/list/v2').then((m) => m.ListV2Component),
      {isEmpty: ListV2IsEmptyFn});

    LazyMapTo('private-base-site/components/breadcrumb')(
      ()=>import('@adobe/aem-core-components-angular-base/layout/breadcrumb/v2').then((m) => m.BreadCrumbV2Component),
      {isEmpty: BreadCrumbV2IsEmptyFn});

    LazyMapTo('private-base-site/components/button')(
      ()=>import('@adobe/aem-core-components-angular-base/authoring/button/v1').then((m) => m.ButtonV1Component),
      {isEmpty: ButtonV1IsEmptyFn});

    LazyMapTo('private-base-site/components/image')(
      ()=>import('@adobe/aem-core-components-angular-base/authoring/image/v2').then((m) => m.ImageV2Component),
      {isEmpty: ImageV2IsEmptyFn});

    // strongly typed lazy component mapping with generic
    LazyMapTo<CarouselV1Properties>('private-base-site/components/carousel')(
      ()=>import('@adobe/aem-core-components-angular-spa/containers/carousel/v1').then((m) => m.CarouselV1Component));

    LazyMapTo<AccordionV1Properties>('private-base-site/components/accordion')(
      ()=>import('@adobe/aem-core-components-angular-spa/containers/accordion/v1').then((m) => m.AccordionV1Component));

  }
}
