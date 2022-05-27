/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { IoCloseSharp } from 'react-icons/io5'
import { GrMenu } from 'react-icons/gr'
import { CgProfile } from 'react-icons/cg'
import { FaLock } from 'react-icons/fa'
import { AiOutlineMenu } from 'react-icons/ai';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '', current: true },
]
const userNavigation = [
  { name: 'Your Profile', href: '#', current: true },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

function Navbar() {
  return (
    <>
      <div className="select-none fixed top-0 w-full shadow-sm">
        <Disclosure as="nav" className="bg-secondary">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="inline-flex items-center gap-2">
                      <FaLock color="#fff3ec" className='w-6 h-6 mt-auto mb-1' />
                      <p className='text-3xl text-secondaryHeading tracking-widest font-bold'>VAULT</p>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-primary/100 text-secodaryHeading'
                                : 'text-secondaryParagraph hover:bg-primary hover:text-primaryHeading',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">

                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          <Menu.Button className="max-w-xs rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-secondary focus:ring-primary">
                            <span className="sr-only">Open user menu</span>
                            <CgProfile className="h-8 w-8" color="#fff3ec"/>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right bg-secondary absolute right-0 mt-2 w-48 rounded-md shadow-sm border-2 border-primary shadow-secondary py-1  ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }: {'active': boolean}) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-primary text-primaryheading' : '',
                                      'block px-4 py-2 text-sm text-secondaryParagraph',
                                      'font-semibold hover:text-primaryHeading hover:bg-primary rounded-md'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-secondary inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <IoCloseSharp className="block h-6 w-6" color='#fff3ec' aria-hidden="true" />
                      ) : (
                        <AiOutlineMenu className="block h-6 w-6" color='#fff3ec' aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 
                        'bg-primary/100 text-secodaryHeading' 
                        :'text-secondaryParagraph hover:bg-primary hover:text-primaryHeading',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                    <CgProfile className="h-8 w-8" color="#fff3ec"/>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-secondaryHeading">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-secondaryParagraph">{user.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-secondaryParagraph hover:text-primaryHeading hover:bg-primary"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

      </div>
    </>
  )
}

export default Navbar;