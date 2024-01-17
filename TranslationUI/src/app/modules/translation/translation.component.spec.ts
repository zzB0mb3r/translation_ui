import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslationComponent } from './translation.component';
import { TranslationService } from './service/translation.service';
import { of } from 'rxjs';
import { Translation } from './models/translation.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('TranslationComponent', () => {
  let component: TranslationComponent;
  let fixture: ComponentFixture<TranslationComponent>;
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TranslationService', ['translate']);

    TestBed.configureTestingModule({
      declarations: [TranslationComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: TranslationService, useValue: spy }
      ]
    });

    fixture = TestBed.createComponent(TranslationComponent);
    component = fixture.componentInstance;
    translationServiceSpy = TestBed.inject(TranslationService) as jasmine.SpyObj<TranslationService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    component.ngOnInit();
    expect(component.translationForm).toBeDefined();
  });

  it('should call translation service on form submission', () => {
    const translationData = <Translation>{
      originalLanguage: 'en',
      originalText: 'Hello',
      targetLanguage: 'es'
    };
  
    component.initForm();
    component.translationForm.setValue(translationData);
  
    translationServiceSpy.translate.and.returnValue(of(<Translation>{ targetText: 'Hola' }));
  
    component.onSubmit();
  
    expect(translationServiceSpy.translate).toHaveBeenCalledWith(translationData);
  
    expect(component.translatedText).toEqual('Hola');
  });

  it('should check if the value is a number', () => {
    expect(component.isNumber(42)).toBe(true);
    expect(component.isNumber('Hello')).toBe(false);
  });

  it('should unsubscribe on component destroy', () => {
    spyOn(component['_unsubscribe'], 'next');
    spyOn(component['_unsubscribe'], 'complete');

    component.ngOnDestroy();

    expect(component['_unsubscribe'].next).toHaveBeenCalled();
    expect(component['_unsubscribe'].complete).toHaveBeenCalled();
  });
});
