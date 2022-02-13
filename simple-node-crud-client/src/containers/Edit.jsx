import * as React from 'react';
import Form from '../components/Form';
import { useParams } from 'react-router-dom';

export default function Edit () {
  const { id } = useParams();
  const [data, setdata] = React.useState(null);

  React.useEffect(() => {
    FetchData();
  }, [])

  const FetchData = async () => {
    if (!id) return;
    const res = await fetch(`https://backend-lobrockyl.herokuapp.com/show/${id}`);
    const result = await res.json();
    if (result.success) setdata(result.image);
  }

  return (
    <div>
        {data && <Form data={data} id={id} type="Edit"/>}
    </div>
  )
}
