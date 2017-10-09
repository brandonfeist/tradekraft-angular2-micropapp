import { TradekraftAngular2MicroappPage } from './app.po';

describe('tradekraft-angular2-microapp App', function() {
  let page: TradekraftAngular2MicroappPage;

  beforeEach(() => {
    page = new TradekraftAngular2MicroappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
