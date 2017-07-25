describe('testing playing with json responses', () => {
  it('should be able to verify content returned by mocked json response', () => {
    cy
    .server()
    .route('GET', /phones/, 'fixture:testing.json')
    .visit('http://localhost:8000')
    .get('.phones').should('contain', 'TESTING!!!');
  })
  it('should be able to verify content returned in genuine json response', () => {
    cy
      .visit('http://localhost:8000')
      .get('.phones').should('contain', 'Experience the future with Motorola XOOM with Wi-Fi, the world\'s first tablet powered by Android 3.0 (Honeycomb).')
  })
  it('should be able to verify multiple elements returned by mocked json response', () => {
    cy
    .server()
    .route('GET', /phones/, 'fixture:twophones.json')
    .visit('http://localhost:8000')
    .get('.phones').should('contain', 'Made Up Phone')
    .get('.phones').should('contain', 'Nokia 3210')
    .get('.phones').children('li.thumbnail.phone-list-item.ng-scope');
  })
  it('should display and empty phone list when an empty stubbed response is returned', () => {
    cy
    .server()
    .route('GET', /phones/, [])
    .visit('http://localhost:8000')
    .get('.phones').children('li.thumbnail.phone-list-item.ng-scope').should('not.exist');
  })
})
