// ----
// Dependencies
const assert = require( 'assert' );
const User = require( '../src/User' );
const BlogPost = require( '../src/BlogPost' );
const Comment = require( '../src/Comment' );


// ----
// Test
describe( 'Associationa', () => {

    let joe, blogPost, comment;

    beforeEach(( done ) => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'JS is great!', conent: 'It really is.' });
        comment = new Comment({content: 'Congrats on a great post!'});

        joe.blogPosts.push( blogPost );
        blogPost.comments.push( comment );
        comment.user = joe;

        Promise.all([
            joe.save(),
            blogPost.save(),
            comment.save()
        ]).then(() => done() );

    });
    

    // ----
    it( 'Saves a relation between a User and a BlogPost', ( done ) => {
        User.findOne({ name: 'Joe' })
            .populate( 'blogPosts' )
            .then((user ) => {
                assert( user.blogPosts[0].title === 'JS is great!' );
                done();
            });
    });


    // ----
    it( 'Saves a full relation graph.', ( done ) => {
        User.findOne({ name: 'Joe'})
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'Comment',
                    populate: {
                        path: 'user',
                        model: 'User'
                    }
                }
            }).then(( user ) => {
                assert( user.name === 'Joe' );
                assert( user.blogPosts[0].title === 'JS is great!' );
                assert( user.blogPosts[0].comments[0].content === 'Congrats on a great post!' );
                assert( user.blogPosts[0].comments[0].user.name === 'Joe' );
                done(); 
            });
    });

});
