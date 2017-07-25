describe('SPEED TESTS', () => {
    it('should load the each page of the website in under an allowable timeframe', () => {
        cy.visit('https://www-staging.red-badger.com').then(function() {
            var snapshotOne = Date.now();
            var homepageLoadTime = snapshotOne - performance.timing.navigationStart;
            expect(homepageLoadTime).to.be.below('3000')
            cy.get('.style__mediumScreenNav___ubAcF > li:nth-child(1) > a:nth-child(1)').click()
                .then(function() {
                    var snapshotTwo = new Date().getTime()
                    var whatWeDoLoadTime = (snapshotTwo - performance.timing.navigationStart) - homepageLoadTime;
                    expect(whatWeDoLoadTime).to.be.below('1000');
                    cy.get('.style__mediumScreenNav___ubAcF > li:nth-child(2) > a:nth-child(1)').click()
                        .then(function() {
                            var snapshotThree = new Date().getTime()
                            var aboutUsLoadTime = (snapshotThree - performance.timing.navigationStart) - (homepageLoadTime + whatWeDoLoadTime);
                            expect(aboutUsLoadTime).to.be.below('1000');
                            cy.get('.style__mediumScreenNav___ubAcF > li:nth-child(4) > a:nth-child(1)').click()
                                .then(function() {
                                    var snapshotFour = new Date().getTime()
                                    var eventsLoadTime = (snapshotFour - performance.timing.navigationStart) - (homepageLoadTime + whatWeDoLoadTime + aboutUsLoadTime);
                                    expect(eventsLoadTime).to.be.below('1000');
                                    cy.get('.style__mediumScreenNav___ubAcF > li:nth-child(3) > a:nth-child(1)').click()
                                        .then(function() {
                                            var snapshotFive = new Date().getTime()
                                            var blogLoadTime = (snapshotFive - performance.timing.navigationStart) - (homepageLoadTime + whatWeDoLoadTime + aboutUsLoadTime + eventsLoadTime);
                                            expect(blogLoadTime).to.be.below('5000');
                                          })
                                    })
                        })
                })
        })
    })
})

describe('NAVIGATION TESTS', () => {
    describe('basic navigation to the site', function() {
        beforeEach(function() {
            cy.visit('https://www-staging.red-badger.com');
        })
        it('should load the Red Badger Homepage', () => {
            cy.title().should('include', 'Home | Red Badger');
        })
        it('should load the What we do page when nav option is clicked', () => {
            cy.get('.style__mediumScreenNav___ubAcF > li:nth-child(1) > a:nth-child(1)').click();
            cy.title().should('include', 'What we do | Red Badger');
        })
        it('should load the About us page when nav option is clicked', () => {
            cy.get('.style__mediumScreenNav___ubAcF > li:nth-child(2) > a:nth-child(1)').click();
            cy.title().should('include', 'About us | Red Badger');
        })
        it('should load the Blog page when nav option is clicked', () => {
            cy.get('.style__mediumScreenNav___ubAcF > li:nth-child(3) > a:nth-child(1)').click();
            cy.title().should('include', 'Red Badger Blog');
        })
        it('should load the Events page when nav option is clicked', () => {
            cy.get('.style__mediumScreenNav___ubAcF > li:nth-child(4) > a:nth-child(1)').click();
            cy.title().should('include', 'Events | Red Badger');
        })
    })
})

