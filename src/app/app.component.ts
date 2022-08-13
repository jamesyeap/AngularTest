import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import '@github/markdown-toolbar-element';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  value = 0;
  message!: string;

  commentForm: FormGroup;

  constructor() {
    const textValue: FormControl = new FormControl('');
    this.commentForm = new FormGroup({ textValue });
  }
}
