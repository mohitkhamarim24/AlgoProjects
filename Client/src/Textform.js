export default function Textform(props) {
return(
<>
  <textarea className="form-control" style={{backgroundColor : props.mode ==='dark'?'grey':'white'}}></textarea>
</>
)

}
