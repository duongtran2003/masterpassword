import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRecordComponent } from './password-record.component';

describe('PasswordRecordComponent', () => {
  let component: PasswordRecordComponent;
  let fixture: ComponentFixture<PasswordRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordRecordComponent]
    });
    fixture = TestBed.createComponent(PasswordRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
