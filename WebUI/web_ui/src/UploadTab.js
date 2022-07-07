import React from 'react';
import ReactDOM from 'react-dom/client';

export class UploadTab extends React.Component{
    render(){
      return(
        <div className='UploadTab'>
          <form method='post'>
            <input type='file'/>
            <input type='text' placeholder='Enter description here'/>
            <input type='submit' value='submit'/>
          </form>
        </div>
      )
    }
  }

  export default UploadTab;