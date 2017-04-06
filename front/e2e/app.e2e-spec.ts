import { WordKombatPage } from './app.po';

describe('word-kombat App', () => {
  let page: WordKombatPage;

  beforeEach(() => {
    page = new WordKombatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('wk works!');
  });
});