describe('HOMEPAGE TESTS', () => {
    describe('checking placeholders in contact us slice', () => {
        before(() => {
            cy.visit('https://www-staging.red-badger.com');
        })
        it('should contain the correct placeholder in the message box', () => {
            cy.get('#contactUsMessage').should('have.attr', 'placeholder', 'Your problem in a nutshell');
        })
        it('should contain the correct placeholder in the email box', () => {
            cy.get('#contactEmail').should('have.attr', 'placeholder', 'name@example.com');
        })
    })

    describe('contact us box functionality', () => {
        before(() => {
            cy.visit('https://www-staging.red-badger.com');
        })
        it('should validate against empty fields with the appropriate error messages', () => {
            cy.get('#contactUs')
                // validate error text is not present by default
                .should('not.contain', 'How can we help? Let us know in the box below.')
                .should('not.contain', 'Please let us know your email address.');
            cy.get('.style__button___2QKU_').click();
            cy.get('#contactUs')
                // validate error text is present
                .should('contain', 'How can we help? Let us know in the box below.')
                .should('contain', 'Please let us know your email address.')
        })

        it('should have input fields that can be edited and deleted', function() {
            // type text into both fields and validate the input
            cy
                .get('#contactUsMessage').type('Text to be cleared')
                .should('have.value', 'Text to be cleared')
                .clear()
                //clear the fields and validate that the placeholder is present again
                .should('have.value', '')
                .should('have.attr', 'placeholder', 'Your problem in a nutshell');
            cy
                .get('#contactEmail').type('fake@email.com')
                .should('have.value', 'fake@email.com')
                .clear()
                .should('have.value', '')
                .should('have.attr', 'placeholder', 'name@example.com');
        })
    })

    describe('newsletter signup functionality', () => {
        before(() => {
            cy.visit('https://www-staging.red-badger.com');
        })
        it('should validate against an empty form when submitting the newsletter sign up', () => {

            cy.get('.style__newsletter___3I1RJ')
                .should('not.contain', 'Please enter an email address')
            cy.get('.style__submitButton___Ud1j6').click();
            cy.get('.style__newsletter___3I1RJ')
                .should('contain', 'Please enter an email address');
        })
    })


    describe('checking each slice of the homepage for expected content in desktop viewport', () => {
        before(() => {
            cy.visit('https://www-staging.red-badger.com');
        })
        it('should contain the expected blurb in the top slice', () => {
            cy.get('.style__homepageTopSlice___NSsaZ').should('contain', 'We work with you to deliver digital products that make a difference to people.')
        })
        it('should contain the Fortnam and Mason case study snippet', () => {
            cy.get('.style__figuresContainer___3tHrD').should('contain', 'Number of awards for the new online store');
        })
        it('should contain the Camden Market case study snippet', () => {
            cy.get('.style__figuresContainer___3tHrD').should('contain', 'Drop in bounce rate within 4 days of launch');
            cy.get('a.style__figureLink___PvJm0:nth-child(2) > img:nth-child(4)').should('have.attr', 'alt', 'The logo of Camden Market');
        })
        it('should contain the Sky case study snippet', () => {
            cy.get('.style__figuresContainer___3tHrD').should('contain', "Drop in customers pushing the ‘need more help’");
        })
        it('should contain the Financial Times case study snippet', () => {
            cy.get('.style__figuresContainer___3tHrD').should('contain', 'Weeks to redesign and deliver MVP homepage');
        })
    })

    describe('checking each slice of the homepage for expected content in mobile viewport', () => {
        beforeEach(() => {
            cy.viewport('iphone-6')
        })
        before(() => {
            cy.visit('https://www-staging.red-badger.com');
        })
        it('should contain the expected blurb in the top slice', () => {
            cy.get('.style__homepageTopSlice___NSsaZ').should('contain', 'We work with you to deliver digital products that make a difference to people.')
        })
        it('should contain the Fortnam and Mason case study snippet', () => {
            cy.get('.style__figuresContainer___3tHrD').should('contain', 'Number of awards for the new online store');
        })
        it('should contain the Camden Market case study snippet', () => {
            cy.get('.style__figuresContainer___3tHrD').should('contain', 'Drop in bounce rate within 4 days of launch');
        })
        it('should contain the Sky case study snippet', () => {
            cy.get('.style__figuresContainer___3tHrD').should('contain', "Drop in customers pushing the ‘need more help’");
        })
        it('should contain the Financial Times case study snippet', () => {
            cy.get('.style__figuresContainer___3tHrD').should('contain', 'Weeks to redesign and deliver MVP homepage');
        })
    })

    describe('checking each slice of the homepage for expected content in tablet viewport', () => {
        beforeEach(() => {
            cy.viewport('ipad-2')
        })
        before(() => {
            cy.visit('https://www-staging.red-badger.com');
        })
        it('should contain the expected blurb in the top slice', () => {
            cy.get('.style__homepageTopSlice___NSsaZ').should('contain', 'We work with you to deliver digital products that make a difference to people.')
        })
        it('should contain the Fortnam and Mason case study snippet', () => {
            cy.get('.style__figuresContainer___3tHrD').should('contain', 'Number of awards for the new online store');
        })
        it('should contain the Camden Market case study snippet', () => {
            cy.get('.style__figuresContainer___3tHrD').should('contain', 'Drop in bounce rate within 4 days of launch');
        })
        it('should contain the Sky case study snippet', () => {
            cy.get('.style__figuresContainer___3tHrD').should('contain', "Drop in customers pushing the ‘need more help’");
        })
        it('should contain the Financial Times case study snippet', () => {
            cy.get('.style__figuresContainer___3tHrD').should('contain', 'Weeks to redesign and deliver MVP homepage');
        })
    })
})

