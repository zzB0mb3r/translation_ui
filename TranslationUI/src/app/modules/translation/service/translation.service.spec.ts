import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslationService } from './translation.service';
import { environment } from 'src/environments/environment';
import { Translation } from '../models/translation.model';
import { LanguageCodes } from '../models/language.enum';

describe('TranslationService', () => {
  let service: TranslationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TranslationService]
    });

    service = TestBed.inject(TranslationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a POST request to the translation service', () => {
    const testData: Translation = {
      originalLanguage: LanguageCodes.English,
      originalText: 'Hello',
      targetLanguage: LanguageCodes.Spanish,
      targetText: 'Hola'
    };

    service.translate(testData).subscribe(response => {
      expect(response).toEqual(testData);
    });

    const req = httpTestingController.expectOne(`${environment.translateServiceUri}/translation/translate`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(testData);

    req.flush(testData);  // Simulate a successful response
  });
});
