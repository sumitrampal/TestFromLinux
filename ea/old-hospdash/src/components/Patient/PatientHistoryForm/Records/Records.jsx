import React from 'react'
import './Records.scss'
import DocumentDetails from './DocumentDetails/DocumentDetails'
import ViewGallery from '../viewGallery/viewGallery'
const Records = ({images,data}) =>{
  const [imagesList, setImagesList] = React.useState(data.bookingInfo.relatedDocuments.length !== 0 ? data.bookingInfo.relatedDocuments[0].fileurl : data.bookingInfo.insurance.document )
  const [documentData, setDocumentData] = React.useState(data.bookingInfo.relatedDocuments.length !== 0 ? data.bookingInfo.relatedDocuments[0] : {
    title : data.bookingInfo.insurance.name,
    docType: "Insurance"
  })
 const [activeDocument, setActiveDocument] = React.useState(data.bookingInfo.relatedDocuments.length !== 0 ? data.bookingInfo.relatedDocuments[0]._id : "insurance")

  const onDocumentClick = (data) => {
     setImagesList(data.fileurl)
     setDocumentData(data)
     document.getElementById(activeDocument).classList.remove('document-active')
     setActiveDocument(data._id)
  }
  React.useEffect(() => {
    document.getElementById(activeDocument).classList.add('document-active')
  },[activeDocument ])

  const onInsuranceClick = (obj) => {
    let dataobj = {
      title: obj.name,
      docType: "Insurance"
    }
    setImagesList(obj.document)
    setDocumentData(dataobj)
    document.getElementById(activeDocument).classList.remove('document-active')
    setActiveDocument("insurance")
  }
//let renderedEle = imagesList.length !== 0 ? <ViewGallery images={imagesList}/> : <h1>No Images Available</h1>
  return(
    <div className="dashboard-records">
      <h2 className="dashboard-header">
        Uploaded Documents
      </h2>
      <div className="row">
        <div className="col-lg-12">
          <div className="documents-list row">
            {
              data.bookingInfo.relatedDocuments.map((document, i)=> {
                return(
                  <div id={document._id} className="document col-lg-4" onClick={() => onDocumentClick(document)}>
                    <h4>{document.title}</h4>
                    <p>{document.date}</p>
                  </div>
                )
              })
            }
            {
              data.bookingInfo.insurance === null ? (<></>) : (
                  <div id={"insurance"} className="document col-lg-4" onClick={() => onInsuranceClick(data.bookingInfo.insurance)}>
                    <h4>{"Insurance"}</h4>
                  </div>
                )
            }
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-8">
          {/*<img src={imagesList} style={{width: "100%"}} alt="image"/>*/}
          {
            imagesList ? imagesList.includes('.pdf') 
            ?  (<iframe src={imagesList} style={{height:"600px", width: "100%"}} title="Iframe Example"></iframe> )
            :  (<img src={imagesList} style={{width: "100%"}} alt="image"/>)
          : <></> }
        </div>
        <div className="col-lg-4">
          <DocumentDetails data={documentData}  />
        </div>
      </div>
    </div>
  )
}
export default Records