describe('VIEWPORT TESTS', () => {
    describe('show the side menu in mobile viewport only', () => {
        beforeEach(() => {
            cy.visit('https://www-staging.red-badger.com');
            //set the viewport to mobile size
            cy.viewport(375, 667);
        })
        it('should only show the side navigation in the mobile viewport', () => {
            //desktop nav should not be visible
            cy.get('.style__mediumScreenNav___ubAcF').should('not.be.visible');
            //click to open mobile nav
            cy.get('.style__triggerLabel___13NDI').click();
            cy.get('.style__smallScreenNav___2BK9p').children()
                //mobile nav should have 7 items
                .should('have.length', (7))
                //assert on the contents the items
                .should('contain', 'Home')
                .and('contain', 'About us')
                .and('contain', 'What we do')
                .and('contain', 'Blog')
                .and('contain', 'Events')
                .and('contain', 'Jobs')
                .and('contain', 'Contact us');
            //close the nav menu
            cy.get('.style__menuCloseButton___2nnI9').click();
            //set the browser to desktop viewport
            cy.viewport(1200, 800);
            //assert that the button to open the mobile nav is not visible and that the desktop nav is now visible
            cy.get('.style__triggerContainer___oHEB3').children().should('not.be.visible');
            cy.get('.style__mediumScreenNav___ubAcF').should('be.visible');
        })
    })
})

describe('ACCESSIBILITY TESTS', () => {
    describe('checking for accessibility attributes', () => {
        before(() => {
            cy.visit('https://www-staging.red-badger.com')
        })
        it('should contain alt text for images on the page', () => {
            cy.get('a.style__figureLink___PvJm0:nth-child(1) > img:nth-child(4)')
                .should('have.attr', 'alt', 'The logo of Fortnum & Masons');
            cy.get('a.style__figureLink___PvJm0:nth-child(2) > img:nth-child(4)')
                .should('have.attr', 'alt', 'The logo of Camden Market');
            cy.get('a.style__figureLink___PvJm0:nth-child(3) > img:nth-child(4)')
                .should('have.attr', 'alt', 'The logo of Sky');
            cy.get('a.style__figureLink___PvJm0:nth-child(4) > img:nth-child(4)')
                .should('have.attr', 'alt', 'The logo of the Financial Times');
        })
    })
})

describe('BLOG TESTS', () => {
    describe('search functionality for the blog', () => {
        beforeEach(function() {
            // We use a deferred object to make it easy to test
            // different scenarios
            // We use cy.visit({onBeforeLoad: ...}) to stub
            // window.fetch before any app code runs
            cy.visit('https://www-staging.red-badger.com/blog/', {})
        })
        it('should show a loading spinner when a search is in progress', () => {
            cy.get('.search-input')
                .type('testing')
            cy.get('.search-result')
                .should('have.attr', 'itemid')
                .its('length')
                .should('be.eq', 24)
        })
    })
})
describe('MEET OUR TEAM TESTS', () => {
    describe('the meet our team page', () => {
        before(() => {
            cy.visit('https://www-staging.red-badger.com/about-us/people/')
        })
        it('should show a list of bagers', () => {
            cy.get('.style__badgers___peJgL')
                .children()
                .should('have.length', '31')
        })
        it('should contain a range of categories to filter by', () => {
            cy.get('.style__categories___ilyar')
                .children()
                .should('contain', 'Everyone')
                .should('contain', 'Leadership')
                .should('contain', 'Strategy')
                .should('contain', 'PM')
                .should('contain', 'UX & Design')
                .should('contain', 'Engineering')
                .should('contain', 'QA')
                .should('contain', 'Operations')
                .should('contain', 'Marketing')
                .should('contain', 'Adorable')
        })
        it('should have the correct hover and active button styles', () => {
            cy.get('.style__category___1JzMx.style__active___3_e6z, .style__category___1JzMx:hover')
                .should('have.css', 'color', 'rgb(248, 248, 248)')

            cy.get('.style__category___1JzMx.style__active___3_e6z, .style__category___1JzMx:hover')
                .should('have.css', 'background-color', 'rgb(252, 29, 66)')
        })
    })
})


// describe.only('basic navigation to Google', () => {
//     beforeEach(() => {
//         cy.visit('https://google.com');
//     })
//     it('should load the Red Badger Homepage', () => {
//         cy.title().should('eql', 'Google');
//     })
// })
