import { Fragment, useEffect, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { MenuIcon, QuestionMarkCircleIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline'
import {  TrashIcon } from '@heroicons/react/solid'
import { PlusSmIcon as PlusSmIconSolid } from '@heroicons/react/solid'


const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']
const navigation = {
  categories: [
    {
      name: 'Food',
      featured: [
        {
          name: 'Grocery',
          href: '#',
          imageSrc: 'https://media.timeout.com/images/105041644/image.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic milk',
          href: '#',
          imageSrc: 'https://domf5oio6qrcr.cloudfront.net/medialibrary/12517/c4ec4595-0308-4a49-97e4-db2f8a201312.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
        
      ],
    },
    {
      name: 'Clothes',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg',
          imageAlt: 'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg',
          imageAlt: 'Model wearing light heather gray t-shirt.',
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
}
function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}


export default function Example() {
  const [Basket,Setbasket]=useState(0)
  const [Active,SetActive]=useState(false)
  const [open, setOpen] = useState(false)


  const  [products,Setproducts]=useState( [
    {
      id: 1,
      name: 'milk',
      href: '#',
      price: 1.15,
      qty:0,
      color: 'white',
      Discount:0,
      size: '125 G"',
      imageSrc: 'https://dz.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/70/3392/1.jpg?0049',
      imageAlt: 'Brass puzzle in the shape of a jack with overlapping rounded posts.',
    },
    {
      id: 2,
      name: 'butter',
      href: '#',
      price: 0.8,
      qty:0,
      color: 'yellow',
      Discount:0,
      size: '1.8 Kg"',
      imageSrc: 'https://dz.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/41/8972/1.jpg?3757',
      imageAlt: 'Brass puzzle in the shape of a jack with overlapping rounded posts.',
    },
    {
      id: 3,
      name: 'bread',
      href: '#',
      price: 1,
      qty:0,
      color: 'brown',
      Discount:0,
      size: '0.1 Kg"',
      imageSrc: 'https://dz.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/62/6093/1.jpg?9611',
      imageAlt: 'Brass puzzle in the shape of a jack with overlapping rounded posts.',
    }
    
   
  ])
  let items=products;
  let tot=0;
  let totwd=0;
  products.map((Element)=>{
   
    if(Element.name=="milk" ){
      let prushare=0;
      let qnt=Element.qty
      while(qnt>=4){
           prushare+=3;
           qnt-=4
      }
      prushare+=qnt
     
      Element["Discount"]=prushare*Element.price
     
  
  }
  else if(Element.name=="bread"){
    let x=0;
    items.map((SElement)=>{
        if(SElement.name=="butter"){
         
            if(SElement.qty%2==0){
                x=SElement.qty/2;
            }
            else if(SElement.qty%2==1){
                x=(SElement.qty-1)/2;
            }
        }
    })

            if(Element.qty<=x){
                Element["Discount"]=Element.qty*Element.price*0.5
            }
            else{
                let y=Element.qty-x;
                Element["Discount"]=(x*Element.price*0.5)+y*Element.price
            }
       
}
else{
  Element["Discount"]=Element.price*Element.qty
  
}
  tot+=Element.Discount
  totwd+=Element.price*Element.qty
   
})
  return(
    <div className="bg-gray-50">
            <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex px-4 space-x-8">
                    {navigation.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(
                            selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent',
                            'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                          )
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  {navigation.categories.map((category) => (
                    <Tab.Panel key={category.name} className="px-4 py-6 space-y-12">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                        {category.featured.map((item) => (
                          <div key={item.name} className="group relative">
                            <div className="aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden group-hover:opacity-75">
                              <img src={item.imageSrc} alt={item.imageAlt} className="object-center object-cover" />
                            </div>
                            <a href={item.href} className="mt-6 block text-sm font-medium text-gray-900">
                              <span className="absolute z-10 inset-0" aria-hidden="true" />
                              {item.name}
                            </a>
                            <p aria-hidden="true" className="mt-1 text-sm text-gray-500">
                              Shop now
                            </p>
                          </div>
                        ))}
                      </div>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a href={page.href} className="-m-2 p-2 block font-medium text-gray-900">
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                <div className="flow-root">
                  <a href="#" className="-m-2 p-2 block font-medium text-gray-900">
                    Create an account
                  </a>
                </div>
                <div className="flow-root">
                  <a href="#" className="-m-2 p-2 block font-medium text-gray-900">
                    Sign in
                  </a>
                </div>
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {/* Currency selector */}
                <form>
                  <div className="inline-block">
                    <label htmlFor="mobile-currency" className="sr-only">
                      Currency
                    </label>
                    <div className="-ml-2 group relative border-transparent rounded-md focus-within:ring-2 focus-within:ring-white">
                      <select
                        id="mobile-currency"
                        name="currency"
                        className="bg-none border-transparent rounded-md py-0.5 pl-2 pr-5 flex items-center text-sm font-medium text-gray-700 group-hover:text-gray-800 focus:outline-none focus:ring-0 focus:border-transparent"
                      >
                        {currencies.map((currency) => (
                          <option key={currency}>{currency}</option>
                        ))}
                      </select>
                      <div className="absolute right-0 inset-y-0 flex items-center pointer-events-none">
                        <svg
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                          className="w-5 h-5 text-gray-500"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M6 8l4 4 4-4"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
      <header className="relative">
        <nav aria-label="Top">
          {/* Top navigation */}
          <div className="bg-gray-900">
            <div className="max-w-7xl mx-auto h-10 px-4 flex items-center justify-between sm:px-6 lg:px-8">
              {/* Currency selector */}
              <form>
                <div>
                  <label htmlFor="desktop-currency" className="sr-only">
                    Currency
                  </label>
                  <div className="-ml-2 group relative bg-gray-900 border-transparent rounded-md focus-within:ring-2 focus-within:ring-white">
                    <select
                      id="desktop-currency"
                      name="currency"
                      className="bg-none bg-gray-900 border-transparent rounded-md py-0.5 pl-2 pr-5 flex items-center text-sm font-medium text-white group-hover:text-gray-100 focus:outline-none focus:ring-0 focus:border-transparent"
                    >
                      {currencies.map((currency) => (
                        <option key={currency}>{currency}</option>
                      ))}
                    </select>
                    <div className="absolute right-0 inset-y-0 flex items-center pointer-events-none">
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                        className="w-5 h-5 text-gray-300"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M6 8l4 4 4-4"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </form>

              <div className="flex items-center space-x-6">
                <a href="#" className="text-sm font-medium text-white hover:text-gray-100">
                  Sign in
                </a>
                <a href="#" className="text-sm font-medium text-white hover:text-gray-100">
                  Create an account
                </a>
              </div>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-16 flex items-center justify-between">
                {/* Logo (lg+) */}
                <div className="hidden lg:flex-1 lg:flex lg:items-center">
                  <a href="#">
                    <span className="sr-only">Workflow</span>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                      alt=""
                    />
                  </a>
                </div>

                <div className="hidden h-full lg:flex">
                  {/* Flyout menus */}
                  <Popover.Group className="px-4 bottom-0 inset-x-0">
                    <div className="h-full flex justify-center space-x-8">
                      {navigation.categories.map((category) => (
                        <Popover key={category.name} className="flex">
                          {({ open }) => (
                            <>
                              <div className="relative flex">
                                <Popover.Button
                                  className={classNames(
                                    open
                                      ? 'border-indigo-600 text-indigo-600'
                                      : 'border-transparent text-gray-700 hover:text-gray-800',
                                    'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                                  )}
                                >
                                  {category.name}
                                </Popover.Button>
                              </div>

                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Popover.Panel className="absolute top-full inset-x-0 bg-white text-sm text-gray-500">
                                  {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                  <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
                                  {/* Fake border when menu is open */}
                                  <div
                                    className="absolute inset-0 top-0 h-px max-w-7xl mx-auto px-8"
                                    aria-hidden="true"
                                  >
                                    <div
                                      className={classNames(
                                        open ? 'bg-gray-200' : 'bg-transparent',
                                        'w-full h-px transition-colors ease-out duration-200'
                                      )}
                                    />
                                  </div>

                                  <div className="relative">
                                    <div className="max-w-7xl mx-auto px-8">
                                      <div className="grid grid-cols-4 gap-y-10 gap-x-8 py-16">
                                        {category.featured.map((item) => (
                                          <div key={item.name} className="group relative">
                                            <div className="aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden group-hover:opacity-75">
                                              <img
                                                src={item.imageSrc}
                                                alt={item.imageAlt}
                                                className="object-center object-cover"
                                              />
                                            </div>
                                            <a href={item.href} className="mt-4 block font-medium text-gray-900">
                                              <span className="absolute z-10 inset-0" aria-hidden="true" />
                                              {item.name}
                                            </a>
                                            <p aria-hidden="true" className="mt-1">
                                              Shop now
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </>
                          )}
                        </Popover>
                      ))}

                      {navigation.pages.map((page) => (
                        <a
                          key={page.name}
                          href={page.href}
                          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          {page.name}
                        </a>
                      ))}
                    </div>
                  </Popover.Group>
                </div>

                {/* Mobile menu and search (lg-) */}
                <div className="flex-1 flex items-center lg:hidden">
                  <button
                    type="button"
                    className="-ml-2 bg-white p-2 rounded-md text-gray-400"
                    onClick={() => setOpen(true)}
                  >
                    <span className="sr-only">Open menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Search */}
                  <a href="#" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <SearchIcon className="w-6 h-6" aria-hidden="true" />
                  </a>
                </div>

                {/* Logo (lg-) */}
                <a href="#" className="lg:hidden">
                  <span className="sr-only">Workflow</span>
                  <img
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                    alt=""
                    className="h-8 w-auto"
                  />
                </a>

                <div className="flex-1 flex items-center justify-end">
                  <a href="#" className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">
                    Search
                  </a>

                  <div className="flex items-center lg:ml-8">
                    {/* Help */}
                    <a href="#" className="p-2 text-gray-400 hover:text-gray-500 lg:hidden">
                      <span className="sr-only">Help</span>
                      <QuestionMarkCircleIcon className="w-6 h-6" aria-hidden="true" />
                    </a>
                    <a href="#" className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">
                      Help
                    </a>

                    {/* Cart */}
                    <div className="ml-4 flow-root lg:ml-8">
                      <a href="#" className="group -m-2 p-2 flex items-center" onClick={()=>{SetActive(!Active)}}>
                        <ShoppingBagIcon
                          className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{Basket}</span>
                        <span className="sr-only">items in cart, view bag</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main  className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8 relative">
      { Active && (
    <div className="mt-10 lg:mt-0 absolute w-[500px] right-0 z-0" >
        

    <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h3 className="sr-only">Items in your cart</h3>
      <ul role="list" className="divide-y divide-gray-200">
        {products.map((product) => (
          product.qty>0 && <li key={product.id} className="flex py-6 px-4 sm:px-6">
            <div className="flex-shrink-0">
              <img src={product.imageSrc} alt={product.imageAlt} className="w-20 rounded-md" />
            </div>

            <div className="ml-6 flex-1 flex flex-col">
              <div className="flex">
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm">
                    <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                      {product.name}
                    </a>
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                  <p className="mt-1 text-sm text-gray-500">{product.size}</p>
                </div>

                <div className="ml-4 flex-shrink-0 flow-root">
                  <button
                    type="button"
                    onClick={()=>{
                      product.qty=0;
                      Setproducts([...products])
                      Setbasket(Basket-1)
                    }}
                    className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Remove</span>
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="flex-1 pt-2 flex items-end justify-between">
                <p className="mt-1 text-sm font-medium text-gray-900">{product.Discount.toFixed(2)} $</p> <p className='mt-1 text-sm font-medium text-red-700 line-through'>{(product.qty*product.price)-product.Discount>0.2 ?( product.price*product.qty).toFixed(2) :""}</p>

                <div className="ml-4 flex items-center gap-5">
                <button
                  onClick={()=>{
                    product.qty=product.qty-1;
                    Setproducts([...products])
                  }}
    type="button"
    className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
  </button>
  <span className=' text-xl font-bold '>{product.qty}</span>
  <button
      onClick={()=>{
        product.qty=product.qty+1;
        Setproducts([...products])
        
      }}
    type="button"
    className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
  </button>

                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
        <div className="flex items-center justify-between">
          <dt className="text-sm">Subtotal</dt>
          <dd className="text-sm font-medium text-gray-900">${totwd.toFixed(2)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-sm">Shipping</dt>
          <dd className="text-sm font-medium text-gray-900">$5.00</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-sm">Dicount</dt>
          <dd className="text-sm font-medium text-gray-900">${totwd-tot}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
          <dt className="text-base font-medium">Total</dt>
          <dd className="text-base font-medium text-gray-900">$ {tot.toFixed(2)}</dd>
        </div>
      </dl>

      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
        <button
          type="submit"
          className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
        >
          Confirm order
        </button>
      </div>
    </div>
  </div>
)}

        <div className="max-w-2xl mx-auto lg:max-w-none" onClick={()=>{SetActive(false)}}>
          <h1 className="sr-only">Checkout</h1>

          <form className="">
                        <div>
                        <h2  className="text-lg font-medium text-gray-900 md:flex-shrink-0">
                Product Lists
                </h2>
                        {products.map((product) => (
            (<section key={product.id} aria-labelledby={`${product.id}-heading`}>
            <div className="space-y-1 md:flex md:items-baseline md:space-y-0 md:space-x-4">
            
              <div className="space-y-5 md:flex-1 md:min-w-0 sm:flex sm:items-baseline sm:justify-between sm:space-y-0">
               
            
              </div>
            </div>

            <div className="mt-6 -mb-6 flow-root border-t border-gray-200 divide-y divide-gray-200">
       
                <div key={product.id} className="py-6 sm:flex">
                  <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="flex-none w-20 h-20 rounded-md object-center object-cover sm:w-48 sm:h-48"
                    />
                    <div className="pt-1.5 min-w-0 flex-1 sm:pt-0">
                      <h3 className="text-sm font-medium text-gray-900">
                        <a href={product.href}>{product.name}</a>
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        <span>{product.color}</span>{' '}
                        <span className="mx-1 text-gray-400" aria-hidden="true">
                          &middot;
                        </span>{' '}
                        <span>{product.size}</span>
                      </p>
                      <p className="mt-1 font-medium text-gray-900">{product.price} $</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4 sm:mt-0 sm:ml-6 sm:flex-none sm:w-40">
                    <button
                       onClick={()=>{
                        product.qty=1;
                        Setproducts([...products])
                        Setbasket(Basket+1)
                      }}
                      type="button"
                      className="w-full flex items-center justify-center bg-indigo-600 py-2 px-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full sm:flex-grow-0"
                          
                    >
                      Buy Now
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full sm:flex-grow-0"
                    >
                      Shop similar
                    </button>
                  </div>
                </div>
             
            </div>
          </section>)
          ))}
                        </div>
            {/* Order summary */}
            
          </form>
        </div>
      </main>
      <footer aria-labelledby="footer-heading" className="bg-white border-t border-gray-200">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20">
            <div className="grid grid-cols-1 md:grid-cols-12 md:grid-flow-col md:gap-x-8 md:gap-y-16 md:auto-rows-min">
              {/* Image section */}
              <div className="col-span-1 md:col-span-2 lg:row-start-1 lg:col-start-1">
                <img
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                  alt=""
                  className="h-8 w-auto"
                />
              </div>

              {/* Sitemap sections */}
              <div className="mt-10 col-span-6 grid grid-cols-2 gap-8 sm:grid-cols-3 md:mt-0 md:row-start-1 md:col-start-3 md:col-span-8 lg:col-start-2 lg:col-span-6">
                <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">productsprushared</h3>
                    <ul role="list" className="mt-6 space-y-6">
                      {footerNavigation.productsprushared.map((item) => (
                        <li key={item.name} className="text-sm">
                          <a href={item.href} className="text-gray-500 hover:text-gray-600">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Company</h3>
                    <ul role="list" className="mt-6 space-y-6">
                      {footerNavigation.company.map((item) => (
                        <li key={item.name} className="text-sm">
                          <a href={item.href} className="text-gray-500 hover:text-gray-600">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Customer Service</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.customerService.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Newsletter section */}
              <div className="mt-12 md:mt-0 md:row-start-2 md:col-start-3 md:col-span-8 lg:row-start-1 lg:col-start-9 lg:col-span-4">
                <h3 className="text-sm font-medium text-gray-900">Sign up for our newsletter</h3>
                <p className="mt-6 text-sm text-gray-500">The latest deals and savings, sent to your inbox weekly.</p>
                <form className="mt-2 flex sm:max-w-md">
                  <label htmlFor="newsletter-email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email-address"
                    type="text"
                    autoComplete="email"
                    required
                    className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                  <div className="ml-4 flex-shrink-0">
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 py-10 text-center">
            <p className="text-sm text-gray-500">&copy; 2021 Workflow, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}