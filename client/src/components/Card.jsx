import React from 'react'

import { download } from '../assets'
import {downloadImage} from '../utils'

const Card = ({_id,name,prompt,photo}) => {
  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card border-2 hover:border-[#000000] shadow-2xl'>
      <img className='w-full h-auto object-cover rounded-xl'
        src={photo}
        alt={prompt}
      />
      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-stone-900/[.75] p-4 rounded-b-xl'>
        <p className='font-mono font-bold text-white text-md overflow-y-auto prompt'>{prompt}</p>
        <div className='mt-2 flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            <div className='font-mono w-8 h-6 rounded-md object-cover bg-blue-700 flex justify-center items-center text-white text-xs font-semibold'>
              {name[0]+name[1]+name[2]}
            </div>
            <p className='font-mono text-white text-sm'>{name}</p>
          </div>
          <button type='button' onClick={()=> downloadImage(_id,photo)} className='outline-none bg-transparent border-none'>
            <img src={download} alt='download' className='w-8 h-8 object-contain invert' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card