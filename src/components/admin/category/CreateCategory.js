import { useState } from 'react'
import Card from '../../card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../../loader/Loader'
import { createCategory, getCategories } from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";

const CreateCategory = ({ reloadCategory }) => {
    const [name, setName] = useState("")
    const { isLoading } = useSelector((state) => state.category);
    const dispatch = useDispatch();

    const saveCategory = (e) => {
        e.preventDefault()
        
        if (name.length <3) {
            return toast.error("Category name must be up to 3 characters")
        }

        const formData = {
            name
        }
        dispatch(createCategory(formData))
        dispatch(getCategories())
        setName("");
        reloadCategory()
    }

  return (
    <>
    { isLoading && <Loader />}
    <div className='--mb2'>
        <h3>Create Category</h3>
        <p>Use the form to <b>Create a Category</b></p>
        <Card cardClass={"card"}>
            <br />
            <form onSubmit={saveCategory}>
                <label>Category Name:</label>
                <input 
                type="text"
                placeholder="Category name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <div className="--my">
                    <button type='submit' className='--btn --btn-primary'>Save Category</button>
                </div>

            </form>
        </Card>
    </div>
    </>
  )
}

export default CreateCategory