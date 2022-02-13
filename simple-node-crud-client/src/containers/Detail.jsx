import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Stack from '@mui/material/Stack';
import Loading from '../elements/Loading';

export default function Detail () {
  const [data, setdata] = useState(null);
  const [isloading, setisloading] = useState(false)
  const { id } = useParams();
  const history = useHistory();
  const DeleteImage = async () => {
    const res = await fetch(`https://backend-lobrockyl.herokuapp.com/delete/${id}`, { method: 'DELETE' })
    const result = await res.json();
    if (result.success) history.push('/');
  }

  useEffect(() => {
    FetchData();
  }, [])

  const FetchData = async () => {
    if (!id) return;
    setisloading(true);
    const res = await fetch(`https://backend-lobrockyl.herokuapp.com/show/${id}`);
    const result = await res.json();
    if (result.success) setdata(result.image);
    setisloading(false);
  }
  if (isloading) {
    return (<div className="flex items-center justify-center border-2 min-h-screen">
        <Loading text="Loading Images" />
    </div>
    )
  }

  return (
      <>
    { data && <div className="flex justify-center w-100 p-4 border-2 min-h-screen">
    <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <div className = "h-1/2">
            <CardMedia
              component="img"
              image={data.ImgURL}
              alt="image"
            />
          </div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.ImgName}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {data.ImgDetails}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <div className='absolute bottom-1 flex justify-end items-center z-50 cursor-pointer' spacing={2}>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => history.push(`/edit/${id}`)}><span className="font-bold">Edit</span></Button>
          <Button variant="outlined" onClick={() => DeleteImage()}><span className="font-bold">Delete</span></Button>
        </Stack>
      </div>
    </div>
    }
    {!data && <div className='flex justify-center w-full text-gray-500 text-2xl font-bold'>No data Found!</div>}
    </>
  )
}
