/* eslint-disable no-underscore-dangle */
import {
  Directive,
  HostListener,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
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
export class FilePickerDirective implements OnDestroy, OnChanges {

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

  private _multiple = false;

  constructor(
    @Optional() @Inject(DOCUMENT) private document: Document,
  ) {
    if (this.document) {
      this._form = this.document.createElement('form');
      this._nativeFileElement = this.document.createElement('input');
      this._nativeFileElement.type = 'file';
      this._nativeFileElement.multiple = this._multiple;
      this._nativeFileElement.addEventListener('change', this.onFilesChanged);
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
       * Allow _multiple file selection. Defaults to `false`.
       * **/
    get multiple() {
      return this._multiple;
    }
    @Input()
    set multiple(val: boolean) {
      this._multiple = coerceBooleanProperty(val);
    }


  /**
   * Prevent dragover event so drop events register.
   **/
  @HostListener('dragover', ['$event'])
  _onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  /**
   * Set files on drop.
   * Emit selected files.
   **/
  @HostListener('drop', ['$event'])
  _drop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this._nativeFileElement.files = files;
    this.onFilesChanged();
  }

  /**
   * Invoke file browse on click.
   **/
  @HostListener('click', ['$event'])
  _onClick(event: Event) {
    event.preventDefault();
    this._nativeFileElement.click();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes._multiple) {
      this._nativeFileElement.multiple = this._multiple;
    }
  }

  ngOnDestroy() {
    this._nativeFileElement.removeEventListener('change', this.onFilesChanged);
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

    private onFilesChanged = () => {
      this.filesChanged.emit(this._nativeFileElement.files);
    };

}
