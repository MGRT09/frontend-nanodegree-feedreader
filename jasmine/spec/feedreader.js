/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

$(function() {
	describe('RSS Feeds', function() {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});
		/* A test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */
		it('URL is defined and not empty', function() {
			allFeeds.forEach(function(feed) {
				var url = feed.url;
				expect(url).toBeDefined();
				expect(url.length).not.toBe(0);
			});
		});
		/* A test that loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */
		it('name is defined and not empty', function() {
			allFeeds.forEach(function(feed) {
				var name = feed.name;
				expect(name).toBeDefined();
				expect(name.length).not.toBe(0);
			});
		});
	});
	/* A test suite named "The menu" */
	describe('The Menu', function() {
		/* A test that ensures the menu element is
		 * hidden by default. You'll have to analyze the HTML and
		 * the CSS toß determine how we're performing the
		 * hiding/showing of the menu element.
		 */
		it("hidden menu", function() {
			expect($("body").hasClass("menu-hidden")).toBeTruthy();
		});
		/* A test that ensures the menu changes
		 * visibility when the menu icon is clicked. This test
		 * should have two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 */
		it('menu visibility change on click', function() {
			var menuIcon = $('.menu-icon-link');
			menuIcon.click();
			expect($('body').hasClass('menu-hidden')).toEqual(false);
			menuIcon.click();
			expect($('body').hasClass('menu-hidden')).toEqual(true);
		});
	});
	/* A test suite named "Initial Entries" */
	describe('Initial Entries', function() {
		/* A test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 * Remember, loadFeed() is asynchronous so this test will require
		 * the use of Jasmine's beforeEach and asynchronous done() function.
		 */
		beforeEach(function(done) {
			loadFeed(0, done);
		});
		it('loads at least one entry', function() {
			var $entries = $('.feed .entry');
			expect($entries.length).toBeGreaterThan(0);
		});
	});
	/* A test suite named "New Feed Selection" */
	describe('New Feed Selection', function() {
		/* A test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 * Remember, loadFeed() is asynchronous.
		 */
		var previousFeed;
		var newFeed;
		beforeEach(function(done) {
			loadFeed(0, function() {
                previousFeed = $('.entry-link').attr('href');
			    loadFeed(1, done);
            });
		});
		it('new feed loaded - content changes', function(done) {
			newFeed = $('.entry-link').attr('href');
			expect(newFeed).not.toBe(previousFeed);
			done();
		});
	});
}());
