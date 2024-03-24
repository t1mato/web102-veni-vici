import { useState, useEffect } from 'react'
import './App.css'
import BanList from './components/BanList'

function App() {

  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
  
  const URL = 'https://api.thedogapi.com/v1/images/search?has_breeds=true&api_key='
  const [currentDog, setCurrentDog] = useState(null)
  const [currentImage, setCurrentImage] = useState(null)
  const [banListArr, setBanListArr] = useState([])

  const addToBanList = (attribute) => {
    if (!banListArr.includes(attribute)) {
      setBanListArr([...banListArr, attribute])
    }
  }

  const makeQuery = async () => {
    const response = await fetch(URL + ACCESS_KEY)
    const data = await response.json()
    console.log(data)

    const id = data[0].id
    setCurrentImage(data.at(0).url)
    const breedResult = await fetch(`https://api.thedogapi.com/v1/images/${id}`)
    const breedData = await breedResult.json()
    const breed = breedData.breeds[0]
    console.log(breed)
    
    let hasBannedAttribute = false;
    Object.values(breed).forEach(value => {
      if (banListArr.includes(value)) {
        hasBannedAttribute = true;
      }
    });

    if (!hasBannedAttribute) {
      setCurrentDog(breed);
    } else {
      await makeQuery(); // Makes new query if the dog contains the banned attribute
    }
  
  }

  return (
    <>
      <div className="whole-page">
        <h1>Veni Vici!</h1>
        <h3>Discover dogs from your wildest dreams!</h3>
        <h5>🐕 🐕 🐕 🐕 🐕 🐕 🐕 🐕 🐕 🐕 🐕 🐕 🐕 🐕 🐕 </h5>
        <div>
          {currentDog && (
            <>
              <button onClick={() => addToBanList(currentDog.name)}>{currentDog.name}</button>
              <button onClick={() => addToBanList(currentDog.life_span)}>{currentDog.life_span}</button>
              <button onClick={() => addToBanList(currentDog.breed_group)}>{currentDog.breed_group}</button>
              <br></br>
              <img src={currentImage} width="30%" height="30%"/>
            </>
          )}
        </div>
        <button onClick={makeQuery}>Discover!</button>
        <br></br>
        <br></br>
        <br></br>
        <BanList list={banListArr}/>
      </div>
    </>
  )
}

export default App
