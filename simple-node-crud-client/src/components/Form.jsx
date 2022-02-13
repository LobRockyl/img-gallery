/* eslint-disable react/prop-types */
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

export default function Form ({ data = null, id = null, type = 'Create' } = {}) {
  const [name, setname] = React.useState('');
  const [detail, setdetail] = React.useState('');
  const [url, seturl] = React.useState('');
  const history = useHistory();

  React.useEffect(() => {
    if (!data) return;
    setname(data.ImgName)
    setdetail(data.ImgDetails)
    seturl(data.ImgURL)
  }, [])

  const EditImage = async () => {
    const res = await fetch(`https://backend-lobrockyl.herokuapp.com/${id}/edit`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name, url: url, details: detail }) })
    const result = await res.json();
    if (result.success) {
      history.push('/');
      setTimeout(() => { window.location.reload() }, 50)
    };
  }

  const CreateImage = async () => {
    const res = await fetch('https://backend-lobrockyl.herokuapp.com/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name, url: url, details: detail }) })
    const result = await res.json();
    if (result.success) history.push('/');
  }

  return (
      <div className="flex items-center justify-center min-h-screen">
      <div className="mx-auto w-9/12 p-4 border-4 shadow-md">
        <h1 className='text-gray-500 text-center font-semibold text-4xl'>{type} Form</h1>
        <div className="my-8"> <TextField disabled={type !== 'Create'} fullWidth label="Name" id="fullWidth" value={name} onChange={(e) => { setname(e.target.value) }} /> </div>
        <div className="my-8"> <TextField fullWidth label="Detail" id="fullWidth" value={detail} onChange={(e) => { setdetail(e.target.value) }}/> </div>
        <div className="my-8"> <TextField fullWidth label="Url" id="fullWidth" value={url} onChange={(e) => { seturl(e.target.value) }}/> </div>
        <div id="submit" onClick={() => { type === 'Create' ? CreateImage() : EditImage() }} className="flex items-center justify-center w-full"><Button variant="contained"><span className="font-bold">{type}</span></Button></div>
      </div>
      </div>
  )
}
