import { Ibasketpanel, Iproduct } from '../interface';
import { TrashIcon } from '@heroicons/react/solid';
import {
  PlusSmIcon as PlusSmIconSolid,
  MinusSmIcon,
} from '@heroicons/react/solid';

export default function Basketpanel({
  products,
  Setbasket,
  Setproducts,
  basket,
  totalwithoutDiscount,
  totalReal,
  initialestate,
}: Ibasketpanel) {
  return (
    <div className="mt-10 lg:mt-0 absolute w-[500px] right-0 top-0  z-0">
      <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="sr-only">Items in your cart</h3>
        <ul role="list" className="divide-y divide-gray-200">
          {products.map(
            (product: Iproduct) =>
              product.qty > 0 && (
                <li key={product.id} className="flex py-6 px-4 sm:px-6">
                  <div className="flex-shrink-0">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="w-20 rounded-md"
                    />
                  </div>

                  <div className="ml-6 flex-1 flex flex-col">
                    <div className="flex">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm">
                          <a
                            href={product.href}
                            className="font-medium text-gray-700 hover:text-gray-800"
                          >
                            {product.name}
                          </a>
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.color}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.size}
                        </p>
                      </div>

                      <div className="ml-4 flex-shrink-0 flow-root">
                        <button
                          type="button"
                          onClick={() => {
                            product.qty = 0;
                            Setproducts([...products]);
                            Setbasket(basket - 1);
                          }}
                          className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Remove</span>
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 pt-2 flex items-end justify-between">
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {product.discount.toFixed(2)} $
                      </p>{' '}
                      <p className="mt-1 text-sm font-medium text-red-700 line-through">
                        {product.qty * product.price - product.discount > 0.2
                          ? (product.price * product.qty).toFixed(2)
                          : ''}
                      </p>
                      <div className="ml-4 flex items-center gap-5">
                        <button
                          onClick={() => {
                            product.qty = product.qty - 1;
                            Setproducts([...products]);
                            Setbasket(basket - 1);
                          }}
                          type="button"
                          className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <span className=" text-xl font-bold ">
                          {product.qty}
                        </span>
                        <button
                          onClick={() => {
                            product.qty = product.qty + 1;
                            Setproducts([...products]);
                            Setbasket(basket + 1);
                          }}
                          type="button"
                          className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <PlusSmIconSolid
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )
          )}
        </ul>
        <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
          <div className="flex items-center justify-between">
            <dt className="text-sm">Subtotal</dt>
            <dd className="text-sm font-medium text-gray-900">
              ${totalwithoutDiscount.toFixed(2)}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm">Shipping</dt>
            <dd className="text-sm font-medium text-gray-900">$5.00</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm">Dicount</dt>
            <dd className="text-sm font-medium text-gray-900">
              ${(totalwithoutDiscount - totalReal).toFixed(2)}
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <dt className="text-base font-medium">Total</dt>
            <dd className="text-base font-medium text-gray-900">
              $ {totalReal.toFixed(2)}
            </dd>
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
        <div className=" border-gray-200   px-4 sm:px-6 pb-12">
          <button
            type="submit"
            onClick={() => {
              products.map((product: any) => {
                product.qty = 0;
              });
              Setproducts([...products]);
              Setbasket(0);
            }}
            className="w-full border-red-700 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-red-600 hover: focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:red-indigo-500"
          >
            Clear Basket
          </button>
        </div>
      </div>
    </div>
  );
}
