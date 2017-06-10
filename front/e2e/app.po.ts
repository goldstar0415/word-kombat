import { browser, element, by } from 'protractor';

export class WordKombatPage {

  navigateToChat() {
    element(by.css('wk-navigation > nav > ul.navigation-tabs.right > li:nth-child(1) > a')).click();
  }

  navigateToAccount() {
    element(by.css('wk-navigation > nav > ul.navigation-tabs.right > li:nth-child(2) > a')).click();
  }

  navigateToLeaderboards() {
    element(by.css('wk-navigation > nav > ul.navigation-tabs.right > li:nth-child(3) > a')).click();
  }

  getAppLogo() {
    return element(by.css('body > wk-root > wk-navigation > nav > a > img'));
  }

}
