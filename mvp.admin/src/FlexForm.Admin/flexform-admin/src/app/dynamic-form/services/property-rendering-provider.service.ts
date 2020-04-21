import { Injectable } from '@angular/core';
import { BaseProperty } from '../../models/properties/base-property.model';
import { LabelTextPropertyRendererService } from './label-text-property-renderer.service';
import { PropertyRendererInterface } from '../models/interfaces/property-renderer.interface';
import { HeaderPropertyRendererService } from './header-property-renderer.service';
import { FormNameVisiblePropertyRendererService } from './form-name-visible-property-renderer.service';
import { IsRootFormPropertyRendererService } from './is-root-form-property-renderer.service';
import { LabelHorizontalPositionPropertyRendererService } from './label-horizontal-position-property-renderer.service';
import { InputTextPropertyRendererService } from './input-text-property-renderer.service';
import { UrlPropertyRendererService } from './url-property-renderer.service';
import { BaseUrlPropertyRendererService } from './base-url-property-renderer.service';
import { PictureNamePropertyRendererService } from './picture-name-property-renderer.service';
import { RootFormSavePropertyRendererService } from './root-form-save-property-renderer.service';
import { RootFormCancelPropertyRendererService } from './root-form-cancel-property-renderer.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyRenderingProviderService {
  
  uiProperties:BaseProperty<any>[]

  constructor(private labelTextPropertyRendererService:LabelTextPropertyRendererService,
    private headerPropertyRendererService:HeaderPropertyRendererService,
    private formNameVisiblePropertyRendererService:FormNameVisiblePropertyRendererService,
    private isRootFormPropertyRendererService:IsRootFormPropertyRendererService,
    private labelHorizontalPositionPropertyRendererService:LabelHorizontalPositionPropertyRendererService,
    private inputTextPropertyRendererService:InputTextPropertyRendererService,
    private urlPropertyRendererService:UrlPropertyRendererService,
    private baseUrlPropertyRendererService:BaseUrlPropertyRendererService,
    private pictureNamePropertyRendererService:PictureNamePropertyRendererService,
    private rootFormSavePropertyRendererService:RootFormSavePropertyRendererService,
    private rootFormCancelPropertyRendererService:RootFormCancelPropertyRendererService
    ) { }

  setUiProperties(uiProperties:BaseProperty<any>[]):void{
    this.uiProperties = uiProperties;
  }

  get labelText():PropertyRendererInterface{
    return this.labelTextPropertyRendererService;
  }
  
  get title():PropertyRendererInterface{
    return this.headerPropertyRendererService;
  }

  get formNameVisible():PropertyRendererInterface{
    return this.formNameVisiblePropertyRendererService;
  }

  get isRootForm():PropertyRendererInterface{
    return this.isRootFormPropertyRendererService;
  }
  
  get rootFormSave():PropertyRendererInterface{
    return this.rootFormSavePropertyRendererService;
  }
  
  get rootFormCancel():PropertyRendererInterface{
    return this.rootFormCancelPropertyRendererService;
  }

  get labelHPos():PropertyRendererInterface{
    return this.labelHorizontalPositionPropertyRendererService;
  }
  
  get inputText():PropertyRendererInterface{
    return this.inputTextPropertyRendererService;
  }

  get url():PropertyRendererInterface{
    return this.urlPropertyRendererService;
  }
  
  get baseUrl():PropertyRendererInterface{
    return this.baseUrlPropertyRendererService;
  }
  
  get pictureName():PropertyRendererInterface{
    return this.pictureNamePropertyRendererService;
  }
}
