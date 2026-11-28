import { useState, useMemo } from 'react'
import {
  allDivision,
  districtsOf,
  upazilaNamesOf,
  thanaNamesOf,
} from '@bangladeshi/bangladesh-address'
import './App.css'

const App = () => {
  const [division, setDivision] = useState('')
  const [district, setDistrict] = useState('')
  const [upazila, setUpazila] = useState('')
  const [thana, setThana] = useState('')

  // Load divisions once
  const divisions = useMemo(() => allDivision(), [])

  // Reload options whenever the parent selection changes
  const districtOptions = useMemo(
    () => (division ? districtsOf(division) : []),
    [division],
  )
  const upazilaOptions = useMemo(
    () => (district ? upazilaNamesOf(district) : []),
    [district],
  )
  const thanaOptions = useMemo(
    () => (district ? thanaNamesOf(district) : []),
    [district],
  )

  const onDivisionChange = (e) => {
    const value = e.target.value
    setDivision(value)
    setDistrict('')
    setUpazila('')
    setThana('')
  }

  const onDistrictChange = (e) => {
    const value = e.target.value
    setDistrict(value)
    setUpazila('')
    setThana('')
  }

  const onUpazilaChange = (e) => {
    setUpazila(e.target.value)
    setThana('')
  }

  const onThanaChange = (e) => {
    setThana(e.target.value)
    setUpazila('')
  }

  const dropdown = (options, value, onChange) => ({
    value,
    onChange,
    disabled: options.length === 0,
  })

  return (
    <div className="card">
      <h1>Bangladesh Address - Cascading Dropdown</h1>
      <div className="row">
        <label>
          Division
          <select {...dropdown(divisions, division, onDivisionChange)}>
            <option value="">Choose...</option>
            {divisions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <label>
          District
          <select {...dropdown(districtOptions, district, onDistrictChange)}>
            <option value="">Choose...</option>
            {districtOptions.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>

        <label>
          Upazila
          <select {...dropdown(upazilaOptions, upazila, onUpazilaChange)}>
            <option value="">Choose...</option>
            {upazilaOptions.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>

        {thanaOptions.length > 0 && (
          <label>
            Thana
            <select {...dropdown(thanaOptions, thana, onThanaChange)}>
              <option value="">Choose...</option>
              {thanaOptions.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div className="result">
        {division && <span>Division: {division}</span>}
        {district && <span>District: {district}</span>}
        {upazila && <span>Upazila: {upazila}</span>}
        {thana && <span>Thana: {thana}</span>}
      </div>
    </div>
  )
}

export default App
