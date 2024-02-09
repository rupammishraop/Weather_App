
import React, { useEffect, useState } from 'react'
import BeatLoader from "react-spinners/BeatLoader";
import './App.css'


function App() {
  
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState("weatherLogo")
  const [city, setCity] = useState("")
  const [temp, setTemp] = useState(0)
  const [humidity, setHumidity] = useState("0")
  const [wind, setWind] = useState("0")
  const [cityName, setCityName] = useState('');
  const [data, setData] = useState({});


  // Fuction for Api Call to fetch weather Info

  const useWeatherInfo = async (city) => {
    setLoading(true);
    try {
      await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ec3ccb20da01d87f8827230d9df6821d&units=metric`)
        .then((res) => res.json())
        .then((res) => {
          setCityName(res.name);
          setTemp(res.main.temp);
          setCity(res.name);
          setHumidity(res.main.humidity);
          setWind(res.wind.speed);
          setImage(res.weather[0].main);
          setData(res);

          setCity("")
          console.log(data)
        }).finally(() => {
          setLoading(false)
        });
      setCity("");
    } catch (error) {
      alert("invlaid City Name")
      setTemp("0");
      setCity("");
      setHumidity("0");
      setWind("0");
      setImage("weatherLogo");
    }

  }

  // for Changing the Image depending upon the weather condition 

  useEffect(() => {
    document.querySelector('#conditionImg').src = `/src/images/${image}.png`;
  }, [image])

  // Handing the Search Btn

  function handleBtn() {
    if (city === "") {
      alert("Please Enter City");
    } else {
      useWeatherInfo(city);
    }
  }

  return (
    <div id='container' className='w-full h-screen flex justify-center'>
      <div id="app" className=' p-8  min-h-40 self-start mt-6 w-full md:w-1/2  rounded-2xl'>

        
        {/* input section start here */}

        <div className='flex flex-col md:flex-row md:justify-between items-center p-3 bg-white rounded-xl'>
          <input className='w-full md:w-2/3 h-8  p-2 text-xl md:text-2xl ml-5 focus:outline-none' type="text"
            value={city}
            onChange={(e) => (setCity(e.target.value))}
            spellCheck="false"
            placeholder='Enter City Name'
          />
          <button className=' bg-blue-500 w-20 p-3 rounded-xl mt-7 md:mt-0'
            onClick={handleBtn}
          >Search</button>
        </div>

        {/* input section end here */}


        {/* main section start here */}

        {
          loading ?
            <div className='flex justify-center items-center mt-30'>
              <BeatLoader
                color={"white"}
                loading={loading}
                size={40}
                aria-label="Loading Spinner"
                data-testid="loader"
              />  </div> : null
        }
        <div className=' flex flex-col items-center'>
          <div className='flex flex-col overflow-hidden mt-4'>
            <img className='w-40 h-40 rounded-xl '
              id='conditionImg' src='\src\images\clouds.png' />
            {image !== "weatherLogo" ? <div>  <p className=' font-semibold text-center text-2xl'>{image}</p>
              <p className=' border-b-8 rounded-xl border-yellow-200 w-full self-center' ></p> </div> : null}

          </div>
          {temp != 0 ? <div className='flex flex-col mt-6 p-2'>
            <p className='text-3xl text-center'>{cityName}</p>
            <p className='text-center text-5xl mt-3'>{Math.floor(temp)}°C</p>
          </div> : null}

        </div>

        <div className=' mt-4 flex flex-col items-center md:flex-row md:justify-between'>
          {humidity != 0 | ((typeof humidity) === "number") ?
            <div className='flex '>
               <img className=' h-15 w-14 self-center' src="\src\images\humidity.png"      alt="" />
              <div className='ml-3 text-xl font-semibold'>
                      <p className=''>Humidity</p>
                      <p>{humidity} %</p>
              </div>
            </div> : null}
          {wind != 0 || ((typeof wind) === "number") ?
          <div className='flex mt-6 md:mt-0 '>
             <img className=' h-15 w-14 self-center' src="\src\images\wind.png" alt="" />
                 <div className='ml-3 text-xl font-semibold'>
                   <p>Wind</p>
                   <p>{wind}km/h</p>
                 </div>
          </div> : null}

        </div> 

          {/* main section end here */}
      </div>
    </div>
  )
}

export default App
