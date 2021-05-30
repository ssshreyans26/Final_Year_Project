import React, {useState,useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Title from './Title';
import { firestore } from '../firebase';


// Generate Order Data
function createData(id, date, name, category, description, status) {
  return { id, date, name, category, description, status };
}



function preventDefault(event) {
  event.preventDefault();
}



const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
    const [rows,setRows] = useState([])
    
    var updateStatus = (id,status) => {
        firestore.collection('complaints').doc(id).update({
            status :"completed"
            })
            .then(function() {
            console.log("Document successfully updated!");
            });
            getComplaints()
    }
    var getComplaints = async () => {
        firestore.collection('complaints').get()
        .then((querySnapshot) => {
            const tempDoc = querySnapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() }
            })
            console.log(tempDoc)
            var data = []
            tempDoc.forEach(element => {
                data.push(createData(element.id,element.time.toString(),element.emailid,element.category,element.description,element.status))
            });
            setRows(data)
          })
          
          // setComplaints()
          
        // console.log(documents)
        // console.log(rows)
        // setComplaints(documents)
        
    }
    useEffect(() => {
        getComplaints()
      }, [])

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell >Update Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell >{row.status}</TableCell>
              <TableCell>
              <Button variant="contained" color="primary" href="#contained-buttons"  onClick={() => {updateStatus(row.id,"completed")}}>
                Completed
            </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}