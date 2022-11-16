import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaixasFormsComponent } from './caixas-forms.component';

describe('CaixasFormsComponent', () => {
  let component: CaixasFormsComponent;
  let fixture: ComponentFixture<CaixasFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaixasFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaixasFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
