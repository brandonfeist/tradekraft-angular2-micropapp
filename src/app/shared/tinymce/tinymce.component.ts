import {
  Component,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'tiny-mce',
  template: `<textarea id="{{elementId}}"></textarea>`
})
export class TinyMceComponent implements AfterViewInit, OnDestroy {
  @Input() elementId: String;
  @Input() initialContent: String;
  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table'],
      skin_url: '/assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
      init_instance_callback: (editor: any) => {
        editor && this.initialContent && this.editor.setContent(this.initialContent)
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}