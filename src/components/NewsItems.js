import React from 'react';

const NewsItems = (props) =>{
    
    let {title, description, imgUrl, url, author, date}= props;
    return (
      <div className= "my-3">
        <div className="card" >
                <img src={!imgUrl?"https://techcrunch.com/wp-content/uploads/2024/05/ipad-noplay.png?resize=1200,675": imgUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {!author? "unknown": author} on {new Date(date).toGMTString()}</small></p>
                    
                    <a href={url} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
            </div>
        </div>
      </div>
    )
  
}

export default NewsItems
