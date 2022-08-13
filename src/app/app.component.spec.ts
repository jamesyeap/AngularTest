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
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ReactiveFormsModule, MatIconModule, MatButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;

    fixture.detectChanges();
    fixture.whenStable();
  }));

  describe('text box is rendered correctly', () => {
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

  describe('formatting toolbar is rendered correctly', () => {
    it('should render a formatting toolbar', () => {
      const toolBarDe: DebugElement = debugElement.query(
        By.css('markdown-toolbar')
      );
      expect(toolBarDe).toBeTruthy();
    });

    it('should render all buttons in the formatting toolbar', () => {
      const toolBarDe: DebugElement = debugElement.query(
        By.css('markdown-toolbar')
      );

      expect(toolBarDe.query(By.css('md-bold'))).toBeTruthy();
      expect(toolBarDe.query(By.css('md-italic'))).toBeTruthy();
      expect(toolBarDe.query(By.css('md-header'))).toBeTruthy();
      expect(toolBarDe.query(By.css('md-quote'))).toBeTruthy();
      expect(toolBarDe.query(By.css('md-code'))).toBeTruthy();
      expect(toolBarDe.query(By.css('md-link'))).toBeTruthy();
      expect(toolBarDe.query(By.css('md-image'))).toBeTruthy();
      expect(toolBarDe.query(By.css('md-unordered-list'))).toBeTruthy();
      expect(toolBarDe.query(By.css('md-ordered-list'))).toBeTruthy();
      expect(toolBarDe.query(By.css('md-task-list'))).toBeTruthy();
      expect(toolBarDe.query(By.css('md-mention'))).toBeTruthy();
      expect(toolBarDe.query(By.css('md-ref'))).toBeTruthy();
    });
  });

  describe('all buttons in the formatting toolbar add the correct markups when text box is empty', () => {
    // key-value pair of button names and the formatting markups that they are supposed to
    // add to the text input box when clicked
    const buttonsToTest = {
      'md-bold': '****',
      'md-italic': '__',
      'md-header': '### ',
      'md-quote': '> ',
      'md-code': '``',
      'md-link': '[](url)',
      'md-image': '![](url)',
      'md-unordered-list': '- ',
      'md-ordered-list': '1. ',
      'md-task-list': `- [ ] `,
      'md-mention': '@',
      'md-ref': '#',
    };

    // simulate each button being clicked and check that the markups added to the text
    // input box are correct
    for (const [buttonName, expectedMarkup] of Object.entries(buttonsToTest)) {
      it(`should add correct markups when the ${buttonName} button is pressed`, async () => {
        const toolbarDe: DebugElement = debugElement.query(
          By.css('markdown-toolbar')
        );
        const buttonDe: any = toolbarDe.query(By.css(buttonName));
        buttonDe.nativeElement.click();

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const textBox: any = debugElement.query(
            By.css('textArea')
          ).nativeElement;

          expect(textBox.value).toEqual(expectedMarkup);
        });
      });
    }
  });

  describe('all buttons in the formatting toolbar add the correct markups when some text is highlighted', () => {
    const highlightedText = 'abc';
    const highlightedTextStartPosition = 0;
    const highlightedTextEndPosition = 3;

    // key-value pair of button names and the formatting markups that they are supposed to
    // add to the text input box when clicked
    const buttonsToTest = {
      'md-bold': `**${highlightedText}**`,
      'md-italic': `_${highlightedText}_`,
      'md-header': `### ${highlightedText}`,
      'md-quote': `> ${highlightedText}`,
      'md-code': `\`${highlightedText}\``,
      'md-link': `[${highlightedText}](url)`,
      'md-image': `![${highlightedText}](url)`,
      'md-unordered-list': `- ${highlightedText}`,
      'md-ordered-list': `1. ${highlightedText}`,
      'md-task-list': `- [ ] ${highlightedText}`,
      'md-mention': `@${highlightedText}`,
      'md-ref': `#${highlightedText}`,
    };

    // simulate each button being clicked and check that the markups added to the text
    // input box are correct
    for (const [buttonName, expectedMarkup] of Object.entries(buttonsToTest)) {
      it(`should add correct markups when the ${buttonName} button is pressed`, async () => {
        const textBoxDe: DebugElement = debugElement.query(By.css('textArea'));
        const toolbarDe: DebugElement = debugElement.query(
          By.css('markdown-toolbar')
        );
        const buttonDe: any = toolbarDe.query(By.css(buttonName));

        textBoxDe.nativeElement.value = highlightedText;
        textBoxDe.nativeElement.dispatchEvent(new Event('input'));

        textBoxDe.nativeElement.selectionStart = highlightedTextStartPosition;
        textBoxDe.nativeElement.selectionEnd = highlightedTextEndPosition;

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          console.log(
            textBoxDe.nativeElement.value.substring(
              textBoxDe.nativeElement.selectionStart,
              textBoxDe.nativeElement.selectionEnd
            )
          );
        });

        buttonDe.nativeElement.click();

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(textBoxDe.nativeElement.value).toEqual(expectedMarkup);
        });
      });
    }
  });
});
