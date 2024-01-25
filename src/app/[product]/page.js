import ProductList from '@/components/product/ProductList'

function Page({params}) {
  return (
    <section><ProductList query={params?.product}/></section>
  )
}

export default Page