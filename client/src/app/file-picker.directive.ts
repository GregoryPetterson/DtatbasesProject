/* eslint-disable no-underscore-dangle */
import {
  Directive,
  HostListener,
  Output,
  OnDestroy,
  EventEmitter,
  Optional,
  Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
  selector: '[appFilePicker]',
  exportAs: 'appFilePicker',
})
export class FilePickerDirective implements OnDestroy {

  /**
   * File list emitted on change.
   * **/
  @Output()
  filesChanged = new EventEmitter<FileList>();
  /**
   * File list emitted on change.
   * **/
  @Output()
  filesReset = new EventEmitter();

  private _form: HTMLFormElement;

  private _nativeFileElement: HTMLInputElement;

  constructor(
    @Optional() @Inject(DOCUMENT) private _document: Document,
  ) {
    if (this._document) {
      this._form = this._document.createElement('form');
      this._nativeFileElement = this._document.createElement('input');
      this._nativeFileElement.type = 'file';
      this._nativeFileElement.multiple = true;
      this._nativeFileElement.addEventListener('change', this._onFilesChanged);
      this._form.appendChild(this._nativeFileElement);
    }
  }

  /**
   * Native input[type=file] element.
   **/
  get nativeFileElement() {
    return this._nativeFileElement;
  }
    /**
     * Selected Files
     **/
    get files(): FileList | undefined {
      return this._nativeFileElement.files;
    }


  /**
   * Invoke file browse on click.
   **/
  @HostListener('click', ['$event'])
  _onClick(event: Event) {
    event.preventDefault();
    this._nativeFileElement.click();
  }

  ngOnDestroy() {
    this._nativeFileElement.removeEventListener('change', this._onFilesChanged);
    this._nativeFileElement.remove();
    this._form.remove();
  }

  /**
   * Reset file list.
   **/
  reset() {
    this._form.reset();
    this.filesReset.emit();
  }

    /**
     * Native input[type=file] element.
     **/

    private _onFilesChanged = () => {
      this.filesChanged.emit(this._nativeFileElement.files);
    };

}
