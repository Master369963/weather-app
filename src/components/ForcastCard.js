import './styles/Forcast.style'
import { AccBox, AccInput, AccItem, AccLabel, AccBody, ForcastImg, ForecastContent, BoldContent, TimeBox, DescriptionContent, AccIcon, ForecastItems } from './styles/Forcast.style'
import { Card, ImgCaption, StrongContent } from './styles/GlobalStyle.style'
import { Clock } from './Tools/Icon'
import { getShowdayList, formatweatherForecast, getShowdayData } from './Tools/ForeCastFn'
import * as weatherIcons from '../weatherIcons'

const ForecastCard = ({ weatherForecast }) => {

  const handleScroll = (e) => {
    const clickedItem = document.getElementById(e.target.id)
    const currentSection = clickedItem.nextElementSibling
    currentSection.scrollIntoView({ behavior: 'smooth' })
  }

  const showday = getShowdayList(weatherForecast)

  return (
    <Card>
      <ForecastContent>
        <DescriptionContent mb='1rem' size='1.4rem'>5-day Forecast</DescriptionContent>

        {showday.map((day) => {
          const showdayData = getShowdayData(weatherForecast, day)
          const showdayOutput = showdayData.map((item, index) => {
            const formattedData = formatweatherForecast(item)

            return (
              <ForecastItems key={index}>
                <TimeBox>
                  <Clock />
                  <StrongContent>{formattedData.time}</StrongContent>
                </TimeBox>
                <ForcastImg>
                  <img src={weatherIcons[`icon${formattedData.icon}`]} alt={formattedData.description} />
                  {formattedData.rain > 0 ? <ImgCaption>{Math.round(formattedData.rain)}%</ImgCaption> : null}
                </ForcastImg>
                <DescriptionContent>{formattedData.description}</DescriptionContent>
                <BoldContent>{formattedData.temp}°C</BoldContent>
              </ForecastItems>
            )
          })

          return (
            <AccItem key={day} >
              <AccInput type="radio" name='acc' id={`input_${day}`} defaultChecked={day === 'Today' ? true : false} onClick={handleScroll} />
              <AccBox>
                <AccLabel htmlFor={`input_${day}`}>
                  {day}
                  <AccIcon></AccIcon>
                </AccLabel>
                <AccBody>
                  {showdayOutput}
                </AccBody>
              </AccBox>
            </AccItem>
          )
        })}
      </ForecastContent>
    </Card >
  )
}

export default ForecastCard