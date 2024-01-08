import PropTypes from 'prop-types'
const Button = ( { color,text, onClick }) => {
   
    return(
       <button 
            onClick={onClick}  
            style={{backgroundColor:color}}
            className='btn'
        > 
            {text} 
        </button>

  ) 

}

Button.defaultProps = {
    color: 'lightblue'
}

Button.propTypes ={
    text : PropTypes.string,
    color:PropTypes.string,
    //We declared onclick as a function
    onClick:PropTypes.func,
}

export default Button
