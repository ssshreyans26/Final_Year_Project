import React, {Component} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
import BackupIcon from '@material-ui/icons/Backup';
import Button from '@material-ui/core/Button';
import {storage, firestore} from '../firebase'
 
class DropzoneAreaExample extends Component{
  constructor(props){
    super(props);
    this.state = {
      files: [],
    };
  }
  handleUrl = (url) =>{
    // var newDate = new Date();
  // var datetime = "LastSync: " + newDate.today() + " @ " + newDate.timeNow();
  // var date = firestore.FieldValue.serverTimestamp()
  var date = new Date().toString();
    firestore.collection('circulars').add({
      "url": url,
      "time":date
    })
  }

  handleChange(files){
    this.setState({
      files: files,
    });
  }
  handleSave = async () => {
      let bucketName = 'circulars'
      let file = this.state.files[0]
      let storageRef = storage.ref(`${bucketName}/${file.name}`)
      let uploadTask = await storageRef.put(file)
      // let downloadUrl = await uploadTask.snapshot;
      // console.log(downloadUrl)
      storage.ref(`${bucketName}`).child(file.name).getDownloadURL()
      .then(fireBaseUrl => {
        this.setState({
          url:fireBaseUrl
        })
        console.log(fireBaseUrl)
        this.handleUrl(fireBaseUrl)
      })
  }
  render(){
    return (
        <div>
      <DropzoneArea
        onChange={this.handleChange.bind(this)}
        
        />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.handleSave}
          >
              Upload
          </Button>
          </div>
        
    )
  }
}
 
export default DropzoneAreaExample;