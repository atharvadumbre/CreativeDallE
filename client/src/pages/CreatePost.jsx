import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets';
import {getRandomPrompt} from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if(form.prompt){
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle',{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({prompt:`Create a logo for ${form.prompt}`}),
        })

        const data = await response.json();

        setForm({ ...form, photo:`data:image/jpeg;base64,${data.photo}`})

      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  }
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(form.prompt && form.photo){
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/post',{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form)
        })

        await response.json();
        navigate('/');
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter a prompt and generate a logo')
    }
  }

  const handleChange = (e) => {
    setForm({ ...form,[e.target.name]:e.target.value })
  }
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt})
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div className='grid justify-items-center'>
        <h1 className='font-mono font-extrabold text-[#222328] text-[32px]'>CREATE A LOGO</h1>
        <p className='font-mono mt-2 text-[#666e75] text-[16px] max-w[500px]'>Create logos using DALL-E AI model</p>
      </div>
      
      <form className='font-mono mt-16 max-w-7xl ' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            LabelName="Your name"
            type = "text"
            name = "name"
            placeholder = "Adam Smith"
            value={form.name}
            handleChange = {handleChange}
          />
          <FormField
            LabelName="Logo Idea"
            type = "text"
            name = "prompt"
            placeholder = "A computer with human intelligence ..."
            value={form.prompt}
            handleChange = {handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className='relative bg-black-50 border border-black-300 text-gray-900 text-sm rounded-lg focus:ring-black-500 focus:border-black w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain' />
            ):(
              <img src={preview} alt="preview" className='w-10/12 h-10/12 object-contain opacity-40' />
            )}

            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}

          </div>
        </div>

        <div className='mt-5 flex gap-5 grid justify-items-center'>
            <button type='button' onClick={generateImage} className='font-mono bg-[#000000] text-white rounded-md text-lg w-full sm:w-auto px-20 py-2 text-center'>
              {generatingImg ? 'Generating...':'Generate'}
              </button>
        </div>

        <div className='mt-6 grid justify-items-center'>
          <p className='font-mono mt-2 text-[#000000] text-[16px]'>Liked a logo? Share with others!</p>
        <button type='submit' className='font-mono mt-3 text-white bg-[#000000] font-medium rounded-md text-md w-full sm:w-auto px-6 py-2.5 text-center'>
            {loading ? 'Sharing...': 'Share with Others'}
        </button>
        </div>

      </form>


    </section>
  )
}

export default CreatePost