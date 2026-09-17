import { NamePipe } from './name.pipe';

fdescribe('NamePipe Test suite', () => {

  it('create an instance', () => {
    const pipe = new NamePipe();
    expect(pipe).toBeTruthy();
  });

});
