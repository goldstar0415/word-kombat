import { browser } from 'protractor';
import { WordKombatPage } from './app.po';

describe('word-kombat App', () => {
  let page: WordKombatPage;

  beforeEach(() => {
    browser.ignoreSynchronization = true;
    page = new WordKombatPage();
  });

  xit('should navigate to chat route', () => {
    page.navigateToChat()
    expect(browser.getCurrentUrl()).toContain("chat");
  });

  xit('should navigate to leaderboards route', () => {
    page.navigateToLeaderboards();
    expect(browser.getCurrentUrl()).toContain("leaderboards");
  });

  xit('should be redirected to signin route', () => {
    page.navigateToAccount();
    expect(browser.getCurrentUrl()).toContain("signin");
  });

  it('should get app logo', () => {
    let logo = page.getAppLogo();
    expect(logo).toBeDefined();
  });

});
