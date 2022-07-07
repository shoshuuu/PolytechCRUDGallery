import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

const getBase64 = (file) =>{
  const reader = new FileReader();
  reader.readAsDataURL(file);
};

class UploadTab extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      message: ''
    }
  };
  //POST
  
  imageUpload = (e) => {
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      localStorage["fileBase64"] = base64;
      console.debug("file stored",base64);
    });
  };

  onCreateImage =() =>{
    let image ={
      Id: document.getElementsByClassName('Card').length + 1,
      ImageFile:this.ref.ImageFile.value,
      Description:this.ref.Description.value,
    };
    fetch('https://localhost:44375/api/Images', {
      method: 'POST',
      headers: {'Content-type': 'application/json' },
      body: JSON.stringify(image)
    }).then(res => res.json()).then( res => {
      if(res){
        this.setState({message : 'image created'});
        console.log(res);
      }
    });
  };

  render(){
    return(
      <div className='UploadTab'>
        <form method='post'>
          <input type='file' ref='ImageFile' onChange={this.imageUpload}/>
          <input type='text' placeholder='Enter description here' ref='Description'/>
          <input 
            type='submit' 
            value='submit'
            onSubmit={this.onCreateImage}  
          />
        </form>
      </div>
    )
  }
}
/*
handleClick(e){
  fetch(`https://localhost:44375/api/Images/${this.props.Id}`)
  .then(res => res.json())
  .then(
          result =>{
            this.setState({card: result});
            container = document.getElementById('root');
            const root = ReactDOM.createRoot(container)
            root.render(
              <React.StrictMode>
                  <Card 
                    key={this.state.card.Id} 
                    Description={this.state.card.Description} 
                    ImageFile={`data:image/png;base64,${this.state.card.ImageFile}`}/>
              </React.StrictMode>
  );})
}
*/
class Card extends React.Component{
  constructor(props){
    super(props);
    this.state = {card: null}
  }
  //Вызывается рекурсивно (почему???)
  handleClick(e){
    fetch(`https://localhost:44375/api/Images/${this.props.Id}`)
    .then(res => res.json())
    .then(
            result =>{
              this.setState({card: result});
              container = document.getElementById('root');
              const root = ReactDOM.createRoot(container)
              root.render(
                <React.StrictMode>
                    <Card 
                      key={this.state.card.Id} 
                      Description={this.state.card.Description} 
                      ImageFile={`data:image/png;base64,${this.state.card.ImageFile}`}/>
                </React.StrictMode>
    );})
  }
  render(){
    return(
      <div className='Card' key={this.props.Id}>
        <a href='#' >
          <img src={this.props.ImageFile} alt={this.props.Id} className='card-image'/>
        </a>
          <p className='descritption'>{this.props.Description}</p>
        </div>
    )
  }
}

export class Gallery extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      cards: []
    };
  }
  componentDidMount(){
    fetch('https://localhost:44375/api/Images').then(res=>res.json()).then(
      result =>{
        this.setState({cards:result});
      }
    )
  }
  render(){
    return (
      <div className='Gallery'>
        <h1>ImageG</h1>
        {this.state.cards.map(crd =>(
          <Card 
            key={crd.Id} 
            Description={crd.Description} 
            ImageFile={`data:image/png;base64,${crd.ImageFile}`}/>)
        )}
      </div>
    )
  }
}

let container = null;

document.addEventListener('DOMContentLoaded', function(event) {
  if (!container) {
    container = document.getElementById('root');
    const root = ReactDOM.createRoot(container)
    root.render(
      <React.StrictMode>
          <UploadTab/>
          <Gallery/>
      </React.StrictMode>
    );
  }
});
/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

  </React.StrictMode>
);
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
