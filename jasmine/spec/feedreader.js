/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have proper urls', function () {
            allFeeds.forEach(function (t, i) {
                expect(t.url).toBeDefined();
                expect(t.url).not.toBe('');
            });
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have proper names', function () {
            allFeeds.forEach(function (t, i) {
                expect(t.name).toBeDefined();
                expect(t.name).not.toBe('');
            });
        });
    });


    //A suite containing menu related tests
    describe('The menu', function () {
        var $body = $('body');
        var $hamburger = $('.menu-icon-link');
        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function () {
            expect($body.hasClass('menu-hidden')).toBe(true);
        });
        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('is toggled by button click', function () {
            expect($body.hasClass('menu-hidden')).toBe(true);
            $hamburger.click();
            expect($body.hasClass('menu-hidden')).toBe(false);
            $hamburger.click();
            expect($body.hasClass('menu-hidden')).toBe(true);
        });

    });


    //A suite containing tests which ensures feed content has been loaded
    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });
        afterEach(function (done) {
            feedStatus = false;
            done();
        });
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('should grab initial entries', function (done) {
            expect(feedStatus).toBe(true);
            done();
        });
    });

    //A suite containing tests which ensures feed content actually changes
    describe('New Feed Selection', function () {
        var currentFeed;
        beforeEach(function (done) {
            loadFeed(0, function () {
                currentFeed = $(".feed").html();
                loadFeed(1, function () {
                    done();
                });
            });
        });
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it("changes its loaded content", function (done) {
            var newFeed = $(".feed").html();
            expect(currentFeed).not.toBe(newFeed);
            done();
        });
    });
}());