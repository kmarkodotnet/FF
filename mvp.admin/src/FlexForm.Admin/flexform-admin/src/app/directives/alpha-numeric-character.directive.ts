import { Directive, HostListener, ElementRef, Input } from '@angular/core';
@Directive({
    selector: '[alphaNumericCharacter]'
})
export class AlphaNumericCharacterDirective {

    //https://stackoverflow.com/questions/54199905/how-to-remove-whitespace-and-special-characters-in-mat-input-using-regex
    //https://stackoverflow.com/questions/51428526/how-to-restrict-special-character-in-material-input

    regexStr = '^[a-zA-Z0-9_]*$';
    @Input() isAlphaNumeric: boolean;
  
    constructor(private el: ElementRef) { }
  
  
    @HostListener('keypress', ['$event']) onKeyPress(event) {
      return new RegExp(this.regexStr).test(event.key);
    }
  
    @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
      this.validateFields(event);
    }
  
    validateFields(event) {
      setTimeout(() => {
  
        this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z ]/g, '').replace(/\s/g, '');
        event.preventDefault();
  
      }, 100)
    }
  
  }