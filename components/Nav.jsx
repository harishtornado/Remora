'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();
  const [ providers,setProviders ] = useState(null);
  const [ toggleDropDown,setToggleDropDown ] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  },[])

  return (
    <nav className='flex-between w-full mt-10 mb-10'> 
      <Link href="/" className='flex gap-2 flex-center'>
        <Image 
          src="/assets/images/remora.svg"
          alt='Remora Logo'
          width={25}
          height={25}
          className='object-contain' 
        />
        <p className='logo_text'>Remora</p>
      </Link>

      <div className="sm:flex hidden">
        { session?.user ?(
          <div className='flex gap-3 md:gap-3'>
            <Link href="/create-prompt" className='block_btn'>
              Create Post
            </Link>
            <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>
            <Link href="/profile">
              <Image 
                src={session?.user.image}
                width={37} 
                height={37} 
                className='rounded-full'
              />
            </Link>
          </div>
        ):(
          <>
          { providers && 
            Object.values(providers).map((provider) => (
              <button
                type='button'
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='block_btn'
              >
                Sign In
              </button>
            ))}
          </>
        )}
      </div>
      <div className='sm:hidden flex relative'>
        {session?.user ? ( 
          <div className='flex'>
            <Image 
                src={session?.user.image} 
                width={37} 
                height={37} 
                className='rounded-full'
                alt='profile'
                onClick={() => setToggleDropDown((prev) => !prev)}
              />

              {toggleDropDown && (
                <div className='dropdown'>
                  <Link 
                    href="/profile" 
                    className='dropdown_link'
                    onClick={() => setToggleDropDown(false)}
                  >
                    My Profile
                  </Link>
                  <Link 
                    href="/create-prompt" 
                    className='dropdown_link'
                    onClick={() => setToggleDropDown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button 
                    type='button'
                    onClick={() => {
                      setToggleDropDown(false);
                      signOut();
                    }}
                    className='mt-5 w-full block_btn'
                    >Sign Out</button>
                </div>
              )}
          </div>
        ):(
          <>
          { providers && 
            Object.values(providers).map((provider) => (
              <button
                type='button'
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='black_btn'
              >
                Sign In
              </button>
            ))}
          </>
        )}
      </div>

    </nav>
  )
}

export default Nav;