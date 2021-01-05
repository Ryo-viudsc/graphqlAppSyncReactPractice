import React, {Component} from 'react';

class CommmentPost extends Component {
//this is inside of the comment 
        render(){
          return(
            <div className="comment">
            <span style={{fontStyle:"italic", color: "#0ca5e297"}}>
                {"Comment by : "} {commentOwnerUsername}
              <time style={{fontStyle: "italic"}}>
                { " " }
                { new Date(createdAt).toDateString()}
               </time>
            </span>
            <p> {content}  </p>
            </div> 
          )
        }
}

//we also have to make sure that everytime we push the comment,
//put it into  the comments array in the listPosts as well 


export default CommentPost; 