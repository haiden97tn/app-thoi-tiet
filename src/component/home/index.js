import React, { useEffect, useState } from 'react'
import s from './style.module.css';
import { AiOutlineSearch } from 'react-icons/ai'
import { BiMicrophoneOff, BiMicrophone } from 'react-icons/bi'

const Home = () => {
    const [data, setData] = useState();
    const [city, setCity] = useState('ha noi');
    const [isShowMicro, setIsShowMicro] = useState(false);

    var callApi = (cityName) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c70812f7b4ea5bda0edcb539b233b409&lang=vi&units=metric`)
            .then((response) => response.json())
            .then((data) => {
                if (data.cod === '404') {
                    alert(data.message)
                    return
                }
                setData(data)
            });
    };

    const onSearch = (e) => {
        setCity(e.target.value)

        if (e.keyCode === 13) {
            callApi(e.target.value)
        }
    }

    const onStartSearch = () => {
        callApi(city)
    }

    useEffect(() => {
        callApi(city)
    }, []);






    return (
        <div className={s.container} >
            <div className={s.boxSearch}>
                <input type="text" placeholder='Hãy nhập tên thành phố...' onKeyDown={onSearch} />
                <AiOutlineSearch size={20} color="gray" className={s.iconSearch} onClick={onStartSearch} />
                {
                    !isShowMicro ? <BiMicrophoneOff size={20} color="gray" className={s.iconMicroOff} onClick={() => setIsShowMicro(!isShowMicro)} /> : <BiMicrophone onClick={() => setIsShowMicro(!isShowMicro)} size={20} className={s.iconMicroOn} />
                }
            </div>

            <div className={s.main}>
                <h2>{data?.name}</h2>
                <h4>{data?.weather[0]?.description || ''}</h4>
                <h1>{data?.main?.temp || 0}</h1>
            </div>
        </div>
    )
}

export default Home