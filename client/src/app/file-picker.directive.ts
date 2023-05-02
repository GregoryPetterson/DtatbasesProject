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

@Directive({
  selector: '[appFilePicker]',
  exportAs: 'appFilePicker'
})
export class FilePickerDirective implements OnDestroy {
  @Output() filesChanged = new EventEmitter<FileList>();
  @Output() filesReset = new EventEmitter<void>();

  private form: HTMLFormElement;
  private nativeFileElement: HTMLInputElement;

  constructor(@Optional() @Inject(DOCUMENT) private document: Document) {
    if (this.document) {
      this.form = this.document.createElement('form');
      this.nativeFileElement = this.document.createElement('input');
      this.nativeFileElement.type = 'file';
      this.nativeFileElement.multiple = true;
      this.nativeFileElement.addEventListener('change', this.onFilesChanged);
      this.form.appendChild(this.nativeFileElement);
    }
  }

  get files(): FileList | undefined {
    return this.nativeFileElement.files;
  }

  get nativeElement(): HTMLInputElement {
    return this.nativeFileElement;
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.preventDefault();
    this.nativeFileElement.click();
  }

  ngOnDestroy() {
    this.nativeFileElement.removeEventListener('change', this.onFilesChanged);
    this.nativeFileElement.remove();
    this.form.remove();
  }

  reset() {
    this.form.reset();
    this.filesReset.emit();
  }

  private onFilesChanged = () => {
    this.filesChanged.emit(this.nativeFileElement.files);
  };
}
