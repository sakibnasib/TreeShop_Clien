import React, { useState } from 'react';
import AddPlantForm from '../../../components/Form/AddPlantForm';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';
import { imageUpload } from '../../../api/utils';

const AddPlant = () => {
    const {user}=useAuth();
    const [isUploading, setIsUploading] = useState(false)
    const hanleFormSubmit= async (e)  =>{
        e.preventDefault()
      
        const form = e.target
    const name = form?.name?.value
    const category = form?.category?.value
    const description = form?.description?.value
    const price = form?.price?.value
    const quantity = form?.quantity?.value
     const image = form?.image?.files[0]
    const imageUrl = await imageUpload(image)

      const plantData={
         name,
         category,
         description,
         price:parseFloat(price),
         quantity:parseInt(quantity),
         imageUrl,
         seller: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      }
     
    //   database 
   try {
  const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/add-plant`, plantData);
  toast.success('Plant Data Added Successfully, Yeee!');
  form.reset();
  console.log(data);
} catch (err) {
  console.error(err);
} finally {
  setIsUploading(false);
}

}
    
    return (
        <div>
            {/* form */}
        <AddPlantForm  isUploading={isUploading} hanleFormSubmit={hanleFormSubmit}/>
        </div>
    );
};

export default AddPlant;