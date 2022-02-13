/* eslint-disable react/prop-types */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function ActionAreaCard ({ id, name, image, detail }) {
  const history = useHistory();

  const DeleteImage = async () => {
    const res = await fetch(`https://backend-lobrockyl.herokuapp.com/delete/${id}`, { method: 'DELETE' })
    const result = await res.json();
    if (result.success) {
      setTimeout(() => {
        window.location.reload()
      }, 10)
    }
  }
  // const Style = {
  //   height: 32,
  // };
  return (
    <div data-testid="card-1" className={'relative m-2'}>
      <div onClick={() => history.push(`/details/${id}`)}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <div className = "h-1/2 object-fit">
            <CardMedia
              component="img"
              height= '140'
              image={image}
              alt="image"
            />
          </div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" id="test1">
              {name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {detail}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </div>
      <div className='absolute bottom-0 right-30 cursor-pointer'>
        <EditIcon onClick={() => history.push(`/edit/${id}`)} />
        <DeleteIcon onClick={() => DeleteImage()} />
      </div>
      </div>
  );
}
