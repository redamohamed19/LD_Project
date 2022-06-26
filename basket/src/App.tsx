import Header from './components/Header';
import ListItems from './components/ListItems';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import MobileMenu from './components/MobileMenu';
const initialestate = [
  {
    id: 1,
    name: 'milk',
    href: '#',
    price: 1.15,
    qty: 0,
    color: 'white',
    discount: 0,
    size: '125 G"',
    imageSrc:
      'https://dz.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/70/3392/1.jpg?0049',
    imageAlt:
      'Brass puzzle in the shape of a jack with overlapping rounded posts.',
  },
  {
    id: 2,
    name: 'butter',
    href: '#',
    price: 0.8,
    qty: 0,
    color: 'yellow',
    discount: 0,
    size: '1.8 Kg"',
    imageSrc:
      'https://dz.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/41/8972/1.jpg?3757',
    imageAlt:
      'Brass puzzle in the shape of a jack with overlapping rounded posts.',
  },
  {
    id: 3,
    name: 'bread',
    href: '#',
    price: 1,
    qty: 0,
    color: 'brown',
    discount: 0,
    size: '0.1 Kg"',
    imageSrc:
      'https://dz.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/62/6093/1.jpg?9611',
    imageAlt:
      'Brass puzzle in the shape of a jack with overlapping rounded posts.',
  },
];
const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP'];
const navigation = {
  categories: [
    {
      name: 'Food',
      featured: [
        {
          name: 'Grocery',
          href: '#',
          imageSrc: 'https://media.timeout.com/images/105041644/image.jpg',
          imageAlt:
            'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic milk',
          href: '#',
          imageSrc:
            'https://domf5oio6qrcr.cloudfront.net/medialibrary/12517/c4ec4595-0308-4a49-97e4-db2f8a201312.jpg',
          imageAlt:
            'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
    },
    {
      name: 'Clothes',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg',
          imageAlt:
            'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg',
          imageAlt: 'Model wearing light heather gray t-shirt.',
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
};

const footerNavigation = {
  productsprushared: [
    { name: 'Bags', href: '#' },
    { name: 'Tees', href: '#' },
    { name: 'Objects', href: '#' },
    { name: 'Home Goods', href: '#' },
    { name: 'Accessories', href: '#' },
  ],
  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  customerService: [
    { name: 'Contact', href: '#' },
    { name: 'Shipping', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'Warranty', href: '#' },
    { name: 'Secure Payments', href: '#' },
    { name: 'FAQ', href: '#' },
  ],
};

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function App() {
  const [open, setOpen] = useState(false);

  const [basket, Setbasket] = useState(
    parseInt(localStorage.getItem('basketcount')!) || 0
  );
  const [active, SetActive] = useState(false);
  const [products, Setproducts] = useState(
    JSON.parse(localStorage.getItem('basket')!) || initialestate
  );

  let items = products;
  let totalReal = 0;
  let totalwithoutDiscount = 0;

  products.map((Element: any) => {
    if (Element.name == 'milk') {
      let prushare = 0;
      let qnt = Element.qty;
      while (qnt >= 4) {
        prushare += 3;
        qnt -= 4;
      }
      prushare += qnt;

      Element['discount'] = prushare * Element.price;
    } else if (Element.name == 'bread') {
      let x = 0;
      items.map((SElement: any) => {
        if (SElement.name == 'butter') {
          if (SElement.qty % 2 == 0) {
            x = SElement.qty / 2;
          } else if (SElement.qty % 2 == 1) {
            x = (SElement.qty - 1) / 2;
          }
        }
      });

      if (Element.qty <= x) {
        Element['discount'] = Element.qty * Element.price * 0.5;
      } else {
        let y = Element.qty - x;
        Element['discount'] = x * Element.price * 0.5 + y * Element.price;
      }
    } else {
      Element['discount'] = Element.price * Element.qty;
    }
    totalReal += Element.discount;
    totalwithoutDiscount += Element.price * Element.qty;
  });

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(products));
    localStorage.setItem('basketcount', basket + '');
  }, [products, basket]);

  return (
    <div className="bg-gray-50">
      {/* Mobile menu */}
      <MobileMenu
        open={open}
        setOpen={setOpen}
        navigation={navigation}
        currencies={currencies}
      />
      <Header
        currencies={currencies}
        navigation={navigation}
        setOpen={setOpen}
        SetActive={SetActive}
        basket={basket}
        active={active}
      />
      <ListItems
        active={active}
        products={products}
        Setbasket={Setbasket}
        Setproducts={Setproducts}
        basket={basket}
        totalwithoutDiscount={totalwithoutDiscount}
        SetActive={SetActive}
        totalReal={totalReal}
        initialestate={initialestate}
      />

      <Footer footerNavigation={footerNavigation} />
    </div>
  );
}
