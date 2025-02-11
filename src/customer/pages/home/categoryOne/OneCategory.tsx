import OneCategoryCard from './OneCategoryCard'
import { HomeCategoryType } from '../../../../types/HomeCategoryType';

const OneCategory = ({ item } : { item : HomeCategoryType[]}) => {
  return (
    <div className='flex felx-wrap justify-between py-5 lg:px-20 border-b'>
       {item.slice(0, 8).map((category) => (
        category.section.toString() === "ELECTRIC_CATEGORIES" &&
        (
          <OneCategoryCard 
            key={category.id}
            category={category}
          />
        )
      ))}
    </div>
  )
}

export default OneCategory