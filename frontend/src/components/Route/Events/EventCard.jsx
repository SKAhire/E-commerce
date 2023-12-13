import React from 'react'
import styles from '../../../styles/styles'
import CountDown from './CountDown'

function EventCard({active}) {
  return (
    <div className={`w-full block bg-white rounded-lg ${active ? "unset":"mb-12"} lg:flex p-2 `}>
        <div className="w-full m-auto lg:-w[50%]">
            <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
        </div>
        <div className="w-full flex flex-col justify-center lg:[w-50%]">
            <h2 className={`${styles.productTitle}`}>
                Iphone 14pro max 8/256gb
            </h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis sit quasi aperiam, illum praesentium, ea dolores eaque modi enim nobis quia ut, iste tempora asperiores suscipit! Praesentium reiciendis minus rerum consequatur ipsa natus libero eligendi corporis cumque perferendis sunt amet fugit modi delectus voluptas quam quaerat aut, dolore mollitia laborum atque! Facere, eius.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis sit quasi aperiam, illum praesentium, ea dolores eaque modi enim nobis quia ut, iste tempora asperiores suscipit! Praesentium reiciendis minus rerum consequatur ipsa natus libero eligendi corporis cumque perferendis sunt amet fugit modi delectus voluptas quam quaerat aut, dolore mollitia laborum atque! Facere, eius.
            </p>
            <div className="flex py-2 justify-between">
                <div className="flex">
                    <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                        1099$
                    </h5>
                    <h5 className="font-bold text-[#333] text-[20px] font-Roboto">
                        999$
                    </h5>
                </div>
                <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
                    120 sold
                </span>
            </div>
            <CountDown />
        </div>
    </div>
  )
}

export default EventCard
