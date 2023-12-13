import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
// import styles from 'Components/ProfilePage/profilePage.module.css'
import styles from './another.module.css'
import Navbar from '../Navbar/Navbar';
import { FaCircleUser } from "react-icons/fa6";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

axios.defaults.withCredentials = true;



export default function ProfilePage() {

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');

  // Handler functions would be implemented here to update state and perform calculations
  const router = useRouter();


  const [currentProfile, setcurrentProfile] = useState(null);

  const getProfile = async ()=>{
    console.log('getting profile');
    const data = await axios.get('/api/getProfile');

    console.log(data);
    setcurrentProfile(data.data);

    setWeight(data.data.weight)
    setHeight(data.data.height)
    setAge(data.data.age)
    setGender(data.data.gender)
  }



  useEffect(()=>{
    getProfile();
  }, [])
  
  const [Bmi, setBmi] = useState(null);

  const getBmi = async ()=>{
    console.log('getting bmi');
    const data = await axios.get('/api/getBmi');
    setBmi(data.data);
  }
  useEffect(()=>{
    getBmi();
  }, [])


  const handleSubmit = async () => {
    console.log('Value 1:', weight);
    console.log('Value 2:', height);
    console.log('Value 3:', age);
    console.log('Value 4: ', gender)

    if(weight == null || age == null || height == null){
      alert('please enter all fields');
      return;
    }

    const data = await axios.get('/api/updateProfile', {params: {weight: weight, height: height, age: age, gender: gender}});
    window.location.reload();
  }

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
 

  return (
    

    <div className={styles.page}>

      <div className={styles.helloUser}>
        {/* <img className={styles.helloUser} src='/userProfile.jpg' alt="User" /> */}
        <FaCircleUser size={'40px'} className="text-main" />
        <h1 className='text-main'>Hello Saad Khan</h1>
      </div>


      <section className={styles.section1}>

        <div className={styles.inputs}>


          <div className={styles.input}>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Weight</Form.Label>
              <Form.Control type="number" placeholder="Enter weight in kgs" onChange={(e) => setWeight(e.target.value)} value={weight}/>
            </Form.Group>


          </div>
          <div className={styles.input}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Height</Form.Label>
              <Form.Control type="number" placeholder="Enter height in kgs" onChange={(e) => setHeight(e.target.value)} value={height}/>
            </Form.Group>
          </div>
          <div className={styles.input}>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" placeholder="Enter age in kgs" onChange={(e) => setAge(e.target.value)} value={age}/>
            </Form.Group>
          </div>

          <div className={styles.input}>

          {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="Male"
            name="genderGroup"
            type={type}
            id={`inline-${type}-1`}
            value="male"
            checked={gender === 'male'}
            onChange={handleGenderChange}
          />
          <Form.Check
            inline
            label="Female"
            name="genderGroup"
            type={type}
            id={`inline-${type}-2`}
            value="female"
            checked={gender === 'female'}
            onChange={handleGenderChange}
          />
        </div>
      ))}


      
          </div>





          <Button variant="primary" onClick={handleSubmit}>Submit</Button>



        </div>

        <div className={styles.table}>

        <Table striped>
      <thead>
        <tr>
          <th>BMI</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
                <tr>
                  <td>&lt;16</td>
                  <td>Severe Thinness</td>
                </tr>
                <tr>
                  <td>16-17</td>
                  <td>Moderate Thinness</td>
                </tr>
                <tr>
                  <td>17-18.5</td>
                  <td>Mild Thinness</td>
                </tr>
                <tr>
                  <td>18.5-25</td>
                  <td>Normal</td>
                </tr>
                <tr>
                  <td>25-30</td>
                  <td>Overweight</td>
                </tr>
                <tr>
                  <td>30-35</td>
                  <td>Obese Class 1</td>
                </tr>
                <tr>
                  <td>35-40</td>
                  <td>Obese Class 2</td>
                </tr>
                <tr>
                  <td>&gt;40</td>
                  <td>Obese Class 3</td>
                </tr>
              </tbody>
    </Table>

    <div className={styles.calories}>
      {
        Bmi
        &&
        <>
          <h6 className='text-main'>Your Bmi: {Bmi.bmi.toFixed(0)}</h6>
          <h6 className={'text-main'}>Your Daily Calorie Requirement: {Bmi.calories.toFixed(0)} KCAL</h6>
        </>
      }
    </div>
        </div>


      </section>

    </div>
  );


}



