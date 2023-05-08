import './App.css';
import Search from './components/Search'
import NewStoreForm from './components/NewStoreForm';
import StoreList from './components/StoreList';

import { useState, useEffect } from "react"

function App() {

  const [stores, setStores] = useState([])
  const[formData, setFormData] = useState({
    name: "",
    image: "",
    season: 0,
    episode: 0
  })

  const [searchText, setSearchText] = useState("")



 useEffect(() => {
  fetch("http://localhost:8085/stores")
  .then(res => res.json())
  .then(storeData => setStores(storeData))
 }, [])

 function addNewStore(event){
  event.preventDefault()
  fetch("http://localhost:8085/stores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body:JSON.stringify(formData)
  })
  .then(res => res.json())
  .then(newStore => setStores([...stores, newStore]))
 }

 function updateFormData(event){
  if(event.target.id === "season" || event.target.id === "episode"){
    setFormData({...formData, [event.target.id]: Number(event.target.value)})
  }
  else{
setFormData({...formData, [event.target.id]: event.target.value})
 }
}

function updateSearchText(event){
setSearchText(event.target.value)
}

const filteredStores = stores. filter(store => {
if (searchText === "") {
  return true
}
return store.name.toLowerCase().includes(searchText.toLowerCase())
})

  return (
    <div className="main-container">
      <img src="/images/bobsburgers.png" />
      <h1>Neighbor Stores</h1>
      <Search updateSearchText={updateSearchText}/>
      <NewStoreForm addNewStore={addNewStore} updateFormData={updateFormData}/>
      <StoreList stores = {filteredStores} />
    </div>
  );
}

export default App;
