import * as React from 'react'
import like from './images/thumbs-up.svg'
import comment from './images/comment-01.svg'
import axios from 'axios'

function Card(){
    const [posts, setPosts] = React.useState([])
    const [isReadMore, setIsReadMore] = React.useState(false);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    React.useEffect(
        () => {
            const fetchPosts = async () => {
                try{
                    const response = await axios.get('/posts')
                    console.log(response.data.posts)
                    if (response.data && Array.isArray(response.data.posts)) {
                        setPosts(response.data.posts);  // Set posts only if the response is an array
                      } else {
                        console.error('Data is not an array');
                      }
                } catch(err) {
                    console.error('Error fetching blogposts: ', err)
                }
            };
            fetchPosts()
        }, []
    )

    const increaseLikeCount = async (postId) => {
        try{
            const postResponse = await axios.post(`/blog/${postId}/like`)
            setPosts(prevPosts => prevPosts.map(post => post._id === postId ? {...post, likes: postResponse.data.likes} : post))
        } catch (err) {
            console.error('Error liking this post: ', err)
        }
    }

    return (
        <div className='flex-col flex-wrap justify-between'>
                {posts.map((post) => {
                    console.log(post.image)
                    return (
                        <div key={post._id} className='container flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md p-4 md:p-6 m-4'>
                            <img 
                                src={`http://localhost:5000${post.image}`} 
                                alt='blog post image' 
                                className='rounded-lg w-full md:w-1/3 h-64 object-cover mb-4 md:mb-0 md:mr-6' 
                            />
                            {/*Content aranged in flex-col*/}
                            <div className='flex flex-col justify-between md:w-2/3'>
                                <h3 className="font-bold text-gray-800 text-2xl">{post.title}</h3>
                                <p className="text-gray-700 mb-2">By {post.author}</p>
                                <p className='text-gray-700 mb-2 text-ellipsis overflow-hidden'>{isReadMore ? post.content : `${post.content.substring(0, 50)}...`}</p>
                                <button className="text-blue-500 hover:text-blue-700 mt-2" onClick={toggleReadMore}>{isReadMore ? "Show Less" : "Read More"}</button>
                                <p className="text-gray-600">Tags: {post.tag.join(', ')}</p>
                                <div className='flex items-center justify-start md:justify-end space-x-4 mt-4'>
                                    {/*Like and comment container */}
                                    <button className="flex items-center text-gray-600 hover:text-blue-500">
                                        <img 
                                            src={like} 
                                            alt="like button" 
                                            className="w-5 h-5 mr-2 cursor-pointer"
                                            onClick={() => increaseLikeCount(post._id)}
                                        />
                                        <span>{post.likes} Likes</span>
                                    </button>
                                    <button className="flex items-center text-gray-600 hover:text-blue-500">
                                        <img src={comment} alt="comment button" className="w-5 h-5 mr-2" />
                                        {/*<span>{post.comments} Comments</span>*/}
                                    </button>
                                    {/*Number of comments*/}
                                </div>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
};

export default Card;