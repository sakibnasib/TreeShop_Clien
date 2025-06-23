import React, { useState } from 'react';
import Heading from '../../components/Shared/Heading';
import Container from '../../components/Shared/Container';
import Button from '../../components/Shared/Button/Button';
import PurchaseModal from '../../components/Modal/PurchaseModal';
import { useLoaderData } from 'react-router';

const PlantDetails = () => {
  const plant=useLoaderData();
  const {name,category,description,price,quantity,imageUrl,seller}=plant || {}
    let [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }
    return (
        <Container>
      <div className='mx-auto flex flex-col lg:flex-row justify-between w-full gap-12'>
        {/* Header */}
        <div className='flex flex-col gap-6 flex-1'>
          <div>
            <div className='w-full overflow-hidden rounded-xl'>
              <img
                className='object-cover w-full'
                src={imageUrl}
                alt='header image'
              />
            </div>
          </div>
        </div>
        <div className='md:gap-10 flex-1'>
          {/* Plant Info */}
          <Heading
            title={name}
            subtitle={`Category: ${category}`}
          />
          <hr className='my-6' />
          <div
            className='
          text-lg font-light text-neutral-500'
          >
           {description}
          </div>
          <hr className='my-6' />

          <div
            className='
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              '
          >
            <div>Seller: {seller.name}</div>

            <img
              className='rounded-full'
              height='30'
              width='30'
              alt='Avatar'
              referrerPolicy='no-referrer'
              src={seller.image}
            />
          </div>
          <hr className='my-6' />
          <div>
            <p
              className='
                gap-4 
                font-light
                text-neutral-500
              '
            >
              Quantity: {quantity}Units Left Only!
            </p>
          </div>
          <hr className='my-6' />
          <div className='flex justify-between'>
            <p className='font-bold text-3xl text-gray-500'>Price: {price}$</p>
            <div>
              <Button onClick={() => setIsOpen(true)} label='Purchase' />
            </div>
          </div>
          <hr className='my-6' />

          <PurchaseModal plant={plant} closeModal={closeModal} isOpen={isOpen} />
        </div>
      </div>
    </Container>
    );
};

export default PlantDetails;



// _id
// 68593d451af29ba343306595
// name
// "Fuller Bauer"
// category
// "Outdoor"
// description
// "Excepturi porro natu"
// price
// "890"
// quantity
// "591"
// imageUrl
// "https://i.ibb.co/sdB0K7Sm/images-4.jpg"

// seller
// Object
// name
// "sakib"
// email
// "sakin@t.com"
// image
// "https://i.ibb.co/qFhJTKMW/premium-photo-1675129779591-c24711697580.jpg"