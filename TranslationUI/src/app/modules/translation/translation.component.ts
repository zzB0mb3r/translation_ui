import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageCodes } from './models/language.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslationService } from './service/translation.service';
import { Subject } from 'rxjs';
import { Translation } from './models/translation.model';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent implements OnInit, OnDestroy {
  languages = LanguageCodes;
  translationForm: FormGroup;
  translatedText: string;

  private _unsubscribe = new Subject<void>();

  constructor(private fb: FormBuilder,
    private translationService: TranslationService) { }

  ngOnInit() {
    this.initForm();
  }

  isNumber(val: any): boolean {
    return !isNaN(val);
  }

  initForm() {
    this.translationForm = this.fb.group({
      originalLanguage: [LanguageCodes.English, Validators.required],
      originalText: ['', Validators.required],
      targetLanguage: [LanguageCodes.Italian, Validators.required]
    });
  }

  onSubmit() {
    if (this.translationForm.valid) {
      const formData = <Translation>this.translationForm.value;

      // Call the translation service
      this.translationService.translate(formData)
        .pipe(takeUntil(this._unsubscribe))
        .subscribe((response: Translation) => this.translatedText = response.targetText);
    }
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

}
