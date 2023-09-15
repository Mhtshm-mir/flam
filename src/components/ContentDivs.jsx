function ContentDivs(props) {
    const { isClosed, isHalfOpen, isOpen } = props;

    return (
    <div >
      {
       isOpen ==true && <div className="sm" style={{textAlign:"center",marginTop:'100px'}}>
            <h1>This is Fully Open view</h1>
            <p>Entire Content is available now </p>
       </div>
      }

      {
         isHalfOpen ==true && <div className="sm" style={{textAlign:"center",marginTop:"70px"}}>
          <h1>This is a Half Open view</h1>
            <p>Half Content is available now </p>
         
         </div>
      }
       {
         isClosed ==true && <div className="sm" style={{textAlign:"center",marginBottom:'30px'}}>
            <h1>This is a Closed view</h1>
            <p> limited content available</p>
            </div>
      }
        
    </div>
  )
}

export default ContentDivs
