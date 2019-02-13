// ----
// Dependencies
const assert = require( 'assert' );
const User = require( '../src/User' );
const BlogPost = require( '../src/BlogPost' );


// ----
// Test
describe( 'Middleware', () => {

    let joe, blogPost;

    beforeEach(( done ) => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'JS is great!', conent: 'It really is.' });

        joe.blogPosts.push( blogPost );

        Promise.all([
            joe.save(),
            blogPost.save()
        ]).then(() => done() );

    });
    

    // ----
    it( 'Clean up remaining BlogPost\'s when a User is removed', ( done ) => {
        joe.remove().then(() => BlogPost.count().then(( count ) => {
            assert( count === 0 );
            done();
        }));
    });

});
