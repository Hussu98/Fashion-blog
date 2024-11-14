import * as React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PostForm() {
    const [formData, setFormData] = React.useState({
        author: '',
        title: '',
        content: '',
        tag: ''
    })
    const [image, setImage] = React.useState(null)
    const [message, setMessage] = React.useState('')

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = new FormData();
        data.append('author', formData.author)
        data.append('title', formData.title)
        data.append('content', formData.content)
        data.append('tag', formData.tag)
        data.append('image', image);

        try {
            const response = await axios.post('/blog', data, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
      
            if (response.status === 201) {
              setMessage('Blog post created successfully!');
              toast.success('Post created successfully!', {
                position: 'top-right',
                autoClose: 3000
              })

              setFormData({
                author: '',
                title: '',
                content: '',
                tag: ''
              })

              setImage(null)
            } else {
              setMessage('Failed to create the blog post.');
              toast.error('Post not created!', {
                position: 'top-right',
                autoClose: 3000
              })
            }
          } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
          }
    }

    return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <h2 className='text-2xl font-bold mb-6 font-tahoma text-center'>Create a new blogpost</h2>
            <form 
                onSubmit={handleSubmit} 
                encType='multipart/form-data'
                className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 font-tahoma max-w-lg w-full'
            >
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Author:</label>
                    <input 
                        type='text' 
                        name='author' 
                        value={formData.author}
                        onChange={handleChange}
                        required
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus:shadow-outline'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Title:</label>
                    <input 
                        type='text' 
                        name='title' 
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Content:</label>
                    <textarea 
                        type='text' 
                        name='content' 
                        value={formData.content}
                        onChange={handleChange}
                        required
                        className='shadow appearance-none border h-[300px] mb-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Tags (comma-separated):</label>
                    <input 
                        type='text' 
                        name='tag' 
                        value={formData.tag}
                        onChange={handleChange}
                        placeholder='E.g, Fashion, Summer, Trends'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Image:</label>
                    <input 
                        type='file' 
                        name='image' 
                        onChange={handleImageChange}
                        required
                        className='w-full text-sm text-gray-500 mb-4 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
                    />
                </div>
                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Add Post</button>
                {message && <p className="mt-4 text-center text-green-500">{message}</p>}
            </form>
        </div>
    )
}

export default PostForm