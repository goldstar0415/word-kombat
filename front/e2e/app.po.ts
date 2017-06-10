import { browser, element, by } from 'protractor';

export class WordKombatPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('wk-root h1')).getText();
  }

  getApplicationLogo() {
    return element(by.css('wk-root .brand-logo > img')).getAttribute('src');
  }

  getFooterText() {
    return element(by.css('wk-root .page-footer > .copyrights')).getText();
  }

}
