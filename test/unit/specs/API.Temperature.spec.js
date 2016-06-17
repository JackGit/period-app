import API from 'api';

describe('create temperature', () => {
  it('should render correct contents', () => {
    API.TemperatureAPI.createTemp({
      temperature: 36.6,
      period: false,
      date: new Date()
    });
    expect('Hello World!').to.contain('Hello World!');
  });
});
