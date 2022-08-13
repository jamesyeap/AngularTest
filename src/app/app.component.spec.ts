import {
  TestBed,
  async,
  ComponentFixture,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;

    fixture.detectChanges();
    fixture.whenStable();
  }));

  it('should render a text box', () => {
    const textBoxDe: DebugElement = debugElement.query(By.css('textarea'));
    expect(textBoxDe).toBeTruthy();
  });

  it('should allow users to input text', async () => {
    const textBox: any = debugElement.query(By.css('textarea')).nativeElement;
    textBox.value = 'abcde';
    textBox.dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      expect(textBox.value).toEqual('abcde');
    });
  });
});
