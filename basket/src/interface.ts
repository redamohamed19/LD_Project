import { Interface } from "readline";

export interface Iheader {
  currencies:string[]
  navigation:any,
  setOpen:any,
  SetActive:any,
  basket:number,
  active:boolean
  }
  export interface IlistItems{
    active:boolean,
    products:Iproduct[],
    Setproducts:any,
    Setbasket:any,
    basket:number,
    totalwithoutDiscount:number,
    SetActive:any,
    totalReal:number,
    initialestate:any
  }
  export interface iMobileMenu{
    open:boolean,
    setOpen:any,
    navigation:any,
    currencies:string[]
  }
  export interface Ifooter{
    footerNavigation:any
  }
  export interface Ibasketpanel{
    products:any,
    Setbasket:any,
    Setproducts:any,
    basket:number,
    totalwithoutDiscount:number,
    totalReal:number,
    initialestate:any
  }
  export interface productsprushared{
    name: string, href: string 
  }
  export interface Ifeatured{
    name:string,
    href: string,
    imageSrc: string,
    imageAlt:string
  }
  export interface Ipage{
     name: string, 
      href: string
  }
  export interface Iproduct{
    id: number,
    name: string,
    href: string,
    price:number,
    qty: number,
    color:string,
    discount: number,
    size: string,
    imageSrc:string,
    imageAlt:string
  }

  export interface Icategory{
      name:string,
      featured:Ifeatured

      }