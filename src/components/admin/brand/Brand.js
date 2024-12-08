import React from 'react'
import "./Brand.scss"
import CreateBrand from '../CreateBrand'
import BrandList from './BrandList'
import { useDispatch } from 'react-redux'
import { getBrands } from '../../../redux/features/categoryAndBrand/categoryAndBrandSlice'

const Brand = () => {
    const dispatch = useDispatch()

    const reloadBrands = () => {
        dispatch(getBrands())
    }

  return (
    <section>
    <div className="container coupon">
        <CreateBrand reloadBrands={reloadBrands} />
        <BrandList  />
    </div>
</section>
  )
}

export default Brand