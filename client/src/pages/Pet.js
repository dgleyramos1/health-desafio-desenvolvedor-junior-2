import {useState, useEffect} from 'react'
import PetForm from './../pet/PetForm';
import styles from './Pet.module.css'
import { useParams, useNavigate } from 'react-router-dom';

const Pet = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ pet, setPet ] = useState({});

    
    useEffect(() => {
        fetch(`https://petsho-api.herokuapp.com/api/pets/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
        .then((data) => {
            setPet(data)
        })
        .catch(err => console.log(err))
    }, [id])
    

    const updatePet = (pet) => {
        fetch(`https://petsho-api.herokuapp.com/api/pets/${pet.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pet),
        })
        .then(resp => resp.json())
        .then(data => {
            setPet(data)
            //redirect
            navigate('/pets')
        })
        .catch(err => console.log(err))
    }
  return (
    <div className={styles.pet_container}>
        <h3>Atualizar PET</h3>
        <p>Preencha todo o formulário para atualizar o novo pet</p>
        <PetForm handleSubmit={updatePet} btnText="Atualizar PET" petData={pet} />
    </div>
  )
}

export default Pet