import { WordKombatPage } from './app.po';

describe('word-kombat App', () => {
  let page: WordKombatPage;

  beforeEach(() => {
    page = new WordKombatPage();
  });

  it('should contain application logo', () => {
    page.navigateTo();
    expect(page.getApplicationLogo()).toBeDefined();
  });
});
