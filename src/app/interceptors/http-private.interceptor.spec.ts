import { TestBed } from '@angular/core/testing';

import { HttpPrivateInterceptor } from './http-private.interceptor';

describe('HttpPrivateInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpPrivateInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpPrivateInterceptor = TestBed.inject(HttpPrivateInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
