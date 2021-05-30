import React, {useState, useEffect} from 'react';
import Link from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { firestore } from '../firebase'

function preventDefault(event) {
  event.preventDefault();
}


const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
    const [noc,setNoc] = useState()
    const getTotalComplaints = () => {
        console.log("getTotalComplaints")
 firestore.collection("complaints").get().then(snap => {
   var size = snap.size // will return the collection size
   setNoc(size)
 });


    }
    
    useEffect(() => {
        getTotalComplaints()
      }, [])


const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Total Complaints</Title>
      <Typography component="p" variant="h4">
        {noc}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          
        </Link>
      </div>
    </React.Fragment>
  );
}