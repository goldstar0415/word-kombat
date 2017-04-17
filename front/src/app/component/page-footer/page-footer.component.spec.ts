import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PageFooterComponent } from './page-footer.component';

describe('PageFooterComponent', () => {
  let pageFooterComponent: PageFooterComponent;
  let pageFooterFixture: ComponentFixture<PageFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageFooterComponent ]
    })
    .compileComponents().then(() => {
      pageFooterFixture = TestBed.createComponent(PageFooterComponent);
      pageFooterComponent = pageFooterFixture.componentInstance; 
    });
  }));

  it('should create page footer component', () => {
    const pageFooter = pageFooterFixture.debugElement.componentInstance;
    expect(pageFooter).toBeTruthy();
  });

  it('should contain copyrights text contents', async(() => {
    const copyrights = pageFooterFixture.debugElement.query(By.css('.page-footer > .copyrights'));
    const copyrightsText = copyrights.nativeElement.textContent;
    expect(copyrightsText).toContain("Copyrights");
    expect(copyrightsText).toContain("2017");
    expect(copyrightsText).toContain("Saka7");
  }));
  
});
