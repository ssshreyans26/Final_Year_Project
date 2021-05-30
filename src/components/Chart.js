import React, {useState,useEffect} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { firestore } from '../firebase'
import Title from './Title';

// Generate Sales Data



var arr=[0,0,0,0,0];//solved
var arr2=[0,0,0,0,0];//unresolved



export default function Chart() {


    const [data, setData] = useState([])
    var getComplaints = async () => {
        firestore.collection('complaints').get()
        .then((querySnapshot) => {
            const tempDoc = querySnapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() }
            })
            console.log(tempDoc)
            
            tempDoc.forEach(element => {
                var category = element.category;
                var status = element.status;
                if (status == "completed") {
                    if (category == "Electricity")
                        arr[0] += 1;
                    if (category == "Carpentry")
                        arr[1] += 1;
                    if (category == "Plumbing")
                        arr[2] += 1;
                    if (category == "Bullying")
                        arr[3] += 1;
                    if (category == "Others")
                        arr[4] += 1;
                }
                else {
                    if (category == "Electricity")
                        arr2[0] += 1;
                    if (category == "Carpentry")
                        arr2[1] += 1;
                    if (category == "Plumbing")
                        arr2[2] += 1;
                    if (category == "Bullying")
                        arr2[3] += 1;
                    if (category == "Others")
                        arr2[4] += 1;
                }
                
                const dt = [{
                    name: "Electricity",
                    solved: arr[0],
                    unsolved: arr2[0],
                    amt:arr[0]+arr2[0]
                },
                {
                    name: "Carpentry",
                    solved: arr[1],
                    unsolved: arr2[1],
                    amt:arr[1]+arr2[1]
                },
                {
                    name: "Plumbing",
                    solved: arr[2],
                    unsolved: arr2[2],
                    amt:arr[2]+arr2[2]
                },
                {
                    name: "Bullying",
                    solved: arr[3],
                    unsolved: arr2[3],
                    amt:arr[3]+arr2[3]
                },
                {
                    name: "Others",
                    solved: arr[4],
                    unsolved: arr2[4],
                    amt:arr[4]+arr2[4]
                }]
                setData(dt)
            });
            
          })}
          
          useEffect(() => {

            getComplaints()
          }, [])




  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Complaint Data</Title>
      <ResponsiveContainer>
      <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="solved" fill="#8884d8" />
      <Bar dataKey="unsolved" fill="#82ca9d" />
    </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}