import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticRowComponent } from './statistic-row.component';

describe('StatisticRowComponent', () => {
  let component: StatisticRowComponent;
  let fixture: ComponentFixture<StatisticRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
