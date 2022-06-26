import { IlistItems, Iproduct } from '../interface';

import Basketpanel from './Basketpanel';

export default function ListItems({
  active,
  products,
  Setbasket,
  Setproducts,
  basket,
  totalwithoutDiscount,
  SetActive,
  totalReal,
  initialestate,
}: IlistItems) {
  return (
    <main className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8 relative">
      {active && (
        <Basketpanel
          Setbasket={Setbasket}
          Setproducts={Setproducts}
          basket={basket}
          totalwithoutDiscount={totalwithoutDiscount}
          totalReal={totalReal}
          products={products}
          initialestate={initialestate}
        />
      )}
      <div
        className="max-w-2xl mx-auto lg:max-w-none"
        onClick={() => {
          SetActive(false);
        }}
      >
        <h1 className="sr-only">Checkout</h1>

        <form className="">
          <div>
            <h2 className="text-lg font-medium text-gray-900 md:flex-shrink-0">
              Product Lists
            </h2>
            {products.map((product) => (
              <section
                key={product.id}
                aria-labelledby={`${product.id}-heading`}
              >
                <div className="space-y-1 md:flex md:items-baseline md:space-y-0 md:space-x-4">
                  <div className="space-y-5 md:flex-1 md:min-w-0 sm:flex sm:items-baseline sm:justify-between sm:space-y-0"></div>
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
                          <span
                            className="mx-1 text-gray-400"
                            aria-hidden="true"
                          >
                            &middot;
                          </span>{' '}
                          <span>{product.size}</span>
                        </p>
                        <p className="mt-1 font-medium text-gray-900">
                          {product.price} $
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 space-y-4 sm:mt-0 sm:ml-6 sm:flex-none sm:w-40">
                      <button
                        onClick={() => {
                          product.qty += 1;
                          Setproducts([...products]);
                          Setbasket(basket + 1);
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
              </section>
            ))}
          </div>
          {/* Order summary */}
        </form>
      </div>
    </main>
  );
}
